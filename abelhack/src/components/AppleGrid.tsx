import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { Apple, Cpu, AlertTriangle, RefreshCw, XCircle } from 'lucide-react';

// Custom icons to ensure gorgeous, reliable rendering of whole and sliced apples
function WholeAppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Vibrant Red glossy radial gradient for realistic 3D volume */}
        <radialGradient id="redAppleGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ff5d5d" />
          <stop offset="45%" stopColor="#ef4444" />
          <stop offset="85%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
        {/* Shiny green leaf gradient */}
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>
      
      {/* Stem */}
      <path d="M50 35 C48 24, 55 16, 58 13" stroke="#78350f" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      
      {/* Leaf */}
      <path d="M52 25 C64 16, 76 25, 66 31 C56 36, 51 27, 52 25 Z" fill="url(#leafGrad)" />
      <path d="M52 25 Q59 28 66 31" stroke="#14532d" strokeWidth="1.2" fill="none" />

      {/* Apple Body with double bottom bump (classic apple shape) */}
      <path 
        d="M50 38 
           C41 38, 23 44, 23 60 
           C23 76, 35 88, 45 88 
           C49 88, 48 85, 50 85 
           C52 85, 51 88, 55 88 
           C65 88, 77 76, 77 60 
           C77 44, 59 38, 50 38 Z" 
        fill="url(#redAppleGrad)" 
      />
      
      {/* Specular glassy highlight/reflection */}
      <ellipse cx="37" cy="50" rx="9" ry="4.5" transform="rotate(-28 37 50)" fill="#ffffff" opacity="0.65" />
      <ellipse cx="41" cy="46" rx="3.5" ry="1.8" transform="rotate(-28 41 46)" fill="#ffffff" opacity="0.85" />
      
      {/* Soft secondary bounce light highlight at the bottom right */}
      <path d="M60 81 C67 76, 72 68, 72 60" stroke="#fca5a5" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" fill="none" />
    </svg>
  );
}

function SlicedAppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Rotten oxidized brownish-yellow flesh gradient */}
        <linearGradient id="rottenFleshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />    {/* Bruised yellow */}
          <stop offset="40%" stopColor="#d97706" />   {/* Oxidized amber */}
          <stop offset="75%" stopColor="#92400e" />   {/* Rotten brown */}
          <stop offset="100%" stopColor="#451a03" />  {/* Deep rot */}
        </linearGradient>
        
        {/* Red outer skin gradient */}
        <linearGradient id="rottenSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ea580c" />    {/* Dried/spoiled orange-red skin */}
          <stop offset="100%" stopColor="#7f1d1d" />  {/* Dark decaying red skin */}
        </linearGradient>
      </defs>

      {/* Withered, dried dry Stem */}
      <path d="M50 35 C46 25, 42 20, 39 18" stroke="#3b0712" strokeWidth="3.5" strokeLinecap="round" fill="none" />

      {/* Outer Skin sliced halves (drawn to look like a sliced open profile) */}
      {/* Left outer skin outline */}
      <path d="M50 38 C35 38, 20 44, 20 60 C20 76, 35 88, 48 88 C45 78, 43 65, 45 50 C47 43, 49 40, 50 38 Z" fill="url(#rottenSkinGrad)" />
      {/* Right outer skin outline */}
      <path d="M50 38 C65 38, 80 44, 80 60 C80 76, 65 88, 52 88 C55 78, 57 65, 55 50 C53 43, 51 40, 50 38 Z" fill="url(#rottenSkinGrad)" />

      {/* Rotten exposed inner flesh (sunken slice center) */}
      <path d="M50 41 C40 41, 25 47, 25 61 C25 75, 40 84, 50 82 C60 84, 75 75, 75 61 C75 47, 60 41, 50 41 Z" fill="url(#rottenFleshGrad)" />

      {/* Dark Rotten decaying Core */}
      <path d="M50 54 C45 54, 41 59, 41 64 C41 69, 45 73, 50 73 C55 73, 59 69, 59 64 C59 59, 55 54, 50 54 Z" fill="#2d1300" opacity="0.95" />

      {/* Small decaying black seeds */}
      <path d="M47 63 C46 61, 45 60, 46 59 C47 58, 48 60, 48 62 Z" fill="#111" />
      <path d="M53 63 C54 61, 55 60, 54 59 C53 58, 52 60, 52 62 Z" fill="#111" />

      {/* Dark mold & decay spots across the flesh */}
      <circle cx="34" cy="55" r="4.5" fill="#451a03" opacity="0.9" />
      <circle cx="34" cy="55" r="2" fill="#1c0a00" />
      
      <circle cx="65" cy="71" r="5" fill="#3b1701" opacity="0.85" />
      <circle cx="63" cy="51" r="3" fill="#2d1300" opacity="0.9" />

      {/* Visually outstanding, playful, crawling worm */}
      {/* Worm Segment body (Pink/Fuchsia striped body) */}
      <path d="M30 66 Q24 61, 21 68 T26 75" stroke="#f472b6" strokeWidth="5.5" strokeLinecap="round" fill="none" />
      {/* Worm texture/segment stripes */}
      <path d="M29 65 Q27 63, 26 65" stroke="#db2777" strokeWidth="1.2" fill="none" />
      <path d="M22 66 Q21 68, 22 70" stroke="#db2777" strokeWidth="1.2" fill="none" />
      <path d="M24 72 Q25 74, 27 73" stroke="#db2777" strokeWidth="1.2" fill="none" />
      {/* Worm tiny eye dots */}
      <circle cx="28.5" cy="65" r="0.9" fill="#000000" />
    </svg>
  );
}

