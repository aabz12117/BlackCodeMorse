import { useState, useRef } from 'react';
import { Logo } from './components/Logo';
import { decodeMorseDual } from './utils/morse';
import { Copy, Trash2, ArrowDown, Check } from 'lucide-react';

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState({ english: '', arabic: '' });
  const [copiedState, setCopiedState] = useState<'english' | 'arabic' | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleDecode = (value: string) => {
    setInput(value);
    const decoded = decodeMorseDual(value);
    setOutput(decoded);
  };

  const handleClear = () => {
    handleDecode('');
    inputRef.current?.focus();
  };

  const copyToClipboard = (text: string, type: 'english' | 'arabic') => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedState(type);
      setTimeout(() => setCopiedState(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-primary/30 selection:text-primary relative overflow-hidden flex flex-col">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-carbon opacity-10 pointer-events-none"></div>
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-20"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl flex flex-col flex-grow">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <Logo size="large" />
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-dim tracking-widest border border-white/10 px-3 py-1 rounded bg-white/5">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
            حالة النظام: متصل
          </div>
        </header>

        {/* Main Interface */}
        <main className="flex-1 flex flex-col gap-6 justify-center">
          
          {/* Input Section */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-purple-600/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-[#050505] border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <label className="text-sm font-mono text-primary tracking-wider uppercase flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  إشارة الإدخال (مورس)
                </label>
                <button 
                  onClick={handleClear}
                  className="text-xs text-dim hover:text-alert transition-colors flex items-center gap-1 px-2 py-1 rounded hover:bg-white/5"
                >
                  <Trash2 size={14} /> مسح
                </button>
              </div>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => handleDecode(e.target.value)}
                placeholder="أدخل شفرة مورس هنا (مثال: ... --- ...)"
                className="w-full h-32 bg-black/50 border border-white/5 rounded-xl p-4 text-lg font-mono text-white placeholder-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                spellCheck={false}
                dir="ltr"
              />
              <div className="mt-2 flex justify-between items-center">
                 <div className="flex gap-2">
                    <span className="text-[10px] text-dim font-mono px-2 py-0.5 bg-white/5 rounded border border-white/5">نقطة: .</span>
                    <span className="text-[10px] text-dim font-mono px-2 py-0.5 bg-white/5 rounded border border-white/5">شرطة: -</span>
                    <span className="text-[10px] text-dim font-mono px-2 py-0.5 bg-white/5 rounded border border-white/5">مسافة: /</span>
                 </div>
                 <span className="text-[10px] text-dim font-mono">
                    {input.length} حرف
                 </span>
              </div>
            </div>
          </div>

          {/* Divider / Arrow */}
          <div className="flex justify-center my-2">
            <div className="bg-white/5 border border-white/10 rounded-full p-2 text-dim animate-bounce shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <ArrowDown size={20} />
            </div>
          </div>

          {/* Output Section (Dual) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* English Output */}
            <div className="group relative">
               <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/50 to-cyan-500/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
               <div className="relative bg-[#050505] border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-mono text-blue-400 tracking-wider uppercase flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa]"></span>
                    المخرج الإنجليزي
                  </label>
                  <button 
                    onClick={() => copyToClipboard(output.english, 'english')}
                    className="text-xs text-dim hover:text-white transition-colors flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded border border-white/5 hover:bg-white/10 hover:border-white/20 active:scale-95 transform"
                  >
                    {copiedState === 'english' ? <Check size={14} className="text-success" /> : <Copy size={14} />} 
                    {copiedState === 'english' ? 'تم النسخ' : 'نسخ'}
                  </button>
                </div>
                <div className="w-full flex-grow bg-black/50 border border-white/5 rounded-xl p-4 text-xl font-sans text-white/90 overflow-auto leading-relaxed min-h-[120px]" dir="ltr">
                  {output.english ? (
                    output.english
                  ) : (
                    <span className="text-white/20 italic text-base">بانتظار الإشارة...</span>
                  )}
                </div>
              </div>
            </div>

            {/* Arabic Output */}
            <div className="group relative">
               <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/50 to-green-500/50 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
               <div className="relative bg-[#050505] border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-mono text-emerald-400 tracking-wider uppercase flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399]"></span>
                    المخرج العربي
                  </label>
                  <button 
                    onClick={() => copyToClipboard(output.arabic, 'arabic')}
                    className="text-xs text-dim hover:text-white transition-colors flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded border border-white/5 hover:bg-white/10 hover:border-white/20 active:scale-95 transform"
                  >
                    {copiedState === 'arabic' ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                    {copiedState === 'arabic' ? 'تم النسخ' : 'نسخ'}
                  </button>
                </div>
                <div className="w-full flex-grow bg-black/50 border border-white/5 rounded-xl p-4 text-xl font-sans text-white/90 overflow-auto leading-relaxed min-h-[120px]" dir="rtl">
                  {output.arabic ? (
                    output.arabic
                  ) : (
                    <span className="text-white/20 italic text-base">بانتظار الإشارة...</span>
                  )}
                </div>
              </div>
            </div>

          </div>

        </main>

        {/* Footer */}
        <footer className="mt-12 py-6 border-t border-white/5 text-center">
          <p className="text-[10px] text-dim font-mono uppercase tracking-[0.3em]">
            نظام دارك كود للاستخبارات © 2026
          </p>
        </footer>

      </div>
    </div>
  );
}
