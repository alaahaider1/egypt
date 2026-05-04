// ===== EGYPT CITIES TOURISM APP - MAIN JS =====

// ===== CONFIG =====
const CONFIG = {
  cities: {
    cairo: { name: 'القاهرة', nameEn: 'Cairo', lat: 30.0444, lon: 31.2357 },
    alexandria: { name: 'الإسكندرية', nameEn: 'Alexandria', lat: 31.2001, lon: 29.9187 },
    luxor: { name: 'الأقصر', nameEn: 'Luxor', lat: 25.6872, lon: 32.6396 },
    aswan: { name: 'أسوان', nameEn: 'Aswan', lat: 24.0889, lon: 32.8998 },
    sharm: { name: 'شرم الشيخ', nameEn: 'Sharm El Sheikh', lat: 27.9158, lon: 34.3299 }
  },
  weatherApi: 'https://api.open-meteo.com/v1/forecast',
  aiResponses: {
    cairo: {
      ar: [
        "الأهرامات هي أشهر معالم القاهرة، يمكنك زيارتها في الصباح الباكر لتجنب الزحام.",
        "خان الخليلي مثالي لشراء التحف والهدايا التذكارية. تفاوض على الأسعار!",
        "المتحف المصري يحتوي على كنوز توت عنخ آمون. لا تفوت زيارته.",
        "أفضل وقت لزيارة القاهرة هو من أكتوبر إلى أبريل.",
        "جرب الكشري في أبو طارق، إنه أفضل مكان للأكل الشعبي!"
      ],
      en: [
        "The Pyramids are Cairo's most famous landmark. Visit early morning to avoid crowds.",
        "Khan El Khalili is perfect for buying souvenirs. Don't forget to negotiate prices!",
        "The Egyptian Museum houses King Tut's treasures. Don't miss it!",
        "Best time to visit Cairo is October to April.",
        "Try Koshary at Abou Tarek - the best authentic Egyptian food!"
      ]
    },
    alexandria: {
      ar: [
        "قلعة قايتباي رائعة عند الغروب، لا تفوت التقاط الصور هناك!",
        "مكتبة الإسكندرية تستحق زيارة طويلة، خاصة المتحف والplanetarium.",
        "جرب السمك في مطاعم البحر في المنتزه، إنه طازج ولذيذ.",
        "كورنيش الإسكندرية ممتاز للمشي مساءً خاصة في الصيف.",
        "القرية النوبية في الإسكندرية؟ لا، لكن يمكنك زيارة المنتزه!"
      ],
      en: [
        "Qaitbay Citadel is stunning at sunset - perfect for photos!",
        "Bibliotheca Alexandrina deserves a long visit, especially the museum and planetarium.",
        "Try fresh seafood at Montaza restaurants - it's delicious!",
        "Alexandria's Corniche is great for evening walks, especially in summer.",
        "Visit Montaza Palace gardens for a relaxing day by the sea."
      ]
    },
    luxor: {
      ar: [
        "معبد الكرنك أكبر من الكاثدرائية! خصص 3 ساعات على الأقل.",
        "وادي الملوك يتطلب تذاكر منفصلة للمقابر الفرعونية.",
        "بالون الأقصر يعطيك إطلالة رائعة على المعابد من الأعلى.",
        "فريق الكباش الجديد يربط الأقصر بالكرنك، رائع للمشي!",
        "زور معبد حتشبسوت في الصباح الباكر للإضاءة المثالية."
      ],
      en: [
        "Karnak Temple is larger than a cathedral! Allow at least 3 hours.",
        "Valley of the Kings requires separate tickets for royal tombs.",
        "Luxor hot air balloon gives stunning views of the temples from above.",
        "The new Sphinx Avenue connects Luxor Temple to Karnak - great for walking!",
        "Visit Hatshepsut Temple early morning for perfect lighting."
      ]
    },
    aswan: {
      ar: [
        "معبد فيلة أجمل ما يكون في الليل مع عرض الصوت والضوء.",
        "أبو سمبل رحلة يوم كامل لكنها تستحق كل لحظة!",
        "القرى النوبية ملونة وجميلة، اشتري الحرف اليدوية من هناك.",
        "ركوب الفلوكة في النيل عند الغروب تجربة لا تُنسى.",
        "أسوان مثالية في الشتاء - الجو دافئ ومشمس دائماً."
      ],
      en: [
        "Philae Temple is most beautiful at night with the sound and light show.",
        "Abu Simbel is a full day trip but worth every moment!",
        "Nubian villages are colorful and beautiful - buy handicrafts there.",
        "A felucca ride on the Nile at sunset is an unforgettable experience.",
        "Aswan is perfect in winter - always warm and sunny."
      ]
    },
    sharm: {
      ar: [
        "محمية رأس محمد من أجمل أماكن الغطس في العالم.",
        "جزيرة تيران وجزيرة صنافير غاية في الجمال تحت الماء.",
        "سفاري الصحراء تجربة رائعة خاصةً مع العشاء البدوي.",
        "خليج نعمة قلب النبض الترفيهي في شرم الشيخ.",
        "جبل موسى وسانت كاترين رحلة روحانية فريدة."
      ],
      en: [
        "Ras Mohammed is one of the world's most beautiful diving spots.",
        "Tiran and Sanafir islands are incredibly beautiful underwater.",
        "Desert safari is amazing, especially with Bedouin dinner.",
        "Naama Bay is the entertainment heart of Sharm El Sheikh.",
        "Mount Sinai and St. Catherine's is a unique spiritual journey."
      ]
    }
  }
};

