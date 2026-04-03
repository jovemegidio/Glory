import React, { useState, useMemo } from 'react';
import { Heart, CreditCard, QrCode, Building2, DollarSign, Plus, TrendingUp, Clock, Copy, Check, ChevronLeft } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import StatCard from '../components/ui/StatCard';
import { useAuth } from '../contexts/AuthContext';
import { mockDonations } from '../data/mock';

const typeLabels: Record<string, string> = {
  tithe: 'Dízimo', offering: 'Oferta', campaign: 'Campanha', event: 'Evento', other: 'Outro',
};

const methodLabels: Record<string, string> = {
  credit_card: 'Cartão de Crédito', debit_card: 'Cartão de Débito', pix: 'PIX', bank_transfer: 'Transferência', cash: 'Dinheiro',
};

const methodIcons: Record<string, React.ReactNode> = {
  credit_card: <CreditCard size={14} />, debit_card: <CreditCard size={14} />, pix: <QrCode size={14} />,
  bank_transfer: <Building2 size={14} />, cash: <DollarSign size={14} />,
};

const suggestedAmounts = [10, 20, 50, 100, 200, 500];

// Generate a fake PIX code based on amount (simulated)
function generatePixCode(amount: number, type: string): string {
  const payload = `00020126580014BR.GOV.BCB.PIX0136igreja-glory-${type}52040000530398654${amount.toFixed(2).length.toString().padStart(2, '0')}${amount.toFixed(2)}5802BR5913IGREJA GLORY6009SAO PAULO62070503***6304`;
  const checksum = Array.from(payload).reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 10000;
  return payload + checksum.toString().padStart(4, '0');
}

// Generate a simple QR code SVG using a basic pattern (no external library needed)
function QRCodeDisplay({ value, size = 200 }: { value: string; size?: number }) {
  // Create a deterministic pattern from the value string
  const cells = 25;
  const cellSize = size / cells;
  const hash = Array.from(value).reduce((acc, ch, i) => acc + ch.charCodeAt(0) * (i + 1), 0);

  const grid: boolean[][] = [];
  for (let r = 0; r < cells; r++) {
    grid[r] = [];
    for (let c = 0; c < cells; c++) {
      // Position detection patterns (corners)
      const isTopLeft = r < 7 && c < 7;
      const isTopRight = r < 7 && c >= cells - 7;
      const isBottomLeft = r >= cells - 7 && c < 7;

      if (isTopLeft || isTopRight || isBottomLeft) {
        const lr = isTopLeft ? r : isBottomLeft ? r - (cells - 7) : r;
        const lc = isTopLeft ? c : isTopRight ? c - (cells - 7) : c;
        grid[r][c] = lr === 0 || lr === 6 || lc === 0 || lc === 6 || (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4);
      } else {
        // Data area - use hash-based pattern
        const seed = (hash * (r * cells + c + 1) + r * 31 + c * 37) % 100;
        grid[r][c] = seed < 45;
      }
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="QR Code PIX">
      <rect width={size} height={size} fill="white" />
      {grid.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect key={`${r}-${c}`} x={c * cellSize} y={r * cellSize} width={cellSize} height={cellSize} fill="black" />
          ) : null
        )
      )}
    </svg>
  );
}

