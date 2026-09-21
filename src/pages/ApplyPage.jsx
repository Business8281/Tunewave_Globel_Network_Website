import React, { useState } from 'react';
import Logo from '../components/Logo';
import {
  Music, Building2, Globe, ArrowRight, ArrowLeft,
  Check, CheckCircle2, Plus, Trash2, ShieldCheck,
  Sparkles, ExternalLink, AlertCircle, Sun, Moon,
  ChevronDown
} from 'lucide-react';


const COUNTRY_CODES = [
  { flag: '🇮🇳', code: '+91', country: 'India' },
  { flag: '🇺🇸', code: '+1', country: 'United States' },
  { flag: '🇬🇧', code: '+44', country: 'United Kingdom' },
  { flag: '🇨🇦', code: '+1', country: 'Canada' },
  { flag: '🇦🇺', code: '+61', country: 'Australia' },
  { flag: '🇩🇪', code: '+49', country: 'Germany' },
  { flag: '🇫🇷', code: '+33', country: 'France' },
  { flag: '🇦🇪', code: '+971', country: 'United Arab Emirates' },
  { flag: '🇳🇬', code: '+234', country: 'Nigeria' },
  { flag: '🇧🇷', code: '+55', country: 'Brazil' },
  { flag: '🇯🇵', code: '+81', country: 'Japan' },
  { flag: '🌍', code: '+0', country: 'Other' },
];

const COUNTRY_LIST = [
  'India',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'United Arab Emirates',
  'Nigeria',
  'Brazil',
  'Japan',
  'Singapore',
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Argentina',
  'Armenia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Bulgaria',
  'Cambodia',
  'Cameroon',
  'Chile',
  'China',
  'Colombia',
  'Costa Rica',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'Estonia',
  'Ethiopia',
  'Fiji',
  'Finland',
  'Georgia',
  'Ghana',
  'Greece',
  'Guatemala',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kuwait',
  'Latvia',
  'Lebanon',
  'Lithuania',
  'Luxembourg',
  'Malaysia',
  'Maldives',
  'Malta',
  'Mauritius',
  'Mexico',
  'Moldova',
  'Monaco',
  'Morocco',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Norway',
  'Oman',
  'Pakistan',
  'Panama',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Saudi Arabia',
  'Serbia',
  'Slovakia',
  'Slovenia',
  'South Africa',
  'South Korea',
  'Spain',
  'Sri Lanka',
  'Sweden',
  'Switzerland',
  'Taiwan',
  'Thailand',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Uganda',
  'Ukraine',
  'Uruguay',
  'Uzbekistan',
  'Vietnam',
  'Zambia',
  'Zimbabwe',
  'Other'
];


const GENRES = [
  'Pop', 'Hip-Hop / Rap', 'Electronic / Dance / EDM', 'R&B / Soul',
  'Rock / Alternative', 'Bollywood / Indian Pop / Desi', 'Punjabi / Folk',
  'Classical / Ambient', 'Lo-Fi / Chillhop', 'Latin / Reggaeton',
  'Acoustic / Singer-Songwriter', 'Other'
];

