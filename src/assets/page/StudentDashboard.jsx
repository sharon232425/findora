
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './StudentDashboard.css'

function StudentDashboard({ claims, setClaims, items = [] }) {
  const [activeTab, setActiveTab] = useState('browse')
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const [claimForm, setClaimForm] = useState({
    name: '',
    registrationNumber: '',
    details: '',
  })

  const categories = [
    ...new Set(items.map(item => item.category).filter(Boolean)),
  ]

  const filteredItems = items.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location || '').toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory =
      categoryFilter === 'All' || item.category === categoryFilter

    const matchesStatus =
      statusFilter === 'All' || item.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  function handleClaimSubmit(e) {
    e.preventDefault()

    const newClaim = {
      id: Date.now(),
      itemName: selectedItem.name,
      studentName: claimForm.name,
      registrationNumber: claimForm.registrationNumber,
      details: claimForm.details,
      status: 'Pending',
    }

    setClaims(previousClaims => [...previousClaims, newClaim])

    setClaimForm({
      name: '',
      registrationNumber: '',
      details: '',
    })

    setSelectedItem(null)
    setActiveTab('claims')

    alert('Your claim has been submitted successfully! 💜')
  }

  return (
    <div className="student-dashboard">
      <aside className="student-sidebar">
        <h2>Findora 💜</h2>
        <p className="sidebar-label">STUDENT MENU</p>

        <button
          className={activeTab === 'browse' ? 'sidebar-link selected' : 'sidebar-link'}
          onClick={() => setActiveTab('browse')}
        >
          🔍 Browse Items
        </button>

        <button
          className={activeTab === 'claims' ? 'sidebar-link selected' : 'sidebar-link'}
          onClick={() => setActiveTab('claims')}
        >
          📋 My Claims ({claims.length})
        </button>

        <Link to="/" className="sidebar-logout">↩ Logout</Link>
      </aside>

      <main className="student-main">
        <header className="student-header">
          <div>
            <p>STUDENT PORTAL</p>
            <h1>Welcome to Findora 💜</h1>
            <span>Find your belongings, find your way back.</span>
          </div>
          <div className="student-avatar">S</div>
        </header>

        {activeTab === 'browse' ? (
          <>
            <section className="student-welcome">
              <h2>Find your lost belongings</h2>
              <p>Browse items reported by your college admin.</p>
            </section>

            <section className="student-search-section">
              <input
                type="search"
                placeholder="Search by item name, location or description..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />

              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
              </select>
            </section>

            <h2 className="section-heading">
              Recently Reported Items ({filteredItems.length})
            </h2>

            {filteredItems.length === 0 ? (
              <div className="student-no-results">
                <span>🔎</span>
                <h3>No items found</h3>
                <p>Try changing your search or filters.</p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setCategoryFilter('All')
                    setStatusFilter('All')
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="student-item-grid">
                {filteredItems.map(item => (
                  <article className="student-item-card" key={item.id}>
                    {item.image ? (
                      <img
                        className="student-item-photo"
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <div className="item-emoji">
                        {item.emoji || '📦'}
                      </div>
                    )}

                    <span className={item.status === 'Lost' ? 'lost-tag' : 'found-tag'}>
                      {item.status}
                    </span>

                    <h3>{item.name}</h3>
                    <p>{item.category}</p>
                    <p>📍 {item.location}</p>
                    <small>📅 {item.date}</small>

                    {item.description && (
                      <p className="student-item-description">
                        {item.description}
                      </p>
                    )}

                    {item.status === 'Found' ? (
                      <button onClick={() => setSelectedItem(item)}>
                        Claim Item
                      </button>
                    ) : (
                      <button onClick={() => setSelectedItem(item)}>
                        View Details
                      </button>
                    )}
                  </article>
                ))}
              </div>
            )}
          </>
        ) : (
          <section className="claims-section">
            <h2>My Claims</h2>
            <p>Track the status of your submitted claim requests.</p>

            {claims.length === 0 ? (
              <div className="empty-claims">
                <span>📋</span>
                <h3>No claims yet</h3>
                <p>You haven't submitted any claim requests.</p>
                <button onClick={() => setActiveTab('browse')}>
                  Browse Items
                </button>
              </div>
            ) : (
              <div className="claims-list">
                {claims.map(claim => (
                  <div className="claim-card" key={claim.id}>
                    <h3>{claim.itemName}</h3>
                    <p>Student: {claim.studentName}</p>
                    <p>Registration No: {claim.registrationNumber}</p>
                    <p>Details: {claim.details}</p>
                    <span className={`pending-tag ${claim.status.toLowerCase()}`}>
                      {claim.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      {selectedItem && (
        <div className="claim-modal-overlay">
          <div className="claim-modal">
            <button
              className="close-modal"
              onClick={() => setSelectedItem(null)}
            >
              ✕
            </button>

            {selectedItem.image && (
              <img
                className="student-modal-photo"
                src={selectedItem.image}
                alt={selectedItem.name}
              />
            )}

            <h2>{selectedItem.status === 'Found' ? 'Claim This Item 💜' : 'Item Details'}</h2>
            <p className="selected-item-name">
              {selectedItem.name}
            </p>
            <p><strong>Category:</strong> {selectedItem.category}</p>
            <p><strong>Status:</strong> {selectedItem.status}</p>
            <p><strong>Location:</strong> {selectedItem.location}</p>
            <p><strong>Date:</strong> {selectedItem.date}</p>
            <p>{selectedItem.description}</p>

            {selectedItem.status === 'Found' ? (
              <>
                <p>Fill in your details to submit a claim request.</p>

                <form onSubmit={handleClaimSubmit}>
                  <label>Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={claimForm.name}
                    onChange={e => setClaimForm({ ...claimForm, name: e.target.value })}
                    required
                  />

                  <label>Registration Number</label>
                  <input
                    type="text"
                    placeholder="Enter your registration number"
                    value={claimForm.registrationNumber}
                    onChange={e => setClaimForm({
                      ...claimForm,
                      registrationNumber: e.target.value,
                    })}
                    required
                  />

                  <label>How can you identify this item?</label>
                  <textarea
                    placeholder="Describe its colour, marks, contents or other proof..."
                    value={claimForm.details}
                    onChange={e => setClaimForm({ ...claimForm, details: e.target.value })}
                    required
                  />

                  <button type="submit" className="submit-claim">
                    Submit Claim
                  </button>
                </form>
              </>
            ) : (
              <p className="lost-item-note">
                This item has been reported as lost. Contact your college admin if you have information about it.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentDashboard
