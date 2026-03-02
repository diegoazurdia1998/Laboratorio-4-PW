import { useState, useEffect } from "react";

const API_BASE = "http://localhost:5000/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --dorado: #FFD700;
    --dorado-hover: #FFC200;
    --azul-oscuro: #0d0c2b;
    --azul-medio: #161544;
    --negro: #080808;
    --gris-oscuro: #121212;
    --gris-panel: #1a1a1a;
    --gris-hover: #282828;
    --gris-medio: #b3b3b3;
    --blanco: #ffffff;
    --verde: #1ed760;
    --rojo: #e53935;
    --sidebar-w: 260px;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: var(--negro);
    color: var(--blanco);
    overflow: hidden;
  }

  /* ===== LAYOUT ===== */
  .layout {
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  /* ===== SIDEBAR ===== */
  .sidebar {
    width: var(--sidebar-w);
    min-width: var(--sidebar-w);
    background: var(--negro);
    display: flex;
    flex-direction: column;
    padding: 20px 12px;
    border-right: 1px solid rgba(255,255,255,0.07);
    overflow: hidden;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--dorado);
    padding: 8px 12px 24px;
  }

  .logo-icon {
    width: 36px; height: 36px;
    background: var(--dorado);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: #000; flex-shrink: 0;
  }

  .logo h1 { font-size: 1.3em; font-weight: 700; letter-spacing: -0.3px; }

  .nav { display: flex; flex-direction: column; gap: 2px; flex: 1; }

  .nav-item {
    display: flex; align-items: center; gap: 14px;
    padding: 11px 14px; border-radius: 8px;
    border: none; background: none; color: var(--gris-medio);
    font-family: 'Inter', sans-serif; font-size: 0.9em; font-weight: 600;
    cursor: pointer; transition: all 0.15s ease; text-align: left; width: 100%;
  }

  .nav-item svg { flex-shrink: 0; }
  .nav-item:hover { color: var(--blanco); background: rgba(255,255,255,0.06); }
  .nav-item.active { color: var(--blanco); background: rgba(255,215,0,0.12); }
  .nav-item.active svg { color: var(--dorado); }

  .sidebar-footer {
    margin-top: auto;
    background: linear-gradient(135deg, #0d0c2b, #1a1960);
    border-radius: 12px;
    padding: 18px;
    border: 1px solid rgba(255,215,0,0.1);
  }

  .sf-label { font-size: 0.78em; color: var(--gris-medio); margin-bottom: 6px; }
  .sf-count { font-size: 2.4em; font-weight: 900; color: var(--dorado); line-height: 1; }
  .sf-sub { font-size: 0.75em; color: rgba(255,215,0,0.5); margin-top: 4px; }

  /* ===== MAIN ===== */
  .main {
    flex: 1;
    min-width: 0;
    overflow-y: auto;
    background: var(--gris-oscuro);
    position: relative;
  }

  .main::-webkit-scrollbar { width: 8px; }
  .main::-webkit-scrollbar-track { background: transparent; }
  .main::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }

  .vista { display: none; min-height: 100%; }
  .vista.activa { display: block; }

  /* ===== HERO GRADIENT (top of main) ===== */
  .gradient-header {
    background: linear-gradient(180deg, var(--azul-medio) 0%, var(--gris-oscuro) 100%);
    padding: 40px 32px 32px;
  }

  /* ===== INICIO ===== */
  .hero-title {
    font-size: 2.8em; font-weight: 900; line-height: 1.1;
    background: linear-gradient(120deg, #fff 40%, var(--dorado));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    margin-bottom: 8px;
  }

  .hero-sub { color: var(--gris-medio); font-size: 1em; margin-bottom: 36px; }

  .home-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; max-width: 600px; }

  .home-card {
    background: var(--gris-panel);
    border-radius: 12px; padding: 28px 24px;
    cursor: pointer; transition: all 0.25s ease;
    border: 1px solid rgba(255,255,255,0.05);
    display: flex; flex-direction: column; gap: 16px;
  }

  .home-card:hover { background: var(--gris-hover); transform: translateY(-3px); border-color: rgba(255,215,0,0.3); }

  .home-card-icon {
    width: 56px; height: 56px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
  }

  .home-card-icon.gold { background: var(--dorado); color: #000; }
  .home-card-icon.dark { background: rgba(255,255,255,0.08); color: var(--blanco); }

  .home-card h3 { font-size: 1.1em; font-weight: 700; }
  .home-card p { color: var(--gris-medio); font-size: 0.85em; line-height: 1.4; }

  /* ===== AGREGAR ===== */
  .page-inner { padding: 0 32px 40px; }

  .page-title { font-size: 2em; font-weight: 900; margin-bottom: 6px; }
  .page-sub { color: var(--gris-medio); font-size: 0.9em; margin-bottom: 32px; }

  .form-box { max-width: 580px; }

  .search-row { display: flex; gap: 10px; margin-bottom: 8px; }

  .inp {
    flex: 1; background: rgba(255,255,255,0.08);
    border: 1.5px solid rgba(255,255,255,0.1);
    color: var(--blanco); padding: 13px 18px;
    border-radius: 50px; font-size: 0.92em;
    font-family: 'Inter', sans-serif; transition: all 0.2s;
    outline: none;
  }

  .inp:focus { border-color: var(--dorado); background: rgba(255,255,255,0.12); }
  .inp::placeholder { color: rgba(255,255,255,0.35); }

  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 24px; border-radius: 50px; border: none;
    font-family: 'Inter', sans-serif; font-size: 0.88em; font-weight: 700;
    cursor: pointer; transition: all 0.2s; white-space: nowrap;
  }

  .btn-gold { background: var(--dorado); color: #000; }
  .btn-gold:hover { background: var(--dorado-hover); transform: scale(1.04); }
  .btn-gold:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

  .btn-dark { background: var(--gris-hover); color: var(--blanco); border: 1px solid rgba(255,255,255,0.12); }
  .btn-dark:hover { background: #333; }

  /* SPOTIFY RESULTS */
  .results-wrap { margin: 16px 0; }
  .results-title { font-size: 0.72em; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--gris-medio); margin-bottom: 10px; }

  .r-item {
    display: flex; align-items: center; gap: 12px;
    padding: 9px 12px; border-radius: 8px; cursor: pointer;
    transition: background 0.15s; border: 1px solid transparent; margin-bottom: 4px;
  }

  .r-item:hover { background: rgba(255,255,255,0.07); }
  .r-item.sel { background: rgba(255,215,0,0.08); border-color: rgba(255,215,0,0.35); }

  .r-img { width: 42px; height: 42px; border-radius: 4px; object-fit: cover; flex-shrink: 0; }

  .r-placeholder {
    width: 42px; height: 42px; border-radius: 4px;
    background: rgba(255,255,255,0.08); display: flex;
    align-items: center; justify-content: center; color: var(--gris-medio); flex-shrink: 0;
  }

  .r-info { flex: 1; min-width: 0; }
  .r-name { font-size: 0.9em; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .r-artist { font-size: 0.78em; color: var(--gris-medio); margin-top: 1px; }
  .r-check { color: var(--dorado); font-size: 16px; }

  .btn-save-full {
    width: 100%; margin-top: 10px;
    background: var(--dorado); color: #000; border: none;
    padding: 13px; border-radius: 50px; font-size: 0.92em; font-weight: 700;
    cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.2s;
  }

  .btn-save-full:hover { background: var(--dorado-hover); }
  .btn-save-full:disabled { opacity: 0.5; cursor: not-allowed; }

  .divider {
    display: flex; align-items: center; gap: 12px;
    color: rgba(255,255,255,0.25); font-size: 0.8em; margin: 22px 0;
  }

  .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.1); }

  .manual-row { display: flex; gap: 10px; margin-bottom: 12px; }

  .alert {
    padding: 12px 16px; border-radius: 8px; font-size: 0.88em; font-weight: 600; margin-bottom: 18px;
  }

  .alert-ok { background: rgba(30,215,96,0.12); color: var(--verde); border: 1px solid rgba(30,215,96,0.3); }
  .alert-err { background: rgba(229,57,53,0.12); color: #ef5350; border: 1px solid rgba(229,57,53,0.3); }

  .mini-stat { display: inline-flex; flex-direction: column; gap: 4px; background: var(--gris-panel); padding: 16px 24px; border-radius: 10px; margin-top: 20px; }
  .mini-stat-n { font-size: 2em; font-weight: 900; color: var(--dorado); }
  .mini-stat-l { font-size: 0.8em; color: var(--gris-medio); }

  .loading { color: var(--gris-medio); font-size: 0.85em; animation: pulse 1.4s ease-in-out infinite; padding: 8px 0; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

  /* ===== LISTA ===== */
  .playlist-hero {
    display: flex; align-items: flex-end; gap: 24px; padding: 40px 32px 28px;
    background: linear-gradient(180deg, #1a1544 0%, var(--gris-oscuro) 100%);
  }

  .pl-cover {
    width: 180px; height: 180px; flex-shrink: 0;
    background: linear-gradient(135deg, var(--dorado), #e6a800);
    border-radius: 10px; box-shadow: 0 12px 40px rgba(255,215,0,0.25);
    display: flex; align-items: center; justify-content: center; color: #000;
  }

  .pl-meta { display: flex; flex-direction: column; gap: 8px; }
  .pl-type { font-size: 0.7em; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(255,255,255,0.7); }
  .pl-title { font-size: 3.8em; font-weight: 900; line-height: 1; letter-spacing: -1px; }
  .pl-count { color: var(--gris-medio); font-size: 0.88em; }

  .pl-controls {
    display: flex; align-items: center; gap: 12px;
    padding: 20px 32px; background: var(--gris-oscuro);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .table-wrap { padding: 0 16px 40px; }

  .t-head {
    display: grid; grid-template-columns: 48px 1fr 1fr;
    padding: 10px 16px; margin-bottom: 4px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    font-size: 0.7em; font-weight: 700; text-transform: uppercase;
    letter-spacing: 1px; color: var(--gris-medio);
  }

  .t-row {
    display: grid; grid-template-columns: 48px 1fr 1fr;
    padding: 10px 16px; border-radius: 6px; align-items: center;
    transition: background 0.15s; cursor: default;
  }

  .t-row:hover { background: rgba(255,255,255,0.06); }
  .t-num { color: var(--gris-medio); font-size: 0.88em; text-align: center; }
  .t-name { font-size: 0.92em; font-weight: 600; }
  .t-artist { font-size: 0.85em; color: var(--gris-medio); }

  .empty {
    display: flex; flex-direction: column; align-items: center;
    gap: 14px; padding: 60px 20px; color: var(--gris-medio); text-align: center;
  }

  .empty svg { opacity: 0.25; }
  .empty p { font-size: 1em; }

  .btn-empty {
    background: var(--dorado); color: #000; border: none;
    padding: 11px 22px; border-radius: 50px; font-weight: 700;
    cursor: pointer; font-family: 'Inter', sans-serif; font-size: 0.88em;
    transition: all 0.2s;
  }

  .btn-empty:hover { background: var(--dorado-hover); }

  /* ===== TOAST ===== */
  .toast {
    position: fixed; bottom: 28px; right: 28px;
    padding: 13px 20px; border-radius: 10px;
    font-size: 0.88em; font-weight: 600;
    animation: toastIn 0.25s ease; z-index: 9999;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  }

  .toast.success { background: var(--verde); color: #000; }
  .toast.error { background: var(--rojo); color: #fff; }

  @keyframes toastIn {
    from { transform: translateY(16px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

export default function App() {
  const [vista, setVista] = useState("inicio");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [sel, setSel] = useState(null);
  const [mNombre, setMNombre] = useState("");
  const [mArtista, setMArtista] = useState("");
  const [canciones, setCanciones] = useState([]);
  const [lSearch, setLSearch] = useState(false);
  const [lSave, setLSave] = useState(false);
  const [lList, setLList] = useState(false);
  const [alerta, setAlerta] = useState(null);
  const [toast, setToast] = useState(null);

  const alert = (texto, tipo) => { setAlerta({ texto, tipo }); setTimeout(() => setAlerta(null), 3500); };
  const toast_ = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const ir = (v) => { setVista(v); if (v === "lista") load(); };

  const load = async () => {
    setLList(true);
    try { const r = await fetch(`${API_BASE}/canciones`); setCanciones(await r.json()); }
    catch { toast_("Error al cargar canciones", "error"); }
    finally { setLList(false); }
  };

  const buscar = async () => {
    if (!query.trim()) return;
    setLSearch(true); setResults([]); setSel(null);
    try { const r = await fetch(`${API_BASE}/buscar-spotify?q=${encodeURIComponent(query)}`); setResults(await r.json()); }
    catch { alert("No se pudo conectar al backend", "err"); }
    finally { setLSearch(false); }
  };

  const guardar = async (nombre, artista) => {
    if (!nombre.trim() || !artista.trim()) { alert("Nombre y artista son requeridos", "err"); return; }
    setLSave(true);
    try {
      const r = await fetch(`${API_BASE}/canciones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, artista }),
      });
      const data = await r.json();
      if (r.ok) {
        alert(`✓ "${nombre}" guardada`, "ok");
        toast_(`"${nombre}" agregada`);
        setSel(null); setResults([]); setQuery(""); setMNombre(""); setMArtista("");
        load();
      } else { alert(data.error || "Error al guardar", "err"); }
    } catch { alert("Error al conectar con el backend", "err"); }
    finally { setLSave(false); }
  };

  useEffect(() => { load(); }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="layout">

        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
            </div>
            <h1>Mi Música</h1>
          </div>

          <nav className="nav">
            {[
              { id: "inicio", label: "Inicio", d: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" },
              { id: "agregar", label: "Agregar Canciones", d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" },
              { id: "lista", label: "Mi Lista", d: "M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" },
            ].map(({ id, label, d }) => (
              <button key={id} className={`nav-item ${vista === id ? "active" : ""}`} onClick={() => ir(id)}>
                <svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d={d}/></svg>
                {label}
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="sf-label">Biblioteca</div>
            <div className="sf-count">{canciones.length}</div>
            <div className="sf-sub">canciones registradas</div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="main">

          {/* INICIO */}
          <div className={`vista ${vista === "inicio" ? "activa" : ""}`}>
            <div className="gradient-header">
              <h1 className="hero-title">Tu Biblioteca<br/>Musical</h1>
              <p className="hero-sub">Gestiona y descubre tus canciones favoritas</p>
              <div className="home-cards">
                <div className="home-card" onClick={() => ir("agregar")}>
                  <div className="home-card-icon gold">
                    <svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                  </div>
                  <div>
                    <h3>Agregar Canciones</h3>
                    <p>Busca en Spotify o agrega manualmente</p>
                  </div>
                </div>
                <div className="home-card" onClick={() => ir("lista")}>
                  <div className="home-card-icon dark">
                    <svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/></svg>
                  </div>
                  <div>
                    <h3>Ver Mi Lista</h3>
                    <p>{canciones.length} canciones guardadas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AGREGAR */}
          <div className={`vista ${vista === "agregar" ? "activa" : ""}`}>
            <div className="gradient-header">
              <h1 className="page-title">Agregar Canción</h1>
              <p className="page-sub">Busca en Spotify o ingresa los datos manualmente</p>
            </div>
            <div className="page-inner">
              <div className="form-box">
                {alerta && <div className={`alert ${alerta.tipo === "ok" ? "alert-ok" : "alert-err"}`}>{alerta.texto}</div>}

                {/* Spotify */}
                <div className="search-row">
                  <input
                    className="inp"
                    placeholder="Buscar en Spotify..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && buscar()}
                  />
                  <button className="btn btn-gold" onClick={buscar} disabled={lSearch}>
                    <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                    {lSearch ? "Buscando..." : "Buscar"}
                  </button>
                </div>

                {lSearch && <div className="loading">Buscando en Spotify...</div>}

                {results.length > 0 && (
                  <div className="results-wrap">
                    <p className="results-title">Resultados — elige una canción</p>
                    {results.map((s, i) => (
                      <div key={i} className={`r-item ${sel === i ? "sel" : ""}`} onClick={() => setSel(sel === i ? null : i)}>
                        {s.imagen_album
                          ? <img className="r-img" src={s.imagen_album} alt={s.nombre} />
                          : <div className="r-placeholder">♪</div>
                        }
                        <div className="r-info">
                          <div className="r-name">{s.nombre}</div>
                          <div className="r-artist">{s.artista}</div>
                        </div>
                        {sel === i && <span className="r-check">✓</span>}
                      </div>
                    ))}
                    {sel !== null && (
                      <button className="btn-save-full" onClick={() => guardar(results[sel].nombre, results[sel].artista)} disabled={lSave}>
                        {lSave ? "Guardando..." : `Guardar — ${results[sel].nombre}`}
                      </button>
                    )}
                  </div>
                )}

                <div className="divider">o ingresar manualmente</div>

                <div className="manual-row">
                  <input className="inp" placeholder="Nombre de la canción" value={mNombre} onChange={e => setMNombre(e.target.value)} />
                  <input className="inp" placeholder="Artista" value={mArtista} onChange={e => setMArtista(e.target.value)} />
                </div>

                <button className="btn btn-gold" onClick={() => guardar(mNombre, mArtista)} disabled={lSave}>
                  <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                  {lSave ? "Guardando..." : "Agregar canción"}
                </button>

                <div className="mini-stat">
                  <span className="mini-stat-n">{canciones.length}</span>
                  <span className="mini-stat-l">canciones en total</span>
                </div>
              </div>
            </div>
          </div>

          {/* LISTA */}
          <div className={`vista ${vista === "lista" ? "activa" : ""}`}>
            <div className="playlist-hero">
              <div className="pl-cover">
                <svg viewBox="0 0 24 24" width="80" height="80"><path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
              </div>
              <div className="pl-meta">
                <span className="pl-type">Lista de Reproducción</span>
                <h1 className="pl-title">Mis Canciones</h1>
                <span className="pl-count">{canciones.length} canciones</span>
              </div>
            </div>

            <div className="pl-controls">
              <button className="btn btn-gold" onClick={() => ir("agregar")}>
                <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                Agregar más
              </button>
              <button className="btn btn-dark" onClick={load}>
                <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
                Actualizar
              </button>
            </div>

            <div className="table-wrap">
              <div className="t-head">
                <div style={{textAlign:"center"}}>#</div>
                <div>Título</div>
                <div>Artista</div>
              </div>

              {lList ? (
                <div className="empty"><p className="loading">Cargando canciones...</p></div>
              ) : canciones.length === 0 ? (
                <div className="empty">
                  <svg viewBox="0 0 24 24" width="64" height="64"><path fill="currentColor" d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                  <p>No hay canciones todavía</p>
                  <button className="btn-empty" onClick={() => ir("agregar")}>Agregar primera canción</button>
                </div>
              ) : (
                canciones.map((c, i) => (
                  <div className="t-row" key={c.id}>
                    <div className="t-num">{i + 1}</div>
                    <div className="t-name">{c.nombre}</div>
                    <div className="t-artist">{c.artista}</div>
                  </div>
                ))
              )}
            </div>
          </div>

        </main>
      </div>

      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </>
  );
}