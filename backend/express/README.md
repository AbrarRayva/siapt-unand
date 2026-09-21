# Express Backend Service - SIAPT UNAND

Layanan backend REST API berbasis Express.js untuk SIAPT UNAND (Sistem Informasi Perpustakaan Terpadu).

## Fitur Teknis
- Node.js runtime dengan ECMAScript Modules (ESM: `import` / `export`)
- Modular Routing dan Controller Pattern
- Terpusat pada Global Error Handling dan 404 Route Handler
- HTTP Request Logging menggunakan Morgan (format dev)
- Cross-Origin Resource Sharing (CORS) terintegrasi
- Hot Reload otomatis saat development menggunakan Nodemon

## Struktur Direktori
```text
backend/express/
├── src/
│   ├── controllers/       # Logika pemrosesan request dan response bisnis
│   │   ├── health.controller.js
│   │   └── example.controller.js
│   ├── middleware/        # Middleware error handling dan request interceptor
│   │   ├── errorHandler.js
│   │   └── notFoundHandler.js
│   ├── routes/            # Definisi endpoint API
│   │   ├── index.js
│   │   ├── health.routes.js
│   │   └── example.routes.js
│   ├── app.js             # Konfigurasi instance Express dan middleware global
│   └── server.js          # Entry point inisialisasi listener server HTTP
├── .env.example           # Template environment variables
├── .env                   # Environment variables lokal (diabaikan git)
├── package.json           # Definisi dependensi dan skrip layanan express
└── README.md
```

## Konfigurasi Lingkungan (.env)
Buat berkas `.env` dengan menyalin contoh dari `.env.example`:
```bash
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## Menjalankan Layanan Standalone
Anda dapat menjalankan layanan ini langsung dari direktori `backend/express`:

```bash
# Masuk ke direktori backend express
cd backend/express

# Jalankan mode development (auto-reload)
npm run dev

# Jalankan mode production
npm start
```

Port standar: `5000` (dapat disesuaikan melalui variabel `PORT` di berkas `.env`).
Endpoint pengujian kesehatan server: `GET http://localhost:5000/api/health`
