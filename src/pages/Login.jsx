
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

      // Frontend demo navigation
      navigate('/student-dashboard')
    } else {
      if (!adminEmail.trim() || !password.trim()) {
        alert('Please enter your admin email and password.')
        return
      }

      // Frontend demo navigation
      navigate('/admin-dashboard')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <Link to="/" className="back-home">
          ← Back to Home
        </Link>

        <h1>Welcome to Findora 💜</h1>
        <p>Find your belongings, find your way back.</p>

        <div className="role-switch">
          <button
            type="button"
            className={role === 'student' ? 'active' : ''}
            onClick={() => setRole('student')}
          >
            Student
          </button>

          <button
            type="button"
            className={role === 'admin' ? 'active' : ''}
            onClick={() => setRole('admin')}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin}>

          {role === 'student' ? (
            <>
              <label htmlFor="registrationNumber">
                Registration Number
              </label>

              <input
                id="registrationNumber"
                type="text"
                placeholder="Enter registration number"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                required
              />

              <label htmlFor="dateOfBirth">
                Date of Birth
              </label>

              <input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </>
          ) : (
            <>
              <label htmlFor="adminEmail">
                Admin Email
              </label>

              <input
                id="adminEmail"
                type="email"
                placeholder="Enter admin email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
              />

              <label htmlFor="password">
                Password
              </label>

              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
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
            </>
          )}

          <button type="submit" className="login-submit">
            Login →
          </button>

        </form>

        <p className="login-footer">
          Every lost item deserves a way home. 💜
        </p>

      </div>
    </div>
  )
}

export default Login
