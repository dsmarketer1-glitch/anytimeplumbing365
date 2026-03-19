import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Wrench,
  Droplet,
  Flame,
  ShieldCheck,
  Settings,
  ChevronRight,
  Star,
  Globe,
  Facebook,
  Instagram,
  Youtube,
  AlertCircle,
  Download,
  Phone,
  ExternalLink,
  Heart,
  MapPin,
  FileCheck,
  Hammer,
  Languages,
  ArrowLeft,
  ChevronDown,
  LogIn,
  LogOut,
  Mail,
  Lock,
  User
} from 'lucide-react'
import {
  useUser,
  useClerk,
  UserButton
} from '@clerk/react'

// --- Custom Components ---

const Show = ({ when, children, fallback = null }) => {
  const { isLoaded, isSignedIn } = useUser()
  if (!isLoaded) return null
  if (when === 'signed-in') return isSignedIn ? children : fallback
  if (when === 'signed-out') return !isSignedIn ? children : fallback
  return null
}

// --- Constants ---
const GMB_LINK = 'https://g.page/r/CcDN70gxRpn4EAE/review';
const BBB_LINK = 'https://www.bbb.org/us/tx/irving/profile/plumber/anytime-plumbing-365-llc-0875-91347601/leave-a-review';
const WEBSITE_URL = 'https://www.anytimeplumbing365.com/';
const EMERGENCY_TEL = 'tel:469-214-4111';

const DOCUSIGN_VIP = 'https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=16c2d4f2-3140-4678-add6-24438257ec82&env=na4&acct=b33e13d9-7a69-4d92-af62-908423cdddf1&v=2';
const DOCUSIGN_CONTRACT = 'https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=d0abd8da-88d5-4b55-91e4-1e9e3748d6df&env=na4&acct=b33e13d9-7a69-4d92-af62-908423cdddf1&v=2';

// --- Global Branding Components ---

const HubHeader = () => (
  <header className="hub-header">
    <img src="https://taplink.st/a/1/8/e/5/d9571b.png?1" alt="Anytime Plumbing 365 Logo" className="hub-logo" />
    <p className="hub-subtitle">Professional Plumbing Services</p>
  </header>
)

const HubFooter = () => (
  <footer className="hub-footer">
    <div className="footer-divider">
      <div className="line" />
      <ChevronDown size={16} color="#9ca3af" />
      <div className="line" />
    </div>
    <p>© 2024 Anytime Plumbing 365. All rights reserved.</p>
    <p className="legal">Licensed • Bonded • Insured</p>
    <div className="tag-line">
      <div className="tag"><ShieldCheck size={14} /> Trusted Service</div>
      <div className="tag"><Settings size={14} /> 24/7 Availability</div>
    </div>
  </footer>
)

// --- Screens ---

const LoginScreen = ({ onBack, onGoToSignup }) => {
  const clerk = useClerk()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!clerk.loaded) return
    setLoading(true)
    setError(null)

    try {
      const result = await clerk.client.signIn.create({
        identifier: email,
        password,
      })

      if (result.status === 'complete') {
        await clerk.setActive({ session: result.createdSessionId })
      } else {
        console.warn('Login incomplete status:', result.status)
      }
    } catch (err) {
      setError(err.errors?.[0]?.longMessage || err.message || 'Failed to login.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="login-screen"
    >
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={20} /> Back
      </button>

      <HubHeader />

      <div className="login-form">
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>Customer Login</h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label><Mail size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Email Address</label>
            <input
              type="email"
              className="login-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label><Lock size={16} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn-primary-action"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="signup-link">
          Don't have an account? <button onClick={onGoToSignup}>Sign Up</button>
        </div>
      </div>
    </motion.div>
  )
}

const SignupScreen = ({ onBack, onGoToLogin }) => {
  const clerk = useClerk()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    email: '',
    password: ''
  })
  const [verifying, setVerifying] = useState(false)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSignup = async (e) => {
    e.preventDefault()
    if (!clerk.loaded) return
    setLoading(true)
    setError(null)

    try {
      await clerk.client.signUp.create({
        emailAddress: formData.email,
        password: formData.password,
        firstName: formData.name.split(' ')[0],
        lastName: formData.name.split(' ').slice(1).join(' '),
      })

      await clerk.client.signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setVerifying(true)
    } catch (err) {
      setError(err.errors?.[0]?.longMessage || err.message || 'Failed to sign up.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!clerk.loaded) return
    setLoading(true)

    try {
      const completeSignUp = await clerk.client.signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await clerk.setActive({ session: completeSignUp.createdSessionId })
      }
    } catch (err) {
      setError(err.errors?.[0]?.longMessage || err.message || 'Verification failed.')
    } finally {
      setLoading(false)
    }
  }

  if (verifying) {
    return (
      <motion.div className="login-screen">
        <HubHeader />
        <div className="login-form">
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Verify Email</h2>
          <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>We sent a code to {formData.email}</p>
          {error && <div className="auth-error">{error}</div>}
          <form onSubmit={handleVerify}>
            <div className="form-group">
              <input
                type="text"
                className="login-input"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary-action" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </form>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="signup-screen"
    >
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={20} /> Back
      </button>

      <HubHeader />

      <div className="login-form">
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>Create Account</h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="login-input"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              className="login-input"
              placeholder="469-xxx-xxxx"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              className="login-input"
              placeholder="City, State"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="login-input"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="Min 6 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            className="btn-primary-action"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="signup-link">
          Already have an account? <button onClick={onGoToLogin}>Login</button>
        </div>
      </div>
    </motion.div>
  )
}

const DashboardScreen = () => {
  const { user } = useUser()
  const { signOut } = useClerk()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="dashboard-screen"
    >
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome, {user?.firstName || 'Customer'}!</h1>
        <p className="welcome-subtitle">We appreciate your business.</p>
      </div>

      <div className="dashboard-grid">
        <h2 className="section-title">Your Documents</h2>

        <a href={DOCUSIGN_VIP} target="_blank" rel="noreferrer" className="dashboard-card">
          <div className="card-icon"><FileCheck size={28} /></div>
          <div className="card-content">
            <h3>VIP Membership Agreement</h3>
            <p>Review and sign your VIP maintenance plan.</p>
          </div>
          <ChevronRight size={20} color="#d1d5db" style={{ marginLeft: 'auto' }} />
        </a>

        <a href={DOCUSIGN_CONTRACT} target="_blank" rel="noreferrer" className="dashboard-card">
          <div className="card-icon"><Hammer size={28} /></div>
          <div className="card-content">
            <h3>Home Improvement Contract</h3>
            <p>Official contract for your plumbing project.</p>
          </div>
          <ChevronRight size={20} color="#d1d5db" style={{ marginLeft: 'auto' }} />
        </a>
      </div>

      <div className="logout-bar">
        <button className="btn-logout" onClick={() => signOut()}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </motion.div>
  )
}

