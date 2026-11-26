import { createFileRoute } from '@tanstack/react-router'
import { MarketingLayout } from '../components/MarketingLayout'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <MarketingLayout>
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-slate-900 mb-8">Kebijakan Privasi</h1>
        <div className="prose prose-slate prose-lg max-w-none text-slate-600">
          <p className="lead">
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <h2>1. Pengumpulan Data</h2>
          <p>
            Di Ohayou, kami menghargai privasi Anda. Permainan ini menggunakan kamera perangkat Anda <strong>hanya secara lokal</strong> di dalam browser untuk mendeteksi pergerakan tangan (Hand Tracking AI). 
            <strong>Kami tidak merekam, menyimpan, atau mengirimkan gambar/video Anda ke server kami.</strong>
          </p>

          <h2>2. Data yang Disimpan</h2>
          <p>
            Data yang kami simpan pada database hanyalah:
          </p>
          <ul>
            <li>Nama (atau inisial) yang Anda masukkan sebelum bermain.</li>
            <li>Skor permainan yang Anda dapatkan untuk ditampilkan pada Papan Peringkat (Leaderboard).</li>
            <li>Waktu pencapaian skor tersebut.</li>
          </ul>

          <h2>3. Penggunaan Data</h2>
          <p>
            Nama dan skor yang disimpan hanya digunakan semata-mata untuk fitur Papan Peringkat (Leaderboard) di dalam platform Ohayou agar para pemain dapat membandingkan pencapaian mereka. Kami tidak akan menjual atau membagikan data ini kepada pihak ketiga untuk tujuan pemasaran.
          </p>

          <h2>4. Persetujuan Akses Kamera</h2>
          <p>
            Anda memiliki kontrol penuh atas akses kamera. Kamera tidak akan aktif hingga Anda memberikan izin di browser Anda saat akan memulai permainan. Anda dapat mencabut izin tersebut kapan saja melalui pengaturan browser Anda.
          </p>

          <h2>5. Perubahan Kebijakan</h2>
          <p>
            Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Setiap perubahan akan diinformasikan melalui halaman ini.
          </p>

          <div className="mt-12 p-6 bg-orange-50 rounded-2xl border border-orange-100">
            <h3 className="text-xl font-bold text-slate-900 mt-0">Ada pertanyaan lebih lanjut?</h3>
            <p className="mb-0 text-slate-600">Jika Anda memiliki pertanyaan terkait privasi di platform kami, jangan ragu untuk menghubungi tim developer melalui GitHub kami.</p>
          </div>
        </div>
      </div>
    </MarketingLayout>
  )
}
