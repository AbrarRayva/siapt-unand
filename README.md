# SIAPT UNAND - Sistem Informasi Perpustakaan Terpadu

Repositori berbasis monorepo untuk sistem SIAPT UNAND (Sistem Informasi Perpustakaan Terpadu Universitas Andalas).
---

## Struktur Direktori

Struktur utama repositori:

```text
siapt-unand/
├── frontend/        # Aplikasi client React (Vite)
└── backend/
    └── express/     # Layanan REST API Express
```

---

## Cara Setup dan Menjalankan

Dengan memanfaatkan konsep monorepo berbasis npm workspaces, Anda tidak perlu berpindah direktori (*cd*) ke masing-masing folder untuk menginstal dependensi atau menyalakan server.

### 1. Kloning Repositori
```bash
git clone https://github.com/AbrarRayva/siapt-unand.git
cd siapt-unand
```

### 2. Instalasi Dependensi Terpusat
Jalankan perintah ini satu kali langsung dari direktori root:
```bash
npm install
```
Konsep monorepo ini akan otomatis mendeteksi dan menginstal seluruh paket dependensi untuk frontend dan backend sekaligus.

### 3. Konfigurasi Environment Backend
Salin berkas template lingkungan di dalam folder `backend/express`:
- Windows (PowerShell):
  ```powershell
  Copy-Item backend/express/.env.example backend/express/.env
  ```
- Linux / macOS:
  ```bash
  cp backend/express/.env.example backend/express/.env
  ```

### 4. Menjalankan Aplikasi
Jalankan perintah berikut di direktori root:
```bash
npm run dev
```
Perintah ini akan menyalakan Frontend dan Backend secara serentak dalam satu terminal:
- Frontend React: `http://localhost:5173`
- Backend Express: `http://localhost:5000`

---

## Perintah Kerja (Scripts)

Seluruh perintah dijalankan dari direktori root:

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan Frontend dan Express Backend secara serentak |
| `npm run dev:frontend` | Hanya menjalankan Frontend React (port 5173) |
| `npm run dev:backend` | Hanya menjalankan Backend Express (port 5000) |
| `npm run build` | Mengompilasi aplikasi Frontend untuk kebutuhan produksi |
| `npm run lint` | Menjalankan pemeriksaan kualitas kode pada Frontend |

---

## Manajemen Dependensi Workspace

Dengan konsep monorepo, instalasi paket pustaka baru dilakukan dari direktori root menggunakan flag workspace sehingga dependensi terisolasi pada tempatnya masing-masing:

- Menambah pustaka untuk Frontend:
  ```bash
  npm install <nama-paket> -w frontend
  ```
- Menambah pustaka untuk Backend:
  ```bash
  npm install <nama-paket> -w @siapt/backend-express
  ```

---

## Komunikasi Frontend dan Backend

Frontend dikonfigurasi dengan development reverse proxy pada port 5173. 

Saat memanggil endpoint backend dari React:
- Gunakan path relatif berawalan `/api/` (misalnya: `fetch('/api/health')` atau `fetch('/api/books')`).
- Request akan otomatis diteruskan ke `http://localhost:5000` sehingga Anda tidak perlu menuliskan alamat host secara manual dan terhindar dari kendala CORS.

---

## Dokumentasi Pendukung

- [Aturan Kontribusi](file:///C:/Users/abrar/Documents/GitHub/siapt-unand/CONTRIBUTING.md): Standar alur kerja Git, penamaan branch, format commit, dan prosedur Pull Request.
- [Spesifikasi Teknis & Panduan AI](file:///C:/Users/abrar/Documents/GitHub/siapt-unand/AGENT.md): Konteks arsitektur proyek, batasan teknologi, serta panduan prompting AI untuk kontributor.
