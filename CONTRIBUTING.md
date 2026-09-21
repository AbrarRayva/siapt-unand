# Aturan Kontribusi - SIAPT UNAND

---

## 1. Alur Kerja Git

```bash
# 1. Update main
git checkout main && git pull origin main

# 2. Buat branch fitur
git checkout -b feat/nama-fitur

# 3. Uji sebelum commit
npm run dev
npm run build

# 4. Commit dan push
git add .
git commit -m "feat(backend): tambah endpoint cari buku"
git push origin feat/nama-fitur

# 5. Buat Pull Request ke branch main di GitHub
```

---

## 2. Penamaan Branch

Format: `<kategori>/<deskripsi-singkat>`

| Prefix | Tujuan | Contoh |
|---|---|---|
| `feat/` | Fitur baru | `feat/katalog-buku` |
| `fix/` | Perbaikan bug | `fix/validasi-nim` |
| `docs/` | Dokumentasi | `docs/update-readme` |
| `refactor/` | Perapihan kode | `refactor/controller-buku` |

---

## 3. Format Pesan Commit

Gunakan standar **Conventional Commits**:
```text
<tipe>(<lingkup-opsional>): <deskripsi singkat imperatif>
```

Contoh:
- `feat(frontend): buat tabel peminjaman buku`
- `feat(backend): buat endpoint get buku by id`
- `fix(backend): perbaiki status 404 saat buku tidak ada`

---

## 4. Aturan Penulisan Kode

### Frontend (React)
- JavaScript murni (dilarang menggunakan TypeScript).
- Selalu gunakan endpoint relatif: `fetch('/api/...')` (jangan hardcode `http://localhost:5000`).
- Komponen di `frontend/src/components/` atau `frontend/src/pages/`.
- Hapus semua `console.log` sebelum commit.

### Backend (Express)
- Sintaks ES Modules (`import` / `export`).
- Pisahkan router di `src/routes/` dan controller di `src/controllers/`.
- Gunakan `try...catch` pada async function dan teruskan error via `next(err)`.
- Format JSON respon wajib:
  - Sukses: `{ "success": true, "data": ... }`
  - Gagal: `{ "success": false, "message": "..." }`

---

## 5. Instalasi Dependensi

Wajib gunakan flag `-w`:
- Frontend: `npm install <nama-paket> -w frontend`
- Backend: `npm install <nama-paket> -w @siapt/backend-express`
- Dilarang install paket runtime di root `package.json`.

---

## 6. Checklist Sebelum Pull Request

- [ ] Bebas dari sintaks TypeScript.
- [ ] Tidak ada berkas `.env` yang terunggah.
- [ ] `npm run build` sukses (exit code 0).
- [ ] Endpoint frontend menggunakan path relatif `/api/...`.
- [ ] Pesan commit sesuai format Conventional Commits.
