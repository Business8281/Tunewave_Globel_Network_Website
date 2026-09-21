import React from 'react';
import { ShieldCheck, Sparkles, Disc3, Radio, CheckCircle2 } from 'lucide-react';

const CLIENTELE_PARTNERS = [
  {
    id: 'folk-hyderabad',
    name: 'Folk Hyderabad',
    tagline: 'Official Regional Music Label',
    genre: 'Telangana Folk & Cultural Hits',
    feature: 'Official Vevo & Cultural Catalog',
    logo: '/clientele/Folk_Hyderabad.png',
    fallbackLogo: '/clientele/Folk_Hyderabad.png',
    accent: '#F59E0B',
    accentGlow: 'rgba(245, 158, 11, 0.35)',
    accentBg: 'rgba(245, 158, 11, 0.12)',
    accentBorder: 'rgba(245, 158, 11, 0.3)'
  },
  {
    id: 'lycon-digital',
    name: 'Lycon Digital',
    tagline: 'Global Digital Media Network',
    genre: 'Digital Entertainment & Streaming',
    feature: 'Global Syndication & Rights',
    logo: '/clientele/channels4_profile.jpg.jpeg',
    fallbackLogo: '/clientele/channels4_profile.jpg.jpeg',
    accent: '#00E5FF',
    accentGlow: 'rgba(0, 229, 255, 0.35)',
    accentBg: 'rgba(0, 229, 255, 0.12)',
    accentBorder: 'rgba(0, 229, 255, 0.3)'
  },
  {
    id: 'mc-audios-videos',
    name: 'M.C. Audios & Videos',
    tagline: 'Heritage Cinema & Devotional Audio',
    genre: 'Film Scores & Evergreen Hits',
    feature: 'Evergreen Cinema Master Catalog',
    logo: '/clientele/unnamed.jpg.jpeg',
    fallbackLogo: '/clientele/unnamed.jpg.jpeg',
    accent: '#EF4444',
    accentGlow: 'rgba(239, 68, 68, 0.35)',
    accentBg: 'rgba(239, 68, 68, 0.12)',
    accentBorder: 'rgba(239, 68, 68, 0.3)'
  },
  {
    id: 'svc-music',
    name: 'SVC Music',
    tagline: 'Premier Film & Soundtrack House',
    genre: 'Cinema Soundtracks & Scores',
    feature: 'Official Film Soundtrack Distro',
    logo: '/clientele/channels4_profile (9).jpg.jpeg',
    fallbackLogo: '/clientele/channels4_profile (9).jpg.jpeg',
    accent: '#38BDF8',
    accentGlow: 'rgba(56, 189, 248, 0.35)',
    accentBg: 'rgba(56, 189, 248, 0.12)',
    accentBorder: 'rgba(56, 189, 248, 0.3)'
  },
  {
    id: 'vemula-folk-music',
    name: 'Vemula Folk Music',
    tagline: 'Folk & Devotional Record Label',
    genre: 'Traditional & Cultural Audio',
    feature: 'Viral Cultural Ballads & Audio Rights',
    logo: '/clientele/vemula_folk_music.jpg',
    fallbackLogo: '/clientele/channels4_profile (5).jpg.jpeg',
    accent: '#10B981',
    accentGlow: 'rgba(16, 185, 129, 0.35)',
    accentBg: 'rgba(16, 185, 129, 0.12)',
    accentBorder: 'rgba(16, 185, 129, 0.3)'
  },
  {
    id: 'bhavishya-sri-music',
    name: 'Bhavishya Sri Music',
    tagline: 'Film & Soundtrack Media House',
    genre: 'Cinematic & Devotional Music',
    feature: 'Multi-Language Sync & Content ID',
    logo: '/clientele/bhavishya_sri_music.jpg',
    fallbackLogo: '/clientele/channels4_profile (7).jpg.jpeg',
    accent: '#F43F5E',
    accentGlow: 'rgba(244, 63, 94, 0.35)',
    accentBg: 'rgba(244, 63, 94, 0.12)',
    accentBorder: 'rgba(244, 63, 94, 0.3)'
  },
  {
    id: 'sabarimala-now',
    name: 'Sabarimala Now',
    tagline: 'Spiritual & Devotional Music Network',
    genre: 'Devotional & Cultural Hymns',
    feature: 'Devotional Audio & Fingerprinting',
    logo: '/clientele/channels4_profile (10).jpg.jpeg',
    fallbackLogo: '/clientele/channels4_profile (10).jpg.jpeg',
    accent: '#F59E0B',
    accentGlow: 'rgba(245, 158, 11, 0.35)',
    accentBg: 'rgba(245, 158, 11, 0.12)',
    accentBorder: 'rgba(245, 158, 11, 0.3)'
  },
  {
    id: 'independent-creator-studio',
    name: 'Creator Studio Partner',
    tagline: 'Independent Artist Network',
    genre: 'Indie & Contemporary Releases',
    feature: 'Automated Splits & Smart Pre-Saves',
    logo: '/clientele/independent_creator_studio.jpg',
    fallbackLogo: '/clientele/avatars-LPXWtISm22CpDzVl-q5A7bA-t1080x1080.jpg.jpeg',
    accent: '#8B5CF6',
    accentGlow: 'rgba(139, 92, 246, 0.35)',
    accentBg: 'rgba(139, 92, 246, 0.12)',
    accentBorder: 'rgba(139, 92, 246, 0.3)'
  }
];