// ===== STATE =====
let state = {
  lang: localStorage.getItem('lang') || 'ar',
  theme: localStorage.getItem('theme') || 'light',
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]')
};

// ===== DOM ELEMENTS =====
const els = {};

function cacheElements() {
  els.body = document.body;
  els.nav = document.getElementById('navbar');
  els.navLinks = document.getElementById('navLinks');
  els.menuToggle = document.getElementById('menuToggle');
  els.langToggle = document.getElementById('langToggle');
  els.themeToggle = document.getElementById('themeToggle');
  els.favBtn = document.getElementById('favBtn');
  els.favSidebar = document.getElementById('favoritesSidebar');
  els.closeFav = document.getElementById('closeFav');
  els.favList = document.getElementById('favoritesList');
  els.transitionOverlay = document.getElementById('transitionOverlay');
  els.weatherWidget = document.getElementById('weatherWidget');
  els.weatherTemp = document.getElementById('weatherTemp');
  els.weatherDesc = document.getElementById('weatherDesc');
  els.weatherDetails = document.getElementById('weatherDetails');
  els.chatMessages = document.getElementById('chatMessages');
  els.chatInput = document.getElementById('chatInput');
  els.chatSend = document.getElementById('chatSend');
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  cacheElements();
  init();
});

function init() {
  applyTheme();
  applyLang();
  initNavbar();
  initTransitions();
  initFavorites();
  initWeather();
  initChat();
  initScrollReveal();
  initMobileMenu();
}

// ===== THEME =====
function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  const icon = els.themeToggle?.querySelector('i');
  if (icon) {
    icon.className = state.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', state.theme);
  applyTheme();
}

// ===== LANGUAGE =====
function applyLang() {
  const html = document.documentElement;
  html.lang = state.lang === 'ar' ? 'ar' : 'en';
  html.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  
  if (els.langToggle) {
    els.langToggle.innerHTML = `<i class="fas fa-globe"></i> ${state.lang === 'ar' ? 'EN' : 'AR'}`;
  }
  
  // Update static text if needed
  updatePageText();
}

function toggleLang() {
  state.lang = state.lang === 'ar' ? 'en' : 'ar';
  localStorage.setItem('lang', state.lang);
  applyLang();
}

function updatePageText() {
  const isAr = state.lang === 'ar';
  
  // Update section titles
  const titles = document.querySelectorAll('.section-title');
  const titleMap = {
    'تعريف القاهرة': isAr ? 'تعريف القاهرة' : 'About Cairo',
    'تعريف الإسكندرية': isAr ? 'تعريف الإسكندرية' : 'About Alexandria',
    'تعريف الأقصر': isAr ? 'تعريف الأقصر' : 'About Luxor',
    'تعريف أسوان': isAr ? 'تعريف أسوان' : 'About Aswan',
    'تعريف شرم الشيخ': isAr ? 'تعريف شرم الشيخ' : 'About Sharm',
    'الأماكن الأثرية والسياحية': isAr ? 'الأماكن الأثرية والسياحية' : 'Historical & Tourist Sites',
    'معرض الصور': isAr ? 'معرض الصور' : 'Photo Gallery',
    'الفنادق والإقامة': isAr ? 'الفنادق والإقامة' : 'Hotels & Accommodation',
    'مساعد AI السياحي': isAr ? 'مساعد AI السياحي' : 'AI Tourist Assistant',
    'المفضلات': isAr ? 'المفضلات' : 'Favorites'
  };
  
  titles.forEach(title => {
    const text = title.textContent.trim();
    if (titleMap[text]) title.textContent = titleMap[text];
  });
  
  // Update footer
  const footerTitle = document.querySelector('.footer-section h3');
  if (footerTitle) footerTitle.textContent = isAr ? 'مصر السياحية' : 'Egypt Tourism';
  
  // Update placeholders
  if (els.chatInput) {
    const city = els.body.dataset.city;
    const cityName = CONFIG.cities[city]?.nameEn || 'Egypt';
    els.chatInput.placeholder = isAr 
      ? `اسألني عن ${CONFIG.cities[city]?.name || cityName}...`
      : `Ask me about ${cityName}...`;
  }
}

