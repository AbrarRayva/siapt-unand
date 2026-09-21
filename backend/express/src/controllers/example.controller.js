/**
 * Example controller - Katalog & Layanan Perpustakaan SIAPT UNAND
 */
export const getItems = (req, res) => {
  const items = [
    { id: 1, title: 'Katalog Buku & Jurnal', description: 'Pencarian koleksi pustaka fisik dan digital UNAND' },
    { id: 2, title: 'Layanan Sirkulasi', description: 'Peminjaman, perpanjangan, dan pengembalian buku' },
    { id: 3, title: 'Repositori Tugas Akhir', description: 'Akses skripsi, tesis, disertasi, dan publikasi ilmiah civitas' },
  ];

  res.status(200).json({
    success: true,
    data: items,
  });
};
