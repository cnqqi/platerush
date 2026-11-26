import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Activity,
  Trophy,
  Star,
  ChevronDown,
  Eye,
  Lightbulb,
  Target,
} from "lucide-react";
import { useState } from "react";
import { MarketingLayout } from "../components/MarketingLayout";
import { CreativeFood } from "../components/CreativeFood";
import { NeuronAnimation } from "../components/NeuronAnimation";
import { CognitiveFlowchart } from "../components/CognitiveFlowchart";

export const Route = createFileRoute("/")({ component: LandingPage });

function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-50 via-white to-white"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold tracking-wider mb-6">
            CARA BARU BELAJAR NUTRISI
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            Belajar gizi jadi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              lebih interaktif.
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Tangkap makanan sehat yang jatuh dengan gestur tangan ajaibmu.
            Bermain, belajar, dan catat skor tertinggimu di Ohayou!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/game"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all bg-orange-500 rounded-full hover:bg-orange-600 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 "
            >
              Mulai Bermain <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a
              href="#about"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-700 transition-all bg-white border border-slate-200 rounded-full hover:bg-slate-50 "
            >
              Pelajari Lebih Lanjut
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
              Mengenal Ohayou
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Ohayou adalah platform permainan edukasi berbasis web yang
              dirancang untuk mengenalkan konsep gizi dan nutrisi dengan cara
              yang menyenangkan.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Alih-alih menggunakan mouse atau keyboard, Ohayou mengajak pemain
              untuk aktif bergerak menggunakan teknologi deteksi gestur tangan
              Computer Vision. Ini menciptakan pengalaman seamless antara dunia
              fisik dan digital.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="text-3xl font-black text-slate-900 mb-1">4</p>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  Kategori Nutrisi
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <p className="text-3xl font-black text-slate-900 mb-1">11+</p>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  Jenis Makanan
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mt-16 lg:mt-0 relative"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="aspect-square flex items-center justify-center relative cursor-pointer group"
            >
              {/* Custom 3D Layered Component */}
              <div className="w-full h-full relative z-10 flex items-center justify-center">
                <CreativeFood />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CognitiveBenefits() {
  const benefits = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Koordinasi Tangan-Mata",
      description:
        "Gerakan tangan real-time melatih sinkronisasi visual dan motorik anak secara alami.",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Pengambilan Keputusan",
      description:
        "Memilah kategori makanan dalam hitungan detik melatih kecepatan berpikir dan analisis.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Memori & Pengenalan Pola",
      description:
        "Mengingat kategori nutrisi memperkuat daya ingat dan kemampuan klasifikasi.",
    },
  ];

  return (
    <section
      id="cognitive"
      className="py-24 bg-gradient-to-b from-white via-orange-50/30 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold tracking-wider mb-4"
          >
            MANFAAT KOGNITIF
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4"
          >
            Mengembangkan Kemampuan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
              Kognitif Anak
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed"
          >
            Bermain Ohayou bukan sekadar hiburan. Koordinasi gestur tangan
            dengan elemen visual di layar secara aktif merangsang jalur saraf
            otak, meningkatkan kemampuan kognitif anak secara menyeluruh.
          </motion.p>
        </div>

        {/* Two column layout */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center mb-16">
          {/* Left — Benefit cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="space-y-5 mb-12 lg:mb-0"
          >
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                className="flex gap-5 p-5 rounded-2xl bg-white border border-slate-100 hover:shadow-lg hover:shadow-orange-100/50 hover:border-orange-200 transition-all duration-300 group"
              >
                <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-100 group-hover:scale-110 transition-all duration-300">
                  {b.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{b.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right — Neuron Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl shadow-slate-900/20"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,146,60,0.08),_transparent_70%)]" />
            <div className="relative h-[400px] lg:h-[450px]">
              <NeuronAnimation />
            </div>
            <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent">
              <p className="text-center text-sm text-slate-400">
                <span className="text-orange-400 font-semibold">
                  Simulasi Jaringan Saraf
                </span>{" "}
                <br />
                Neuron saling berkomunikasi saat otak memproses gerakan
              </p>
            </div>
          </motion.div>
        </div>

        {/* Flowchart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">
            Alur Perkembangan Kognitif
          </p>
          <div className="flex justify-center">
            <CognitiveFlowchart />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: <Activity className="w-8 h-8 text-orange-500" />,
      title: "Kontrol Gestur Tangan",
      description:
        "Bermain tanpa mouse. Gunakan cubitan tangan di depan kamera untuk menangkap makanan berkat teknologi AI terkini.",
    },
    {
      icon: <Brain className="w-8 h-8 text-orange-500" />,
      title: "Edukasi Interaktif",
      description:
        "Latih otak untuk membedakan makanan sumber karbohidrat, protein, serat, dan biji-bijian secara instan.",
    },
    {
      icon: <Trophy className="w-8 h-8 text-orange-500" />,
      title: "Papan Peringkat Global",
      description:
        "Tantang temanmu dan cetak skor tertinggi di Leaderboard. Buktikan siapa ahli gizi sejati.",
    },
  ];

  return (
    <section
      id="features"
      className="py-24 bg-slate-50 border-y border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Fitur Unggulan
          </h2>
          <p className="text-lg text-slate-600">
            Didesain minimalis dan mulus untuk memberikan pengalaman bermain
            terbaik sekaligus belajar secara alami.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300  group"
            >
              <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      quote:
        "Bermain Ohayou membuat anak saya lebih mudah menghafal jenis nutrisi tanpa merasa seperti sedang belajar di kelas.",
      name: "Andi Pratama",
      role: "Orang Tua",
    },
    {
      quote:
        "Teknologi gestur tangannya sangat responsif! UI-nya juga clean dan nggak bikin pusing. Sangat recommended buat refreshing.",
      name: "Siti Nurhaliza",
      role: "Mahasiswa",
    },
    {
      quote:
        "Leaderboard bikin game ini sangat kompetitif. Saya terus main ulang untuk mengalahkan skor tertinggi teman saya!",
      name: "Budi Santoso",
      role: "Gamer Casual",
    },
    {
      quote:
        "Anak-anak di kelas saya jadi antusias belajar tentang makanan sehat. Ohayou benar-benar mengubah cara kami mengajar nutrisi.",
      name: "Dewi Lestari",
      role: "Guru SD",
    },
    {
      quote:
        "Seru banget! Rasanya kayak main game VR padahal cuma pakai webcam laptop. Teman-teman saya juga ikut ketagihan.",
      name: "Raka Aditya",
      role: "Pelajar SMP",
    },
  ];

  // Duplicate for seamless loop
  const doubled = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Kata Mereka Tentang Ohayou
          </h2>
        </div>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {doubled.map((testi, index) => (
            <div
              key={index}
              className="w-[380px] flex-shrink-0 p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg  transition-all duration-300"
            >
              <div className="flex text-orange-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-slate-700 text-lg italic mb-6 leading-relaxed">
                "{testi.quote}"
              </p>
              <div>
                <p className="font-bold text-slate-900">{testi.name}</p>
                <p className="text-sm text-slate-500">{testi.role}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FaqItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white hover:shadow-md transition-shadow duration-300">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
      >
        <span className="text-lg font-semibold text-slate-900 pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-orange-500" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-slate-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Apakah Ohayou gratis untuk dimainkan?",
      answer:
        "Ya! Ohayou sepenuhnya gratis. Anda hanya membutuhkan perangkat dengan kamera (laptop atau PC dengan webcam) dan browser modern seperti Chrome atau Edge.",
    },
    {
      question: "Perangkat apa saja yang bisa digunakan?",
      answer:
        "Ohayou berjalan di browser, jadi bisa dimainkan di laptop atau PC manapun yang memiliki kamera/webcam. Untuk performa terbaik, kami merekomendasikan menggunakan browser Chrome atau Edge versi terbaru.",
    },
    {
      question: "Apakah data kamera saya aman?",
      answer:
        "Tentu! Kamera hanya digunakan secara lokal di browser Anda untuk mendeteksi pergerakan tangan. Kami tidak merekam, menyimpan, atau mengirimkan gambar/video Anda ke server manapun. Selengkapnya bisa dibaca di halaman Kebijakan Privasi.",
    },
    {
      question: "Bagaimana cara bermain Ohayou?",
      answer:
        "Cukup buka kamera, lalu gerakkan tangan Anda di depan layar. Tangkap makanan yang jatuh dengan gerakan mencubit (pinch), lalu arahkan ke keranjang kategori yang sesuai: Karbohidrat, Protein, Serat, atau Biji-bijian.",
    },
    {
      question: "Apakah cocok untuk anak-anak?",
      answer:
        "Sangat cocok! Ohayou dirancang khusus sebagai media edukasi nutrisi untuk anak-anak dan pelajar. Konten permainannya aman, edukatif, dan menyenangkan untuk segala usia.",
    },
    {
      question: "Kenapa deteksi tangan saya tidak akurat?",
      answer:
        "Pastikan pencahayaan ruangan Anda cukup terang dan tangan terlihat jelas oleh kamera. Hindari latar belakang yang terlalu ramai. Performa juga bergantung pada spesifikasi perangkat Anda.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4"
          >
            Pertanyaan yang Sering Diajukan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            Temukan jawaban atas pertanyaan umum seputar Ohayou.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-orange-50/50 border-2 border-dashed border-orange-300 p-12 md:p-16 relative overflow-hidden"
        >
          {/* Floating decorative food emojis */}
          <motion.span
            className="absolute top-6 left-8 text-4xl opacity-40 pointer-events-none"
            animate={{ y: [-4, 4, -4], rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            🍎
          </motion.span>
          <motion.span
            className="absolute top-8 right-12 text-3xl opacity-30 pointer-events-none"
            animate={{ y: [4, -4, 4], rotate: [5, -5, 5] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            🥕
          </motion.span>
          <motion.span
            className="absolute bottom-6 left-16 text-3xl opacity-30 pointer-events-none"
            animate={{ y: [-3, 5, -3], rotate: [-3, 6, -3] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            🍌
          </motion.span>
          <motion.span
            className="absolute bottom-8 right-8 text-4xl opacity-40 pointer-events-none"
            animate={{ y: [3, -5, 3], rotate: [3, -6, 3] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          >
            🥩
          </motion.span>

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 leading-tight">
                Siap Belajar Sambil Bermain?
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Yuk, uji pengetahuan nutrisimu sekarang! Tangkap makanan sehat,
                raih skor tertinggi, dan jadilah juara gizi.
              </p>
            </div>
            <Link
              to="/game"
              className="flex-shrink-0 inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-orange-500 rounded-2xl hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/25  transition-all duration-300"
            >
              Belajar Yuk! <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustedBy() {
  const clients = [
    "Kemendikbud",
    "Universitas Indonesia",
    "BPOM",
    "Kemenkes RI",
    "Danone",
    "Nestlé",
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-slate-400 mb-10">
          Dipercaya Oleh
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee-scroll">
          {[0, 1, 2].map((set) => (
            <div key={set} className="flex gap-8 flex-shrink-0 px-4">
              {clients.map((name, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center h-10 px-6 rounded-lg bg-slate-100 border border-slate-200 flex-shrink-0"
                >
                  <span className="text-sm font-bold text-slate-400 tracking-wide whitespace-nowrap">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LandingPage() {
  return (
    <MarketingLayout>
      <div
        className="selection:bg-orange-200 selection:text-orange-900"
        style={{ scrollBehavior: "smooth" }}
      >
        <main>
          <Hero />
          <TrustedBy />
          <About />
          <CognitiveBenefits />
          <Features />
          <Testimonials />
          <FAQ />
          <CTABanner />
        </main>
      </div>
    </MarketingLayout>
  );
}