// ===== NAVBAR =====
function initNavbar() {
  if (!els.nav) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      els.nav.classList.add('scrolled');
    } else {
      els.nav.classList.remove('scrolled');
    }
  });
  
  els.themeToggle?.addEventListener('click', toggleTheme);
  els.langToggle?.addEventListener('click', toggleLang);
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  els.menuToggle?.addEventListener('click', () => {
    els.navLinks?.classList.toggle('open');
  });
  
  // Close menu when clicking a link
  els.navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      els.navLinks.classList.remove('open');
    });
  });
}

// ===== CITY TRANSITIONS =====
function initTransitions() {
  if (!els.navLinks) return;
  
  els.navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      
      // Check if same page
      if (href === window.location.pathname.split('/').pop()) return;
      
      e.preventDefault();
      
      // Trigger transition
      els.transitionOverlay?.classList.add('active');
      
      setTimeout(() => {
        window.location.href = href;
      }, 600);
    });
  });
}

// ===== FAVORITES =====
function initFavorites() {
  els.favBtn?.addEventListener('click', toggleFavSidebar);
  els.closeFav?.addEventListener('click', toggleFavSidebar);
  
  // Init favorite buttons
  document.querySelectorAll('.fav-icon').forEach(btn => {
    const id = btn.dataset.id;
    const type = btn.dataset.type;
    
    // Check if already favorited
    if (isFavorited(id, type)) {
      btn.classList.add('active');
      btn.querySelector('i').className = 'fas fa-heart';
    }
    
    btn.addEventListener('click', () => toggleFavorite(btn));
  });
  
  renderFavorites();
}

function isFavorited(id, type) {
  return state.favorites.some(f => f.id === id && f.type === type);
}

function toggleFavorite(btn) {
  const id = btn.dataset.id;
  const type = btn.dataset.type;
  const card = btn.closest('.attraction-card, .hotel-card');
  const name = card?.dataset.name || id;
  const img = card?.querySelector('img')?.src || '';
  
  const index = state.favorites.findIndex(f => f.id === id && f.type === type);
  
  if (index > -1) {
    state.favorites.splice(index, 1);
    btn.classList.remove('active');
    btn.querySelector('i').className = 'far fa-heart';
  } else {
    state.favorites.push({ id, type, name, img, city: els.body.dataset.city });
    btn.classList.add('active');
    btn.querySelector('i').className = 'fas fa-heart';
    
    // Animation
    btn.style.transform = 'scale(1.3)';
    setTimeout(() => btn.style.transform = '', 200);
  }
  
  localStorage.setItem('favorites', JSON.stringify(state.favorites));
  renderFavorites();
}

function toggleFavSidebar() {
  els.favSidebar?.classList.toggle('open');
}

function renderFavorites() {
  if (!els.favList) return;
  
  if (state.favorites.length === 0) {
    els.favList.innerHTML = `
      <div class="fav-empty" style="text-align:center;padding:40px 20px;color:var(--text-light)">
        <i class="far fa-heart" style="font-size:3rem;margin-bottom:15px;display:block"></i>
        <p>${state.lang === 'ar' ? 'لا توجد مفضلات بعد' : 'No favorites yet'}</p>
      </div>
    `;
    return;
  }
  
  els.favList.innerHTML = state.favorites.map(f => `
    <div class="fav-item">
      <img src="${f.img}" alt="${f.name}" onerror="this.src='https://via.placeholder.com/60'">
      <div class="fav-item-info">
        <h4>${f.name}</h4>
        <span>${CONFIG.cities[f.city]?.name || f.city} · ${f.type === 'attraction' ? (state.lang === 'ar' ? 'معلم سياحي' : 'Attraction') : (state.lang === 'ar' ? 'فندق' : 'Hotel')}</span>
      </div>
      <button class="remove-fav" onclick="removeFavorite('${f.id}', '${f.type}')">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');
}

function removeFavorite(id, type) {
  state.favorites = state.favorites.filter(f => !(f.id === id && f.type === type));
  localStorage.setItem('favorites', JSON.stringify(state.favorites));
  
  // Update button state
  const btn = document.querySelector(`.fav-icon[data-id="${id}"][data-type="${type}"]`);
  if (btn) {
    btn.classList.remove('active');
    btn.querySelector('i').className = 'far fa-heart';
  }
  
  renderFavorites();
}

// ===== WEATHER =====
async function initWeather() {
  const lat = els.body?.dataset.lat;
  const lon = els.body?.dataset.lon;
  
  if (!lat || !lon || !els.weatherWidget) return;
  
  try {
    const res = await fetch(
      `${CONFIG.weatherApi}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`
    );
    const data = await res.json();
    
    if (data.current) {
      updateWeatherUI(data.current);
    }
  } catch (err) {
    console.log('Weather fetch failed:', err);
    els.weatherWidget.style.display = 'none';
  }
}

function updateWeatherUI(current) {
  const code = current.weather_code;
  const temp = Math.round(current.temperature_2m);
  const humidity = current.relative_humidity_2m;
  const wind = current.wind_speed_10m;
  
  const weatherMap = {
    0: { icon: 'fa-sun', descAr: 'صافٍ', descEn: 'Clear' },
    1: { icon: 'fa-cloud-sun', descAr: 'غائم جزئياً', descEn: 'Partly Cloudy' },
    2: { icon: 'fa-cloud', descAr: 'غائم', descEn: 'Cloudy' },
    3: { icon: 'fa-cloud', descAr: 'غائم كلياً', descEn: 'Overcast' },
    45: { icon: 'fa-smog', descAr: 'ضباب', descEn: 'Foggy' },
    51: { icon: 'fa-cloud-rain', descAr: 'رذاذ', descEn: 'Drizzle' },
    61: { icon: 'fa-cloud-rain', descAr: 'ممطر', descEn: 'Rainy' },
    71: { icon: 'fa-snowflake', descAr: 'ثلوج', descEn: 'Snow' },
    95: { icon: 'fa-bolt', descAr: 'عواصف رعدية', descEn: 'Thunderstorm' }
  };
  
  const weather = weatherMap[code] || weatherMap[0];
  const isAr = state.lang === 'ar';
  
  els.weatherTemp.textContent = `${temp}°C`;
  els.weatherDesc.textContent = isAr ? weather.descAr : weather.descEn;
  
  const icon = els.weatherWidget.querySelector('.weather-icon');
  if (icon) icon.className = `fas ${weather.icon} weather-icon`;
  
  els.weatherDetails.innerHTML = `
    <div><i class="fas fa-tint"></i> ${humidity}% ${isAr ? 'رطوبة' : 'Humidity'}</div>
    <div><i class="fas fa-wind"></i> ${wind} km/h ${isAr ? 'سرعة الرياح' : 'Wind'}</div>
  `;
}

// ===== AI CHAT =====
function initChat() {
  els.chatSend?.addEventListener('click', sendMessage);
  els.chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}

function sendMessage() {
  const text = els.chatInput?.value.trim();
  if (!text) return;
  
  // Add user message
  addMessage(text, 'user');
  els.chatInput.value = '';
  
  // Simulate AI response
  setTimeout(() => {
    const city = els.body.dataset.city;
    const responses = CONFIG.aiResponses[city];
    const langResponses = state.lang === 'ar' ? responses.ar : responses.en;
    const randomResponse = langResponses[Math.floor(Math.random() * langResponses.length)];
    
    addMessage(randomResponse, 'bot');
  }, 1000);
}

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `message ${sender}-message`;
  div.innerHTML = `
    <div class="message-avatar"><i class="fas ${sender === 'bot' ? 'fa-robot' : 'fa-user'}"></i></div>
    <div class="message-content">${text}</div>
  `;
  els.chatMessages?.appendChild(div);
  els.chatMessages?.scrollTo({ top: els.chatMessages.scrollHeight, behavior: 'smooth' });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.section > .container').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// Export for global access
window.removeFavorite = removeFavorite;