export default function Donations() {
  const { isAdmin, user } = useAuth();
  const [showDonate, setShowDonate] = useState(false);
  const [donationType, setDonationType] = useState('tithe');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('pix');
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [pixCopied, setPixCopied] = useState(false);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const total = mockDonations.filter(d => d.status === 'completed').reduce((a, d) => a + d.amount, 0);
  const tithes = mockDonations.filter(d => d.type === 'tithe' && d.status === 'completed').reduce((a, d) => a + d.amount, 0);
  const offerings = mockDonations.filter(d => d.type === 'offering' && d.status === 'completed').reduce((a, d) => a + d.amount, 0);

  const parsedAmount = parseFloat(amount) || 0;

  const pixCode = useMemo(() => {
    if (parsedAmount > 0) return generatePixCode(parsedAmount, donationType);
    return '';
  }, [parsedAmount, donationType]);

  const copyPixCode = async () => {
    try { await navigator.clipboard.writeText(pixCode); } catch {
      const ta = document.createElement('textarea'); ta.value = pixCode; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    }
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 3000);
  };

  const handleDonate = () => {
    if (parsedAmount <= 0) return;
    if (method === 'pix') {
      setStep('payment');
    } else {
      setStep('success');
    }
  };

  const resetDonation = () => {
    setStep('form');
    setAmount('');
    setDonationType('tithe');
    setMethod('pix');
    setPixCopied(false);
    setShowDonate(false);
  };

  // For members, show a simplified view
  const myDonations = !isAdmin ? mockDonations.filter(d => d.userId === user?.id) : mockDonations;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Doações</h1>
          <p className="text-gray-500 mt-1">
            {isAdmin ? 'Membros e visitantes podem doar pelo app, site e totens' : 'Faça sua doação de forma simples e segura'}
          </p>
        </div>
        <Button onClick={() => setShowDonate(true)} aria-label="Fazer uma doação">
          <Heart size={18} aria-hidden="true" /> Fazer Doação
        </Button>
      </div>

      {/* Stats - admin sees all, member sees own */}
      {isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Total Recebido" value={formatCurrency(total)} icon={DollarSign} color="green" />
          <StatCard title="Dízimos" value={formatCurrency(tithes)} icon={TrendingUp} color="blue" />
          <StatCard title="Ofertas" value={formatCurrency(offerings)} icon={Heart} color="purple" />
        </div>
      )}

      {!isAdmin && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
              <Heart size={28} className="text-green-600" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Contribua com a obra de Deus</h2>
              <p className="text-sm text-gray-600 mt-1">Seus dízimos e ofertas fazem a diferença. Doe via PIX de forma rápida e segura.</p>
            </div>
          </div>
        </div>
      )}

      {/* Donations List */}
      <Card>
        <CardHeader>
          <CardTitle>{isAdmin ? 'Histórico de Doações' : 'Minhas Doações'}</CardTitle>
        </CardHeader>
        {myDonations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full" aria-label="Histórico de doações">
              <thead>
                <tr className="border-b border-gray-100">
                  {isAdmin && <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-4">Doador</th>}
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-4">Tipo</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-4">Método</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-4">Valor</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-4">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-3 px-4">Data</th>
                </tr>
              </thead>
              <tbody>
                {myDonations.map((donation) => (
                  <tr key={donation.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    {isAdmin && (
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold text-primary-600">{donation.userName.charAt(0)}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{donation.userName}</span>
                        </div>
                      </td>
                    )}
                    <td className="py-3 px-4">
                      <Badge variant="info">{typeLabels[donation.type]}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        {methodIcons[donation.method]} {methodLabels[donation.method]}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-semibold text-green-600">{formatCurrency(donation.amount)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={donation.status === 'completed' ? 'success' : donation.status === 'pending' ? 'warning' : 'danger'}>
                        {donation.status === 'completed' ? 'Concluído' : donation.status === 'pending' ? 'Pendente' : 'Falhou'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {new Date(donation.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart size={48} className="text-gray-300 mx-auto mb-4" aria-hidden="true" />
            <p className="text-gray-500 font-medium">Nenhuma doação encontrada</p>
            <p className="text-sm text-gray-400 mt-1">Faça sua primeira doação clicando no botão acima</p>
          </div>
        )}
      </Card>

      {/* Donate Modal - with full PIX flow */}
      <Modal isOpen={showDonate} onClose={resetDonation} title={step === 'form' ? 'Fazer Doação' : step === 'payment' ? 'Pagamento PIX' : 'Doação Realizada!'} size="md">
        {/* Step 1: Form */}
        {step === 'form' && (
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleDonate(); }}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="donation-type">Tipo de Doação</label>
              <select
                id="donation-type"
                value={donationType}
                onChange={(e) => setDonationType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Tipo de doação"
              >
                {Object.entries(typeLabels).map(([k, v]) => (<option key={k} value={k}>{v}</option>))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Valor sugerido</label>
              <div className="grid grid-cols-3 gap-2">
                {suggestedAmounts.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAmount(String(v))}
                    className={`py-3 rounded-xl text-sm font-semibold transition-all border-2 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      amount === String(v) ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
                    }`}
                    aria-label={`Doar ${formatCurrency(v)}`}
                    aria-pressed={amount === String(v)}
                  >
                    {formatCurrency(v)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="donation-amount">Ou digite outro valor (R$)</label>
              <input
                id="donation-amount"
                type="number"
                step="0.01"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-3 text-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-bold text-center"
                placeholder="0,00"
                aria-label="Valor da doação"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Método de Pagamento</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'pix', label: 'PIX', icon: <QrCode size={20} />, desc: 'Instantâneo' },
                  { key: 'credit_card', label: 'Cartão de Crédito', icon: <CreditCard size={20} />, desc: 'Visa, Master...' },
                  { key: 'debit_card', label: 'Cartão de Débito', icon: <CreditCard size={20} />, desc: 'Débito direto' },
                  { key: 'bank_transfer', label: 'Transferência', icon: <Building2 size={20} />, desc: 'TED/DOC' },
                ].map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    onClick={() => setMethod(m.key)}
                    className={`flex items-center gap-3 p-3 border-2 rounded-xl transition-all text-left focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      method === m.key ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                    }`}
                    aria-label={m.label}
                    aria-pressed={method === m.key}
                  >
                    <span className={method === m.key ? 'text-primary-600' : 'text-gray-500'}>{m.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{m.label}</p>
                      <p className="text-xs text-gray-400">{m.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" type="button" onClick={resetDonation}>Cancelar</Button>
              <Button type="submit" disabled={parsedAmount <= 0}>
                <Heart size={16} aria-hidden="true" /> {method === 'pix' ? 'Gerar PIX' : 'Doar Agora'}
              </Button>
            </div>
          </form>
        )}

        {/* Step 2: PIX Payment */}
        {step === 'payment' && (
          <div className="space-y-5">
            <button onClick={() => setStep('form')} className="flex items-center gap-1 text-sm text-primary-600 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded">
              <ChevronLeft size={16} aria-hidden="true" /> Voltar
            </button>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full mb-4">
                <QrCode size={18} className="text-green-600" aria-hidden="true" />
                <span className="text-sm font-semibold text-green-700">Pagamento via PIX</span>
              </div>
              <p className="text-3xl font-extrabold text-gray-900">{formatCurrency(parsedAmount)}</p>
              <p className="text-sm text-gray-500 mt-1">{typeLabels[donationType]} • Igreja Glory</p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-2xl border-2 border-gray-200 shadow-sm">
                <QRCodeDisplay value={pixCode} size={200} />
              </div>
            </div>

            <p className="text-center text-sm text-gray-500">
              Escaneie o QR Code acima com o app do seu banco
            </p>

            {/* Copia e cola */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ou copie o código PIX:</label>
              <div className="relative">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 pr-24 break-all text-xs text-gray-600 font-mono max-h-20 overflow-y-auto" aria-label="Código PIX copia e cola">
                  {pixCode}
                </div>
                <button
                  onClick={copyPixCode}
                  className={`absolute top-2 right-2 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    pixCopied ? 'bg-green-100 text-green-700' : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                  aria-label={pixCopied ? 'Código copiado' : 'Copiar código PIX'}
                >
                  {pixCopied ? <><Check size={14} /> Copiado!</> : <><Copy size={14} /> Copiar</>}
                </button>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800" role="alert">
              <p className="font-semibold">⏳ Aguardando pagamento</p>
              <p className="mt-1 text-xs text-amber-600">O código PIX expira em 30 minutos. Após o pagamento, a confirmação será automática.</p>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <Button variant="outline" onClick={resetDonation}>Cancelar</Button>
              <Button onClick={() => setStep('success')}>
                <Check size={16} aria-hidden="true" /> Já paguei
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 'success' && (
          <div className="text-center space-y-4 py-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check size={40} className="text-green-600" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Deus abençoe! 🙏</h3>
              <p className="text-gray-500 mt-2">Sua doação de <strong>{formatCurrency(parsedAmount)}</strong> está sendo processada.</p>
              <p className="text-sm text-gray-400 mt-1">Você receberá a confirmação em breve.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-left">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Tipo:</span>
                <span className="font-medium text-gray-900">{typeLabels[donationType]}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Valor:</span>
                <span className="font-bold text-green-600">{formatCurrency(parsedAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Método:</span>
                <span className="font-medium text-gray-900">{methodLabels[method]}</span>
              </div>
            </div>
            <Button onClick={resetDonation} className="w-full">
              Fechar
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