export default function ClienteleSection() {
  // Seamless loop with all 8 partner labels in a single unified row
  const singleRowPartners = [
    ...CLIENTELE_PARTNERS,
    ...CLIENTELE_PARTNERS
  ];

  return (
    <section 
      className="clientele-section"
      style={{
        position: 'relative',
        padding: '76px 0 72px 0',
        background: 'var(--tw-bg-dark)',
        borderTop: '1px solid var(--tw-line)',
        borderBottom: '1px solid var(--tw-line)',
        overflow: 'hidden',
        zIndex: 5
      }}
    >
      {/* Ambient background glow */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          height: '380px',
          background: 'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.08) 0%, rgba(139, 92, 246, 0.04) 50%, transparent 75%)',
          pointerEvents: 'none',
          filter: 'blur(70px)',
          zIndex: 0
        }} 
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 1360, margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginBottom: 14,
              padding: '6px 18px',
              borderRadius: 30,
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--tw-cyan)',
              background: 'rgba(0, 229, 255, 0.08)',
              border: '1px solid rgba(0, 229, 255, 0.25)'
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: 'var(--tw-cyan)',
                boxShadow: '0 0 10px var(--tw-cyan)',
                display: 'inline-block'
              }}
            />
            <span>TRUSTED PARTNER RECORD LABELS &amp; STUDIOS</span>
          </div>

          <h2 
            className="clientele-title"
            style={{
              fontFamily: 'var(--tw-font-heading)',
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: 'var(--tw-text-white)',
              margin: '0 0 14px 0'
            }}
          >
            Continuous Catalog Streaming &amp; Rights Network
          </h2>

          <p 
            className="clientele-subtitle"
            style={{
              fontSize: 'clamp(0.92rem, 1.2vw, 1.05rem)',
              color: 'var(--tw-text-dim)',
              maxWidth: 740,
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            Powering catalog distribution, automated YouTube Content ID, Vevo channel management, and direct royalty settlement for India's leading record labels and digital media houses.
          </p>
        </div>

        {/* ── SINGLE ROW CONTINUOUS STREAMING MARQUEE ───────────────── */}
        <div 
          className="clientele-marquee-wrapper"
          style={{
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            padding: '12px 0',
            marginBottom: 38
          }}
        >
          <div 
            className="clientele-marquee-track track-single-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 22,
              width: 'max-content',
              animation: 'clientele-scroll-single 42s linear infinite'
            }}
          >
            {singleRowPartners.map((client, idx) => (
              <div 
                key={`single-${client.id}-${idx}`}
                className="clientele-card-chip"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '14px 24px 14px 16px',
                  borderRadius: 20,
                  background: 'rgba(15, 20, 30, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                  flexShrink: 0,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  minWidth: 330
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = client.accent;
                  e.currentTarget.style.boxShadow = `0 12px 32px -5px ${client.accentGlow}`;
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.25)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Logo Frame */}
                <div 
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    padding: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 16px ${client.accentGlow}`,
                    border: `2px solid ${client.accent}`,
                    flexShrink: 0
                  }}
                >
                  <img 
                    src={client.logo} 
                    alt={client.name}
                    loading="lazy"
                    onError={(e) => {
                      if (client.fallbackLogo && e.currentTarget.src !== client.fallbackLogo) {
                        e.currentTarget.src = client.fallbackLogo;
                      }
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                {/* Details */}
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span 
                      className="clientele-chip-name"
                      style={{ 
                        fontSize: '1.02rem', 
                        fontWeight: 800, 
                        color: 'var(--tw-text-white)',
                        letterSpacing: '-0.01em',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {client.name}
                    </span>
                  </div>

                  <span 
                    style={{ 
                      fontSize: '0.75rem', 
                      color: client.accent, 
                      fontWeight: 700,
                      marginBottom: 4,
                      letterSpacing: '0.02em',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {client.tagline}
                  </span>

                  <span 
                    style={{ 
                      fontSize: '0.72rem', 
                      color: 'var(--tw-text-dim)',
                      fontWeight: 500,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {client.feature}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3 EXECUTIVE NETWORK METRICS ──────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          maxWidth: 960,
          margin: '0 auto',
          paddingTop: 8
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 16,
            padding: '16px 20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--tw-cyan)', marginBottom: 2 }}>150+</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--tw-text-dim)' }}>Global Streaming Stores &amp; DSPs</div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 16,
            padding: '16px 20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#10B981', marginBottom: 2 }}>100%</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--tw-text-dim)' }}>Direct Master Rights &amp; Royalties</div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 16,
            padding: '16px 20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#F59E0B', marginBottom: 2 }}>24/7</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--tw-text-dim)' }}>Automated Audio Fingerprint Rights</div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes clientele-scroll-single {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2));
          }
        }

        .clientele-marquee-track:hover {
          animation-play-state: paused;
        }

        /* ── Light Mode Adaptations ───────────────────────────────── */
        [data-theme="light"] .clientele-section {
          background: #F8FAFC !important;
          border-top-color: rgba(0, 0, 0, 0.06) !important;
          border-bottom-color: rgba(0, 0, 0, 0.06) !important;
        }

        [data-theme="light"] .clientele-title {
          color: #0F172A !important;
        }

        [data-theme="light"] .clientele-subtitle {
          color: #475569 !important;
        }

        [data-theme="light"] .clientele-card-chip {
          background: #FFFFFF !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05) !important;
        }

        [data-theme="light"] .clientele-chip-name {
          color: #0F172A !important;
        }
      `}</style>
    </section>
  );
}