const HubScreen = ({ onReviewClick, onWebsiteClick, onEmergencyClick, installPrompt, onInstallClick, onGoToDashboard, onGoToLogin }) => {
  const { user, isLoaded } = useUser()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="hub-container"
    >
      {/* Top Header Controls */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%', gap: '1rem' }}>
        <Show when="signed-in">
          <UserButton afterSignOutUrl="/" />
        </Show>

        {installPrompt && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="btn-hub"
            onClick={onInstallClick}
            style={{ backgroundColor: '#10b981', color: 'white', padding: '0.5rem 1rem', width: 'auto', borderRadius: '2rem', fontSize: '0.8rem', boxShadow: 'none' }}
          >
            <Download size={16} style={{ marginRight: '0.5rem' }} /> INSTALL
          </motion.button>
        )}
      </div>

      {/* Top Emergency */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="btn-hub primary pulse"
        onClick={onEmergencyClick}
      >
        <div className="icon-wrapper"><Phone size={24} /></div>
        <span>EMERGENCY CALL</span>
      </motion.button>

      <HubHeader />

      {/* Reviews Section */}
      <section className="hub-section">
        <h2 className="section-title">Leave a Review</h2>
        <button className="btn-hub primary" onClick={() => onReviewClick('google')}>
          <div className="icon-wrapper"><Globe size={24} /></div>
          <span>Google - Leave Us a Review</span>
        </button>
        <button className="btn-hub primary" onClick={() => onReviewClick('bbb')}>
          <div className="icon-wrapper"><ShieldCheck size={24} /></div>
          <span>BBB - Leave Us a Review</span>
        </button>
      </section>

      {/* Social Media Section */}
      <section className="hub-section">
        <h2 className="section-title">Follow Us</h2>
        <button className="btn-hub primary" onClick={() => window.open('https://www.facebook.com/anytimeplumbing365', '_blank')}>
          <div className="icon-wrapper"><Facebook size={24} /></div>
          <span>Facebook - Follow, Like & Review</span>
        </button>
        <button className="btn-hub primary" onClick={() => window.open('https://www.instagram.com/anytimeplumbing365', '_blank')}>
          <div className="icon-wrapper"><Instagram size={24} /></div>
          <span>Instagram - Follow Us</span>
        </button>
        <button className="btn-hub primary" onClick={() => window.open('https://www.youtube.com/@AnyTimePlumbingDrainCleaning', '_blank')}>
          <div className="icon-wrapper"><Youtube size={24} /></div>
          <span>YouTube - Subscribe to our channel</span>
        </button>
      </section>

      {/* Contracts Section */}
      <section className="hub-section">
        <h2 className="section-title">Contracts & Agreements</h2>
        <Show when="signed-in">
          <button className="btn-hub secondary" onClick={onGoToDashboard}>
            <div className="icon-wrapper"><FileCheck size={24} /></div>
            <span>Sign VIP Agreement</span>
          </button>
          <button className="btn-hub secondary" onClick={onGoToDashboard}>
            <div className="icon-wrapper"><Hammer size={24} /></div>
            <span>Home Improvement Contract</span>
          </button>
        </Show>
        <Show when="signed-out">
          <button className="btn-hub secondary" onClick={onGoToLogin}>
            <div className="icon-wrapper"><FileCheck size={24} /></div>
            <span>Sign VIP Agreement</span>
          </button>
          <button className="btn-hub secondary" onClick={onGoToLogin}>
            <div className="icon-wrapper"><Hammer size={24} /></div>
            <span>Home Improvement Contract</span>
          </button>
        </Show>
      </section>

      {/* Contact Section */}
      <section className="hub-section">
        <h2 className="section-title">Get In Touch</h2>
        <button className="btn-hub primary" onClick={() => window.open(EMERGENCY_TEL)}>
          <div className="icon-wrapper"><Phone size={24} /></div>
          <span>Contact Us</span>
        </button>
        <button className="btn-hub primary" onClick={onWebsiteClick}>
          <div className="icon-wrapper"><Languages size={24} /></div>
          <span>Our Website</span>
        </button>
      </section>

      <HubFooter />
    </motion.div>
  )
}

const RatingScreen = ({ onBack, onSubmit, platform }) => {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')

  const handleRating = (val) => setRating(val)

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      className="rating-screen"
    >
      <div style={{ alignSelf: 'flex-start' }}>
        <button onClick={onBack} className="back-btn" style={{ margin: 0 }}>
          <ArrowLeft size={24} />
        </button>
      </div>

      <HubHeader />

      <div style={{ marginTop: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>How did we do?</h1>
        <p style={{ color: '#6b7280', marginTop: '0.5rem', fontSize: '1.1rem' }}>
          Thank you for choosing Anytime Plumbing 365. Please take a moment to rate your experience on {platform === 'google' ? 'Google' : 'BBB'}.
        </p>
      </div>

      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((s) => (
          <button key={s} className="star-btn" onClick={() => handleRating(s)}>
            <Star
              size={42}
              fill={rating >= s ? "#cc242b" : "none"}
              stroke={rating >= s ? "#cc242b" : "#d1d5db"}
              strokeWidth={2}
            />
            <span className="star-sub">{s}</span>
          </button>
        ))}
      </div>

      {rating > 0 && rating <= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="feedback-container"
        >
          <label className="feedback-label">Tell us more (Optional)</label>
          <textarea
            className="feedback-textarea"
            placeholder="Share your experience..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </motion.div>
      )}

      <div className="action-buttons">
        <button className="btn-secondary-outline" onClick={onBack}>Skip</button>
        <button
          className="btn-primary-action"
          onClick={() => onSubmit(rating, feedback)}
          disabled={rating === 0}
          style={{ opacity: rating === 0 ? 0.5 : 1 }}
        >
          {rating === 5 ? (platform === 'google' ? 'Open Google Review' : 'Open BBB Review') : 'Submit Rating'}
        </button>
      </div>

      <HubFooter />
    </motion.div>
  )
}

const ThankYouScreen = ({ onRestart }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="rating-screen"
    style={{ justifyContent: 'center' }}
  >
    <div style={{ backgroundColor: '#22c55e', color: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', marginBottom: '2rem' }}>
      ✓
    </div>
    <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Thank You!</h1>
    <p style={{ color: '#6b7280', marginTop: '0.5rem', marginBottom: '2.5rem', fontSize: '1.2rem' }}>
      Your feedback has been received. We appreciate your time.
    </p>
    <button className="btn-primary-action" onClick={onRestart} style={{ width: '200px' }}>Start Over</button>
  </motion.div>
)

// --- Main App ---

export default function App() {
  const [step, setStep] = useState('hub') // 'hub', 'rating', 'thank-you', 'login', 'signup', 'dashboard'
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [selectedPlatform, setSelectedPlatform] = useState('google') // 'google', 'bbb'
  const { user, isLoaded, isSignedIn } = useUser()

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  useEffect(() => {
    // Automatically move to dashboard if signed in and on auth screens
    if (isLoaded && isSignedIn && (step === 'login' || step === 'signup')) {
      setStep('dashboard')
    }
    // Automatically move to hub if signed out and on dashboard
    if (isLoaded && !isSignedIn && step === 'dashboard') {
      setStep('hub')
    }
  }, [isLoaded, isSignedIn, step])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    setDeferredPrompt(null)
  }

  const handleReviewClick = (platform) => {
    setSelectedPlatform(platform)
    setStep('rating')
  }

  const handleReviewSubmit = (rating, feedback) => {
    if (rating === 5) {
      if (selectedPlatform === 'google') {
        window.open(GMB_LINK, '_blank')
      } else {
        window.open(BBB_LINK, '_blank')
      }
      setStep('thank-you')
    } else {
      console.log(`Feedback submitted for ${selectedPlatform}:`, { rating, feedback })
      setStep('thank-you')
    }
  }

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {step === 'hub' && (
          <HubScreen
            key="hub"
            onReviewClick={handleReviewClick}
            onWebsiteClick={() => window.open(WEBSITE_URL, '_blank')}
            onEmergencyClick={() => window.open(EMERGENCY_TEL)}
            installPrompt={!!deferredPrompt}
            onInstallClick={handleInstallClick}
            onGoToDashboard={() => setStep('dashboard')}
            onGoToLogin={() => setStep('login')}
          />
        )}
        {step === 'login' && (
          <LoginScreen
            key="login"
            onBack={() => setStep('hub')}
            onGoToSignup={() => setStep('signup')}
          />
        )}
        {step === 'signup' && (
          <SignupScreen
            key="signup"
            onBack={() => setStep('hub')}
            onGoToLogin={() => setStep('login')}
          />
        )}
        {step === 'dashboard' && (
          <Show when="signed-in">
            <DashboardScreen key="dashboard" />
          </Show>
        )}
        {step === 'rating' && (
          <RatingScreen
            key="rating"
            platform={selectedPlatform}
            onBack={() => setStep('hub')}
            onSubmit={handleReviewSubmit}
          />
        )}
        {step === 'thank-you' && (
          <ThankYouScreen
            key="thank-you"
            onRestart={() => setStep('hub')}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
