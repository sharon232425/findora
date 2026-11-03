import { useState } from 'react'
import './App.css'
import { Link, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import StudentDashboard from './assets/page/StudentDashboard'
import AdminDashboard from './assets/page/AdminDashboard'

const categories = [
  { icon: '💻', name: 'Electronics', desc: 'Phones, laptops, chargers' },
  { icon: '🎒', name: 'Bags', desc: 'Backpacks, handbags' },
  { icon: '📚', name: 'Books', desc: 'Textbooks, notebooks' },
  { icon: '⌚', name: 'Accessories', desc: 'Watches, earphones' },
  { icon: '👕', name: 'Clothing', desc: 'Jackets, shirts' },
  { icon: '🔑', name: 'Other Items', desc: 'Keys, IDs, bottles' },
]

const features = [
  {
    icon: '🔎',
    title: 'Easy Search',
    desc: 'Find lost items quickly using simple search and categories.',
  },
  {
    icon: '📸',
    title: 'Report with Photo',
    desc: 'Share item photos and details in just a few clicks.',
  },
  {
    icon: '🛡️',
    title: 'Admin Verified',
    desc: 'Keep reports organized and help make the campus safer.',
  },
  {
    icon: '💜',
    title: 'For Every Student',
    desc: 'Bring your college community together through small acts of help.',
  },
]

function HomePage() {
  return (
    <div className="findora">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">✦</span>
          Findora<span className="brand-dot">.</span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">How it works</a>
          <a href="#categories">Categories</a>
        </nav>

        <Link className="nav-login" to="/login">
          Login
        </Link>

        <Link className="nav-cta" to="/login">
          Get Started ↗
        </Link>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow">✦ YOUR COLLEGE LOST & FOUND</span>

            <h1>
              Lost something?
              <br />
              <span>Find your way</span>
              <br />
              back to it.
            </h1>

            <p className="hero-description">
              Lost your ID card, keys, or favourite notebook?
              Findora helps your college community report, discover,
              and return lost belongings.
            </p>

            <div className="hero-actions">
              <Link className="button button-primary" to="/login">
                Report an Item <span>→</span>
              </Link>

              <a className="button button-outline" href="#categories">
                Explore Items
              </a>
            </div>

            <div className="trust-row">
              <span>✓ Student friendly</span>
              <span>◇ Community focused</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Lost and found item illustration">
            <div className="art-glow" />

            <div className="floating-item item-headphones">
              <span>🎧</span>
              <small>FOUND</small>
            </div>

            <div className="floating-item item-bag">
              <span>🎒</span>
              <small>LOST</small>
            </div>

            <div className="floating-item item-watch">
              <span>⌚</span>
              <small>FOUND</small>
            </div>

            <div className="phone">
              <div className="phone-speaker" />

              <div className="phone-screen">
                <div className="phone-logo">✦</div>
                <h3>Findora</h3>
                <p>Lost something?</p>

                <span className="phone-subtitle">
                  Let's help you find it.
                </span>

                <div className="phone-search">
                  ⌕ &nbsp; Search for items...
                </div>

                <div className="phone-categories">
                  {categories.map((item) => (
                    <div className="phone-category" key={item.name}>
                      <span>{item.icon}</span>
                      <small>{item.name}</small>
                    </div>
                  ))}
                </div>

                <div className="phone-bottom">⌂　⌕　⊕　♡　♙</div>
              </div>
            </div>

            <span className="sparkle sparkle-one">✧</span>
            <span className="sparkle sparkle-two">♡</span>

            <div className="art-note">
              Small things,
              <br />
              big reunions.
            </div>
          </div>
        </section>

        <section className="features section" id="features">
          <div className="section-heading">
            <span className="eyebrow">WHY FINDORA?</span>

            <h2>
              Small steps. <span>Big reunions.</span>
            </h2>

            <p>A simpler, smarter way to keep your campus connected.</p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="categories-section" id="categories">
          <div className="category-intro">
            <span className="eyebrow">BROWSE & DISCOVER</span>

            <h2>Find it by category.</h2>

            <p>
              From classroom essentials to everyday belongings,
              start your search here.
            </p>

            <Link className="button button-primary" to="/login">
              Browse All Items →
            </Link>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <Link
                className="category-card"
                to="/login"
                key={category.name}
              >
                <span className="category-icon">{category.icon}</span>

                <span className="category-info">
                  <strong>{category.name}</strong>
                  <small>{category.desc}</small>
                </span>

                <span className="category-arrow">›</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="join-banner" id="get-started">
          <div className="join-icon">♡</div>

          <div className="join-copy">
            <h2>Someone can help you find it.</h2>
            <p>You might help someone else find their way back.</p>
          </div>

          <Link className="button button-primary" to="/login">
            Join Findora →
          </Link>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <a className="brand footer-logo" href="#home">
            <span className="brand-icon">✦</span>
            Findora.
          </a>

          <p>Every lost item deserves a way home.</p>
        </div>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#features">About</a>
          <a href="#features">How it works</a>
          <a href="#categories">Categories</a>
        </div>

        <p className="copyright">
          © 2026 Findora. Made with 💜 for our college community.
        </p>
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
