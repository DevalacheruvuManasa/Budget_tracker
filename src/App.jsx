import { ArrowUpRight, WalletCards } from 'lucide-react'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Pocketwise home">
          <span className="brand-mark">
            <WalletCards aria-hidden="true" size={21} />
          </span>
          <span>Pocketwise</span>
        </a>
        <span className="topbar-label">PERSONAL FINANCE</span>
      </header>

      <section className="welcome-panel" aria-labelledby="welcome-title">
        <div className="welcome-copy">
          <p className="eyebrow">YOUR MONEY, MADE CLEAR</p>
          <h1 id="welcome-title">A little more clarity, every day.</h1>
          <p className="welcome-description">
            Your personal space for tracking spending, building good habits, and
            feeling confident about what comes next.
          </p>
          <span className="coming-soon">
            <span className="status-dot" />
            Your workspace is getting ready
          </span>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-card">
            <div className="art-card-top">
              <span className="art-card-icon">
                <WalletCards size={18} />
              </span>
              <ArrowUpRight size={17} />
            </div>
            <span className="art-card-label">YOUR FINANCES</span>
            <span className="art-card-line" />
            <span className="art-card-line short" />
            <div className="art-card-bars">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <span>Small steps add up.</span>
        <span>Made for your everyday</span>
      </footer>
    </main>
  )
}

export default App
