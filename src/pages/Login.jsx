
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const [role, setRole] = useState('student')
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  function handleLogin(e) {
    e.preventDefault()

    if (role === 'student') {
      if (!registrationNumber.trim() || !dateOfBirth) {
        alert('Please enter your registration number and date of birth.')
        return
      }

      navigate('/student-dashboard')
    } else {
      if (!adminEmail.trim() || !password.trim()) {
        alert('Please enter your admin email and password.')
        return
      }

      navigate('/admin-dashboard')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <Link to="/" className="back-home">
          <span>←</span> Back to Home
        </Link>

        <div className="login-brand">
          <span className="login-brand-icon">F</span>
          <span>Findora<span className="login-brand-dot">.</span></span>
        </div>

        <div className="login-heading">
          <span className="login-eyebrow">COLLEGE LOST & FOUND PORTAL</span>
          <h1>Welcome back</h1>
          <p>Sign in to access the Findora platform.</p>
        </div>

        <div className="role-switch">
          <button
            type="button"
            className={role === 'student' ? 'active' : ''}
            onClick={() => setRole('student')}
          >
            Student Login
          </button>

          <button
            type="button"
            className={role === 'admin' ? 'active' : ''}
            onClick={() => setRole('admin')}
          >
            Admin Login
          </button>
        </div>

        <form onSubmit={handleLogin}>

          {role === 'student' ? (
            <>
              <div className="form-group">
                <label htmlFor="registrationNumber">
                  Registration Number
                </label>
                <input
                  id="registrationNumber"
                  type="text"
                  placeholder="Enter your registration number"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="adminEmail">Admin Email</label>
                <input
                  id="adminEmail"
                  type="email"
                  placeholder="Enter your admin email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>

                <div className="password-wrapper">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            </>
          )}

          <button type="submit" className="login-submit">
            Sign In <span>→</span>
          </button>
        </form>

        <div className="login-divider"></div>

        <p className="login-footer">
          College Lost & Found Management System
        </p>

        <Link to="/" className="login-home-link">
          Return to Findora Homepage
        </Link>

      </div>
    </div>
  )
}

export default Login
