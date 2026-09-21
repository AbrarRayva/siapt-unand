# Frontend Application - SIAPT UNAND

Aplikasi frontend Single Page Application (SPA) berbasis React dan Vite untuk SIAPT UNAND (Sistem Informasi Perpustakaan Terpadu).

## Fitur Teknis
- React 19 (JavaScript ES Modules)
- Vite Build Tool dengan Hot Module Replacement (HMR) cepat
- Konfigurasi Reverse Proxy Vite ke backend Express lokal (`/api`)
- Struktur siap dikembangkan dengan pola komponen fungsional modern

## Struktur Direktori
```text
frontend/
├── public/                # Aset statis publik (favicon, svg, dll)
├── src/
│   ├── assets/            # Aset grafis aplikasi
│   ├── App.jsx            # Komponen root aplikasi & status konektivitas
│   ├── App.css            # Styling komponen root
│   ├── index.css          # Styling global
│   └── main.jsx           # Entry point rendering React ke DOM
├── index.html             # Shell berkas HTML utama
├── package.json           # Dependensi dan skrip frontend
├── vite.config.js         # Konfigurasi Vite dan development proxy
└── README.md
```

## Mekanisme Vite Development Proxy
Frontend berjalan pada port `5173`, sedangkan backend Express berjalan pada port `5000`.

Untuk menghindari error Cross-Origin Resource Sharing (CORS) selama pengembangan:
- Semua request API di frontend dilakukan dengan relative path: `fetch('/api/...')`
- Server Vite akan meneruskan request berawalan `/api` ke `http://localhost:5000/api/...` secara internal.
- Jangan melakukan hardcode URL `http://localhost:5000` di dalam komponen React.

## Menjalankan Layanan Standalone
Anda dapat menjalankan frontend secara independen:

```bash
# Masuk ke direktori frontend
cd frontend

# Menjalankan development server
npm run dev

# Membangun bundle produksi
npm run build

# Menjalankan preview dari hasil build
npm run preview
```
