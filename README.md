# Undangan Pernikahan Digital — I'il & Sabbihis

Website undangan pernikahan digital berbasis **React + Vite + Tailwind CSS + Motion**.

Project ini merupakan **static frontend**: tidak menggunakan database, backend, autentikasi, Firebase, Supabase, atau environment variables. Tidak ada fitur buku tamu.

## Fitur

- Sampul undangan personal melalui URL (`?to=Nama+Tamu` atau `?kepada=Nama+Tamu`).
- Pemutar musik latar interaktif dengan pilihan lagu dan kontrol volume.
- Hitung mundur menuju hari pernikahan.
- Profil kedua mempelai, ayat suci, dan untaian doa pernikahan.
- Detail akad dan resepsi, unduh pengingat kalender (`.ics`), Google Maps, serta petunjuk lokasi.
- Efek kelopak bunga, ornamen animasi, dan tampilan responsif desktop/mobile.

## Persyaratan

- Node.js 20.19+ atau 22.12+.
- npm.

## Menjalankan di komputer

```bash
npm install
npm run dev
```

Buka alamat yang ditampilkan Vite, biasanya `http://localhost:3000`.

## Pemeriksaan dan build

```bash
npm run lint
npm test
npm run build
```

Hasil website siap hosting akan dibuat di folder `dist/`.

Untuk melihat hasil build secara lokal:

```bash
npm run preview
```

## Deploy gratis ke Vercel

1. Upload project ini ke repository GitHub.
2. Masuk ke https://vercel.com dan login menggunakan GitHub.
3. Pilih **Add New → Project**, lalu import repository undangan.
4. Pastikan pengaturan berikut:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Klik **Deploy**. Tidak perlu mengisi Environment Variables.

## Deploy gratis ke Netlify

1. Upload project ini ke repository GitHub.
2. Masuk ke https://app.netlify.com dan login menggunakan GitHub.
3. Pilih **Add new site → Import an existing project**.
4. Pilih repository undangan.
5. Isi pengaturan:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Klik **Deploy site**. Tidak perlu mengisi Environment Variables.

Alternatif: jalankan `npm install` lalu `npm run build`, kemudian upload folder `dist/` melalui fitur deploy manual Netlify.

## Personalisasi nama tamu

Contoh link:

```text
https://alamat-undangan.vercel.app/?to=Fredo
https://alamat-undangan.vercel.app/?kepada=Keluarga+Bapak+Fredo
```

Nama tamu dibaca langsung dari URL di browser. Tidak ada data tamu yang disimpan ke server.

## Catatan

- Musik menggunakan Web Audio API. Browser biasanya baru mengizinkan audio setelah pengunjung menekan tombol **Buka Undangan**.
- Google Maps dibuka melalui tautan eksternal.
- Website tidak menyimpan ucapan atau data pengunjung.
