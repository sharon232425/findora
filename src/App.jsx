
import { useState } from 'react'
import './App.css'
import { Link, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import StudentDashboard from './assets/page/StudentDashboard'
import AdminDashboard from './assets/page/AdminDashboard'

const categories = [
  { name: 'Electronics', desc: 'Phones, laptops and chargers', code: 'EL' },
  { name: 'Bags', desc: 'Backpacks and handbags', code: 'BG' },
  { name: 'Books', desc: 'Textbooks and notebooks', code: 'BK' },
  { name: 'Accessories', desc: 'Watches and earphones', code: 'AC' },
  { name: 'Clothing', desc: 'Jackets and shirts', code: 'CL' },
  { name: 'Other Items', desc: 'Keys, IDs and bottles', code: 'OT' },
]

const features = [
  {
    code: '01',
    title: 'Easy Search',
    desc: 'Find lost items quickly using search and category filters.',
  },
  {
    code: '02',
    title: 'Item Information',
    desc: 'Review item descriptions, locations and reported dates.',
  },
  {
    code: '03',
    title: 'Admin Reviewed',
    desc: 'Keep listings organized through centralized administration.',
  },
  {
    code: '04',
    title: 'Campus Community',
    desc: 'Help students reconnect with belongings found on campus.',
  },
]

function HomePage() {
  return (
    <div className="findora">
      <header className="navbar">
        <a className="brand" href="#home" aria-label="Findora home">
          <span className="brand-icon" aria-hidden="true">F</span>
          <span>Findora<span className="brand-dot">.</span></span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#features">About</a>
          <a href="#features">How It Works</a>
          <a href="#categories">Categories</a>
        </nav>

        <div className="nav-actions">
          <Link className="nav-login" to="/login">
            Sign In
          </Link>
          <Link className="nav-cta" to="/login">
            Access Portal <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow">
              CAMPUS LOST &amp; FOUND MANAGEMENT
            </span>

            <h1>
              Lost something on campus?
              <br />
              <span>Let's help you find it.</span>
            </h1>

            <p className="hero-description">
              Findora is a centralized college lost and found
              platform that helps students discover reported
              belongings and submit item claim requests.
            </p>

            <div className="hero-actions">
              <Link className="button button-primary" to="/login">
                Access Student Portal <span aria-hidden="true">→</span>
              </Link>

              <a className="button button-outline" href="#categories">
                Browse Categories
              </a>
            </div>

            <div className="trust-row">
              <span><span className="trust-mark">✓</span> Organized item listings</span>
              <span><span className="trust-mark">✓</span> Admin-managed records</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Findora platform overview">
            <div className="hero-art-header">
              <div>
                <span className="art-overline">CAMPUS SERVICES</span>
                <h2>Lost &amp; Found</h2>
              </div>
              <span className="art-status">PORTAL</span>
            </div>

            <div className="art-summary">
              <span className="art-summary-label">A simpler way to reconnect belongings</span>
              <p>Search listings. Review details. Submit a claim.</p>
            </div>

            <div className="art-item-list">
              <div className="art-item-row">
                <span className="art-item-code">EL</span>
                <span className="art-item-info">
                  <strong>Electronic Items</strong>
                  <small>Phones, chargers, headphones</small>
                </span>
                <span className="art-item-arrow">↗</span>
              </div>

              <div className="art-item-row">
                <span className="art-item-code">BG</span>
                <span className="art-item-info">
                  <strong>Bags &amp; Accessories</strong>
                  <small>Personal belongings</small>
                </span>
                <span className="art-item-arrow">↗</span>
              </div>

              <div className="art-item-row">
                <span className="art-item-code">BK</span>
                <span className="art-item-info">
                  <strong>Books &amp; Stationery</strong>
                  <small>Academic materials</small>
                </span>
                <span className="art-item-arrow">↗</span>
              </div>
            </div>

            <div className="art-footer">
              <span className="art-footer-dot" />
              A more organized campus community
            </div>
          </div>
        </section>

        <section className="features section" id="features">
          <div className="section-heading">
            <span className="eyebrow">PLATFORM FEATURES</span>
            <h2>
              A structured approach to
              <br />
              <span>lost and found management.</span>
            </h2>
            <p>
              A clear, accessible platform for browsing items and
              coordinating claims within the college community.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon">{feature.code}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="categories-section" id="categories">
          <div className="category-intro">
            <span className="eyebrow">ITEM CATEGORIES</span>
            <h2>Browse by category.</h2>
            <p>
              Explore common item types to make it easier to locate
              belongings reported on campus.
            </p>

            <Link className="button button-primary" to="/login">
              Open Student Portal <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <Link
                className="category-card"
                to="/login"
                key={category.name}
              >
                <span className="category-icon">{category.code}</span>

                <span className="category-info">
                  <strong>{category.name}</strong>
                  <small>{category.desc}</small>
                </span>

                <span className="category-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="join-banner" id="get-started">
          <div className="join-copy">
            <span className="eyebrow">FINDORA STUDENT PORTAL</span>
            <h2>Every item deserves a way home.</h2>
            <p>
              Sign in to explore listings and manage your claim requests.
            </p>
          </div>

          <Link className="button button-primary" to="/login">
            Sign In to Findora <span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand footer-logo" href="#home">
              <span className="brand-icon" aria-hidden="true">F</span>
              <span>Findora<span className="brand-dot">.</span></span>
            </a>
            <p>College Lost &amp; Found Management System</p>
          </div>

          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#home">Home</a>
            <a href="#features">About</a>
            <a href="#features">How It Works</a>
            <a href="#categories">Categories</a>
            <Link to="/login">Sign In</Link>
          </nav>
        </div>

        <div className="copyright">
          © 2026 Findora. College project demonstration.
        </div>
      </footer>
    </div>
  )
}

function App() {
  const [claims, setClaims] = useState([])

  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      category: 'Electronics',
      location: 'College Library',
      date: '2026-11-03',
      status: 'Lost',
      description: 'Black wireless headphones.',
      image: '',
    },
    {
      id: 2,
      name: 'Blue Backpack',
      category: 'Bags',
      location: 'College Canteen',
      date: '2026-11-02',
      status: 'Found',
      description: 'Blue backpack found near the canteen.',
      image: '',
    },
    {
      id: 3,
      name: 'Engineering Mathematics Book',
      category: 'Books',
      location: 'Classroom',
      date: '2026-11-01',
      status: 'Found',
      description: 'Engineering mathematics textbook.',
      image: '',
    },
  ])

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/student-dashboard"
        element={
          <StudentDashboard
            claims={claims}
            setClaims={setClaims}
            items={items}
          />
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          <AdminDashboard
            claims={claims}
            setClaims={setClaims}
            items={items}
            setItems={setItems}
          />
        }
      />
    </Routes>
  )
}

export default App
