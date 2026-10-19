# Panduan Kontribusi

Dokumen ini berisi aturan operasional pengembangan perangkat lunak untuk repository monolith ini. Seluruh developer wajib mengikuti standar penamaan branch, tata cara commit, alur Pull Request (PR), dan aturan versioning yang berlaku.

---

## 1. Struktur Repository Monolith

Repository ini menggunakan struktur monorepo/monolith sederhana:

```text
.
├── frontend/   # Vite + React / JS
├── backend/    # Express.js
├── .github/        # Workflows CI/CD
└── ...

```

---

## 2. Menginstall Package (Frontend & Backend)

Repository ini adalah monorepo dengan **npm workspaces**. Dependency frontend dan backend terpisah dalam masing-masing folder.

### A. Install semua dependency sekaligus (Root)

Dari root repository, jalankan:

```bash
npm install
```

Perintah ini akan menginstall dependency untuk `frontend` dan `backend/express` secara bersamaan melalui npm workspaces.

### B. Install package baru di Frontend

Masuk ke folder frontend lalu install package:

```bash
cd frontend
npm install <nama-package>
```

Untuk menyimpan ke `devDependencies`:

```bash
cd frontend
npm install --save-dev <nama-package>
```

Atau langsung dari root menggunakan workspace:

```bash
npm install <nama-package> -w frontend
```

### C. Install package baru di Backend

Masuk ke folder backend/express lalu install package:

```bash
cd backend/express
npm install <nama-package>
```

Untuk menyimpan ke `devDependencies`:

```bash
cd backend/express
npm install --save-dev <nama-package>
```

Atau langsung dari root menggunakan workspace:

```bash
npm install <nama-package> -w @siapt/backend-express
```

### D. Catatan

* Pastikan `npm` versi terbaru terinstall sebelum menjalankan perintah di atas.
* Setelah menambahkan package baru, restart ulang server development agar dependency baru terbaca.
* Jangan menambahkan `node_modules` ke dalam commit; pastikan sudah terdaftar di `.gitignore`.

---

## 3. Aturan Branching (Git Flow)

### A. Branch Utama

* **`main`**: Environment Production. Hanya berisi kode stabil yang siap dipakai pengguna. **Dilarang push langsung ke `main`.**
* **`staging`**: Environment Staging/Pre-release. Tempat integrasi dan pengujian gabungan sebelum dirilis ke Production. **Dilarang push langsung ke `staging`.**

### B. Branch Fitur & Perbaikan

Setiap pekerjaan wajib dibuat di branch terpisah yang diturunkan dari `staging`:

* **Fitur baru:** `feat/nama-fitur` (contoh: `feat/auth-jwt`)
* **Perbaikan bug:** `fix/nama-bug` (contoh: `fix/mysql-connection-leak`)
* **Refactoring/Chore:** `chore/nama-tugas` (contoh: `chore/update-deps`)

---

## 4. Konvensi Commit (Conventional Commits)

Format pesan commit wajib mengikuti standar berikut:

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]

```

### Tipe Commit & Dampak SemVer:

* **`fix:`** Perbaikan bug $\rightarrow$ Menaikkan versi **PATCH** (`1.0.0` $\rightarrow$ `1.0.1`)
* **`feat:`** Penambahan fitur baru $\rightarrow$ Menaikkan versi **MINOR** (`1.0.0` $\rightarrow$ `1.1.0`)
* **`feat!:`** atau **`BREAKING CHANGE:`** Perubahan besar yang merusak kompatibilitas lama $\rightarrow$ Menaikkan versi **MAJOR** (`1.0.0` $\rightarrow$ `2.0.0`)

---

## 5. Alur Kerja (Development Workflow)

```text
[Dev Branch: feat/...] 
       │ (PR + CI/CD Check)
       ▼
  [staging]  ──────► Deploy ke Environment Staging (Versi Beta)
       │
       │ (Squash & Merge + Milestone Approved)
       ▼
    [main]   ──────► Auto Versioning (SemVer) + Deploy Production

```

### Langkah 1: Pengerjaan Lokal

1. Switch ke `staging` dan tarik perubahan terbaru:
```bash
git checkout staging && git pull origin staging

```


2. Buat branch baru:
```bash
git checkout -b feat/manajemen-user

```


3. Kerjakan kode, pastikan linter dan unit test lokal lulus:
```bash
npm run lint && npm run test

```



### Langkah 2: Merge ke `staging`

1. Push branch ke remote:
```bash
git push origin feat/manajemen-user

```


2. Buat **Pull Request (PR)** dari `feat/manajemen-user` $\rightarrow$ `staging`.
3. Syarat PR ke `staging`:
* Pipeline CI/CD Wajib **Lulus (Green)**: Linting, Unit Test Backend (Express/MySQL) & Frontend (Vite), serta **Code Coverage minimal 80%**.


4. Lakukan **Merge Commit** biasa ke `staging`.

---

## 6. Alur Rilis ke Production (`main`) & Versioning

### A. Kapan Rilis Diterbitkan?

Rilis ke `main` dilakukan secara terencana berdasarkan pencapaian *sprint* atau *milestone* yang telah diuji dan dinyatakan stabil di lingkungan Staging.

### B. Prosedur Rilis

1. Buat PR dari `staging` $\rightarrow$ `main`.
2. Gunakan teknik **Squash and Merge** saat melakukan merge PR ke `main`.
* *Tujuan:* Menyatukan tumpukan commit kecil dari staging menjadi **1 commit tunggal yang bersih** di `main`.


3. Judul commit pada *Squash & Merge* wajib mencerminkan perubahan tertinggi (mengikuti aturan Conventional Commits).

### C. Versioning Otomatis

Setelah merge ke `main` berhasil:

* Pipeline CI/CD membaca tipe commit tunggal tersebut.
* Nomor versi di `package.json` akan otomatis dinaikkan sesuai aturan **SemVer**.
* **Git Tag** (contoh: `v1.2.0`) dan catatan rilis (*Changelog*) dibuat secara otomatis oleh sistem.

---

## 7. Aturan Penanganan Database (MySQL Migrations)

1. Dilarang melakukan perubahan struktur database MySQL secara manual di server Staging/Production.
2. Setiap perubahan skema wajib menggunakan file migrasi (misal: Knex/Sequelize/Prisma Migration) yang ikut di-commit ke dalam repositori.
3. Untuk *Breaking Changes* pada database (misal menghapus kolom/tabel), gunakan pola *Expand & Contract*: tambahkan kolom baru terlebih dahulu tanpa menghapus kolom lama hingga semua endpoint V2 siap.