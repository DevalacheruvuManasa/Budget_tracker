import { Bell, Plus } from 'lucide-react'

export default function Navbar({ title, onAdd }) {
  return (
    <header className="page-header">
      <div>
        <p className="page-kicker">PERSONAL FINANCE</p>
        <h1>{title}</h1>
      </div>
      <div className="header-actions">
        <button className="icon-button notification-button" type="button" aria-label="Notifications">
          <Bell size={18} aria-hidden="true" />
          <span />
        </button>
        <button className="button button-primary add-transaction-button" type="button" onClick={onAdd}>
          <Plus size={17} aria-hidden="true" />
          <span>Add transaction</span>
        </button>
      </div>
    </header>
  )
}