interface AppleGridProps {
  path: number[];
  isAnalyzing: boolean;
  predictionId: string;
  rowCount: number;
  difficulty: "Easy" | "Pro";
  revealRotten?: boolean;
  gridData: boolean[][] | null;
  language: Language;
}

const MULTIPLIERS = [
  "1.23", "1.54", "1.93", "2.41", "4.02", "6.71", "11.18", "27.96", "69.91", "349.54", "x500", "x1k", "x2.5k", "x5k", "MAX"
];

const COL_LABELS = ["A", "B", "C", "D", "E"];

export default function AppleGrid({
  path,
  isAnalyzing,
  predictionId,
  rowCount,
  difficulty,
  revealRotten = false,
  gridData,
  language
}: AppleGridProps) {
  const [successFlicker, setSuccessFlicker] = useState(false);

  const isArabic = language === 'ar';

  const localizedText = {
    en: {
      matrixFailureMsg: "Safety threshold exceeded. Probability nodes corrupted. Reset session required.",
      retrySync: "RE-INITIALIZE",
      uplinkDenied: "UPLINK_DENIED"
    },
    ar: {
      matrixFailureMsg: "تم تجاوز حد الأمان. عُقد الاحتمالية تالفة. مطلوب إعادة تشغيل الجلسة.",
      retrySync: "إعادة التهيئة",
      uplinkDenied: "تم رفض الاتصال"
    }
  }[language];

  const targetRows = useMemo(() => [
    { mult: "349.68", row: 9 }, // أعلى صف
    { mult: "69.93",  row: 8 },
    { mult: "27.92",  row: 7 },
    { mult: "11.18",  row: 6 },
    { mult: "6.71",   row: 5 },
    { mult: "4.02",   row: 4 },
    { mult: "2.41",   row: 3 },
    { mult: "1.93",   row: 2 },
    { mult: "1.54",   row: 1 },
    { mult: "1.23",   row: 0 }, // أسفل صف يبدأ منه المشغل
  ], []);

  const visibleRows = useMemo(() => {
    return targetRows.filter((r) => r.row < rowCount);
  }, [rowCount, targetRows]);

  const hasPrediction = !isAnalyzing && predictionId && path.length > 0;
  const hasFailure = !isAnalyzing && predictionId && path.every((col) => col === -1);
  const showPathApples = hasPrediction && !hasFailure;

  useEffect(() => {
    if (showPathApples) {
      setSuccessFlicker(true);
      const timer = setTimeout(() => setSuccessFlicker(false), 800);
      return () => clearTimeout(timer);
    }
  }, [predictionId, showPathApples]);

  // Decrypts the complete safe/rotten map of the board for predictions
  const resolvedGrid = useMemo(() => {
    if (!predictionId) return null;

    return Array.from({ length: rowCount }).map((_, rIdx) => {
      const pathCol = path[rIdx] !== undefined ? path[rIdx] : -1;

      // If we have live grid data from Firebase RTDB, map it directly
      if (gridData && gridData[rIdx]) {
        return gridData[rIdx].map((isSafe, cIdx) => {
          if (cIdx === pathCol) return "path";
          return isSafe ? "good" : "bad";
        });
      }

      // Fallback: Generate safe/rotten maps according to difficulty counts
      // Rotten apples count mapping based on row index
      const rottenCount = Array.from({ length: 15 }, (_, idx) => {
        if (idx + 1 <= 4) return 1; // Lower rows: 1 rotten
        if (idx + 1 <= 7) return 2; // Middle rows: 2 rotten
        if (idx + 1 <= 9) return 3; // Advanced rows: 3 rotten
        return 4;                   // Last row: 4 rotten
      })[rIdx] || 1;

      const cols = [0, 1, 2, 3, 4];
      const otherCols = cols.filter((c) => c !== pathCol);

      // Shuffle other columns to select rotten ones
      for (let i = otherCols.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [otherCols[i], otherCols[j]] = [otherCols[j], otherCols[i]];
      }

      const badCols = otherCols.slice(0, rottenCount);

      return cols.map((colIdx) => {
        if (colIdx === pathCol) return "path";
        if (badCols.includes(colIdx)) return "bad";
        return "good";
      });
    });
  }, [predictionId, path, rowCount, gridData]);

  const hasRevealed = !isAnalyzing && !!predictionId && (!!gridData || path.length > 0) && !hasFailure;

  const getCellState = (rowIdx: number, colIdx: number): "path" | "good" | "bad" | "unknown" => {
    if (!predictionId) return "unknown";
    
    const pathCol = path[rowIdx] !== undefined ? path[rowIdx] : -1;
    
    // If we have live grid data from Firebase RTDB
    if (gridData && gridData[rowIdx]) {
      const isSafe = gridData[rowIdx][colIdx] === true;
      if (isSafe) {
        return colIdx === pathCol ? "path" : "good";
      } else {
        return "bad";
      }
    }
    
    // Fallback: use resolvedGrid if available
    if (resolvedGrid && resolvedGrid[rowIdx]) {
      const state = resolvedGrid[rowIdx][colIdx];
      if (state === "path") return "path";
      if (state === "good") return "good";
      if (state === "bad") return "bad";
    }
    
    return "unknown";
  };

  return (
    <div className="relative w-full mx-auto select-none overflow-hidden h-full flex flex-col bg-[#050505]">
      {/* Laser line grid decoration */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(rgba(34,197,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className={`flex flex-col gap-1.5 p-3 relative z-10 flex-1 transition-all duration-300 ${successFlicker ? 'brightness-125' : ''}`}>
        
        {/* Column headings */}
        <div className="flex items-center gap-3 mb-4 px-1">
          <div className="w-12 flex justify-center opacity-40">
            <Cpu className="w-4 h-4 text-green-600 animate-pulse" />
          </div>
          <div className="grid grid-cols-5 gap-2 flex-1">
            {COL_LABELS.map((label) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-[7px] font-black text-zinc-500 font-mono tracking-[0.3em] uppercase">
                  {label}
                </span>
                <div className="w-1 h-1 rounded-full bg-green-600/30 mt-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Analyzer Loading Screen */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm rounded-[2.5rem] overflow-hidden border border-green-600/30"
            >
              <div className="relative z-20 flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="absolute -inset-8 bg-green-600/20 rounded-full blur-2xl animate-pulse" />
                  <div className="relative w-24 h-24 rounded-3xl bg-black border border-green-600/40 flex items-center justify-center">
                    <Cpu className="w-12 h-12 text-green-600" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-2 border-dashed border-green-600/20 rounded-3xl"
                    />
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-sm font-black text-white uppercase tracking-[0.6em] italic animate-pulse font-en">
                    DECRYPTING_...
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-1 w-2 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="h-1 w-2 bg-green-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="h-1 w-2 bg-green-600 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tactical rows */}
        <div className="flex-1 flex flex-col gap-2">
          {visibleRows.map((rowInfo, rIdx) => {
            const isRowOdd = rowInfo.row % 2 === 0;

            return (
              <div key={rIdx} className="flex items-center gap-3">
                {/* Multiplier Tag */}
                <div className="w-12 flex items-center justify-end h-full">
                  <div
                    className={`w-full py-2 rounded-xl border text-center transition-all duration-500 shadow-lg ${
                      hasRevealed
                        ? isRowOdd
                          ? "border-green-600/60 bg-green-600/20 text-green-500 shadow-green-900/40"
                          : "border-white/30 bg-white/10 text-white"
                        : "border-white/5 bg-transparent text-zinc-800"
                    }`}
                  >
                    <span className="font-mono text-[9px] font-black italic tracking-tighter leading-none">
                      x{rowInfo.mult}
                    </span>
                  </div>
                </div>

                {/* Grid cells */}
                <div className="grid grid-cols-5 gap-2 flex-1">
                  {Array.from({ length: 5 }).map((_, cIdx) => {
                    const cellState = getCellState(rowInfo.row, cIdx);
                    const isPath = cellState === "path";
                    const isGood = cellState === "good";
                    const isBad = cellState === "bad";
                    const isCellRevealed = hasRevealed && (isPath || revealRotten);

                    return (
                      <div
                        key={cIdx}
                        className={`aspect-[1.1/1] w-full flex items-center justify-center relative rounded-2xl transition-all duration-500 overflow-hidden group/cell ${
                          isCellRevealed
                            ? isPath
                              ? "border-green-500 bg-green-950/30 shadow-[0_0_22px_rgba(34,197,94,0.5)] scale-[1.03] z-10"
                              : isGood
                                ? "border-green-500/40 bg-green-950/15 shadow-[0_0_12px_rgba(34,197,94,0.25)]"
                                : "border-red-500/30 bg-red-950/20 shadow-[0_0_12px_rgba(239,68,68,0.15)]"
                            : "border-white/5 bg-white/[0.02]"
                        }`}
                      >
                        {isCellRevealed ? (
                          <motion.div
                            initial={{ scale: 0.4, opacity: 0, rotate: -20 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="w-full h-full flex items-center justify-center p-2"
                          >
                            {isPath ? (
                              <div className="relative w-full h-full flex items-center justify-center">
                                <div className="absolute inset-0 bg-red-500/10 rounded-full blur-lg animate-pulse" />
                                <WholeAppleIcon className="w-[88%] h-[88%] drop-shadow-[0_0_12px_rgba(239,68,68,0.7)]" />
                              </div>
                            ) : isGood ? (
                              <div className="relative w-full h-full flex items-center justify-center opacity-85">
                                <WholeAppleIcon className="w-[75%] h-[75%] drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                              </div>
                            ) : (
                              <div className="relative flex items-center justify-center w-full h-full">
                                <SlicedAppleIcon className="w-[85%] h-[85%] shrink-0 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                              </div>
                            )}
                          </motion.div>
                        ) : (
                          /* Coordinate Dots in standby mode */
                          <div className="relative w-full h-full flex items-center justify-center">
                            <div
                              className={`w-1 h-1 rounded-full transition-all duration-700 ${
                                isAnalyzing
                                  ? "bg-green-600 scale-150 shadow-[0_0_12px_rgba(34,197,94,1)] animate-pulse"
                                  : "bg-zinc-800"
                              }`}
                            />
                            <div className="absolute inset-[3px] border-[1px] border-white/[0.02] rounded-xl group-hover/cell:border-green-600/10 transition-colors" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend showing Whole Apple & Sliced Apple */}
        <div className="mt-4 p-3 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col sm:flex-row items-center justify-around gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shadow-[0_0_12px_rgba(34,197,94,0.15)] shrink-0">
              <WholeAppleIcon className="w-7 h-7" />
            </div>
            <div className="text-left">
              <div className="text-[9px] font-black text-green-400 uppercase tracking-wider font-mono">
                {isArabic ? "تفاحة كاملة (مسار آمن)" : "Whole Apple (Safe Path)"}
              </div>
              <div className="text-[8px] text-zinc-500 font-mono tracking-normal mt-0.5">
                {isArabic ? "يشير إلى خلية آمنة خالية من الألغام" : "Represents a verified safe node"}
              </div>
            </div>
          </div>

          <div className="hidden sm:block h-6 w-px bg-white/5" />

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-[0_0_12px_rgba(239,68,68,0.15)] shrink-0">
              <SlicedAppleIcon className="w-7.5 h-7.5" />
            </div>
            <div className="text-left">
              <div className="text-[9px] font-black text-red-400 uppercase tracking-wider font-mono">
                {isArabic ? "تفاحة مقطوعة (لغم / تالفة)" : "Sliced Apple (Rotten / Mine)"}
              </div>
              <div className="text-[8px] text-zinc-500 font-mono tracking-normal mt-0.5">
                {isArabic ? "تحذير: تحتوي هذه الخلية على تفاحة تالفة" : "Warning: Contains a rotten apple"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Threat block: Node Corrupted alert */}
      <AnimatePresence>
        {hasFailure && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/98 backdrop-blur-md rounded-[2.5rem] p-10 text-center border-2 border-green-600/40 shadow-[0_0_100px_rgba(0,0,0,1)]"
          >
            <div className="relative mb-10">
              <div className="absolute -inset-8 bg-green-600/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative w-24 h-24 rounded-full bg-black border border-green-600/50 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                <AlertTriangle className="w-12 h-12 text-green-600" />
              </div>
            </div>

            <h3 className="text-2xl font-black text-white uppercase mb-4 italic font-en tracking-[0.4em] leading-none">
              {localizedText.uplinkDenied}
            </h3>
            
            <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-[0.3em] max-w-[240px] leading-relaxed mb-10 italic">
              {localizedText.matrixFailureMsg}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="w-full max-w-[220px] h-16 bg-green-600 text-black font-black text-[10px] uppercase tracking-[0.5em] rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-4 hover:bg-green-500 shadow-[0_15px_40px_rgba(34,197,94,0.4)] italic font-en"
            >
              <RefreshCw className="w-5 h-5" />
              <span>{localizedText.retrySync}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
