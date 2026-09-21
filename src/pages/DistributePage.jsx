import React, { useState, useEffect, useRef } from 'react';
import {
  Music, Check, Shield, Zap, Sparkles, BarChart3, ArrowRight,
  Search, ExternalLink, CheckCircle2, ChevronDown, Star, Radio,
  Share2, DollarSign, Layers, PlayCircle, Lock, X, Globe, Clock, Headphones
} from 'lucide-react';

export default function DistributePage({ onNavigate, theme }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStoreModal, setSelectedStoreModal] = useState(null);
  const [activeStoreId, setActiveStoreId] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [activeImagePhase, setActiveImagePhase] = useState(1);
  const featuresSectionRef = useRef(null);
  const [sectionInView, setSectionInView] = useState(false);

  // Global Ingestion Hub card 3D tilt & move animation state
  const [hubTilt, setHubTilt] = useState({ x: 0, y: 0 });
  const [isHubHovered, setIsHubHovered] = useState(false);

  const handleHubMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 6.5;
    const rotateY = (x / (rect.width / 2)) * 6.5;
    setHubTilt({ x: rotateX, y: rotateY });
  };

  const handleHubMouseEnter = () => {
    setIsHubHovered(true);
  };

  const handleHubMouseLeave = () => {
    setIsHubHovered(false);
    setHubTilt({ x: 0, y: 0 });
  };

  // Trigger entrance animation when user scrolls to this section
  useEffect(() => {
    const checkVisibility = () => {
      if (!featuresSectionRef.current) return;
      const rect = featuresSectionRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.88 && rect.bottom >= 0) {
        setSectionInView(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (featuresSectionRef.current) {
      observer.observe(featuresSectionRef.current);
    }

    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });

    return () => {
      if (featuresSectionRef.current) observer.unobserve(featuresSectionRef.current);
      window.removeEventListener('scroll', checkVisibility);
    };
  }, []);

  const STORE_CATEGORIES = [
    'All',
    'Streaming',
    'Social & Video',
    'Asia & China',
    'Latin America & Africa',
    'Radio & In-Store',
    'Rights & Sync'
  ];

  const STORES = [
    // ── Global Major Streaming ──
    { id: 'spotify', name: "Spotify", category: "Streaming", group: "Streaming", color: "#1DB954", icon: "spotify", logo: "/logos of all apps/spotify_logo.png", fallback: "/stores/spotify.svg", speed: "24-48h", territories: "180+ Countries", payout: "100%", desc: "The world's most popular audio streaming subscription service with over 600 million users." },
    { id: 'applemusic', name: "Apple Music", category: "Streaming", group: "Streaming", color: "#FA243C", icon: "applemusic", logo: "/logos of all apps/Apple Music logo.png", fallback: "/stores/applemusic.svg", speed: "24-72h", territories: "175+ Countries", payout: "100%", desc: "Lossless Audio and Spatial Audio powered by Dolby Atmos across millions of iOS devices." },
    { id: 'youtubemusic', name: "YouTube Music", category: "Video & Stream", group: "Streaming", color: "#FF0000", icon: "youtubemusic", logo: "/logos of all apps/Youtude Music logo.png", fallback: "/stores/youtubemusic.svg", speed: "24-48h", territories: "Global", payout: "100%", desc: "Connected to YouTube's 2.5B+ ecosystem with Art Tracks, Official Artist Channels and Music Charts." },
    { id: 'amazonmusic', name: "Amazon Music", category: "Streaming", group: "Streaming", color: "#25D1DA", icon: "amazonmusic", logo: "/logos of all apps/Amanzo music logo.png", fallback: "/stores/amazonmusic.svg", speed: "48h", territories: "Global", payout: "100%", desc: "Ultra HD audio reaching millions of Echo smart speakers, Alexa users, and Prime subscribers." },
    { id: 'tidal', name: "Tidal", category: "Hi-Fi Audio", group: "Streaming", color: "#00FFFF", icon: "tidal", logo: "/logos of all apps/Tidal logo.png", fallback: "/stores/tidal.svg", speed: "24-48h", territories: "60+ Countries", payout: "100%", desc: "Artist-first high-fidelity music streaming service with Max sound quality and Master Audio." },
    { id: 'deezer', name: "Deezer", category: "Streaming", group: "Streaming", color: "#A238FF", icon: "deezer", logo: "/stores/deezer.svg", fallback: "/stores/deezer.svg", speed: "48h", territories: "185+ Countries", payout: "100%", desc: "Global streaming platform with Flow recommendation engine and high-fidelity FLAC audio." },
    { id: 'pandora', name: "Pandora", category: "Radio & Stream", group: "Streaming", color: "#3668FF", icon: "pandora", logo: "/logos of all apps/Pandora  logo.png", fallback: "/stores/pandora.svg", speed: "72h", territories: "United States", payout: "100%", desc: "Pioneering Music Genome Project radio and on-demand streaming for tens of millions of US listeners." },
    { id: 'soundcloud', name: "SoundCloud", category: "Streaming", group: "Streaming", color: "#FF5500", icon: "soundcloud", logo: "/logos of all apps/SoundCloud.jpg", fallback: "/stores/soundcloud.svg", speed: "24-48h", territories: "190+ Countries", payout: "100%", desc: "The creator hub of modern music culture, fan-powered royalties and direct listener comments." },
    { id: 'qobuz', name: "Qobuz", category: "Hi-Res Audio", group: "Streaming", color: "#2B5876", icon: "qobuz", logo: "/logos of all apps/Qobuz logo.png", fallback: "/stores/qobuz.svg", speed: "48h", territories: "25+ Countries", payout: "100%", desc: "The French pioneer in studio-quality 24-bit audio streaming and lossless digital downloads." },
    { id: 'itunes', name: "iTunes", category: "Download Store", group: "Streaming", color: "#EA4CC0", icon: "itunes", logo: "/logos of all apps/iTunes_logo.png", fallback: "/stores/applemusic.svg", speed: "24-48h", territories: "175+ Countries", payout: "100%", desc: "The premier digital purchase store where fans buy and own your albums and singles outright." },
    { id: 'audiomack', name: "Audiomack", category: "Streaming", group: "Streaming", color: "#FFA200", icon: "audiomack", logo: "/logos of all apps/Audiomack logo.png", fallback: "/stores/audiomack.svg", speed: "24h", territories: "Global", payout: "100%", desc: "Fast-growing artist-first streaming service leading hip-hop, Afrobeats, and electronic discovery." },
    { id: '7digital', name: "7digital", category: "B2B & Streaming", group: "Streaming", color: "#2B5876", icon: "7digital", logo: "/logos of all apps/7digital.png", fallback: "/stores/spotify.svg", speed: "48h", territories: "Global", payout: "100%", desc: "Powers digital music for global enterprise brands, automotive infotainment, and retail stores." },

    // ── Social & Video Creators ──
    { id: 'tiktok', name: "TikTok", category: "Social / Viral", group: "Social & Video", color: "#00F2FE", icon: "tiktok", logo: "/logos of all apps/TikTok logo.png", fallback: "/stores/tiktok.svg", speed: "24h", territories: "Global", payout: "100%", desc: "The #1 music discovery engine on the planet. Get your sound into millions of viral videos." },
    { id: 'instagram', name: "Instagram", category: "Reels & Stories", group: "Social & Video", color: "#E1306C", icon: "instagram", logo: "/logos of all apps/Instagram logo.png", fallback: "/stores/instagram.svg", speed: "24h", territories: "Global", payout: "100%", desc: "Distribute your official audio track to the Instagram Music sticker for Reels, Stories, and Posts." },
    { id: 'facebook', name: "Facebook", category: "Stories & Videos", group: "Social & Video", color: "#1877F2", icon: "facebook", logo: "/logos of all apps/Feacbook logo.png", fallback: "/stores/facebook.svg", speed: "24h", territories: "Global", payout: "100%", desc: "Collect royalties whenever your music is used across Meta's billions of creator video uploads." },
    { id: 'youtubeshorts', name: "YouTube Shorts", category: "Short Video", group: "Social & Video", color: "#FF0000", icon: "youtubeshorts", logo: "/logos of all apps/YouTude Shorts logo.png", fallback: "/stores/youtubeshorts.svg", speed: "24h", territories: "Global", payout: "100%", desc: "Reach 50+ billion daily views through the YouTube Shorts official audio library." },
    { id: 'capcut', name: "CapCut", category: "Video Creator", group: "Social & Video", color: "#00CFFF", icon: "capcut", logo: "/logos of all apps/CapCut logo.png", logoDark: "/logos of all apps/CapCut logo_dark.png", fallback: "/stores/capcut.svg", speed: "24h", territories: "Global", payout: "100%", desc: "ByteDance's ubiquitous video editing tool. Put your audio directly in the hands of video creators." },
    { id: 'snapchat', name: "Snapchat", category: "Social Sounds", group: "Social & Video", color: "#FFFC00", icon: "snapchat", logo: "/logos of all apps/Snapchat logo.png", fallback: "/stores/snapchat.svg", speed: "48h", territories: "Global", payout: "100%", desc: "Enable 750M+ active Snapchatters to add your music to their Snaps and Spotlight videos." },
    { id: 'canva', name: "Canva", category: "Creator Design", group: "Social & Video", color: "#00C4CC", icon: "canva", logo: "/logos of all apps/Canva logo.png", fallback: "/stores/instagram.svg", speed: "72h", territories: "Global", payout: "100%", desc: "Monetize your catalog across millions of multimedia presentations, social assets, and video edits." },
    { id: 'lickd', name: "Lickd", category: "Creator Licensing", group: "Social & Video", color: "#8B5CF6", icon: "lickd", logo: "/logos of all apps/Lickd logo.png", fallback: "/stores/deezer.svg", speed: "48h", territories: "Global", payout: "100%", desc: "Micro-sync music licensing for YouTube creators and influencers with claims-free monetization." },
    { id: 'stationhead', name: "Stationhead", category: "Social Radio", group: "Social & Video", color: "#E11D48", icon: "stationhead", logo: "/logos of all apps/Stationhead logo.png", fallback: "/stores/shazam.svg", speed: "24h", territories: "Global", payout: "100%", desc: "Live social audio broadcasting where artists and fans host radio stations that drive streaming royalties." },
    { id: 'twitch', name: "Twitch", category: "Live Stream", group: "Social & Video", color: "#9146FF", icon: "twitch", logo: "/logos of all apps/Twitch Soundtrack logo.png", fallback: "/stores/twitch.svg", speed: "48h", territories: "Global", payout: "100%", desc: "Safe, licensed background music catalog for millions of live gaming and IRL streamers worldwide." },
    { id: 'whatsapp', name: "WhatsApp", category: "Status & Chat", group: "Social & Video", color: "#25D366", icon: "whatsapp", logo: "/logos of all apps/Whatapp logo.png", fallback: "/stores/whatsapp.svg", speed: "24h", territories: "Global", payout: "100%", desc: "Audio integration for WhatsApp Status and conversational sharing across 2+ billion users." },

    // ── Video, Recognition & Content Rights ──
    { id: 'youtubecontentid', name: "YouTube Content ID", category: "Content Protection", group: "Rights & Sync", color: "#CC0000", icon: "youtube", logo: "/logos of all apps/Youtude Content ID logo.png", fallback: "/stores/youtube.svg", speed: "24h", territories: "Global", payout: "100%", desc: "Antigravity-level Content ID fingerprinting captures ad revenue from every user-generated upload." },
    { id: 'acrcloud', name: "ACRCloud", category: "Audio Fingerprinting", group: "Rights & Sync", color: "#00ADE9", icon: "acrcloud", logo: "/logos of all apps/ACRCloud logo.png", fallback: "/stores/spotify.svg", speed: "24h", territories: "Global", payout: "100%", desc: "Leading automatic content recognition service powering broadcast monitoring and rights identification." },
    { id: 'audiblemagic', name: "Audible Magic", category: "Copyright Protection", group: "Rights & Sync", color: "#3B82F6", icon: "audiblemagic", logo: "/logos of all apps/Audible Magic logo.png", fallback: "/stores/spotify.svg", speed: "24h", territories: "Global", payout: "100%", desc: "Automatic content recognition engine protecting copyright across social networks and UGC sites." },
    { id: 'soundmouse', name: "Soundmouse", category: "Broadcast Rights", group: "Rights & Sync", color: "#2B5876", icon: "soundmouse", logo: "/logos of all apps/soundmouse_logo.png", logoDark: "/logos of all apps/soundmouse_logo_dark.png", fallback: "/stores/spotify.svg", speed: "48h", territories: "Global", payout: "100%", desc: "Music cue sheet and broadcast audio recognition powering rights management societies globally." },
    { id: 'musixmatch', name: "Musixmatch", category: "Lyrics & Sync", group: "Rights & Sync", color: "#FF6600", icon: "musixmatch", logo: "/logos of all apps/Musixmatch logo.png", fallback: "/stores/soundcloud.svg", speed: "24h", territories: "Global", payout: "100%", desc: "Time-synced lyrics distributed automatically to Spotify, Apple Music, and Instagram." },

    // ── India & South Asia ──
    { id: 'jiosaavn', name: "JioSaavn", category: "India / Global", group: "Asia & China", color: "#1ECCB0", icon: "jiosaavn", logo: "/logos of all apps/Saavn logo.png", fallback: "/stores/jiosaavn.svg", speed: "48h", territories: "India & 150+ Mkts", payout: "100%", desc: "India's premier streaming giant reaching 100M+ active listeners and Reliance Jio subscribers." },
    { id: 'gaana', name: "Gaana", category: "India", group: "Asia & China", color: "#E72C30", icon: "gaana", logo: "/logos of all apps/Gaana logo.webp", fallback: "/stores/gaana.svg", speed: "48h", territories: "India", payout: "100%", desc: "One of India's biggest music subscription services with vast multi-lingual regional penetration." },

    // ── Greater China & East Asia ──
    { id: 'qqmusic', name: "QQ Music", category: "China / Tencent", group: "Asia & China", color: "#0052D9", icon: "tencentqq", logo: "/logos of all apps/QQ Music logo.png", fallback: "/stores/tencentqq.svg", speed: "72h", territories: "China", payout: "100%", desc: "Tencent Music Entertainment's flagship digital streaming platform commanding 800M+ users." },
    { id: 'neteasecloudmusic', name: "NetEase Cloud", category: "China / Asia", group: "Asia & China", color: "#C20C0C", icon: "neteasecloudmusic", logo: "/logos of all apps/Netease logo.png", fallback: "/stores/neteasecloudmusic.svg", speed: "72h", territories: "China", payout: "100%", desc: "China's youth-centric indie and electronic haven known for hyper-engaged community comments." },
    { id: 'kugou', name: "Kugou", category: "China / Tencent", group: "Asia & China", color: "#0078D7", icon: "kugou", logo: "/logos of all apps/KuGou logo.png", fallback: "/stores/tencentqq.svg", speed: "72h", territories: "China", payout: "100%", desc: "Massive mass-market streaming service in China with integrated karaoke and live interaction." },
    { id: 'kuwomusic', name: "Kuwo Music", category: "China / Tencent", group: "Asia & China", color: "#F59E0B", icon: "kuwo", logo: "/logos of all apps/Kuwa logo.png", fallback: "/stores/tencentqq.svg", speed: "72h", territories: "China", payout: "100%", desc: "Focuses on automotive connected infotainment, hi-res lossless, and ambient soundtrack streaming." },
    { id: 'wesing', name: "WeSing", category: "Karaoke / Tencent", group: "Asia & China", color: "#EF4444", icon: "wesing", logo: "/logos of all apps/WeSing logo.png", fallback: "/stores/tencentqq.svg", speed: "72h", territories: "China & SE Asia", payout: "100%", desc: "World's largest social karaoke platform where hundreds of millions sing along to your master tracks." },
    { id: 'taobao', name: "Taobao", category: "Alibaba / China", group: "Asia & China", color: "#FF5000", icon: "taobao", logo: "/logos of all apps/Taobao logo.png", fallback: "/stores/spotify.svg", speed: "72h", territories: "China", payout: "100%", desc: "Music rights licensing integrated into Alibaba's commerce live streams and interactive storefronts." },
    { id: 'kkbox', name: "KKBOX", category: "East Asia", group: "Asia & China", color: "#00A7E1", icon: "kkbox", logo: "/logos of all apps/KKBox.png", fallback: "/stores/tidal.svg", speed: "48h", territories: "Taiwan, HK, Japan, SG", payout: "100%", desc: "The premier Mandarin and East Asian streaming service with lossless hi-res audio catalog." },
    { id: 'melon', name: "Melon", category: "South Korea", group: "Asia & China", color: "#00CD3C", icon: "melon", logo: "/logos of all apps/Melon logo.png", fallback: "/stores/spotify.svg", speed: "72h", territories: "South Korea", payout: "100%", desc: "The definitive chart and streaming powerhouse of South Korea, pivotal for K-Pop recognition." },
    { id: 'geniemusic', name: "Genie Music", category: "South Korea", group: "Asia & China", color: "#0083FF", icon: "geniemusic", logo: "/logos of all apps/Genie Music logo.png", fallback: "/stores/spotify.svg", speed: "72h", territories: "South Korea", payout: "100%", desc: "Major Korean telecom streaming service with 5G ultra-HD lossless audio capabilities." },
    { id: 'navervibe', name: "Naver VIBE", category: "South Korea", group: "Asia & China", color: "#03C75A", icon: "navermusic", logo: "/logos of all apps/Naver Music logo.png", fallback: "/stores/spotify.svg", speed: "72h", territories: "South Korea", payout: "100%", desc: "AI-curated music platform from Korea's top search engine Naver with direct artist-fan tipping." },
    { id: 'mnet', name: "Mnet", category: "South Korea", group: "Asia & China", color: "#FF007F", icon: "mnet", logo: "/logos of all apps/Mnet logo.png", fallback: "/stores/spotify.svg", speed: "72h", territories: "South Korea", payout: "100%", desc: "CJ ENM music entertainment network powering K-Pop culture, broadcasts, and digital streams." },
    { id: 'awa', name: "AWA", category: "Japan Streaming", group: "Asia & China", color: "#FF5E3A", icon: "awa", logo: "/logos of all apps/AWA Music logo.png", fallback: "/stores/spotify.svg", speed: "48h", territories: "Japan", payout: "100%", desc: "Leading Japanese subscription music service developed by Avex and CyberAgent." },
    { id: 'joox', name: "JOOX", category: "Southeast Asia", group: "Asia & China", color: "#00B833", icon: "joox", logo: "/logos of all apps/Joox logo.png", fallback: "/stores/spotify.svg", speed: "48h", territories: "HK, MY, ID, TH", payout: "100%", desc: "Dominant music streaming and live karaoke platform throughout Southeast Asian emerging markets." },
    { id: 'musicisland', name: "Music Island", category: "Asia Distribution", group: "Asia & China", color: "#3B82F6", icon: "musicisland", logo: "/logos of all apps/Music Island logo.png", fallback: "/stores/deezer.svg", speed: "72h", territories: "Pan-Asia", payout: "100%", desc: "Strategic Asian DSP aggregator connecting Western releases to local domestic streaming hubs." },

    // ── Middle East & Africa ──
    { id: 'anghami', name: "Anghami", category: "MENA Region", group: "Latin America & Africa", color: "#7B1FA2", icon: "anghami", logo: "/logos of all apps/Anghami Music logo.png", fallback: "/stores/anghami.svg", speed: "48h", territories: "19 MENA Nations", payout: "100%", desc: "The first legal music streaming platform in the Arab world with 70M+ registered users." },
    { id: 'boomplay', name: "Boomplay", category: "African Markets", group: "Latin America & Africa", color: "#00AEEF", icon: "boomplay", logo: "/logos of all apps/Boomplay Music.png", fallback: "/stores/boomplay.svg", speed: "48h", territories: "Pan-Africa", payout: "100%", desc: "The largest music streaming and download service in Africa with 90M+ monthly active users." },
    { id: 'ayoba', name: "Ayoba", category: "African Super-App", group: "Latin America & Africa", color: "#F59E0B", icon: "ayoba", logo: "/logos of all apps/Ayoba logo.png", fallback: "/stores/boomplay.svg", speed: "48h", territories: "South Africa, Nigeria, Ghana", payout: "100%", desc: "MTN-backed African super-app offering free music streaming alongside messaging and games." },

    // ── Latin America & Caribbean ──
    { id: 'claromusica', name: "Claro Música", category: "Latin America", group: "Latin America & Africa", color: "#EF4444", icon: "claromusica", logo: "/logos of all apps/Claro Music.png", logoDark: "/logos of all apps/Claro Music_dark.png", fallback: "/stores/spotify.svg", speed: "48h", territories: "16 LATAM Countries", payout: "100%", desc: "America Móvil's music platform bundled into tens of millions of Latin American mobile accounts." },
    { id: 'movistarmusica', name: "Movistar Música", category: "Latin America", group: "Latin America & Africa", color: "#00A9E0", icon: "movistarmusica", logo: "/logos of all apps/Movistar Musica logo.png", fallback: "/stores/spotify.svg", speed: "48h", territories: "LATAM", payout: "100%", desc: "Telefónica-powered digital music service tailored for Spanish-speaking mobile subscribers." },
    { id: 'kuackmedia', name: "Kuack Media", category: "Latin America", group: "Latin America & Africa", color: "#6366F1", icon: "kuack", logo: "/logos of all apps/KUACK logo.png", fallback: "/stores/deezer.svg", speed: "48h", territories: "Caribbean & LATAM", payout: "100%", desc: "White-label streaming powering major carrier apps (Digicel, Virgin Mobile) across Latin America." },
    { id: 'lolamusic', name: "Lola Music", category: "Latin Streaming", group: "Latin America & Africa", color: "#EC4899", icon: "lolamusic", logo: "/logos of all apps/Lola Music logo.webp", fallback: "/stores/deezer.svg", speed: "48h", territories: "LATAM", payout: "100%", desc: "Rising music streaming application serving urban, reggaeton, and regional Latin catalogs." },
    { id: 'dmusic', name: "Digicel D'Music", category: "Caribbean", group: "Latin America & Africa", color: "#DC2626", icon: "dmusic", logo: "/logos of all apps/D'Music logo.png", fallback: "/stores/spotify.svg", speed: "48h", territories: "30+ Caribbean Markets", payout: "100%", desc: "The top mobile music streaming app for the Caribbean diaspora across Jamaica, Trinidad, and beyond." },

    // ── Radio, Fitness, Commercial & In-Store ──
    { id: 'iheartradio', name: "iHeartRadio", category: "Radio & Podcast", group: "Radio & In-Store", color: "#C60000", icon: "iheartradio", logo: "/logos of all apps/I Heart Radio logo.png", fallback: "/stores/iheartradio.svg", speed: "48h", territories: "North America, AU, NZ", payout: "100%", desc: "Reaches 9 out of 10 Americans monthly through 860+ live broadcast stations and digital app streams." },
    { id: 'liveone', name: "LiveOne", category: "Live Audio & Radio", group: "Radio & In-Store", color: "#10B981", icon: "liveone", logo: "/logos of all apps/LiveOne logo.png", fallback: "/stores/spotify.svg", speed: "48h", territories: "Global", payout: "100%", desc: "Creator-first live streaming and Slacker Radio platform reaching millions on Tesla and mobile." },
    { id: 'mixcloud', name: "Mixcloud", category: "DJ & Radio Shows", group: "Radio & In-Store", color: "#5000FF", icon: "mixcloud", logo: "/logos of all apps/Mixcloud.png", fallback: "/stores/soundcloud.svg", speed: "48h", territories: "Global", payout: "100%", desc: "Legally licensed long-form audio platform for DJs, radio shows, and community stations." },
    { id: 'peloton', name: "Peloton", category: "Fitness Audio", group: "Radio & In-Store", color: "#DF1A22", icon: "peloton", logo: "/logos of all apps/Peloton logo.png", fallback: "/stores/peloton.svg", speed: "72h", territories: "Connected Workouts", payout: "100%", desc: "Get paid when your tracks are played during high-energy interactive workout classes globally." },
    { id: 'roxi', name: "ROXi", category: "Connected TV", group: "Radio & In-Store", color: "#F43F5E", icon: "roxi", logo: "/logos of all apps/ROXi logo.png", fallback: "/stores/vevo.svg", speed: "72h", territories: "UK & US Smart TVs", payout: "100%", desc: "Next-generation music entertainment console for living rooms, karaoke, and interactive TV." },
    { id: 'trebel', name: "Trebel", category: "Offline Music", group: "Radio & In-Store", color: "#06B6D4", icon: "trebel", logo: "/logos of all apps/Trebel logo.png", fallback: "/stores/spotify.svg", speed: "48h", territories: "Americas & SE Asia", payout: "100%", desc: "Licensed free offline music download app monetized through non-intrusive brand sponsorships." },
    { id: 'amientertainment', name: "AMI Entertainment", category: "Venue & Jukebox", group: "Radio & In-Store", color: "#E02424", icon: "ami", logo: "/logos of all apps/AMI Entertainment logo.png", fallback: "/stores/spotify.svg", speed: "72h", territories: "30,000+ Venues", payout: "100%", desc: "Digital jukebox network installed in over 30,000 bars, restaurants, and hospitality venues." },
    { id: 'qsic', name: "QSIC", category: "Commercial In-Store", group: "Radio & In-Store", color: "#14B8A6", icon: "qsic", logo: "/logos of all apps/QSIC logo.png", fallback: "/stores/spotify.svg", speed: "72h", territories: "Retail Stores", payout: "100%", desc: "AI-driven in-store background commercial audio streaming for major global retail chains." },
    { id: 'broadtime', name: "Broadtime", category: "Retail & Previews", group: "Radio & In-Store", color: "#10B981", icon: "broadtime", logo: "/logos of all apps/Broadtime logo.png", fallback: "/stores/spotify.svg", speed: "72h", territories: "Record Stores & Kiosks", payout: "100%", desc: "Interactive in-store preview listening stations deployed in independent record shops nationwide." },
    { id: 'jpay', name: "JPay", category: "Institutional", group: "Radio & In-Store", color: "#0284C7", icon: "jpay", logo: "/logos of all apps/JPay logo.png", fallback: "/stores/spotify.svg", speed: "72h", territories: "US Facilities", payout: "100%", desc: "Delivers media players and music access to institutional facilities and corrections networks." },
    { id: 'keefegroup', name: "Keefe Group", category: "Institutional Media", group: "Radio & In-Store", color: "#334155", icon: "keefe", logo: "/logos of all apps/keefe_group_logo.webp", logoDark: "/logos of all apps/keefe_group_logo_dark.png", fallback: "/stores/spotify.svg", speed: "72h", territories: "US Media Systems", payout: "100%", desc: "Institutional media distribution system providing specialized MP3 and entertainment audio." },
    { id: 'viapath', name: "ViaPath", category: "Institutional", group: "Radio & In-Store", color: "#475569", icon: "viapath", logo: "/logos of all apps/ViaPath Technologies logo.png", logoDark: "/logos of all apps/ViaPath Technologies logo_dark.png", fallback: "/stores/spotify.svg", speed: "72h", territories: "US & Canada", payout: "100%", desc: "Secured educational, communication, and digital media entertainment platforms." }
  ];

  const filteredStores = STORES.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.territories && s.territories.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || s.group === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const FAQS = [
    {
      q: "How long does it take to land on Spotify and Apple Music?",
      a: "Most major stores can go live within 72 hours using Priority Distro. With Tunewave, you can choose an exact release date on any plan, unlike some other distributors. Upgrade to Pro and plan your release time down to the hour."
    },
    {
      q: "Which stores does Tunewave distribute music to?",
      a: "Every streaming, download and social platform out there. We're talking Spotify, Apple Music, Tidal, Amazon Music, iTunes, Beatport, TikTok, Instagram, YouTube, Pandora, Deezer, WhatsApp, Boomplay, Snapchat, Audiomack and many more. See the full list above."
    },
    {
      q: "Does Tunewave take a cut of your royalties?",
      a: "No. You keep 100% of the streaming royalties generated by your releases. Tunewave charges a small annual fee for distribution and you can cash out everything you earn."
    },
    {
      q: "Can I upload music videos?",
      a: "Yes. Video distribution to Vevo is available once you've signed up. Upload your music video alongside your audio release, all from the same account."
    },
    {
      q: "Can I keep my existing ISRCs and UPCs?",
      a: "Yes. Bring your own codes, or we generate ISRCs and UPCs for you for free. Either way they stay yours, so you can take them with you if you ever leave Tunewave."
    },
    {
      q: "Which Tunewave plan should I choose?",
      a: "That depends. Our Starter plan is perfect for one artist who wants to put out their own music. Our Pro and Label plans unlock additional tools designed to tailor your releases and boost your earnings."
    }
  ];

  const REVIEWS = [
    {
      name: "Maurizio Fiordaliso",
      meta: "9 June 2026 · France",
      text: "After dealing with frustrating account issues and poor support on a previous platform, making the switch to Tunewave has been a great move for my career."
    },
    {
      name: "rkdigitalmusik",
      meta: "30 May 2026 · UK",
      text: "Tunewave support have been great to help sort out any issues I've had and the platform is good to use with lots of useful functionality. Would I recommend? Yes, definitely!"
    },
    {
      name: "Lighten Letsholo",
      meta: "28 May 2026 · South Africa",
      text: "Tunewave are very friendly, reliable, and professional, with an incredible body of knowledge. You guys are my new home. Thank you Tunewave Team."
    },
    {
      name: "Kyle Butler",
      meta: "14 May 2026 · USA",
      text: "Tunewave made it possible for me to make my dreams a reality. I struggled to get music distributed because of such complex platforms. But not with Tunewave!"
    }
  ];

  const HOW_IT_WORKS_STEPS = [
    {
      num: "01",
      tag: "SETUP & ONBOARDING",
      title: "Sign up & pick a plan",
      body: "Create your verified Tunewave account in 60 seconds. Choose a plan tailored to your release frequency — Starter, Pro, or Label."
    },
    {
      num: "02",
      tag: "UPLOAD & ENCODE",
      title: "Upload your release",
      body: "Drag and drop your 24-bit 96kHz lossless audio files, metadata, splits, and cover art. Free auto-generation of UPC & ISRC codes included."
    },
    {
      num: "03",
      tag: "GLOBAL DISPATCH",
      title: "Land on every store",
      body: "Tunewave delivers your release to Spotify, Apple Music, TikTok, Amazon, and 150+ stores simultaneously on your exact target date."
    },
    {
      num: "04",
      tag: "REAL-TIME REVENUE",
      title: "Track stats, get paid",
      body: "Monitor stream surges, playlist adds, and royalty velocity in real time. Keep 100% of your earnings and withdraw on demand to your bank."
    }
  ];

  return (
    <div style={{ paddingTop: 0, paddingBottom: 100 }}>
      {/* 1. HERO SPLIT: SELL YOUR MUSIC ONLINE */}
      <section
        className="sell-music-hero-section"
        style={{
          position: 'relative',
          padding: '70px 0 95px',
          overflow: 'hidden',
          backgroundImage: `url('/login_background_image/sell-your-music_background_image.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          borderBottom: '1px solid var(--tw-line)'
        }}
      >
        {/* Ambient Gradient Overlay for Readability & High Contrast across Dark and Light Themes */}
        <div
          className="sell-music-hero-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(24px, 4vw, 48px)', alignItems: 'center' }}>
            <div className="reveal-up">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span className="pill-badge" style={{ color: 'var(--tw-cyan)', background: 'rgba(0, 126, 167, 0.12)', border: '1px solid rgba(0, 229, 255, 0.25)' }}>
                  <Music size={13} style={{ marginRight: 4 }} />
                  Music distribution
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.4rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 20,
                color: 'var(--tw-text-white)'
              }}>
                Distribute your music <br />
                <span className="text-cyan-gradient">online.</span>
              </h1>

              <p style={{
                fontSize: '1.2rem',
                color: 'var(--tw-text-dim)',
                lineHeight: 1.6,
                marginBottom: 32,
                maxWidth: '560px'
              }}>
                Release unlimited music to every streaming, download and social platform including Spotify, Apple Music, TikTok, Instagram, and 150+ more. Keep all of the money you make.
              </p>

              {/* 4 Bullet Points */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 36 }}>
                {[
                  "Unlimited releases",
                  "150+ music platforms",
                  "100% royalties",
                  "Publishing, sync and more"
                ].map((b, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--tw-cyan)' }} />
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--tw-text-white)' }}>{b}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                <button
                  onClick={() => onNavigate('/apply')}
                  className="btn-cyan"
                  style={{ padding: '16px 36px', fontSize: '1rem', fontWeight: 700 }}
                >
                  <span>SIGN UP FOR FREE</span>
                  <ArrowRight size={18} className="btn-icon-hover" />
                </button>
                <button
                  onClick={() => onNavigate('/apply')}
                  className="btn-glass"
                  style={{ padding: '16px 32px', fontSize: '1rem', fontWeight: 700 }}
                >
                  <span>PICK A PLAN</span>
                  <ArrowRight size={18} className="btn-icon-hover" />
                </button>
              </div>
            </div>

            {/* Right Interactive Visual */}
            <div className="reveal-scale" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <div 
                className="ingestion-hub-floating-container"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 440,
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <div className="ingestion-glow-aura" style={{
                  position: 'absolute',
                  inset: -24,
                  background: 'radial-gradient(circle at center, rgba(0, 229, 255, 0.28) 0%, rgba(109, 40, 217, 0.16) 60%, transparent 80%)',
                  filter: 'blur(42px)',
                  pointerEvents: 'none'
                }} />

                <div 
                  className="glass-panel card-shimmer-sweep"
                  onMouseMove={handleHubMouseMove}
                  onMouseEnter={handleHubMouseEnter}
                  onMouseLeave={handleHubMouseLeave}
                  style={{
                    padding: '36px',
                    borderRadius: 28,
                    width: '100%',
                    position: 'relative',
                    zIndex: 1,
                    border: '1px solid rgba(0, 229, 255, 0.28)',
                    boxShadow: isHubHovered 
                      ? '0 24px 56px -10px rgba(0, 229, 255, 0.25), 0 16px 36px rgba(0,0,0,0.5)'
                      : '0 18px 45px -8px rgba(0, 229, 255, 0.14), 0 12px 30px rgba(0,0,0,0.45)',
                    transform: isHubHovered
                      ? `perspective(850px) rotateX(${hubTilt.x}deg) rotateY(${hubTilt.y}deg) translateY(-4px) scale(1.018)`
                      : 'perspective(850px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)',
                    transition: isHubHovered
                      ? 'transform 0.12s cubic-bezier(0.1, 0.9, 0.2, 1), box-shadow 0.3s ease, border-color 0.3s ease'
                      : 'transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.6s ease, border-color 0.6s ease',
                    willChange: 'transform'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="live-beacon-dot" />
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--tw-cyan)', letterSpacing: '0.08em' }}>
                        // GLOBAL INGESTION HUB
                      </div>
                    </div>
                    <span style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: 6, background: 'rgba(16, 185, 129, 0.2)', color: 'var(--tw-cyan)', fontWeight: 800 }}>
                      100% ROYALTY SHARE
                    </span>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 20, marginBottom: 20, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginBottom: 8 }}>Track Upload</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div 
                        className="music-badge-animated"
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 14,
                          background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.3) 0%, rgba(109, 40, 217, 0.25) 100%)',
                          border: '1px solid rgba(0, 229, 255, 0.4)',
                          boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.3), 0 6px 18px -3px rgba(0, 229, 255, 0.35)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: "#FFFFFF"
                        }}
                      >
                        <Music size={22} strokeWidth={2.2} />
                      </div>
                      <div>
                        <div style={{ fontSize: '1rem', fontWeight: 800, color: "var(--tw-text-white)" }}>Midnight Velocity</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--tw-cyan)' }}>24-bit 96kHz Lossless FLAC + Atmos</div>
                      </div>
                    </div>
                  </div>

                  {/* Dispatch pipelines */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                    {[
                      { store: "Spotify", status: "Instant Pre-Save & Direct Pitch", time: "< 48 hrs" },
                      { store: "Apple Music", status: "Spatial Audio Certified", time: "< 72 hrs" },
                      { store: "TikTok & Meta", status: "Synchronized Fingerprint", time: "< 48 hrs" },
                      { store: "Beatport & Traxsource", status: "Electronic Direct Feed", time: "Verified" }
                    ].map((pipe, i) => (
                      <div 
                        key={i} 
                        className="ingestion-pipeline-row"
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center', 
                          padding: '10px 14px', 
                          background: 'rgba(255,255,255,0.02)', 
                          borderRadius: 10, 
                          border: '1px solid rgba(255,255,255,0.05)' 
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: "var(--tw-text-white)" }}>{pipe.store}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--tw-text-dim)' }}>{pipe.status}</div>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--tw-cyan)', fontWeight: 700 }}>{pipe.time}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--tw-text-dim)' }}>
                    Free permanent UPC &amp; ISRC generation included on all releases.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @keyframes ingestionHubFloat {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-9px) rotate(0.4deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        @keyframes ingestionAuraPulse {
          0%, 100% {
            opacity: 0.65;
            transform: scale(0.96);
          }
          50% {
            opacity: 1;
            transform: scale(1.06);
          }
        }
        @keyframes liveBeaconPing {
          0% {
            transform: scale(0.9);
            box-shadow: 0 0 0 0 rgba(0, 229, 255, 0.7);
          }
          70% {
            transform: scale(1.1);
            box-shadow: 0 0 0 8px rgba(0, 229, 255, 0);
          }
          100% {
            transform: scale(0.9);
            box-shadow: 0 0 0 0 rgba(0, 229, 255, 0);
          }
        }
        @keyframes musicBadgeBob {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-3px) rotate(-1.5deg);
          }
        }
        .ingestion-hub-floating-container {
          animation: ingestionHubFloat 4.8s ease-in-out infinite;
          perspective: 1000px;
        }
        .ingestion-glow-aura {
          animation: ingestionAuraPulse 4.8s ease-in-out infinite;
        }
        .live-beacon-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--tw-cyan);
          display: inline-block;
          animation: liveBeaconPing 2.2s infinite cubic-bezier(0, 0, 0.2, 1);
        }
        .music-badge-animated {
          animation: musicBadgeBob 3.4s ease-in-out infinite;
        }
        .ingestion-pipeline-row {
          transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .ingestion-pipeline-row:hover {
          transform: translateX(6px);
          background: rgba(0, 229, 255, 0.08) !important;
          border-color: rgba(0, 229, 255, 0.28) !important;
          box-shadow: 0 4px 14px rgba(0, 229, 255, 0.12);
        }
        .sell-music-hero-overlay {
          background: linear-gradient(
            90deg, 
            rgba(8, 11, 17, 0.88) 0%, 
            rgba(8, 11, 17, 0.65) 45%, 
            rgba(8, 11, 17, 0.35) 75%, 
            rgba(8, 11, 17, 0.6) 100%
          );
        }
        [data-theme="light"] .sell-music-hero-overlay {
          background: linear-gradient(
            90deg, 
            rgba(248, 250, 252, 0.88) 0%, 
            rgba(248, 250, 252, 0.58) 45%, 
            rgba(248, 250, 252, 0.22) 75%, 
            rgba(248, 250, 252, 0.5) 100%
          ) !important;
        }
      `}</style>

      {/* 2. FEATURE SLIDER: MUCH MORE THAN MUSIC DISTRIBUTION */}
      <section
        ref={featuresSectionRef}
        id="what-you-get"
        style={{
          padding: '80px 0',
          borderTop: '1px solid var(--tw-line)',
          perspective: 1200,
          position: 'relative'
        }}
      >
        <div className="container">
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 54 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="pill-badge feature-badge-pulse" style={{ color: 'var(--tw-lime)' }}>01 · WHAT YOU GET</span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              marginBottom: 16,
              color: 'var(--tw-text-white)'
            }}>
              Much more than <span className="text-cyan-gradient">music distribution.</span>
            </h2>
            <p style={{
              fontSize: '1.15rem',
              color: 'var(--tw-text-dim)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Create and launch releases in just a few minutes. Access everything you need to make it in music.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
            perspective: 1200
          }}>
            {[
              {
                id: "01",
                icon: CheckCircle2,
                iconColor: "#10B981",
                title: "Instant verification on Spotify",
                body: "Get the verified blue checkmark on your artist profile the second your first release lands.",
                link: "How it works",
                path: "/sell-your-music"
              },
              {
                id: "02",
                icon: Radio,
                iconColor: "#00E5FF",
                title: "Free Pre-Save links with every release",
                body: "Spin up high-converting SmartLinks so fans can save tracks straight to Spotify and Apple Music.",
                link: "Find out more",
                path: "/sell-your-music"
              },
              {
                id: "03",
                icon: Layers,
                iconColor: "#A855F7",
                title: "Auto-split royalties with collaborators",
                body: "Split royalties automatically with co-writers, producers, featured artists and bandmates.",
                link: "More about splits",
                path: "/monetize"
              },
              {
                id: "04",
                icon: Music,
                iconColor: "#38BDF8",
                title: "Unlimited releases to every major platform",
                body: "Never pay per track or album. Release as much music as you want all year round.",
                link: "View store guide",
                path: "#store-directory"
              },
              {
                id: "05",
                icon: DollarSign,
                iconColor: "#22C55E",
                title: "Keep 100% of your royalties",
                body: "Retain 100% of your sales, streaming payouts, and rights. We take 0% of your royalties.",
                link: "See pricing",
                path: "/pricing"
              },
              {
                id: "06",
                icon: BarChart3,
                iconColor: "#6366F1",
                title: "Track your stats with real-time analytics",
                body: "Track live streaming numbers, playlist placements and withdrawal balances right from your dashboard.",
                link: "Explore dashboard",
                path: "/dashboard"
              },
              {
                id: "07",
                icon: Sparkles,
                iconColor: "#F59E0B",
                title: "Pitch your music for sync placements",
                body: "Pitch your tracks directly to music supervisors for TV, films, video games, and global advertising.",
                link: "About sync",
                path: "/monetize"
              }
            ].map((feat, idx) => {
              const IconComponent = feat.icon;
              return (
                <div
                  key={idx}
                  className={`feature-pro-card ${sectionInView ? 'in-view' : ''}`}
                  style={{
                    animationDelay: `${idx * 80}ms`,
                    '--card-accent': feat.iconColor
                  }}
                >
                  {/* Top clean colored accent line */}
                  <div className="feature-top-accent" />

                  {/* Header: Clean Icon + Pill Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div
                      className="feature-icon-box"
                      style={{
                        backgroundColor: `${feat.iconColor}14`,
                        borderColor: `${feat.iconColor}38`,
                        color: feat.iconColor
                      }}
                    >
                      <IconComponent size={20} />
                    </div>
                    <div className="feature-badge-pill">
                      <span className="feature-pulse-dot" style={{ backgroundColor: feat.iconColor }} />
                      <span>// {feat.id}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="feature-card-title">
                      {feat.title}
                    </h3>
                    <p className="feature-card-body">
                      {feat.body}
                    </p>
                  </div>

                  {/* Footer Link */}
                  <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--tw-line)' }}>
                    <span
                      onClick={() => {
                        if (feat.path.startsWith('#')) {
                          document.getElementById('store-directory')?.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          onNavigate(feat.path);
                        }
                      }}
                      className="feature-card-link"
                    >
                      <span>{feat.link}</span>
                      <ArrowRight size={15} className="feature-arrow-icon" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <style>{`
          .feature-pro-card {
            position: relative;
            overflow: hidden;
            padding: 30px 28px;
            display: flex;
            flex-direction: column;
            justifyContent: space-between;
            border-radius: 20px;
            opacity: 0;
            transform: translateY(16px);
            background: var(--tw-bg-card, #131B2A);
            border: 1px solid var(--tw-line);
            transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
            text-rendering: optimizeLegibility !important;
          }

          .feature-pro-card.in-view {
            animation: cleanCardEntrance 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          @keyframes cleanCardEntrance {
            0% {
              opacity: 0;
              transform: translateY(16px);
            }
            100% {
              opacity: 1;
              transform: none;
            }
          }

          /* Top clean accent line (Zero blur) */
          .feature-top-accent {
            position: absolute;
            top: 0;
            left: 0;
            height: 3px;
            width: 36px;
            background: var(--card-accent, #00E5FF);
            border-radius: 0 0 3px 3px;
            box-shadow: none !important;
            transition: width 0.3s ease;
          }

          .feature-pro-card:hover .feature-top-accent {
            width: 100%;
          }

          /* Icon Box (Crisp, clean, Zero blur/glow) */
          .feature-icon-box {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            border: 1px solid;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: none !important;
            filter: none !important;
            transition: transform 0.2s ease;
          }

          .feature-pro-card:hover .feature-icon-box {
            transform: translateY(-2px);
          }

          /* Number Badge */
          .feature-badge-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 0.8rem;
            font-weight: 800;
            color: var(--tw-cyan);
            letter-spacing: 0.05em;
            padding: 4px 10px;
            border-radius: 999px;
            background: rgba(0, 229, 255, 0.08);
            border: 1px solid rgba(0, 229, 255, 0.2);
            box-shadow: none !important;
          }

          .feature-pulse-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            display: inline-block;
            box-shadow: none !important;
          }

          /* Card Hover (Sharp 1px border, Clean Lift, Zero blur) */
          .feature-pro-card:hover {
            transform: translateY(-5px) !important;
            border-color: var(--card-accent, #00E5FF) !important;
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35) !important;
          }

          /* Link */
          .feature-card-link {
            font-size: 0.88rem;
            font-weight: 700;
            color: var(--tw-cyan);
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: color 0.2s ease;
          }

          .feature-arrow-icon {
            transition: transform 0.25s ease;
          }

          .feature-pro-card:hover .feature-arrow-icon {
            transform: translateX(5px);
          }

          .feature-card-title {
            font-size: 1.22rem;
            font-weight: 700;
            color: var(--tw-text-white);
            margin-bottom: 12px;
            line-height: 1.35;
            -webkit-font-smoothing: antialiased !important;
          }

          .feature-card-body {
            font-size: 0.92rem;
            color: var(--tw-text-dim);
            line-height: 1.6;
            margin: 0;
            -webkit-font-smoothing: antialiased !important;
          }

          /* Light Theme Overrides - Solid White, Crystal Sharp Text, Zero Blur */
          [data-theme="light"] .feature-pro-card {
            background: #FFFFFF !important;
            border: 1px solid rgba(0, 0, 0, 0.1) !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }

          [data-theme="light"] .feature-pro-card:hover {
            border-color: var(--card-accent, #007EA7) !important;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.09) !important;
          }

          [data-theme="light"] .feature-card-title {
            color: #0F172A !important;
          }

          [data-theme="light"] .feature-card-body {
            color: #334155 !important;
          }

          [data-theme="light"] .feature-card-link {
            color: #007EA7 !important;
          }

          [data-theme="light"] .feature-badge-pill {
            background: rgba(0, 126, 167, 0.06);
            border-color: rgba(0, 126, 167, 0.18);
            color: #007EA7;
          }
        `}</style>
      </section>

      {/* 3. STORE DIRECTORY: 150+ STORES SEARCHABLE GRID */}
      <section id="store-directory" style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div className="reveal-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 28 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span className="pill-badge" style={{ color: 'var(--tw-cyan)' }}>02 · 150+ STORES · 1 UPLOAD</span>
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 800,
                color: 'var(--tw-text-white)',
                lineHeight: 1.15
              }}>
                Distribute your music on <br />
                <span className="text-cyan-gradient">every platform that pays.</span>
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--tw-text-dim)', maxWidth: '620px', marginTop: 12, lineHeight: 1.6 }}>
                Tunewave distributes to every major streaming, download and social platform on earth. Search our store guide by name or category.
              </p>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '100%', maxWidth: 320 }}>
              <Search size={18} color="var(--tw-cyan)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search 150+ stores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="store-search-input"
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: 12,
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
            {STORE_CATEGORIES.map((cat) => {
              const count = cat === 'All' ? STORES.length : STORES.filter(s => s.group === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 999,
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: isActive ? '1px solid var(--tw-cyan)' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: isActive ? 'rgba(0, 229, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    color: isActive ? 'var(--tw-cyan)' : 'var(--tw-text-dim)',
                    transition: 'all 0.25s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  {cat}
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '1px 6px',
                    borderRadius: 99,
                    background: isActive ? 'var(--tw-cyan)' : 'rgba(255, 255, 255, 0.08)',
                    color: isActive ? '#07090E' : 'inherit'
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Stores Grid */}
          <style>{`
            /* ── Dark mode (default & explicit) ─────────── */
            .store-card {
              background: rgba(255, 255, 255, 0.035);
              border: 1px solid rgba(255, 255, 255, 0.08);
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
            }
            .store-card-name {
              color: #f1f5f9;
            }
            .store-search-input {
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(255, 255, 255, 0.12);
              color: #ffffff;
            }

            /* ── Light mode override ─────────────────────── */
            [data-theme="light"] .store-card {
              background: #ffffff !important;
              border: 1px solid rgba(0, 0, 0, 0.08) !important;
              box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05) !important;
            }
            [data-theme="light"] .store-card-name {
              color: #0f172a !important;
            }
            [data-theme="light"] .store-search-input {
              background: #ffffff !important;
              border: 1px solid rgba(0, 0, 0, 0.12) !important;
              color: #0f172a !important;
            }

            /* ── Shared Card & Hover Animation ─────────── */
            .store-card {
              border-radius: 20px;
              padding: 22px 16px 18px;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 12px;
              cursor: pointer;
              position: relative;
              overflow: hidden;
              transition: transform 0.35s cubic-bezier(.34,1.56,.64,1),
                          box-shadow 0.35s ease,
                          border-color 0.35s ease;
              animation: storeCardIn 0.5s both;
            }
            .store-card::before {
              content: '';
              position: absolute;
              inset: 0;
              border-radius: 20px;
              background: radial-gradient(circle at 50% 0%, var(--card-glow, transparent) 0%, transparent 70%);
              opacity: 0;
              transition: opacity 0.35s ease;
              pointer-events: none;
            }
            .store-card:hover,
            .store-card.selected {
              transform: translateY(-8px) scale(1.04);
              border-color: var(--card-accent, rgba(0,229,255,0.5)) !important;
              box-shadow: 0 20px 48px -8px var(--card-shadow, rgba(0,229,255,0.25)) !important;
            }
            .store-card:hover::before,
            .store-card.selected::before { opacity: 1; }
            .store-card:hover .store-logo-wrap,
            .store-card.selected .store-logo-wrap {
              transform: scale(1.15) rotate(-6deg);
              filter: drop-shadow(0 8px 20px var(--card-shadow, rgba(0,229,255,0.4)));
            }
            .store-card:hover .store-arrow,
            .store-card.selected .store-arrow { opacity: 1; transform: translate(3px, -3px); }

            .store-logo-wrap {
              width: 58px;
              height: 58px;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: transform 0.4s cubic-bezier(.34,1.56,.64,1), filter 0.4s ease;
              position: relative;
              background: transparent;
            }
            [data-theme="light"] .store-logo-wrap {
              background: transparent;
            }
            .store-logo-wrap img {
              width: 52px;
              height: 52px;
              border-radius: 12px;
              object-fit: contain;
              display: block;
              filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.28));
              transition: filter 0.3s ease;
            }
            .store-card-name {
              font-size: 0.84rem;
              font-weight: 700;
              text-align: center;
              line-height: 1.3;
              transition: color 0.25s ease;
            }
            .store-card-category {
              font-size: 0.65rem;
              font-weight: 700;
              letter-spacing: 0.06em;
              text-transform: uppercase;
              color: var(--card-accent-text, #00A8C8);
              text-align: center;
            }
            .store-arrow {
              position: absolute;
              top: 12px;
              right: 12px;
              opacity: 0;
              transition: opacity 0.3s ease, transform 0.3s ease;
            }
            @keyframes storeCardIn {
              from { opacity: 0; transform: translateY(24px) scale(0.94); }
              to   { opacity: 1; transform: translateY(0)  scale(1);    }
            }
            @keyframes shimmerSweep {
              0%   { background-position: 200% 0; }
              50%  { background-position: -50%  0; }
              100% { background-position: 200% 0; }
            }
          `}</style>

          <div className="reveal-stagger" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 14,
            marginBottom: 32
          }}>
            {filteredStores.map((st, i) => {
              const accent = st.color;
              const shadow = accent + '55';
              const glow = accent + '22';
              const isSelected = activeStoreId === st.id;
              const isLightMode = theme === 'light';
              const logoSrc = isLightMode ? st.logo : (st.logoDark || st.logo);
              return (
                <div
                  key={st.id || i}
                  className={`store-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    setActiveStoreId(st.id);
                    setSelectedStoreModal(st);
                  }}
                  style={{
                    '--card-accent': accent + 'aa',
                    '--card-shadow': shadow,
                    '--card-glow': glow,
                    '--card-accent-text': accent,
                    animationDelay: `${Math.min(i * 0.02, 0.6)}s`
                  }}
                >
                  {/* Shimmer sweep overlay */}
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: 18, pointerEvents: 'none',
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmerSweep 3s ease-in-out infinite',
                    animationDelay: `${(i % 10) * 0.18}s`
                  }} />

                  {/* Arrow */}
                  <ArrowRight size={12} color={accent} className="store-arrow" />

                  {/* Logo */}
                  <div className="store-logo-wrap">
                    <img
                      src={`${logoSrc}?v=clean8`}
                      alt={st.name}
                      loading="lazy"
                      onError={(e) => {
                        if (st.fallback && !e.currentTarget.src.includes(st.fallback)) {
                          e.currentTarget.src = st.fallback;
                        } else if (!e.currentTarget.src.includes(`/stores/${st.icon}.svg`)) {
                          e.currentTarget.src = `/stores/${st.icon}.svg`;
                        }
                      }}
                    />
                  </div>

                  {/* Text */}
                  <div>
                    <div className="store-card-name">{st.name}</div>
                    <div className="store-card-category">{st.category}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--tw-text-dim)' }}>
            Showing {filteredStores.length} stores · 150+ supported global DSPs
          </div>

          {/* Interactive DSP Detail Modal */}
          {selectedStoreModal && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: 'rgba(5, 7, 12, 0.75)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20
              }}
              onClick={() => setSelectedStoreModal(null)}
            >
              <div
                style={{
                  background: 'var(--tw-surface, #0d121d)',
                  border: `1px solid ${selectedStoreModal.color}66`,
                  boxShadow: `0 24px 60px -12px ${selectedStoreModal.color}44`,
                  borderRadius: 24,
                  padding: 32,
                  maxWidth: 500,
                  width: '100%',
                  position: 'relative',
                  animation: 'storeCardIn 0.3s cubic-bezier(.34,1.56,.64,1)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedStoreModal(null)}
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--tw-text-white, #ffffff)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <X size={18} />
                </button>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20 }}>
                  <div style={{
                    width: 72,
                    height: 72,
                    borderRadius: 18,
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 8px 24px -4px ${selectedStoreModal.color}55`
                  }}>
                    {(() => {
                      const isLightMode = theme === 'light';
                      const modalLogoSrc = isLightMode ? selectedStoreModal.logo : (selectedStoreModal.logoDark || selectedStoreModal.logo);
                      return (
                        <img
                          src={`${modalLogoSrc}?v=clean8`}
                          alt={selectedStoreModal.name}
                          style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 12 }}
                          onError={(e) => {
                            if (selectedStoreModal.fallback && !e.currentTarget.src.includes(selectedStoreModal.fallback)) {
                              e.currentTarget.src = selectedStoreModal.fallback;
                            }
                          }}
                        />
                      );
                    })()}
                  </div>
                  <div>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: selectedStoreModal.color,
                      marginBottom: 4
                    }}>
                      <Sparkles size={12} />
                      {selectedStoreModal.category}
                    </div>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--tw-text-white, #ffffff)', margin: 0 }}>
                      {selectedStoreModal.name}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: '0.95rem', color: 'var(--tw-text-dim, #94a3b8)', lineHeight: 1.6, marginBottom: 24 }}>
                  {selectedStoreModal.desc || "Fully automated delivery with 100% streaming royalty pass-through, daily performance telemetry, and official rights identification."}
                </p>

                {/* Specs Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 12,
                  marginBottom: 28
                }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 14, padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.74rem', color: 'var(--tw-text-dim)' }}>
                      <Clock size={13} color="var(--tw-cyan)" /> Speed
                    </div>
                    <div style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--tw-text-white, #ffffff)', marginTop: 4 }}>
                      {selectedStoreModal.speed || "24-48 Hours"}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 14, padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.74rem', color: 'var(--tw-text-dim)' }}>
                      <Globe size={13} color="var(--tw-cyan)" /> Territories
                    </div>
                    <div style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--tw-text-white, #ffffff)', marginTop: 4 }}>
                      {selectedStoreModal.territories || "Global Coverage"}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 14, padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.74rem', color: 'var(--tw-text-dim)' }}>
                      <Headphones size={13} color="var(--tw-cyan)" /> Audio Master
                    </div>
                    <div style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--tw-text-white, #ffffff)', marginTop: 4 }}>
                      24-bit Lossless FLAC
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 14, padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.74rem', color: 'var(--tw-text-dim)' }}>
                      <CheckCircle2 size={13} color="#10b981" /> Royalties Kept
                    </div>
                    <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#10b981', marginTop: 4 }}>
                      100% to Artist
                    </div>
                  </div>
                </div>

                {/* Distribute Button */}
                <button
                  onClick={() => {
                    setSelectedStoreModal(null);
                    if (onNavigate) onNavigate('apply');
                    else window.location.href = '/apply';
                  }}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: 14,
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    cursor: 'pointer'
                  }}
                >
                  Distribute to {selectedStoreModal.name}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. HOW IT WORKS: 4 STEPS + 2-IMAGE DUAL-PHASE ANIMATION (DROOMMUSIC INSPIRED) */}
      <section
        id="how-it-works"
        className="how-it-works-section"
        style={{
          padding: '100px 0',
          borderTop: '1px solid var(--tw-line)',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--tw-bg-dark)',
          transition: 'background 0.25s ease'
        }}
      >
        {/* Ambient Stage Glow Backdrop */}
        <div style={{
          position: 'absolute',
          top: '25%',
          right: '8%',
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.12) 0%, rgba(14, 165, 233, 0.05) 50%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Section Header */}
          <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span className="pill-badge" style={{ color: 'var(--tw-cyan)', border: '1px solid rgba(0, 229, 255, 0.3)', background: 'rgba(0, 126, 167, 0.1)' }}>
                <Sparkles size={13} style={{ marginRight: 4 }} />
                03 · HOW IT WORKS
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
              fontWeight: 800,
              marginBottom: 16,
              color: 'var(--tw-text-white)',
              lineHeight: 1.15
            }}>
              From upload to <span className="text-cyan-gradient">first stream.</span>
            </h2>
            <p style={{
              fontSize: '1.15rem',
              color: 'var(--tw-text-dim)',
              maxWidth: '680px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Four seamless steps and your music is live on every major streaming platform that matters worldwide.
            </p>
          </div>

          {/* 2-Column Responsive Layout: Left DroomMusic-Style Steps + Right 2-Image Animated Showcase */}
          <div className="how-it-works-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
            gap: 40,
            alignItems: 'center'
          }}>
            {/* LEFT COLUMN: DroomMusic-Style Interactive Step Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {HOW_IT_WORKS_STEPS.map((st, i) => {
                const isActive = activeStep === i;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setActiveStep(i);
                      setActiveImagePhase(i < 2 ? 1 : 2);
                    }}
                    onMouseEnter={() => {
                      setActiveStep(i);
                      setActiveImagePhase(i < 2 ? 1 : 2);
                    }}
                    className={`glass-panel step-interactive-row ${isActive ? 'active-step-glow' : ''}`}
                    style={{
                      padding: '24px 28px',
                      borderRadius: 18,
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      border: isActive ? '1px solid rgba(0, 229, 255, 0.45)' : '1px solid var(--tw-line)',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(0, 126, 167, 0.18) 0%, rgba(10, 17, 29, 0.85) 100%)'
                        : 'var(--tw-bg-card)',
                      boxShadow: isActive ? '0 12px 35px -8px rgba(0, 229, 255, 0.2)' : 'none',
                      transform: isActive ? 'translateX(6px)' : 'none'
                    }}
                  >
                    {/* DroomMusic Signature Animated Vertical Accent Line */}
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 4,
                      background: 'linear-gradient(180deg, var(--tw-cyan) 0%, #0EA5E9 100%)',
                      transform: isActive ? 'scaleY(1)' : 'scaleY(0)',
                      transformOrigin: 'top',
                      transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      borderRadius: '0 4px 4px 0'
                    }} />

                    <div style={{ display: 'grid', gridTemplateColumns: '46px 1fr', gap: 18, alignItems: 'flex-start' }}>
                      {/* Step Big Number */}
                      <div style={{
                        fontSize: '2rem',
                        fontWeight: 900,
                        fontFamily: "'Space Grotesk', sans-serif",
                        color: isActive ? 'var(--tw-cyan)' : 'var(--tw-text-muted)',
                        transition: 'color 0.3s ease',
                        lineHeight: 1,
                        marginTop: 2
                      }}>
                        {st.num}
                      </div>

                      {/* Content Details */}
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                          <span style={{
                            fontSize: '0.66rem',
                            fontWeight: 800,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            padding: '3px 9px',
                            borderRadius: 6,
                            background: isActive ? 'rgba(0, 229, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                            color: isActive ? 'var(--tw-cyan)' : 'var(--tw-text-muted)',
                            border: isActive ? '1px solid rgba(0, 229, 255, 0.35)' : '1px solid transparent',
                            transition: 'all 0.3s ease'
                          }}>
                            {st.tag}
                          </span>
                          {isActive && (
                            <span style={{ fontSize: '0.72rem', color: 'var(--tw-cyan)', display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 700 }}>
                              <span className="pulse-dot" style={{ width: 6, height: 6 }} />
                              {i < 2 ? 'Studio Stage' : 'Live Platform Stage'}
                            </span>
                          )}
                        </div>

                        <h3 style={{
                          fontSize: '1.18rem',
                          fontWeight: 700,
                          marginBottom: 8,
                          color: 'var(--tw-text-white)'
                        }}>
                          {st.title}
                        </h3>

                        <p style={{
                          fontSize: '0.88rem',
                          color: 'var(--tw-text-dim)',
                          lineHeight: 1.55,
                          margin: 0
                        }}>
                          {st.body}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: 2-Image Animated Showcase Stage */}
            <div style={{ position: 'relative' }}>
              {/* Interactive Phase Toggle Tabs */}
              <div style={{
                display: 'flex',
                background: 'rgba(10, 17, 29, 0.7)',
                padding: 6,
                borderRadius: 16,
                border: '1px solid var(--tw-line)',
                marginBottom: 16,
                gap: 6,
                backdropFilter: 'blur(12px)'
              }}>
                <button
                  onClick={() => {
                    setActiveImagePhase(1);
                    if (activeStep >= 2) setActiveStep(0);
                  }}
                  style={{
                    flex: 1,
                    padding: '11px 16px',
                    borderRadius: 12,
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    transition: 'all 0.25s ease',
                    background: activeImagePhase === 1
                      ? 'linear-gradient(135deg, var(--tw-cyan) 0%, #0EA5E9 100%)'
                      : 'transparent',
                    color: activeImagePhase === 1 ? '#040D1A' : 'var(--tw-text-dim)',
                    boxShadow: activeImagePhase === 1 ? '0 4px 15px rgba(0, 229, 255, 0.35)' : 'none'
                  }}
                >
                  <span>1. Studio Upload Engine</span>
                </button>

                <button
                  onClick={() => {
                    setActiveImagePhase(2);
                    if (activeStep < 2) setActiveStep(2);
                  }}
                  style={{
                    flex: 1,
                    padding: '11px 16px',
                    borderRadius: 12,
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    transition: 'all 0.25s ease',
                    background: activeImagePhase === 2
                      ? 'linear-gradient(135deg, var(--tw-cyan) 0%, #0EA5E9 100%)'
                      : 'transparent',
                    color: activeImagePhase === 2 ? '#040D1A' : 'var(--tw-text-dim)',
                    boxShadow: activeImagePhase === 2 ? '0 4px 15px rgba(0, 229, 255, 0.35)' : 'none'
                  }}
                >
                  <span>2. First Stream &amp; Payout</span>
                </button>
              </div>

              {/* Showcase Frame with 3D Depth, Floating Badge & Smooth Cross-fade Animation */}
              <div
                className="showcase-card-container card-shimmer-sweep"
                style={{
                  position: 'relative',
                  borderRadius: 24,
                  overflow: 'hidden',
                  border: '1px solid rgba(0, 229, 255, 0.35)',
                  boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 35px rgba(0, 229, 255, 0.15)',
                  aspectRatio: '4 / 3',
                  background: '#04070D'
                }}
              >
                {/* IMAGE 1: Upload Studio UI */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: activeImagePhase === 1 ? 1 : 0,
                  transform: activeImagePhase === 1 ? 'scale(1)' : 'scale(1.05)',
                  transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: activeImagePhase === 1 ? 'auto' : 'none'
                }}>
                  <img
                    src="/how_it_works/upload_studio_ui.jpg"
                    alt="Tunewave Studio Upload Engine"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />

                  {/* Floating Micro-Badges on Image 1 */}
                  <div style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    display: 'flex',
                    gap: 8,
                    zIndex: 2
                  }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '5px 12px',
                      borderRadius: 20,
                      background: 'rgba(10, 17, 29, 0.88)',
                      backdropFilter: 'blur(10px)',
                      color: 'var(--tw-cyan)',
                      border: '1px solid rgba(0, 229, 255, 0.4)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6
                    }}>
                      <span className="pulse-dot" style={{ width: 6, height: 6 }} />
                      24-Bit / 96kHz Lossless Ready
                    </span>
                  </div>

                  <div style={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    padding: '8px 16px',
                    borderRadius: 16,
                    background: 'rgba(10, 17, 29, 0.88)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                    color: 'var(--tw-text-white)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    zIndex: 2
                  }}>
                    <span style={{ color: 'var(--tw-cyan)' }}>Steps 01 &amp; 02:</span> Fast Track Ingestion
                  </div>
                </div>

                {/* IMAGE 2: First Stream & Royalties UI */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: activeImagePhase === 2 ? 1 : 0,
                  transform: activeImagePhase === 2 ? 'scale(1)' : 'scale(1.05)',
                  transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: activeImagePhase === 2 ? 'auto' : 'none'
                }}>
                  <img
                    src="/how_it_works/first_stream_ui.jpg"
                    alt="Tunewave First Stream & Royalties"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />

                  {/* Floating Micro-Badges on Image 2 */}
                  <div style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    display: 'flex',
                    gap: 8,
                    zIndex: 2
                  }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '5px 12px',
                      borderRadius: 20,
                      background: 'rgba(10, 17, 29, 0.88)',
                      backdropFilter: 'blur(10px)',
                      color: '#34D399',
                      border: '1px solid rgba(52, 211, 153, 0.4)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6
                    }}>
                      <span className="pulse-dot" style={{ width: 6, height: 6, backgroundColor: '#34D399' }} />
                      Spotify &amp; Apple Music Live
                    </span>
                  </div>

                  <div style={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    padding: '8px 16px',
                    borderRadius: 16,
                    background: 'rgba(10, 17, 29, 0.88)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(52, 211, 153, 0.3)',
                    color: 'var(--tw-text-white)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    zIndex: 2
                  }}>
                    <span style={{ color: '#34D399' }}>Steps 03 &amp; 04:</span> 100% Royalties Paid
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .how-it-works-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
          }
        `}</style>
      </section>

      {/* 5. MID BANNER: YOUR MUSIC JOURNEY BEGINS HERE */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div
            className="journey-banner-card card-shimmer-sweep"
            style={{
              position: 'relative',
              overflow: 'hidden',
              padding: '70px 48px',
              borderRadius: 28,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 20
            }}
          >
            {/* Ambient Overlay for text contrast across themes */}
            <div
              className="journey-banner-overlay"
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            <h2
              className="journey-banner-title"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                maxWidth: '780px',
                position: 'relative',
                zIndex: 1,
                margin: 0
              }}
            >
              Your music journey <span className="text-cyan-gradient">begins here.</span>
            </h2>
            <p
              className="journey-banner-desc"
              style={{
                fontSize: '1.15rem',
                maxWidth: '620px',
                lineHeight: 1.6,
                fontWeight: 500,
                position: 'relative',
                zIndex: 1,
                margin: 0
              }}
            >
              Pick a plan, drop your first release and land on every major store.
            </p>
            <button
              onClick={() => onNavigate('/apply')}
              className="btn-cyan"
              style={{
                padding: '16px 36px',
                fontSize: '1.05rem',
                marginTop: 10,
                position: 'relative',
                zIndex: 1
              }}
            >
              <span>See ALL plans</span>
              <ArrowRight size={18} className="btn-icon-hover" />
            </button>
          </div>
        </div>

        <style>{`
          .journey-banner-card {
            background-image: url('/login_background_image/Your%20music%20journey%20begins%20here%20background.png') !important;
            background-size: cover !important;
            background-position: center center !important;
            background-repeat: no-repeat !important;
            border: 1px solid rgba(0, 229, 255, 0.35) !important;
            box-shadow: 0 20px 50px -15px rgba(0, 126, 167, 0.3) !important;
          }
          .journey-banner-overlay {
            background: radial-gradient(ellipse at center, rgba(9, 13, 21, 0.72) 0%, rgba(9, 13, 21, 0.5) 55%, rgba(9, 13, 21, 0.7) 100%);
          }
          .journey-banner-title {
            color: #FFFFFF !important;
          }
          .journey-banner-desc {
            color: rgba(255, 255, 255, 0.85) !important;
          }

          [data-theme="light"] .journey-banner-card {
            background-image: url('/login_background_image/Your%20music%20journey%20begins%20here%20background.png') !important;
            background-color: transparent !important;
            border: 1px solid rgba(0, 126, 167, 0.22) !important;
            box-shadow: 0 20px 45px -12px rgba(0, 126, 167, 0.16) !important;
          }
          [data-theme="light"] .journey-banner-overlay {
            background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.1) 65%, transparent 100%) !important;
          }
          [data-theme="light"] .journey-banner-title {
            color: #0F172A !important;
          }
          [data-theme="light"] .journey-banner-desc {
            color: #334155 !important;
          }
          @media (max-width: 768px) {
            .journey-banner-card {
              padding: 48px 24px !important;
            }
          }
        `}</style>
      </section>

      {/* 6. TRUSTPILOT REVIEWS */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)', overflow: 'hidden' }}>
        <div className="container">
          <div className="reveal-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 40 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span className="pill-badge" style={{ color: 'var(--tw-cyan)' }}>TRUSTED</span>
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 800,
                color: 'var(--tw-text-white)'
              }}>
                Don't just take our word <span className="text-cyan-gradient">for it.</span>
              </h2>
            </div>

            <div className="trustpilot-badge-box" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 16
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#00B67A', marginBottom: 4 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#00B67A" color="#00B67A" />
                  ))}
                </div>
                <div className="trustpilot-badge-text" style={{ fontSize: '0.85rem', color: 'var(--tw-text-white)' }}>
                  <strong>Great</strong> · 6,257 artist reviews
                </div>
              </div>
              <div style={{ height: 32, width: 1, background: 'rgba(255,255,255,0.1)' }} />
              <div className="trustpilot-badge-score" style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--tw-text-white)' }}>
                4.2 <span style={{ fontSize: '0.85rem', color: 'var(--tw-text-dim)' }}>/ 5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Continuous Right-to-Left Slow Motion Infinite Marquee */}
        <div className="reviews-marquee-container" style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          padding: '12px 0 24px'
        }}>
          <style>{`
            .reviews-marquee-track {
              display: flex;
              gap: 24px;
              width: max-content;
              animation: reviewsScrollRTL 42s linear infinite;
              will-change: transform;
            }
            .reviews-marquee-track:hover {
              animation-play-state: paused;
            }
            @keyframes reviewsScrollRTL {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .review-marquee-card {
              width: 360px;
              min-width: 360px;
              max-width: 360px;
              flex-shrink: 0;
              padding: 26px 24px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              border-radius: 20px;
              cursor: pointer;
              transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s ease, border-color 0.35s ease;
            }
            .review-marquee-card:hover {
              transform: translateY(-6px) scale(1.02);
              border-color: rgba(0, 229, 255, 0.45) !important;
              box-shadow: 0 16px 36px -8px rgba(0, 229, 255, 0.2) !important;
            }
            
            /* Light mode overrides */
            [data-theme="light"] .review-marquee-card {
              background: #ffffff !important;
              border: 1px solid rgba(0, 0, 0, 0.08) !important;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
            }
            [data-theme="light"] .trustpilot-badge-box {
              background: #ffffff !important;
              border: 1px solid rgba(0, 0, 0, 0.08) !important;
              box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05) !important;
            }
            [data-theme="light"] .trustpilot-badge-text,
            [data-theme="light"] .trustpilot-badge-score {
              color: #0f172a !important;
            }
            [data-theme="light"] .review-card-name {
              color: #0f172a !important;
            }
            [data-theme="light"] .review-card-text {
              color: #334155 !important;
            }
            [data-theme="light"] .review-card-meta {
              color: #64748b !important;
            }
          `}</style>

          <div className="reviews-marquee-track">
            {[...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS].map((rev, idx) => (
              <div key={idx} className="glass-panel card-shimmer-sweep review-marquee-card">
                <div>
                  <div style={{ display: 'flex', gap: 3, color: '#00B67A', marginBottom: 14 }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#00B67A" color="#00B67A" />
                    ))}
                  </div>
                  <p className="review-card-text" style={{ fontSize: '0.92rem', color: 'var(--tw-text-dim)', lineHeight: 1.62, fontStyle: 'italic', marginBottom: 20 }}>
                    "{rev.text}"
                  </p>
                </div>
                <div>
                  <div className="review-card-name" style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--tw-text-white)' }}>{rev.name}</div>
                  <div className="review-card-meta" style={{ fontSize: '0.76rem', color: 'var(--tw-text-muted)', marginTop: 2 }}>{rev.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Tunewave FAQS */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--tw-line)' }}>
        <div className="container">
          <div className="reveal-up" style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span className="pill-badge" style={{ color: 'var(--tw-purple)' }}>SUPPORT &amp; FAQS</span>
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800,
                marginBottom: 12,
                color: 'var(--tw-text-white)'
              }}>
                Tunewave FAQs.
              </h2>
              <p style={{ color: 'var(--tw-text-dim)' }}>
                Everything you need to know about releasing music with Tunewave.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="glass-panel"
                  style={{
                    padding: '22px 26px',
                    cursor: 'pointer',
                    borderRadius: 16,
                    border: '1px solid var(--tw-line)'
                  }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--tw-text-white)', margin: 0 }}>
                      {faq.q}
                    </h3>
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: openFaq === i ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <ChevronDown
                        size={18}
                        color="var(--tw-cyan)"
                        style={{
                          transition: 'transform 0.2s ease',
                          transform: openFaq === i ? 'rotate(180deg)' : 'none'
                        }}
                      />
                    </div>
                  </div>
                  {openFaq === i && (
                    <p style={{ marginTop: 14, color: 'var(--tw-text-dim)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. BOTTOM CTA STRIP */}
      <section style={{ padding: '60px 0 20px' }}>
        <div className="container">
          <div
            className="glass-panel card-shimmer-sweep dark-inverted-section"
            style={{
              padding: '56px 48px',
              borderRadius: 24,
              border: '1px solid rgba(34, 197, 94, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 24,
              position: 'relative',
              overflow: 'hidden',
              minHeight: 160,
            }}
          >
            {/* Background image */}
            <img
              src="/login_background_image/Ready to release background image.png"
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: 24,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />
            {/* Overlay — neutral dark-to-transparent so text is crisp */}
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 24,
              background: 'linear-gradient(100deg, rgba(6,8,20,0.93) 0%, rgba(6,8,20,0.80) 40%, rgba(6,8,20,0.30) 70%, transparent 100%)',
              pointerEvents: 'none',
            }} />

            {/* Content — sits above image */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                className="dist-platform-eyebrow"
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#00E5FF',
                  WebkitTextFillColor: '#00E5FF',
                  margin: '0 0 6px',
                  textShadow: '0 1px 8px rgba(0,0,0,0.8)',
                }}
              >
                Distribution Platform
              </div>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 2.8vw, 2rem)',
                fontWeight: 800,
                color: '#FFFFFF !important',
                WebkitTextFillColor: '#FFFFFF',
                margin: 0,
                lineHeight: 1.25,
                textShadow: '0 2px 20px rgba(0,0,0,0.95), 0 1px 6px rgba(0,0,0,1)',
              }}>
                Ready to release? <br />
                <span style={{
                  color: '#4ADE80',
                  WebkitTextFillColor: '#4ADE80',
                  textShadow: '0 2px 14px rgba(0,0,0,0.7)',
                }}>Upload to every platform.</span>
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/apply')}
              className="btn-cyan"
              style={{ padding: '14px 32px', fontSize: '0.95rem', fontWeight: 700, position: 'relative', zIndex: 1 }}
            >
              <span>SIGN UP FOR FREE</span>
              <ArrowRight size={16} className="btn-icon-hover" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
