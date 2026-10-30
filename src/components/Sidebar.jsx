import { ChartNoAxesCombined, LayoutDashboard, WalletCards } from 'lucide-react'

const navigation = [
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', Icon: WalletCards },
  { id: 'analytics', label: 'Analytics', Icon: ChartNoAxesCombined },
]

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#dashboard" onClick={() => onNavigate('dashboard')}>
        <span className="brand-mark"><WalletCards size={21} aria-hidden="true" /></span>
        <span>Pocketwise</span>
      </a>
      <p className="nav-label">MENU</p>
      <nav className="side-nav" aria-label="Main navigation">
        {navigation.map(({ id, label, Icon }) => (
          <button
            className={`nav-item ${activePage === id ? 'active' : ''}`}
            key={id}
            type="button"
            aria-current={activePage === id ? 'page' : undefined}
            onClick={() => onNavigate(id)}
          >
            <Icon size={18} aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-note">
        <span className="sidebar-note-icon"><WalletCards size={17} aria-hidden="true" /></span>
        <strong>Mindful money.</strong>
        <span>Small steps add up.</span>
      </div>
      <div className="profile">
        <span className="avatar">P</span>
        <span><strong>My account</strong><small>Personal space</small></span>
      </div>
    </aside>
  )
}