export default function ApplyPage({ onNavigate, theme = 'dark', onToggleTheme }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const isLight = theme === 'light';

  const handleToggleTheme = () => {
    if (onToggleTheme) {
      onToggleTheme();
    } else {
      const nextTheme = theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', nextTheme);
      try {
        localStorage.setItem('Tunewave_theme', nextTheme);
      } catch (e) {}
    }
  };

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    countryFlag: '🇮🇳',
    phone: '',
    website: '',
    // Step 2: Address
    streetAddress: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    // Step 3: Role
    role: 'artist', // 'artist' | 'label'
    artistName: '',
    // Step 4: Demo Links
    demoLinks: [''],
    // Step 5: Social Media
    instagram: '',
    tiktok: '',
    twitter: '',
    facebook: '',
    // Step 6: Details & Consent
    genre: 'Pop',
    estimatedReleases: '1–5 Tracks',
    currentDistributor: '',
    notes: '',
    rightsConfirmed: false,
    termsAgreed: false,
  });

  const [countryMenuOpen, setCountryMenuOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errorMsg) setErrorMsg('');
  };

  // Demo Links Handlers
  const handleDemoLinkChange = (index, value) => {
    const updated = [...formData.demoLinks];
    updated[index] = value;
    setFormData(prev => ({ ...prev, demoLinks: updated }));
    if (errorMsg) setErrorMsg('');
  };

  const addDemoLink = () => {
    setFormData(prev => ({ ...prev, demoLinks: [...prev.demoLinks, ''] }));
  };

  const removeDemoLink = (index) => {
    if (formData.demoLinks.length <= 1) return;
    const updated = formData.demoLinks.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, demoLinks: updated }));
  };

  // Step Validation
  const validateStep = (step) => {
    setErrorMsg('');
    if (step === 1) {
      if (!formData.firstName.trim()) return 'Please enter your first name.';
      if (!formData.lastName.trim()) return 'Please enter your last name.';
      if (!formData.email.trim() || !formData.email.includes('@')) return 'Please provide a valid email address.';
      if (!formData.phone.trim()) return 'Please provide a contact phone number.';
      if (formData.phone.length !== 10) return 'Phone number must be exactly 10 digits.';
    }
    if (step === 2) {
      if (!formData.streetAddress.trim()) return 'Please enter your street address.';
      if (!formData.city.trim()) return 'Please enter your city.';
      if (!formData.state.trim()) return 'Please enter your state or province.';
      if (!formData.postalCode.trim()) return 'Please enter your postal/PIN code.';
      if (formData.postalCode.length !== 6) return 'Postal / PIN code must be exactly 6 digits.';
      if (!formData.country.trim()) return 'Please select your country.';
    }
    if (step === 3) {
      if (!formData.artistName.trim()) {
        return formData.role === 'artist' 
          ? 'Please enter your Artist / Band Name.' 
          : 'Please enter your Record Label / Imprint Name.';
      }
    }
    if (step === 4) {
      const validLinks = formData.demoLinks.filter(link => link.trim().length > 0);
      if (validLinks.length === 0) {
        return 'Please provide at least one demo or streaming link so our A&R team can listen.';
      }
    }
    if (step === 5) {
      const hasSocial = formData.instagram.trim() || formData.tiktok.trim() || formData.twitter.trim() || formData.facebook.trim();
      if (!hasSocial) {
        return 'At least one social media link is required so we can verify your identity.';
      }
    }
    if (step === 6) {
      if (!formData.rightsConfirmed) {
        return 'Please confirm you own 100% or hold exclusive rights to your music recordings.';
      }
      if (!formData.termsAgreed) {
        return 'Please accept the Distribution Terms of Service to submit your application.';
      }
    }
    return null;
  };

  const handleNext = () => {
    const error = validateStep(currentStep);
    if (error) {
      setErrorMsg(error);
      return;
    }
    setErrorMsg('');
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    setErrorMsg('');
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const generateUniqueReferenceId = () => {
    let existingIds = [];
    try {
      existingIds = JSON.parse(localStorage.getItem('Tunewave_generated_ref_ids') || '[]');
    } catch (e) {}

    let newId = '';
    let attempts = 0;
    do {
      // Generates a collision-resistant unique reference number prefixed with TW- (e.g. TW-72948163)
      const timeEntropy = Date.now().toString().slice(-4);
      const randomEntropy = Math.floor(1000 + Math.random() * 9000);
      newId = `TW-${timeEntropy}${randomEntropy}`;
      attempts++;
    } while (existingIds.includes(newId) && attempts < 50);

    try {
      existingIds.push(newId);
      localStorage.setItem('Tunewave_generated_ref_ids', JSON.stringify(existingIds.slice(-200)));
    } catch (e) {}

    return newId;
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      const generatedId = generateUniqueReferenceId();
      setApplicationId(generatedId);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
  };

  const stepTitles = [
    'Personal Info',
    'Address',
    'Role',
    'Demo Links',
    'Social Media',
    'Final Details'
  ];

  const [activeNav, setActiveNav] = useState('/distribute');

  const NAV_LINKS = [
    { label: 'Distribute', path: '/distribute' },
    { label: 'Monetize', path: '/monetize' },
    { label: 'Publishing', path: '/publishing' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'About', path: '/about' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: isLight ? '#F8FAFC' : '#07090E',
      color: isLight ? '#0F172A' : '#FFFFFF',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      position: 'relative',
      overflowX: 'hidden',
      paddingBottom: 70
    }}>
      {/* Background Ambience Bloom (Tunewave Cyan Glow) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100vw',
        maxWidth: 1300,
        height: 520,
        background: isLight 
          ? 'radial-gradient(circle at 50% 0%, rgba(0, 229, 255, 0.08) 0%, rgba(0, 126, 167, 0.04) 50%, transparent 80%)'
          : 'radial-gradient(circle at 50% -10%, rgba(0, 229, 255, 0.16) 0%, rgba(0, 126, 167, 0.08) 50%, transparent 80%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* ── TOP NAVBAR MATCHING 2ND IMAGE (TUNEWAVE WEBSITE CONTENT & BRAND COLOURS) ─── */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: `1px solid ${isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)'}`,
        background: isLight ? 'rgba(255, 255, 255, 0.95)' : '#000000',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(16px, 3vw, 36px)',
          maxWidth: 1400,
          height: 72,
          margin: '0 auto',
          gap: 24
        }}>
          {/* Brand Logo on Left */}
          <div 
            onClick={() => onNavigate('/')} 
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}
          >
            <Logo size="medium" theme={theme} />
          </div>

          {/* Website Navigation Links (Matching 2nd Image Layout & Typography) */}
          <nav className="apply-nav-links" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(20px, 2.5vw, 36px)',
            marginLeft: 32,
            marginRight: 'auto',
            height: '100%'
          }}>
            {NAV_LINKS.map(link => {
              const isActive = activeNav === link.path;
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => {
                    setActiveNav(link.path);
                    onNavigate(link.path);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: isActive 
                      ? (isLight ? '#007EA7' : '#FFFFFF') 
                      : (isLight ? '#475569' : 'rgba(255, 255, 255, 0.72)'),
                    fontSize: '1.02rem',
                    fontWeight: isActive ? 700 : 600,
                    cursor: 'pointer',
                    padding: '8px 2px',
                    position: 'relative',
                    letterSpacing: '-0.01em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    height: '100%',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.color = isLight ? '#007EA7' : '#FFFFFF';
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.color = isLight ? '#475569' : 'rgba(255, 255, 255, 0.72)';
                  }}
                >
                  <span>{link.label}</span>

                  {/* Active Indicator Underline (Matching 2nd Image with Tunewave Cyan Brand Colour) */}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: 'linear-gradient(90deg, #00F2FE 0%, #00E5FF 100%)',
                      borderRadius: 3,
                      boxShadow: '0 0 10px rgba(0, 229, 255, 0.85)'
                    }} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Mode Switch & Login Pill Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            {/* Theme / Mode Switch Option */}
            <button
              type="button"
              onClick={handleToggleTheme}
              title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)',
                border: `1px solid ${isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.18)'}`,
                color: isLight ? '#0F172A' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isLight ? '0 2px 6px rgba(0,0,0,0.03)' : '0 4px 14px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#00E5FF';
                e.currentTarget.style.color = '#00E5FF';
                e.currentTarget.style.background = isLight ? 'rgba(0, 229, 255, 0.08)' : 'rgba(0, 229, 255, 0.12)';
                e.currentTarget.style.boxShadow = '0 0 16px rgba(0, 229, 255, 0.35)';
                e.currentTarget.style.transform = 'scale(1.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.18)';
                e.currentTarget.style.color = isLight ? '#0F172A' : '#FFFFFF';
                e.currentTarget.style.background = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.boxShadow = isLight ? '0 2px 6px rgba(0,0,0,0.03)' : '0 4px 14px rgba(0,0,0,0.3)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Login Pill Button */}
            <button
              onClick={() => { window.location.href = 'https://backstage.tunewavemusic.in/login'; }}
              style={{
                background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.08)',
                border: `1px solid ${isLight ? 'rgba(0, 0, 0, 0.14)' : 'rgba(255, 255, 255, 0.18)'}`,
                color: isLight ? '#0F172A' : '#FFFFFF',
                padding: '9px 26px',
                borderRadius: 9999,
                fontSize: '0.94rem',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '-0.01em',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.04)' : '0 4px 16px rgba(0,0,0,0.4)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#00E5FF';
                e.currentTarget.style.color = '#00E5FF';
                e.currentTarget.style.background = isLight ? 'rgba(0, 229, 255, 0.08)' : 'rgba(0, 229, 255, 0.12)';
                e.currentTarget.style.boxShadow = '0 0 18px rgba(0, 229, 255, 0.35)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = isLight ? 'rgba(0, 0, 0, 0.14)' : 'rgba(255, 255, 255, 0.18)';
                e.currentTarget.style.color = isLight ? '#0F172A' : '#FFFFFF';
                e.currentTarget.style.background = isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.boxShadow = isLight ? '0 2px 8px rgba(0,0,0,0.04)' : '0 4px 16px rgba(0,0,0,0.4)';
              }}
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Form Container */}
      <main style={{
        maxWidth: 720,
        margin: '36px auto 0',
        padding: '0 16px',
        position: 'relative',
        zIndex: 10
      }}>

        {isSubmitted ? (
          /* ── SUCCESS CONFIRMATION STATE ────────────────────────── */
          <div style={{
            background: isLight ? '#FFFFFF' : '#0F1219',
            border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255, 255, 255, 0.08)'}`,
            borderRadius: 24,
            padding: '52px 38px',
            textAlign: 'center',
            boxShadow: isLight ? '0 20px 50px rgba(0,0,0,0.06)' : '0 30px 90px -20px rgba(0, 0, 0, 0.8), 0 0 50px rgba(0, 229, 255, 0.05)'
          }}>
            <div style={{
              width: 76,
              height: 76,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2) 0%, rgba(0, 126, 167, 0.1) 100%)',
              border: '2px solid #00E5FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 0 35px rgba(0, 229, 255, 0.4)'
            }}>
              <CheckCircle2 size={40} color="#00E5FF" />
            </div>

            <div style={{
              display: 'inline-block',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#00E5FF',
              background: 'rgba(0, 229, 255, 0.1)',
              border: '1px solid rgba(0, 229, 255, 0.28)',
              padding: '4px 14px',
              borderRadius: 9999,
              marginBottom: 14
            }}>
              Application Received
            </div>

            <h1 style={{
              fontSize: 'clamp(1.9rem, 4vw, 2.5rem)',
              fontWeight: 900,
              margin: '0 0 12px',
              color: isLight ? '#0F172A' : '#FFFFFF',
              letterSpacing: '-0.02em'
            }}>
              Welcome to <span style={{
                background: 'linear-gradient(135deg, #00F2FE 0%, #00E5FF 50%, #38BDF8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Tunewave</span>
            </h1>

            <p style={{
              color: isLight ? '#475569' : 'rgba(255, 255, 255, 0.7)',
              fontSize: '1rem',
              lineHeight: 1.6,
              maxWidth: 520,
              margin: '0 auto 30px'
            }}>
              Thank you for applying, <strong>{formData.firstName}</strong>. Your artist profile has been prioritized for our A&amp;R editorial curation review.
            </p>

            {/* Application Summary Box */}
            <div style={{
              background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
              border: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255, 255, 255, 0.08)'}`,
              borderRadius: 16,
              padding: 22,
              textAlign: 'left',
              marginBottom: 34,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 16
            }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: isLight ? '#64748B' : 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 700 }}>Reference ID</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#00E5FF', marginTop: 2, fontFamily: 'monospace' }}>{applicationId}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: isLight ? '#64748B' : 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 700 }}>Account Type</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: isLight ? '#0F172A' : '#FFFFFF', marginTop: 2 }}>
                  {formData.role === 'artist' ? 'Solo Artist / Band' : 'Record Label'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: isLight ? '#64748B' : 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 700 }}>Profile Name</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: isLight ? '#0F172A' : '#FFFFFF', marginTop: 2 }}>{formData.artistName}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: isLight ? '#64748B' : 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontWeight: 700 }}>Estimated Review</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#10B981', marginTop: 2 }}>Within 24 Hours</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('/')}
                style={{
                  padding: '14px 30px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #00F2FE 0%, #00E5FF 50%, #0EA5E9 100%)',
                  color: '#040D1A',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(0, 229, 255, 0.4)'
                }}
              >
                Return to Home
              </button>
              <button
                onClick={() => onNavigate('/distribute')}
                style={{
                  padding: '14px 30px',
                  borderRadius: 12,
                  background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
                  color: isLight ? '#0F172A' : '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  border: `1px solid ${isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255, 255, 255, 0.1)'}`,
                  cursor: 'pointer'
                }}
              >
                Explore Distribute Features
              </button>
            </div>
          </div>
        ) : (
          /* ── MULTI-STEP CARD (WEBSITE BRAND COLOURS) ─────────────── */
          <div style={{
            background: isLight ? '#FFFFFF' : '#0F1219',
            border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255, 255, 255, 0.08)'}`,
            borderRadius: 22,
            padding: '36px 36px 32px',
            boxShadow: isLight
              ? '0 20px 50px rgba(0,0,0,0.06)'
              : '0 30px 90px -20px rgba(0, 0, 0, 0.8), 0 0 50px rgba(0, 229, 255, 0.04)'
          }}>

            {/* 6-Segment Progress Bar Across Top */}
            <div style={{
              display: 'flex',
              gap: 8,
              marginBottom: 32
            }}>
              {Array.from({ length: totalSteps }).map((_, i) => {
                const stepNum = i + 1;
                const isCompleted = stepNum < currentStep;
                const isActive = stepNum === currentStep;

                let barBg = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.1)';
                if (isCompleted) barBg = '#10B981'; // Green for completed
                if (isActive) barBg = 'linear-gradient(90deg, #00F2FE 0%, #00E5FF 100%)'; // Tunewave Cyan

                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: 5,
                      borderRadius: 9999,
                      background: barBg,
                      transition: 'background 0.35s ease, box-shadow 0.35s ease',
                      boxShadow: isActive ? '0 0 12px rgba(0, 229, 255, 0.7)' : (isCompleted ? '0 0 8px rgba(16, 185, 129, 0.35)' : 'none')
                    }}
                  />
                );
              })}
            </div>

            {/* Step Header: Title & Step Counter */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 26
            }}>
              <h2 style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: isLight ? '#0F172A' : '#FFFFFF',
                margin: 0
              }}>
                {stepTitles[currentStep - 1]}
              </h2>

              <div style={{
                fontSize: '0.86rem',
                fontWeight: 700,
                color: isLight ? '#94A3B8' : 'rgba(255, 255, 255, 0.45)',
                fontFamily: 'monospace',
                letterSpacing: '0.05em'
              }}>
                {currentStep}/{totalSteps}
              </div>
            </div>

            {/* Error banner if validation fails */}
            {errorMsg && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 12,
                padding: '12px 16px',
                color: '#EF4444',
                fontSize: '0.86rem',
                fontWeight: 600,
                marginBottom: 22
              }}>
                <AlertCircle size={17} style={{ flexShrink: 0 }} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* ── STEP 1: PERSONAL INFO ────────────────────────────── */}
            {currentStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={labelStyle(isLight)}>First Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Liam"
                      value={formData.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      style={inputStyle(isLight)}
                    />
                  </div>
                  <div>
                    <label style={labelStyle(isLight)}>Last Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Vance"
                      value={formData.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      style={inputStyle(isLight)}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle(isLight)}>Email</label>
                  <input
                    type="email"
                    placeholder="artist@tunewavemusic.in"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    style={inputStyle(isLight)}
                  />
                </div>

                <div>
                  <label style={labelStyle(isLight)}>Phone Number</label>
                  <div style={{ display: 'flex', gap: 10, position: 'relative' }}>
                    {/* Country Code Dropdown Button */}
                    <div style={{ position: 'relative' }}>
                      <button
                        type="button"
                        onClick={() => setCountryMenuOpen(!countryMenuOpen)}
                        style={{
                          height: '100%',
                          minWidth: 90,
                          padding: '0 14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          background: '#FFFFFF',
                          border: '1px solid #E2E8F0',
                          borderRadius: 12,
                          color: '#0F172A',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxSizing: 'border-box',
                          transition: 'border-color 0.2s, box-shadow 0.2s'
                        }}
                      >
                        <span>{formData.countryFlag}</span>
                        <span>{formData.countryCode}</span>
                      </button>

                      {countryMenuOpen && (
                        <div style={{
                          position: 'absolute',
                          top: '110%',
                          left: 0,
                          zIndex: 50,
                          width: 220,
                          maxHeight: 240,
                          overflowY: 'auto',
                          background: '#FFFFFF',
                          border: '1px solid #CBD5E1',
                          borderRadius: 12,
                          boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
                          padding: 6
                        }}>
                          {COUNTRY_CODES.map((c, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  countryCode: c.code,
                                  countryFlag: c.flag,
                                  country: c.country
                                }));
                                setCountryMenuOpen(false);
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '8px 12px',
                                borderRadius: 8,
                                cursor: 'pointer',
                                fontSize: '0.84rem',
                                color: '#0F172A',
                                background: formData.countryCode === c.code ? 'rgba(0, 229, 255, 0.15)' : 'transparent'
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
                              onMouseLeave={e => e.currentTarget.style.background = formData.countryCode === c.code ? 'rgba(0, 229, 255, 0.15)' : 'transparent'}
                            >
                              <span>{c.flag}</span>
                              <span style={{ fontWeight: 600 }}>{c.code}</span>
                              <span style={{ color: '#64748B', fontSize: '0.78rem', marginLeft: 'auto' }}>{c.country}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={10}
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, '').slice(0, 10);
                        updateField('phone', numericValue);
                      }}
                      onKeyDown={(e) => {
                        if (
                          ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key) ||
                          e.ctrlKey || e.metaKey
                        ) {
                          return;
                        }
                        if (!/^[0-9]$/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      style={{ ...inputStyle(isLight), flex: 1 }}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle(isLight)}>
                    Website <span style={{ opacity: 0.5, fontWeight: 400 }}>(optional)</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={formData.website}
                    onChange={(e) => updateField('website', e.target.value)}
                    style={inputStyle(isLight)}
                  />
                </div>
              </div>
            )}

            {/* ── STEP 2: ADDRESS ──────────────────────────────────── */}
            {currentStep === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={labelStyle(isLight)}>Street Address</label>
                  <input
                    type="text"
                    placeholder="e.g. 104 Harmony Sound Studio St."
                    value={formData.streetAddress}
                    onChange={(e) => updateField('streetAddress', e.target.value)}
                    style={inputStyle(isLight)}
                  />
                </div>

                <div>
                  <label style={labelStyle(isLight)}>
                    Address Line 2 <span style={{ opacity: 0.5, fontWeight: 400 }}>(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Apt, Suite, Unit, Building"
                    value={formData.addressLine2}
                    onChange={(e) => updateField('addressLine2', e.target.value)}
                    style={inputStyle(isLight)}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={labelStyle(isLight)}>City</label>
                    <input
                      type="text"
                      placeholder="e.g. Hyderabad"
                      value={formData.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      style={inputStyle(isLight)}
                    />
                  </div>
                  <div>
                    <label style={labelStyle(isLight)}>State / Province</label>
                    <input
                      type="text"
                      placeholder="e.g. Telangana"
                      value={formData.state}
                      onChange={(e) => updateField('state', e.target.value)}
                      style={inputStyle(isLight)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={labelStyle(isLight)}>Postal Code</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      placeholder="e.g. 500081"
                      value={formData.postalCode}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/\D/g, '').slice(0, 6);
                        updateField('postalCode', numericValue);
                      }}
                      onKeyDown={(e) => {
                        if (
                          ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key) ||
                          e.ctrlKey || e.metaKey
                        ) {
                          return;
                        }
                        if (!/^[0-9]$/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      style={inputStyle(isLight)}
                    />
                  </div>
                  <div>
                    <label style={labelStyle(isLight)}>Country</label>
                    <div style={{ position: 'relative' }}>
                      <select
                        value={formData.country}
                        onChange={(e) => updateField('country', e.target.value)}
                        style={{
                          ...inputStyle(isLight),
                          cursor: 'pointer',
                          appearance: 'none',
                          paddingRight: 40
                        }}
                      >
                        <option value="" disabled>Select Country</option>
                        {COUNTRY_LIST.map((c) => (
                          <option key={c} value={c} style={{ background: '#FFFFFF', color: '#0F172A' }}>
                            {c}
                          </option>
                        ))}
                      </select>
                      <div style={{
                        position: 'absolute',
                        right: 14,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none',
                        color: '#64748B',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 3: ROLE ─────────────────────────────────────── */}
            {currentStep === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* 2 Big Interactive Role Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                  {/* Card 1: Artist */}
                  <div
                    onClick={() => updateField('role', 'artist')}
                    style={{
                      padding: '28px 24px',
                      borderRadius: 18,
                      cursor: 'pointer',
                      border: formData.role === 'artist' 
                        ? '1.5px solid #00E5FF' 
                        : `1px solid ${isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)'}`,
                      background: formData.role === 'artist'
                        ? (isLight ? '#E0F7FA' : 'rgba(0, 229, 255, 0.06)')
                        : (isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)'),
                      boxShadow: formData.role === 'artist' ? '0 0 24px rgba(0, 229, 255, 0.18)' : 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: 12,
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <div style={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      background: formData.role === 'artist' ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: formData.role === 'artist' ? '#00E5FF' : 'inherit'
                    }}>
                      <Music size={26} />
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: isLight ? '#0F172A' : '#FFFFFF' }}>
                      I'm an Artist
                    </div>
                    <div style={{ fontSize: '0.82rem', color: isLight ? '#64748B' : 'rgba(255, 255, 255, 0.55)', lineHeight: 1.5 }}>
                      Solo artist or band looking to distribute music
                    </div>
                  </div>

                  {/* Card 2: Label */}
                  <div
                    onClick={() => updateField('role', 'label')}
                    style={{
                      padding: '28px 24px',
                      borderRadius: 18,
                      cursor: 'pointer',
                      border: formData.role === 'label' 
                        ? '1.5px solid #00E5FF' 
                        : `1px solid ${isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)'}`,
                      background: formData.role === 'label'
                        ? (isLight ? '#E0F7FA' : 'rgba(0, 229, 255, 0.06)')
                        : (isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)'),
                      boxShadow: formData.role === 'label' ? '0 0 24px rgba(0, 229, 255, 0.18)' : 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      gap: 12,
                      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <div style={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      background: formData.role === 'label' ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: formData.role === 'label' ? '#00E5FF' : 'inherit'
                    }}>
                      <Building2 size={26} />
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: isLight ? '#0F172A' : '#FFFFFF' }}>
                      I'm a Label
                    </div>
                    <div style={{ fontSize: '0.82rem', color: isLight ? '#64748B' : 'rgba(255, 255, 255, 0.55)', lineHeight: 1.5 }}>
                      Record label managing one or more artists
                    </div>
                  </div>
                </div>

                <div>
                  <label style={labelStyle(isLight)}>
                    {formData.role === 'artist' ? 'Artist / Band Name' : 'Record Label / Imprint Name'}
                  </label>
                  <input
                    type="text"
                    placeholder={formData.role === 'artist' ? 'e.g. Nova Luna' : 'e.g. Velocity Records Group'}
                    value={formData.artistName}
                    onChange={(e) => updateField('artistName', e.target.value)}
                    style={inputStyle(isLight)}
                  />
                </div>
              </div>
            )}

            {/* ── STEP 4: DEMO LINKS ───────────────────────────────── */}
            {currentStep === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <p style={{
                  fontSize: '0.9rem',
                  color: isLight ? '#475569' : 'rgba(255, 255, 255, 0.65)',
                  margin: '0 0 8px',
                  lineHeight: 1.6
                }}>
                  Share links to your music on SoundCloud, Spotify, YouTube, Dropbox, or any streaming platform.
                </p>

                {formData.demoLinks.map((link, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <input
                      type="url"
                      placeholder="https://soundcloud.com/yourname/track or Dropbox link"
                      value={link}
                      onChange={(e) => handleDemoLinkChange(idx, e.target.value)}
                      style={{ ...inputStyle(isLight), flex: 1 }}
                    />
                    {formData.demoLinks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDemoLink(idx)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: isLight ? '#94A3B8' : 'rgba(255,255,255,0.3)',
                          cursor: 'pointer',
                          padding: 10,
                          borderRadius: 8,
                          transition: 'color 0.2s'
                        }}
                        title="Delete link"
                        onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                        onMouseLeave={e => e.currentTarget.style.color = isLight ? '#94A3B8' : 'rgba(255,255,255,0.3)'}
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}

                <div>
                  <button
                    type="button"
                    onClick={addDemoLink}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#00E5FF',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      cursor: 'pointer',
                      padding: '6px 0'
                    }}
                  >
                    <Plus size={16} />
                    <span>Add another link</span>
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 5: SOCIAL MEDIA ─────────────────────────────── */}
            {currentStep === 5 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <p style={{
                  fontSize: '0.9rem',
                  color: isLight ? '#475569' : 'rgba(255, 255, 255, 0.65)',
                  margin: '0 0 8px',
                  lineHeight: 1.6
                }}>
                  At least one social media link is required so we can verify your identity.
                </p>

                <div>
                  <label style={labelStyle(isLight)}>Instagram</label>
                  <input
                    type="text"
                    placeholder="https://instagram.com/youraccount"
                    value={formData.instagram}
                    onChange={(e) => updateField('instagram', e.target.value)}
                    style={inputStyle(isLight)}
                  />
                </div>

                <div>
                  <label style={labelStyle(isLight)}>TikTok</label>
                  <input
                    type="text"
                    placeholder="https://tiktok.com/@youraccount"
                    value={formData.tiktok}
                    onChange={(e) => updateField('tiktok', e.target.value)}
                    style={inputStyle(isLight)}
                  />
                </div>

                <div>
                  <label style={labelStyle(isLight)}>X (Twitter)</label>
                  <input
                    type="text"
                    placeholder="https://x.com/youraccount"
                    value={formData.twitter}
                    onChange={(e) => updateField('twitter', e.target.value)}
                    style={inputStyle(isLight)}
                  />
                </div>

                <div>
                  <label style={labelStyle(isLight)}>Facebook</label>
                  <input
                    type="text"
                    placeholder="https://facebook.com/youraccount"
                    value={formData.facebook}
                    onChange={(e) => updateField('facebook', e.target.value)}
                    style={inputStyle(isLight)}
                  />
                </div>
              </div>
            )}

            {/* ── STEP 6: FINAL DETAILS & SUBMIT ───────────────────── */}
            {currentStep === 6 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <p style={{
                  fontSize: '0.9rem',
                  color: isLight ? '#475569' : 'rgba(255, 255, 255, 0.65)',
                  margin: '0 0 4px',
                  lineHeight: 1.6
                }}>
                  Tell our A&amp;R curation team about your release vision and music genre.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={labelStyle(isLight)}>Primary Genre</label>
                    <select
                      value={formData.genre}
                      onChange={(e) => updateField('genre', e.target.value)}
                      style={{
                        ...inputStyle(isLight),
                        cursor: 'pointer'
                      }}
                    >
                      {GENRES.map(g => (
                        <option key={g} value={g} style={{ background: '#FFFFFF', color: '#0F172A' }}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle(isLight)}>Estimated Releases / Year</label>
                    <select
                      value={formData.estimatedReleases}
                      onChange={(e) => updateField('estimatedReleases', e.target.value)}
                      style={{
                        ...inputStyle(isLight),
                        cursor: 'pointer'
                      }}
                    >
                      <option value="1–5 Tracks" style={{ background: '#FFFFFF', color: '#0F172A' }}>1–5 Tracks</option>
                      <option value="6–12 Tracks" style={{ background: '#FFFFFF', color: '#0F172A' }}>6–12 Tracks</option>
                      <option value="12–25 Tracks" style={{ background: '#FFFFFF', color: '#0F172A' }}>12–25 Tracks (EP/Album)</option>
                      <option value="25+ Full Catalog" style={{ background: '#FFFFFF', color: '#0F172A' }}>25+ Full Label Catalog</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle(isLight)}>
                    Current Distributor <span style={{ opacity: 0.5, fontWeight: 400 }}>(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DistroKid, TuneCore, CD Baby, or None"
                    value={formData.currentDistributor}
                    onChange={(e) => updateField('currentDistributor', e.target.value)}
                    style={inputStyle(isLight)}
                  />
                </div>

                <div>
                  <label style={labelStyle(isLight)}>
                    Release Pitch or Special Requests <span style={{ opacity: 0.5, fontWeight: 400 }}>(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about upcoming singles, collaborations, marketing plans, or editorial pitching targets..."
                    value={formData.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    style={{
                      ...inputStyle(isLight),
                      resize: 'vertical',
                      lineHeight: 1.5
                    }}
                  />
                </div>

                {/* Verification Checkboxes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 6 }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: '0.85rem', color: isLight ? '#334155' : 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                    <input
                      type="checkbox"
                      checked={formData.rightsConfirmed}
                      onChange={(e) => updateField('rightsConfirmed', e.target.checked)}
                      style={{ marginTop: 3, accentColor: '#00E5FF', width: 17, height: 17, cursor: 'pointer' }}
                    />
                    <span>
                      I confirm that I own 100% or hold exclusive global rights to the master recordings and underlying musical compositions for all tracks submitted.
                    </span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: '0.85rem', color: isLight ? '#334155' : 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                    <input
                      type="checkbox"
                      checked={formData.termsAgreed}
                      onChange={(e) => updateField('termsAgreed', e.target.checked)}
                      style={{ marginTop: 3, accentColor: '#00E5FF', width: 17, height: 17, cursor: 'pointer' }}
                    />
                    <span>
                      I agree to the Tunewave Global Network Distribution Agreement, Community Guidelines, and Privacy Policy.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* ── FOOTER ACTIONS (PREVIOUS & CONTINUE) ─────────────── */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: currentStep > 1 ? 'space-between' : 'flex-end',
              marginTop: 36,
              paddingTop: 20,
              borderTop: `1px solid ${isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255, 255, 255, 0.08)'}`
            }}>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  style={{
                    padding: '12px 26px',
                    borderRadius: 12,
                    background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
                    border: `1px solid ${isLight ? '#CBD5E1' : 'rgba(255, 255, 255, 0.12)'}`,
                    color: isLight ? '#0F172A' : '#FFFFFF',
                    fontWeight: 700,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.12)'}
                  onMouseLeave={e => e.currentTarget.style.background = isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)'}
                >
                  Previous
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={submitting}
                style={{
                  padding: '13px 34px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #00F2FE 0%, #00E5FF 50%, #0EA5E9 100%)',
                  border: 'none',
                  color: '#040D1A',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: submitting ? 'wait' : 'pointer',
                  boxShadow: '0 6px 24px rgba(0, 229, 255, 0.45)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  opacity: submitting ? 0.7 : 1
                }}
                onMouseEnter={e => {
                  if (!submitting) {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 229, 255, 0.65)';
                  }
                }}
                onMouseLeave={e => {
                  if (!submitting) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 24px rgba(0, 229, 255, 0.45)';
                  }
                }}
              >
                {submitting ? 'Submitting...' : (currentStep === totalSteps ? 'Submit Application' : 'Continue')}
              </button>
            </div>

          </div>
        )}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .apply-nav-links {
            display: none !important;
          }
        }
        input, textarea, select {
          background-color: #FFFFFF !important;
          color: #0F172A !important;
        }
        input::placeholder, textarea::placeholder {
          color: #94A3B8 !important;
          opacity: 1 !important;
        }
        input:focus, textarea:focus, select:focus {
          border-color: #00E5FF !important;
          box-shadow: 0 0 0 3px rgba(0, 229, 255, 0.25) !important;
          outline: none !important;
        }
      `}</style>
    </div>
  );
}

// Reusable Input & Label Styles
const labelStyle = (isLight) => ({
  display: 'block',
  fontSize: '0.86rem',
  fontWeight: 600,
  color: isLight ? '#334155' : 'rgba(255, 255, 255, 0.88)',
  marginBottom: 8
});

const inputStyle = (isLight) => ({
  width: '100%',
  padding: '14px 16px',
  borderRadius: 12,
  background: '#FFFFFF',
  border: '1px solid #E2E8F0',
  color: '#0F172A',
  fontSize: '0.95rem',
  fontWeight: 500,
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, box-shadow 0.2s'
});
