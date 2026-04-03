import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, ChevronRight, Search, BookMarked, Bookmark, Share2, Copy, Check, X, ZoomIn, ZoomOut, Type } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { mockBibleBooks } from '../data/mock';

// Highlight colors
const highlightColors = [
  { name: 'Amarelo', color: '#fef08a' },
  { name: 'Verde', color: '#bbf7d0' },
  { name: 'Azul', color: '#bfdbfe' },
  { name: 'Rosa', color: '#fbcfe8' },
  { name: 'Roxo', color: '#e9d5ff' },
];

interface HighlightedVerse { bookId: number; chapter: number; verse: number; color: string; }
interface BookmarkedChapter { bookId: number; chapter: number; }

function loadHighlights(): HighlightedVerse[] {
  try { const d = localStorage.getItem('glory_bible_highlights'); return d ? JSON.parse(d) : []; } catch { return []; }
}
function saveHighlights(h: HighlightedVerse[]) { localStorage.setItem('glory_bible_highlights', JSON.stringify(h)); }
function loadBookmarks(): BookmarkedChapter[] {
  try { const d = localStorage.getItem('glory_bible_bookmarks'); return d ? JSON.parse(d) : []; } catch { return []; }
}
function saveBookmarks(b: BookmarkedChapter[]) { localStorage.setItem('glory_bible_bookmarks', JSON.stringify(b)); }
function loadFontSize(): number {
  try { const d = localStorage.getItem('glory_bible_fontsize'); return d ? parseInt(d, 10) : 16; } catch { return 16; }
}
function saveFontSize(s: number) { localStorage.setItem('glory_bible_fontsize', String(s)); }

