import React from 'react';
import { Church, Palette, Bell, Shield, Globe, Database, CreditCard, Users, Zap } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useChurch } from '../contexts/ChurchContext';

export default function Settings() {
  const { church } = useChurch();

  const sections = [
    {
      icon: Church, title: 'Dados da Igreja', description: 'Nome, endereço, contato e informações da igreja',
      fields: [
        { label: 'Nome da Igreja', value: church.name },
        { label: 'Denominação', value: church.denomination || '' },
        { label: 'Pastor', value: church.pastorName },
        { label: 'Endereço', value: church.address },
        { label: 'Cidade/Estado', value: `${church.city}/${church.state}` },
        { label: 'Telefone', value: church.phone },
        { label: 'E-mail', value: church.email },
      ],
    },
  ];

  const quickSettings = [
    { icon: Palette, title: 'Aparência', description: 'Personalize cores, logo e tema do app', color: 'text-purple-600 bg-purple-50' },
    { icon: Bell, title: 'Notificações', description: 'Configure as regras de envio de push', color: 'text-blue-600 bg-blue-50' },
    { icon: Shield, title: 'Permissões', description: 'Gerencie acessos e níveis de administração', color: 'text-red-600 bg-red-50' },
    { icon: Globe, title: 'Domínio & Site', description: 'Configure o domínio personalizado do site', color: 'text-green-600 bg-green-50' },
    { icon: Database, title: 'Backup', description: 'Faça backup dos dados da sua igreja', color: 'text-orange-600 bg-orange-50' },
    { icon: CreditCard, title: 'Pagamentos', description: 'Configure gateway de pagamento', color: 'text-yellow-600 bg-yellow-50' },
    { icon: Users, title: 'Multigestão', description: 'Gerencie múltiplas igrejas na mesma conta', color: 'text-indigo-600 bg-indigo-50' },
    { icon: Zap, title: 'Integrações', description: 'YouTube, SoundCloud, WhatsApp e mais', color: 'text-pink-600 bg-pink-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-display">Configurações</h1>
        <p className="text-gray-500 mt-1">Gerencie as configurações da sua igreja</p>
      </div>

      {/* Church Info */}
      {sections.map((section) => (
        <Card key={section.title}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <section.icon size={20} className="text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{section.title}</h3>
              <p className="text-sm text-gray-500">{section.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.fields.map((field) => (
              <div key={field.label}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <input
                  type="text"
                  defaultValue={field.value}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <Button>Salvar Alterações</Button>
          </div>
        </Card>
      ))}

      {/* Quick Settings */}
      <h2 className="text-lg font-semibold text-gray-900">Configurações Rápidas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickSettings.map((item) => (
          <Card key={item.title} hover>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${item.color}`}>
              <item.icon size={20} />
            </div>
            <h4 className="font-semibold text-gray-900">{item.title}</h4>
            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
