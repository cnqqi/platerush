import { createFileRoute } from '@tanstack/react-router'
import { MarketingLayout } from '../components/MarketingLayout'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
})

function TermsPage() {
  return (
    <MarketingLayout>
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-slate-900 mb-8">Syarat & Ketentuan</h1>
        <div className="prose prose-slate prose-lg max-w-none text-slate-600">
          <p className="lead">
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <h2>1. Penerimaan Syarat</h2>
          <p>
            Dengan mengakses dan memainkan Ohayou, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak menyetujui bagian mana pun dari syarat ini, Anda dilarang untuk menggunakan platform ini.
          </p>

          <h2>2. Penggunaan Edukasional</h2>
          <p>
            Ohayou adalah sebuah prototipe/platform permainan edukasi nutrisi. Seluruh konten di dalam permainan ini, termasuk klasifikasi gizi (Karbohidrat, Protein, Serat, Biji-bijian), disederhanakan untuk tujuan pembelajaran anak-anak dan bukan sebagai saran medis profesional.
          </p>

          <h2>3. Kewajiban Pemain</h2>
          <p>
            Saat menggunakan platform ini, Anda setuju untuk:
          </p>
          <ul>
            <li>Menggunakan nama yang pantas dan tidak mengandung unsur SARA atau ujaran kebencian pada Papan Peringkat (Leaderboard).</li>
            <li>Memastikan Anda bermain di lingkungan yang aman, karena permainan ini mengharuskan Anda untuk bergerak secara fisik di depan layar.</li>
            <li>Menyadari bahwa pihak pengembang tidak bertanggung jawab atas cedera atau kerusakan perangkat akibat kecerobohan fisik selama bermain.</li>
          </ul>

          <h2>4. Batasan Tanggung Jawab</h2>
          <p>
            Aplikasi Ohayou disajikan "sebagaimana adanya". Kami menggunakan teknologi kecerdasan buatan (AI) untuk mendeteksi pergerakan tangan yang mungkin tidak selalu 100% akurat bergantung pada faktor pencahayaan, kualitas kamera, dan spesifikasi perangkat keras Anda. Kami tidak menjamin ketersediaan layanan yang tidak terganggu.
          </p>

          <h2>5. Kekayaan Intelektual</h2>
          <p>
            Desain, mekanisme, dan aset spesifik yang dibuat untuk platform ini adalah milik pengembang Ohayou, kecuali aset open-source (seperti ikon atau model AI) yang tunduk pada lisensi pencipta aslinya masing-masing.
          </p>

          <h2>6. Penutupan Akses</h2>
          <p>
            Kami berhak, atas kebijakan kami sendiri, untuk memodifikasi, menangguhkan, atau menghentikan layanan, atau menghapus skor yang melanggar aturan kepantasan publik tanpa pemberitahuan sebelumnya.
          </p>
        </div>
      </div>
    </MarketingLayout>
  )
}
