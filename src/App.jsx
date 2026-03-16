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
  ChevronDown
} from 'lucide-react'

// --- Constants ---
const GMB_LINK = 'https://g.page/r/CcDN70gxRpn4EAE/review';
const BBB_LINK = 'https://www.bbb.org/us/tx/irving/profile/plumber/anytime-plumbing-365-llc-0875-91347601/leave-a-review';
const WEBSITE_URL = 'https://www.anytimeplumbing365.com/';
const EMERGENCY_TEL = 'tel:469-214-4111';

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

const HubScreen = ({ onReviewClick, onWebsiteClick, onEmergencyClick, installPrompt, onInstallClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="hub-container"
    >
      {/* Top Emergency */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="btn-hub primary pulse"
        onClick={onEmergencyClick}
      >
        <div className="icon-wrapper"><Phone size={24} /></div>
        <span>EMERGENCY CALL</span>
      </motion.button>

      {/* Install App Button (Conditional) */}
      {installPrompt && (
        <motion.button
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileTap={{ scale: 0.98 }}
          className="btn-hub secondary"
          onClick={onInstallClick}
          style={{ backgroundColor: '#10b981' }} // Green for install
        >
          <div className="icon-wrapper"><Download size={24} /></div>
          <span>INSTALL APP</span>
        </motion.button>
      )}

      <HubHeader />

      {/* Reviews Section */}
      <section className="hub-section">
        <h2 className="section-title">Leave a Review</h2>
        <button className="btn-hub primary" onClick={onReviewClick}>
          <div className="icon-wrapper"><Globe size={24} /></div>
          <span>Google - Leave Us a Review</span>
        </button>
        <button className="btn-hub primary" onClick={() => window.open(BBB_LINK, '_blank')}>
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
        <button className="btn-hub secondary">
          <div className="icon-wrapper"><FileCheck size={24} /></div>
          <span>Sign VIP Agreement</span>
        </button>
        <button className="btn-hub secondary">
          <div className="icon-wrapper"><Hammer size={24} /></div>
          <span>Home Improvement Contract</span>
        </button>
      </section>

      {/* Contact Section */}
      <section className="hub-section">
        <h2 className="section-title">Get In Touch</h2>
        <button className="btn-hub primary" onClick={() => window.open('mailto:info@anytimeplumbing365.com')}>
          <div className="icon-wrapper"><Phone size={24} /></div>
          <span>Contact Us</span>
        </button>
        <button className="btn-hub primary" onClick={() => window.open('https://maps.app.goo.gl/hGzN4d6z2q5y9u7q6', '_blank')}>
          <div className="icon-wrapper"><MapPin size={24} /></div>
          <span>Irving Location</span>
        </button>
        <button className="btn-hub primary" onClick={() => window.open('https://maps.app.goo.gl/Fk9zZ7m7vU7mZ8Z8Z', '_blank')}>
          <div className="icon-wrapper"><MapPin size={24} /></div>
          <span>Garland Location</span>
        </button>
        <button className="btn-hub primary" onClick={onWebsiteClick}>
          <div className="icon-wrapper"><Languages size={24} /></div>
          <span>Our Website</span>
        </button>
      </section>

      {/* Bottom Emergency */}
      <section style={{ marginTop: '1rem' }}>
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="btn-hub primary"
          onClick={onEmergencyClick}
        >
          <div className="icon-wrapper"><Phone size={24} /></div>
          <span>EMERGENCY CALL</span>
        </motion.button>
      </section>

      <HubFooter />
    </motion.div>
  )
}

const RatingScreen = ({ onBack, onSubmit }) => {
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
        <button onClick={onBack} style={{ background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer' }}>
          <ArrowLeft size={24} />
        </button>
      </div>

      <HubHeader />

      <div style={{ marginTop: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>How did we do?</h1>
        <p style={{ color: '#6b7280', marginTop: '0.5rem', fontSize: '1.1rem' }}>
          Thank you for choosing Anytime Plumbing 365. Please take a moment to rate your experience.
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
          {rating === 5 ? 'Open Google Review' : 'Submit Rating'}
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
  const [step, setStep] = useState('hub') // 'hub', 'rating', 'thank-you'
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e)
      console.log('beforeinstallprompt event fired')
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice
    console.log(`User responded to the install prompt with: ${outcome}`)

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null)
  }

  const handleReviewSubmit = (rating, feedback) => {
    if (rating === 5) {
      window.open(GMB_LINK, '_blank')
      setStep('thank-you')
    } else {
      // Here you would typically send the feedback to a backend
      console.log('Feedback submitted:', { rating, feedback })
      setStep('thank-you')
    }
  }

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {step === 'hub' && (
          <HubScreen
            key="hub"
            onReviewClick={() => setStep('rating')}
            onWebsiteClick={() => window.open(WEBSITE_URL, '_blank')}
            onEmergencyClick={() => window.open(EMERGENCY_TEL)}
            installPrompt={!!deferredPrompt}
            onInstallClick={handleInstallClick}
          />
        )}
        {step === 'rating' && (
          <RatingScreen
            key="rating"
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