export default function Bible() {
  const [selectedTestament, setSelectedTestament] = useState<'old' | 'new'>('old');
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [highlights, setHighlights] = useState<HighlightedVerse[]>(loadHighlights);
  const [bookmarks, setBookmarks] = useState<BookmarkedChapter[]>(loadBookmarks);
  const [fontSize, setFontSize] = useState(loadFontSize);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareVerse, setShareVerse] = useState<{ verse: number; text: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const books = mockBibleBooks.filter(b => b.testament === selectedTestament);
  const currentBook = mockBibleBooks.find(b => b.id === selectedBook);

  const sampleVerses = [
    'No princípio, Deus criou os céus e a terra.',
    'A terra era sem forma e vazia; havia trevas sobre a face do abismo, e o Espírito de Deus pairava sobre as águas.',
    'Disse Deus: "Haja luz", e houve luz.',
    'Deus viu que a luz era boa, e separou a luz das trevas.',
    'Deus chamou à luz "dia", e às trevas chamou "noite". Passaram-se a tarde e a manhã; esse foi o primeiro dia.',
    'Depois disse Deus: "Haja um firmamento entre as águas para separar águas de águas".',
    'Assim Deus fez o firmamento e separou as águas que ficaram abaixo do firmamento das que ficaram por cima. E assim foi.',
    'Ao firmamento Deus chamou "céu". Passaram-se a tarde e a manhã; esse foi o segundo dia.',
    'E disse Deus: "Ajuntem-se num só lugar as águas que estão debaixo do céu, e apareça a parte seca". E assim foi.',
    'À parte seca Deus chamou "terra", e ao conjunto das águas chamou "mares". E Deus viu que ficou bom.',
  ];

  useEffect(() => { saveHighlights(highlights); }, [highlights]);
  useEffect(() => { saveBookmarks(bookmarks); }, [bookmarks]);
  useEffect(() => { saveFontSize(fontSize); }, [fontSize]);

  const getVerseHighlight = useCallback((v: number) => {
    if (!selectedBook || !selectedChapter) return null;
    return highlights.find(h => h.bookId === selectedBook && h.chapter === selectedChapter && h.verse === v);
  }, [highlights, selectedBook, selectedChapter]);

  const toggleHighlight = (verseNum: number, color: string) => {
    if (!selectedBook || !selectedChapter) return;
    const idx = highlights.findIndex(h => h.bookId === selectedBook && h.chapter === selectedChapter && h.verse === verseNum);
    if (idx >= 0) {
      if (highlights[idx].color === color) setHighlights(p => p.filter((_, i) => i !== idx));
      else setHighlights(p => p.map((h, i) => i === idx ? { ...h, color } : h));
    } else {
      setHighlights(p => [...p, { bookId: selectedBook, chapter: selectedChapter, verse: verseNum, color }]);
    }
    setShowHighlightPicker(false);
    setSelectedVerse(null);
  };

  const removeHighlight = (v: number) => {
    if (!selectedBook || !selectedChapter) return;
    setHighlights(p => p.filter(h => !(h.bookId === selectedBook && h.chapter === selectedChapter && h.verse === v)));
  };

  const isBookmarked = selectedBook && selectedChapter ? bookmarks.some(b => b.bookId === selectedBook && b.chapter === selectedChapter) : false;

  const toggleBookmark = () => {
    if (!selectedBook || !selectedChapter) return;
    if (isBookmarked) setBookmarks(p => p.filter(b => !(b.bookId === selectedBook && b.chapter === selectedChapter)));
    else setBookmarks(p => [...p, { bookId: selectedBook, chapter: selectedChapter }]);
  };

  const getShareText = useCallback(() => {
    if (!shareVerse || !currentBook || !selectedChapter) return '';
    return `"${shareVerse.text}"\n— ${currentBook.name} ${selectedChapter}:${shareVerse.verse} (NVI)`;
  }, [shareVerse, currentBook, selectedChapter]);

  const copyToClipboard = async () => {
    const text = getShareText();
    try { await navigator.clipboard.writeText(text); } catch {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(getShareText())}`, '_blank');
  };

  const shareNative = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: `${currentBook?.name} ${selectedChapter}:${shareVerse?.verse}`, text: getShareText() }); } catch {}
    } else { copyToClipboard(); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Bíblia Sagrada</h1>
          <p className="text-gray-500 mt-1">Leia a bíblia mesmo sem internet</p>
        </div>
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200 w-full sm:w-80">
          <Search size={18} className="text-gray-400" aria-hidden="true" />
          <input
            type="text"
            placeholder="Buscar livro, capítulo ou versículo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm flex-1"
            aria-label="Buscar na Bíblia"
          />
        </div>
      </div>

      {/* Version Selector + Font Size */}
      <div className="flex flex-wrap items-center gap-4">
        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" aria-label="Versão da Bíblia">
          <option>NVI - Nova Versão Internacional</option>
          <option>ARA - Almeida Revista e Atualizada</option>
          <option>ARC - Almeida Revista e Corrigida</option>
          <option>NAA - Nova Almeida Atualizada</option>
          <option>KJA - King James Atualizada</option>
        </select>
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-2 py-1">
          <button onClick={() => setFontSize(p => Math.max(12, p - 2))} className="p-1.5 hover:bg-gray-100 rounded transition-colors" aria-label="Diminuir fonte" title="Diminuir fonte">
            <ZoomOut size={16} className="text-gray-500" />
          </button>
          <span className="text-xs text-gray-500 w-8 text-center font-medium" aria-live="polite">{fontSize}</span>
          <button onClick={() => setFontSize(p => Math.min(28, p + 2))} className="p-1.5 hover:bg-gray-100 rounded transition-colors" aria-label="Aumentar fonte" title="Aumentar fonte">
            <ZoomIn size={16} className="text-gray-500" />
          </button>
          <div className="w-px h-5 bg-gray-200 mx-1" />
          <button onClick={() => setFontSize(16)} className="p-1.5 hover:bg-gray-100 rounded transition-colors" aria-label="Tamanho padrão" title="Tamanho padrão">
            <Type size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      {(selectedBook || selectedChapter) && (
        <nav className="flex items-center gap-2 text-sm" aria-label="Navegação da Bíblia">
          <button onClick={() => { setSelectedBook(null); setSelectedChapter(null); }} className="text-primary-600 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded">
            Livros
          </button>
          {selectedBook && (
            <>
              <ChevronRight size={14} className="text-gray-400" aria-hidden="true" />
              <button onClick={() => setSelectedChapter(null)} className="text-primary-600 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded">
                {currentBook?.name}
              </button>
            </>
          )}
          {selectedChapter && (
            <>
              <ChevronRight size={14} className="text-gray-400" aria-hidden="true" />
              <span className="text-gray-700 font-medium" aria-current="page">Capítulo {selectedChapter}</span>
            </>
          )}
        </nav>
      )}

      {/* Books View */}
      {!selectedBook && (
        <>
          <div className="flex gap-2" role="tablist" aria-label="Testamentos">
            <button
              onClick={() => setSelectedTestament('old')}
              role="tab"
              aria-selected={selectedTestament === 'old'}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${selectedTestament === 'old' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
            >
              Antigo Testamento (39)
            </button>
            <button
              onClick={() => setSelectedTestament('new')}
              role="tab"
              aria-selected={selectedTestament === 'new'}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${selectedTestament === 'new' ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
            >
              Novo Testamento (27)
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2" role="list" aria-label="Livros da Bíblia">
            {books.filter(b => !search || b.name.toLowerCase().includes(search.toLowerCase())).map((book) => (
              <button
                key={book.id}
                onClick={() => setSelectedBook(book.id)}
                className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label={`${book.name} - ${book.chapters} capítulos`}
              >
                <BookOpen size={16} className="text-primary-500 flex-shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{book.name}</p>
                  <p className="text-xs text-gray-400">{book.chapters} cap.</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Chapters View */}
      {selectedBook && !selectedChapter && currentBook && (
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <BookMarked size={20} className="text-primary-600" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{currentBook.name}</h2>
              <p className="text-sm text-gray-500">{currentBook.chapters} capítulos • {currentBook.testament === 'old' ? 'Antigo' : 'Novo'} Testamento</p>
            </div>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-10 gap-2" role="list" aria-label="Capítulos">
            {Array.from({ length: currentBook.chapters }, (_, i) => i + 1).map((ch) => {
              const isBm = bookmarks.some(b => b.bookId === currentBook.id && b.chapter === ch);
              return (
                <button
                  key={ch}
                  onClick={() => setSelectedChapter(ch)}
                  className={`w-full aspect-square flex items-center justify-center rounded-lg text-sm font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    isBm ? 'bg-primary-50 text-primary-700 border-primary-300 ring-1 ring-primary-200' : 'bg-gray-50 hover:bg-primary-50 hover:text-primary-700 text-gray-700 border-gray-200 hover:border-primary-300'
                  }`}
                  aria-label={`Capítulo ${ch}${isBm ? ' (marcado)' : ''}`}
                >
                  {ch}
                </button>
              );
            })}
          </div>
        </Card>
      )}

      {/* Verses View */}
      {selectedBook && selectedChapter && currentBook && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {currentBook.name} {selectedChapter}
            </h2>
            <Button
              variant={isBookmarked ? 'primary' : 'outline'}
              size="sm"
              onClick={toggleBookmark}
              aria-label={isBookmarked ? 'Remover marcador' : 'Marcar capítulo'}
              aria-pressed={!!isBookmarked}
            >
              <Bookmark size={14} className={isBookmarked ? 'fill-current' : ''} aria-hidden="true" /> {isBookmarked ? 'Marcado' : 'Marcar'}
            </Button>
          </div>

          {/* Instruction */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700 flex items-center gap-2" role="note">
            <span aria-hidden="true">✨</span>
            <span>Toque em um versículo para <strong>destacar</strong> ou <strong>compartilhar</strong></span>
          </div>

          <div className="space-y-1 leading-relaxed" role="list" aria-label="Versículos">
            {sampleVerses.map((verse, i) => {
              const verseNum = i + 1;
              const hl = getVerseHighlight(verseNum);
              const isSelected = selectedVerse === verseNum;
              return (
                <div key={i} role="listitem" className="relative">
                  <button
                    onClick={() => { setSelectedVerse(isSelected ? null : verseNum); setShowHighlightPicker(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                      isSelected ? 'ring-2 ring-primary-400 bg-primary-50' : hl ? 'hover:opacity-80' : 'hover:bg-yellow-50'
                    }`}
                    style={hl ? { backgroundColor: hl.color } : undefined}
                    aria-label={`Versículo ${verseNum}`}
                    aria-pressed={isSelected}
                  >
                    <span style={{ fontSize: `${fontSize}px`, lineHeight: '1.7' }} className="text-gray-700">
                      <sup className="text-primary-500 font-bold text-xs mr-1">{verseNum}</sup>
                      {verse}
                    </span>
                  </button>

                  {isSelected && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-1 mb-2 px-3">
                      <button
                        onClick={() => setShowHighlightPicker(!showHighlightPicker)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                        aria-label="Destacar versículo"
                      >
                        🖍️ Destacar
                      </button>
                      <button
                        onClick={() => { setShareVerse({ verse: verseNum, text: verse }); setShowShareModal(true); setCopied(false); }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                        aria-label="Compartilhar versículo"
                      >
                        <Share2 size={13} aria-hidden="true" /> Compartilhar
                      </button>
                      <button
                        onClick={() => { setShareVerse({ verse: verseNum, text: verse }); copyToClipboard(); }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                        aria-label="Copiar versículo"
                      >
                        {copied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
                        {copied ? 'Copiado!' : 'Copiar'}
                      </button>
                      {hl && (
                        <button
                          onClick={() => removeHighlight(verseNum)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-red-200 rounded-full text-xs font-medium text-red-600 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                          aria-label="Remover destaque"
                        >
                          <X size={13} aria-hidden="true" /> Remover
                        </button>
                      )}
                      {showHighlightPicker && (
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-200 rounded-full" role="radiogroup" aria-label="Cores de destaque">
                          {highlightColors.map((c) => (
                            <button
                              key={c.name}
                              onClick={() => toggleHighlight(verseNum, c.color)}
                              className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                                hl?.color === c.color ? 'border-gray-800 scale-110' : 'border-gray-300'
                              }`}
                              style={{ backgroundColor: c.color }}
                              aria-label={`Cor ${c.name}`}
                              role="radio"
                              aria-checked={hl?.color === c.color}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
            <Button variant="outline" size="sm" disabled={selectedChapter <= 1} onClick={() => { setSelectedChapter(Math.max(1, selectedChapter - 1)); setSelectedVerse(null); }} aria-label="Capítulo anterior">
              Capítulo Anterior
            </Button>
            <span className="text-sm text-gray-500">{selectedChapter} / {currentBook.chapters}</span>
            <Button variant="outline" size="sm" disabled={selectedChapter >= currentBook.chapters} onClick={() => { setSelectedChapter(Math.min(currentBook.chapters, selectedChapter + 1)); setSelectedVerse(null); }} aria-label="Próximo capítulo">
              Próximo Capítulo
            </Button>
          </div>
        </Card>
      )}

      {/* Share Modal */}
      <Modal isOpen={showShareModal} onClose={() => setShowShareModal(false)} title="Compartilhar Versículo">
        {shareVerse && currentBook && selectedChapter && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-100">
              <p className="text-gray-800 italic leading-relaxed" style={{ fontSize: `${Math.max(16, fontSize)}px` }}>
                "{shareVerse.text}"
              </p>
              <p className="text-primary-600 font-semibold mt-3 text-sm">
                — {currentBook.name} {selectedChapter}:{shareVerse.verse} (NVI)
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button onClick={copyToClipboard} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} className="text-gray-600" />}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{copied ? 'Copiado!' : 'Copiar Texto'}</p>
                  <p className="text-xs text-gray-500">Copiar para área de transferência</p>
                </div>
              </button>
              <button onClick={shareWhatsApp} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-600 fill-current" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">WhatsApp</p>
                  <p className="text-xs text-gray-500">Enviar pelo WhatsApp</p>
                </div>
              </button>
              {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                <button onClick={shareNative} className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 sm:col-span-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Share2 size={20} className="text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">Mais opções</p>
                    <p className="text-xs text-gray-500">Compartilhar via outros apps</p>
                  </div>
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
