
# BI Dashboard
Aplikasi BI Dashboard berfungsi untuk membangun dan memvisualisasikan query data dari database. Aplikasi ini memungkinkan user membuat dashboard kustom dengan widget seperti chart bar, line chart, dan KPI card, serta query builder untuk filter dan agregasi data.
- **Live Demo**: Aplikasi telah di-deploy dan dapat diakses di [https://bi-dashboard-gamma.vercel.app/](https://bi-dashboard-gamma.vercel.app/).

## Fitur Utama
- **Query Builder**: Buat query kustom dengan dimensi, ukuran (measures), dan agregasi (sum, avg, dll.).
- **Dashboard Interaktif**: Tambahkan widget seperti bar chart, line chart, dan KPI card ke grid dashboard.
- **Visualisasi Data**: Tampilkan data dalam bentuk tabel dan chart menggunakan library seperti Chart.js atau Recharts.
- **Manajemen Query**: Simpan dan muat query tersimpan.
- **API Backend**: Endpoint untuk build query, agregasi data, dan fetch dashboard.
- **Responsive UI**: Desain yang responsif dengan Tailwind CSS.

## Teknologi yang Digunakan
- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js atau Recharts (sesuai implementasi)
- **State Management**: Zustand (untuk store query dan dashboard)
- **Deployment**: Vercel
- **Lainnya**: ESLint, PostCSS

## Instalasi dan Setup di Local Environment

### Prasyarat
- Node.js versi 18+ (cek [di sini](https://www.w3schools.com/nodejs/nodejs_get_started.asp))
- Database (lokal atau cloud seperti Aiven)
- Git

### Setup Kode
1. Clone repositori ini:
   ```bash
   git clone https://github.com/masjawrepo/bi_dashboard.git
   cd bi_dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan aplikasi dalam mode development:
   ```bash
   npm run dev
   # atau
   yarn dev
   # atau
   pnpm dev
   # atau
   bun dev
   ```

4. Buka [http://localhost:3000](http://localhost:3000) di browser (cek terminal untuk port yang digunakan jika berbeda).

### Setup Database
1. Buat database (lokal atau via Aiven):
   - Untuk Aiven: Daftar di [aiven.io](https://aiven.io/), buat service SQL, dan dapatkan connection details (host, port, user, password, database name).

2. Import data sample:
   - Download file SQL dari [link ini](https://drive.google.com/file/d/1lgvkFPYSWKe8a1dNLeTcXBRU6Zj0cspP/view?usp=sharing).
   - Lalu import ke dalam database.
   - File berisi schema tabel (misalnya `transactions`) dan data sample untuk testing.

3. Konfigurasi environment variables:
   - Buat file `.env.local` di root project (jangan commit ke Git):
     ```
     db_host=your_database_host
     db_name=your_database_name
     db_user=your_username
     db_pass=your_password
     db_port=3306  # atau port dari Aiven
     ```
   - Restart aplikasi setelah setup.

## Penggunaan
1. **Query Builder**: Kunjungi `/query-builder`, pilih dimensi dan ukuran, lalu klik "Preview" untuk lihat data.
2. **Dashboard**: Kunjungi `/dashboard`, tambahkan widget dari picker, dan sesuaikan query.
3. **Saved Queries**: Simpan query di `/saved-queries` untuk digunakan ulang.
4. **API Testing**: Gunakan endpoint seperti `/api/query/build` untuk test query via Postman atau curl.

## Deploy
- **Live Demo**: Aplikasi telah di-deploy dan dapat diakses di [https://bi-dashboard-gamma.vercel.app/](https://bi-dashboard-gamma.vercel.app/).
- **Hosting**: Menggunakan [Vercel](https://vercel.com/) untuk frontend.
- **Database**: Menggunakan [Aiven](https://aiven.io/) untuk SQL managed.

## Troubleshooting
- **Data tidak muncul**: Pastikan schema di `src/app/lib/schema.ts` match dengan tabel DB. Cek logs di terminal untuk error query.
- **Error koneksi DB**: Verifikasi `.env` dan pastikan DB accessible.
- **Build gagal**: Jalankan `npm run build` dan cek error. Pastikan semua dependencies terinstall.
- **Port konflik**: Jika port 3000 digunakan, ubah di `package.json` atau gunakan `npm run dev -- -p 3001`.


## Kontak
- **Author**: [Masjawrepo](https://github.com/masjawrepo)
- **Repo**: [https://github.com/masjawrepo/bi_dashboard](https://github.com/masjawrepo/bi_dashboard)
- Jika ada pertanyaan, buat issue di GitHub atau email ke [contact.masjaw@gmail.com].

---
