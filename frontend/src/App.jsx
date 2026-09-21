import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [expressStatus, setExpressStatus] = useState({ loading: true, data: null, error: null })
  const [expressItems, setExpressItems] = useState([])

  // Check Express Backend Health
  useEffect(() => {
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setExpressStatus({ loading: false, data, error: null })
      })
      .catch((err) => {
        setExpressStatus({ loading: false, data: null, error: err.message })
      })

    // Fetch sample items from Express
    fetch('/api/items')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setExpressItems(json.data)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="monorepo-container">
      <header className="monorepo-header">
        <h1>SIAPT UNAND</h1>
        <p className="subtitle">Sistem Informasi Perpustakaan Terpadu - Universitas Andalas</p>
      </header>

      <main className="cards-grid">
        {/* React Frontend Card */}
        <section className="card">
          <div className="card-badge active">Aktif</div>
          <h2>Frontend (React + Vite)</h2>
          <p className="card-desc">User interface modern berbasis React & Vite dengan Hot Module Replacement (HMR).</p>
          <div className="info-box">
            <strong>Port:</strong> 5173<br />
            <strong>Lokasi:</strong> <code>frontend/</code><br />
            <strong>Framework:</strong> React 19 (JavaScript)
          </div>
          <div className="status-indicator">
            <span className="dot green"></span> Frontend berjalan normal
          </div>
        </section>

        {/* Express Backend Card */}
        <section className="card">
          <div className={`card-badge ${expressStatus.data ? 'active' : expressStatus.loading ? 'loading' : 'offline'}`}>
            {expressStatus.loading ? 'Mengecek...' : expressStatus.data ? 'Terhubung (Online)' : 'Offline'}
          </div>
          <h2>Backend (Express.js)</h2>
          <p className="card-desc">REST API utama untuk logika bisnis, manajemen data, dan endpoints aplikasi.</p>
          <div className="info-box">
            <strong>Port:</strong> 5000 (Proxy: <code>/api</code>)<br />
            <strong>Lokasi:</strong> <code>backend/express/</code><br />
            <strong>Status Health:</strong>{' '}
            {expressStatus.data ? (
              <span className="text-green">OK ({expressStatus.data.service})</span>
            ) : expressStatus.loading ? (
              'Menghubungkan...'
            ) : (
              <span className="text-red">Offline ({expressStatus.error})</span>
            )}
          </div>

          {expressItems.length > 0 && (
            <div className="sample-list">
              <h4>Contoh Data dari Express (<code>/api/items</code>):</h4>
              <ul>
                {expressItems.map((item) => (
                  <li key={item.id}>
                    <strong>{item.title}</strong>: {item.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>

      <footer className="monorepo-footer">
        <p>
          Jalankan Frontend & Express serentak dengan: <code>npm run dev</code> di root directory.
        </p>
        <small className="text-muted">
          Struktur folder siap dikembangkan. Anda dapat menambah service backend baru kapan saja di bawah <code>backend/</code>.
        </small>
      </footer>
    </div>
  )
}

export default App
