import { motion } from 'framer-motion';
import { Hand, Camera, Brain, Zap, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: <Hand className="w-7 h-7" />,
    label: 'Gestur Tangan',
    desc: 'Pemain menggerakkan tangan',
  },
  {
    icon: <Camera className="w-7 h-7" />,
    label: 'Deteksi AI',
    desc: 'Kamera menangkap gerakan',
  },
  {
    icon: <Brain className="w-7 h-7" />,
    label: 'Pemrosesan Otak',
    desc: 'Otak memproses visual & motorik',
  },
  {
    icon: <Zap className="w-7 h-7" />,
    label: 'Koordinasi',
    desc: 'Sinkronisasi tangan & mata',
  },
  {
    icon: <TrendingUp className="w-7 h-7" />,
    label: 'Kognitif Berkembang',
    desc: 'Kemampuan otak meningkat',
  },
];

function Arrow({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.3 }}
      className="flex items-center justify-center"
    >
      {/* Horizontal arrow on lg+, vertical on mobile */}
      <svg className="hidden lg:block w-8 h-8 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
      <svg className="block lg:hidden w-6 h-6 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </motion.div>
  );
}

export function CognitiveFlowchart() {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap items-center justify-center gap-2 lg:gap-1 w-full max-w-5xl mx-auto">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col md:flex-row items-center gap-2 lg:gap-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-white border border-orange-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 w-[150px] h-[170px] group"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 mb-2 group-hover:scale-110 group-hover:bg-orange-100 transition-all duration-300">
              {step.icon}
            </div>
            <p className="font-bold text-slate-900 text-sm leading-tight mb-1">{step.label}</p>
            <p className="text-xs text-slate-400 leading-snug">{step.desc}</p>
          </motion.div>

          {i < steps.length - 1 && <Arrow index={i} />}
        </div>
      ))}
    </div>
  );
}
