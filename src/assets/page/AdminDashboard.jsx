
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './AdminDashboard.css'

function AdminDashboard({ claims, setClaims, items, setItems }) {
  const [activeTab, setActiveTab] = useState('items')
  const [editingId, setEditingId] = useState(null)

  const emptyForm = {
    name: '',
    category: 'Electronics',
    location: '',
    date: '',
    status: 'Lost',
    description: '',
    image: '',
  }

  const [itemForm, setItemForm] = useState(emptyForm)

  function updateClaimStatus(id, newStatus) {
    setClaims(previous =>
      previous.map(claim =>
        claim.id === id ? { ...claim, status: newStatus } : claim
      )
    )
  }

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setItemForm(previous => ({ ...previous, image: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  function handleItemSubmit(e) {
    e.preventDefault()

    if (editingId) {
      setItems(previous =>
        previous.map(item =>
          item.id === editingId ? { ...itemForm, id: editingId } : item
        )
      )
      alert('Item updated successfully!')
    } else {
      setItems(previous => [
        ...previous,
        { ...itemForm, id: Date.now() },
      ])
      alert('New item added successfully!')
    }

    setItemForm(emptyForm)
    setEditingId(null)
  }

  function handleEdit(item) {
    setItemForm({ ...emptyForm, ...item })
    setEditingId(item.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(previous => previous.filter(item => item.id !== id))
    }
  }

  const pendingCount = claims.filter(c => c.status === 'Pending').length
  const approvedCount = claims.filter(c => c.status === 'Approved').length
  const rejectedCount = claims.filter(c => c.status === 'Rejected').length

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>Findora 💜</h2>
        <p className="admin-menu-label">ADMIN MENU</p>

        <button
          className={activeTab === 'items' ? 'admin-nav-btn active' : 'admin-nav-btn'}
          onClick={() => setActiveTab('items')}
        >
          📦 Manage Items
        </button>

        <button
          className={activeTab === 'claims' ? 'admin-nav-btn active' : 'admin-nav-btn'}
          onClick={() => setActiveTab('claims')}
        >
          📋 Manage Claims
        </button>

        <Link to="/" className="admin-logout">↩ Logout</Link>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <p>ADMIN PORTAL</p>
            <h1>Welcome, Admin 💜</h1>
            <span>Manage Findora college lost and found.</span>
          </div>
          <div className="admin-avatar">A</div>
        </header>

        {activeTab === 'items' ? (
          <>
            <section className="manage-item-form">
              <h2>{editingId ? 'Edit Item' : 'Add New Item'}</h2>
              <p>Add details of a lost or found belonging.</p>

              <form onSubmit={handleItemSubmit}>
                <div className="item-form-grid">
                  <label>
                    Item Name
                    <input
                      value={itemForm.name}
                      onChange={e => setItemForm({ ...itemForm, name: e.target.value })}
                      placeholder="e.g. Blue Backpack"
                      required
                    />
                  </label>

                  <label>
                    Category
                    <select
                      value={itemForm.category}
                      onChange={e => setItemForm({ ...itemForm, category: e.target.value })}
                    >
                      <option>Electronics</option>
                      <option>Bags</option>
                      <option>Books</option>
                      <option>Accessories</option>
                      <option>Clothing</option>
                      <option>Other</option>
                    </select>
                  </label>

                  <label>
                    Location
                    <input
                      value={itemForm.location}
                      onChange={e => setItemForm({ ...itemForm, location: e.target.value })}
                      placeholder="Where was it lost/found?"
                      required
                    />
                  </label>

                  <label>
                    Date
                    <input
                      type="date"
                      value={itemForm.date}
                      onChange={e => setItemForm({ ...itemForm, date: e.target.value })}
                      required
                    />
                  </label>

                  <label>
                    Item Status
                    <select
                      value={itemForm.status}
                      onChange={e => setItemForm({ ...itemForm, status: e.target.value })}
                    >
                      <option value="Lost">Lost</option>
                      <option value="Found">Found</option>
                    </select>
                  </label>

                  <label>
                    Item Photo
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                  </label>
                </div>

                <label className="item-description-label">
                  Description
                  <textarea
                    value={itemForm.description}
                    onChange={e => setItemForm({ ...itemForm, description: e.target.value })}
                    placeholder="Enter item colour, features or identifying details..."
                  />
                </label>

                {itemForm.image && (
                  <img className="admin-image-preview" src={itemForm.image} alt="Item preview" />
                )}

                <div className="item-form-actions">
                  <button type="submit" className="add-item-btn">
                    {editingId ? 'Save Changes' : '+ Add Item'}
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      className="cancel-edit-btn"
                      onClick={() => {
                        setEditingId(null)
                        setItemForm(emptyForm)
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </section>

            <section className="admin-items-section">
              <h2>All Listed Items ({items.length})</h2>

              {items.length === 0 ? (
                <div className="admin-empty">
                  <span>📦</span>
                  <h3>No items added yet</h3>
                  <p>Add your first lost or found item above.</p>
                </div>
              ) : (
                <div className="admin-item-grid">
                  {items.map(item => (
                    <article className="admin-item-card" key={item.id}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <div className="admin-item-placeholder">📦</div>
                      )}

                      <div className="admin-item-info">
                        <span className={item.status === 'Lost' ? 'lost-tag' : 'found-tag'}>
                          {item.status}
                        </span>
                        <h3>{item.name}</h3>
                        <p>{item.category}</p>
                        <p>📍 {item.location}</p>
                        <p>{item.date}</p>
                        <p>{item.description}</p>

                        <div className="admin-item-actions">
                          <button onClick={() => handleEdit(item)}>Edit</button>
                          <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        ) : (
          <>
            <h2 className="admin-section-title">Claims Overview</h2>

            <div className="admin-stats">
              <div className="admin-stat-card">
                <span>📋</span><h3>{claims.length}</h3><p>Total Claims</p>
              </div>
              <div className="admin-stat-card">
                <span>⏳</span><h3>{pendingCount}</h3><p>Pending</p>
              </div>
              <div className="admin-stat-card">
                <span>✅</span><h3>{approvedCount}</h3><p>Approved</p>
              </div>
              <div className="admin-stat-card">
                <span>❌</span><h3>{rejectedCount}</h3><p>Rejected</p>
              </div>
            </div>

            <section className="admin-claims-section">
              <h2>Student Claim Requests</h2>
              <p>Review and manage submitted claims.</p>

              {claims.length === 0 ? (
                <div className="admin-empty">
                  <span>📭</span>
                  <h3>No claim requests yet</h3>
                  <p>Student claim requests will appear here.</p>
                </div>
              ) : (
                <div className="admin-claims-list">
                  {claims.map(claim => (
                    <div className="admin-claim-card" key={claim.id}>
                      <div className="admin-claim-details">
                        <h3>{claim.itemName}</h3>
                        <p><strong>Student:</strong> {claim.studentName}</p>
                        <p><strong>Registration No:</strong> {claim.registrationNumber}</p>
                        <p><strong>Identification Details:</strong> {claim.details}</p>
                        <span className={`admin-status ${claim.status.toLowerCase()}`}>
                          {claim.status}
                        </span>
                      </div>

                      {claim.status === 'Pending' && (
                        <div className="admin-claim-actions">
                          <button
                            className="approve-btn"
                            onClick={() => updateClaimStatus(claim.id, 'Approved')}
                          >
                            ✓ Approve
                          </button>
                          <button
                            className="reject-btn"
                            onClick={() => updateClaimStatus(claim.id, 'Rejected')}
                          >
                            ✕ Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard
