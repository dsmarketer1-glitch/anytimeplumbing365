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
  Heart
} from 'lucide-react'

// --- PWA Install Prompt Component ---

const InstallPrompt = ({ deferredPrompt, onDismiss }) => {
  if (!deferredPrompt) return null

  const handleInstall = () => {
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }
      onDismiss()
    })
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="install-popup glass-pane"
    >
      <div className="install-content">
        <Download size={32} className="install-icon" />
        <div className="install-text">
          <h3>Get the App</h3>
          <p>Install Anytime Plumbing 365 on your phone for a better experience!</p>
        </div>
        <div className="install-actions">
          <button className="btn-secondary" onClick={onDismiss}>Later</button>
          <button className="btn-primary-small" onClick={handleInstall}>Install Now</button>
        </div>
      </div>
    </motion.div>
  )
}

// --- Components ---

const Header = () => (
  <motion.header
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="header"
  >
    <div className="logo-container">
      <img src="https://taplink.st/a/1/8/e/5/d9571b.png?1" alt="Anytime Plumbing 365 Logo" className="logo" />
    </div>
    <h1 className="biz-name">Anytime Plumbing 365</h1>
  </motion.header>
)

const HeroScreen = ({ onRate, onVisitWebsite, onCallEmergency }) => {
  const [hover, setHover] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="screen hero-screen"
    >
      <div className="hero-content">
        <motion.div
          className="rating-box glass-pane"
          whileHover={{ y: -5 }}
        >
          <h2 className="screen-title">Review us!</h2>
          <p className="screen-subtitle">How was your technician today?</p>

          <div className="stars-container larger">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.div
                key={star}
                whileHover={{ scale: 1.3, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => onRate(star)}
                className={`star ${star <= (hover) ? 'hovered' : ''}`}
              >
                <Star
                  size={48}
                  fill={star <= (hover) ? "#AA0428" : "none"}
                  stroke={star <= (hover) ? "#AA0428" : "#888"}
                  strokeWidth={2}
                />
              </motion.div>
            ))}
          </div>
          <p className="tip-notice light">
            <span>Your feedback helps provide a $20 tip!</span>
          </p>
        </motion.div>

        <div className="action-grid">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="action-card website-btn"
            onClick={onVisitWebsite}
          >
            <div className="action-icon-circle">
              <ExternalLink size={24} />
            </div>
            <span>Visit Website</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="action-card emergency-btn pulse"
            onClick={onCallEmergency}
          >
            <div className="action-icon-circle emergency">
              <Phone size={24} />
            </div>
            <span>Emergency Call</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

const InternalReview = ({ onSubmit, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="screen"
    >
      <div className="info-badge">
        <AlertCircle size={20} />
        <span>We want to make it right</span>
      </div>
      <h2 className="screen-title text-left">Share your feedback</h2>
      <p className="screen-subtitle text-left">How can we improve our service?</p>

      <textarea
        className="feedback-input"
        placeholder="Tell us what went wrong..."
      />

      <div className="btn-group">
        <button className="btn-text" onClick={onBack}>Back</button>
        <button className="btn-primary" onClick={onSubmit}>
          Submit Feedback
        </button>
      </div>
    </motion.div>
  )
}

const SocialLinks = ({ onBack }) => {
  const links = [
    { name: 'Google Review', icon: <Globe />, url: 'https://g.page/r/CcDN70gxRpn4EAE/review' },
    { name: 'Facebook', icon: <Facebook />, url: 'https://www.facebook.com/anytimeplumbing365' },
    { name: 'Instagram', icon: <Instagram />, url: 'https://www.instagram.com/anytimeplumbing365' },
    { name: 'YouTube', icon: <Youtube />, url: 'https://www.youtube.com/@AnyTimePlumbingDrainCleaning' },
    { name: 'BBB Review', icon: <ShieldCheck />, url: 'https://www.bbb.org/us/tx/irving/profile/plumber/anytime-plumbing-365-llc-0875-91347601/leave-a-review' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="screen centered"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="celebration"
      >
        <Heart size={64} color="#AA0428" fill="#AA0428" />
      </motion.div>
      <h2 className="screen-title">You're Awesome!</h2>
      <p className="screen-subtitle">Thank you for the 5-star rating. Please support us on social media!</p>

      <div className="social-list">
        {links.map((link, i) => (
          <motion.a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="social-btn glass-pane"
            whileHover={{ scale: 1.03, backgroundColor: 'rgba(255, 255, 255, 1)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="social-icon">{link.icon}</span>
            <span>{link.name}</span>
          </motion.a>
        ))}
      </div>

      <div className="btn-group centered-group">
        <button className="btn-text" onClick={onBack}>Back</button>
        <a href="https://www.anytimeplumbing365.com/" target="_blank" rel="noreferrer" className="web-link">anytimeplumbing365.com</a>
      </div>
    </motion.div>
  )
}

const ThankYouFinal = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="screen centered"
  >
    <div className="success-icon">✓</div>
    <h2 className="screen-title">Thank You!</h2>
    <p className="screen-subtitle">Your feedback has been received. We appreciate your time.</p>
    <button className="btn-primary" onClick={() => window.location.reload()}>Start Over</button>
  </motion.div>
)

// --- Main App ---

function App() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({ rating: null })
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallPopup, setShowInstallPopup] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPopup(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInitialRating = (rating) => {
    setData({ ...data, rating })
    if (rating === 5) {
      setStep(4) // Social flow
    } else {
      setStep(3) // Internal flow
    }
  }

  return (
    <div className="App">
      <div className="bg-gradient" />
      <Header />

      <main className="main-content">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <HeroScreen
              key="hero"
              onRate={handleInitialRating}
              onVisitWebsite={() => window.open('https://www.anytimeplumbing365.com/', '_blank')}
              onCallEmergency={() => window.open('tel:469-214-4111')}
            />
          )}
          {step === 3 && (
            <InternalReview
              key="step3"
              onSubmit={() => setStep(5)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 4 && (
            <SocialLinks key="step4" onBack={() => setStep(1)} />
          )}
          {step === 5 && (
            <ThankYouFinal key="step5" />
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showInstallPopup && (
          <InstallPrompt
            deferredPrompt={deferredPrompt}
            onDismiss={() => setShowInstallPopup(false)}
          />
        )}
      </AnimatePresence>

      <style>{`
        .header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .logo-container {
          width: 75px;
          height: 75px;
          margin: 0 auto 1rem;
          background: white;
          border-radius: 50%;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(170, 4, 40, 0.2);
          border: 1px solid rgba(170, 4, 40, 0.1);
        }
        .logo {
          max-width: 100%;
          border-radius: 50%;
        }
        .biz-name {
          font-size: 1.5rem;
          font-weight: 800;
          color: #AA0428;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 0.5rem;
        }
        .screen {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .hero-screen {
          padding-top: 0.5rem;
        }
        .centered {
          align-items: center;
          text-align: center;
        }
        .screen-title {
          font-size: 1.7rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
          color: var(--text-main);
        }
        .screen-subtitle {
          color: var(--text-muted);
          margin-bottom: 2rem;
          font-size: 1rem;
        }
        .rating-box {
          padding: 3rem 1.5rem;
          text-align: center;
          margin-bottom: 2rem;
          background: white !important;
        }
        .stars-container {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
          margin-bottom: 2rem;
        }
        .star {
          cursor: pointer;
          transition: transform 0.2s;
        }
        .tip-notice.light {
          font-weight: 700;
          color: var(--primary);
          font-size: 0.9rem;
          background: rgba(170, 4, 40, 0.08);
          padding: 0.7rem 1.5rem;
          border-radius: 2rem;
          display: inline-block;
        }
        .action-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }
        .action-card {
          background: white;
          border: 1px solid var(--glass-border);
          padding: 1.8rem 1rem;
          border-radius: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
          cursor: pointer;
          box-shadow: var(--shadow-subtle);
          color: var(--text-main);
          font-weight: 700;
          font-size: 1rem;
        }
        .action-icon-circle {
          width: 56px;
          height: 56px;
          background: rgba(170, 4, 40, 0.05);
          color: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .action-icon-circle.emergency {
          background: var(--primary);
          color: white;
        }
        .pulse {
          animation: pulse-border 2s infinite;
        }
        @keyframes pulse-border {
          0% { box-shadow: 0 0 0 0 rgba(170, 4, 40, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(170, 4, 40, 0); }
          100% { box-shadow: 0 0 0 0 rgba(170, 4, 40, 0); }
        }

        .btn-group {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          gap: 1rem;
        }
        .centered-group {
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .btn-text {
          background: none;
          border: none;
          color: var(--text-muted);
          font-weight: 600;
          padding: 1rem;
          cursor: pointer;
        }
        .btn-primary {
          flex: 1;
        }

        .info-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(170, 4, 40, 0.08);
          color: var(--primary);
          padding: 0.6rem 1.2rem;
          border-radius: 2rem;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1.2rem;
          align-self: flex-start;
        }
        .feedback-input {
          flex: 1;
          background: white;
          border: 1px solid var(--glass-border);
          border-radius: 1.25rem;
          padding: 1.5rem;
          color: var(--text-main);
          font-family: inherit;
          font-size: 1.1rem;
          resize: none;
          min-height: 200px;
          margin-bottom: 2.5rem;
          box-shadow: var(--shadow-subtle);
        }
        .feedback-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(170, 4, 40, 0.1);
        }

        .social-list {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        .social-btn {
          text-decoration: none;
          color: var(--text-main);
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.3rem;
          font-weight: 700;
          border-radius: 1.25rem;
          background: white;
          box-shadow: var(--shadow-subtle);
          border: 1px solid rgba(0,0,0,0.05);
          transition: all 0.2s ease;
        }
        .social-btn:hover {
          background: white !important;
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(170, 4, 40, 0.1);
        }
        .social-icon {
          color: var(--primary);
        }
        .celebration {
          margin-bottom: 2rem;
        }
        .web-link {
          color: var(--primary);
          text-decoration: none;
          font-weight: 800;
          letter-spacing: 0.5px;
          border-bottom: 2px solid var(--primary);
          padding-bottom: 2px;
          font-size: 1.1rem;
        }
        .success-icon {
          width: 90px;
          height: 90px;
          background: #4bb543;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          color: white;
          margin-bottom: 2.5rem;
          box-shadow: 0 10px 30px rgba(75, 181, 67, 0.3);
        }
        .text-left { text-align: left; }

        /* PWA Install Styles */
        .install-popup {
          position: fixed;
          bottom: 1.5rem;
          left: 1rem;
          right: 1rem;
          z-index: 1000;
          padding: 1.5rem;
          background: white;
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
          border: 1px solid rgba(170, 4, 40, 0.1);
        }
      `}</style>
    </div>
  )
}

export default App
