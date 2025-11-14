
// Scroll to home on page load - FIXED
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', function () {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => document.body.classList.add('page-loaded'));
});

// Particles JS configuration - WITH FULL CURSOR INTERACTION
const getParticleConfig = () => {
    const isMobile = window.innerWidth <= 768;
    return {
        particles: {
            number: { value: isMobile ? 150 : 280, density: { enable: true, value_area: 800 } },
            color: { value: "#000000" },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: true, anim: { enable: true, speed: 0.4, opacity_min: 0.1, sync: false } },
            size: { value: isMobile ? 2 : 2.8, random: true, anim: { enable: true, speed: 25, size_min: 0.1, sync: false } },
            line_linked: { enable: true, distance: isMobile ? 120 : 180, color: "#000000", opacity: 0.2, width: 0.9 },
            move: { enable: true, speed: 0.6, direction: "top-right", straight: false, out_mode: "out", bounce: false, attract: { enable: false } }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "repulse" },
                resize: true
            },
            modes: { repulse: { distance: isMobile ? 80 : 140, duration: 0.8, speed: 3.2, easing: "ease-out-quad" } }
        },
        retina_detect: true
    };
};

const initParticles = () => {
    const config = getParticleConfig();
    particlesJS("particles-js", config);
    particlesJS("particles-js-social", config);
};

setTimeout(() => {
    initParticles();
}, 500);

// Reinitialize particles on window resize for better responsiveness
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        initParticles();
    }, 250);
});

// Year update
document.getElementById('year').textContent = new Date().getFullYear();

// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;

    if (scrolled < heroHeight) {
        const offset = scrolled * 0.3;
        document.querySelector('.hero-content').style.transform = `translateY(${offset}px)`;
    }
}, { passive: true });

// FIXED Dark mode toggle - Mobile optimized
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;
const currentTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
if (currentTheme === 'dark') {
    html.classList.add('dark-mode');
    darkModeToggle.checked = true;
} else {
    html.classList.remove('dark-mode');
    darkModeToggle.checked = false;
}

// Change event for checkbox
darkModeToggle.addEventListener('change', function () {
    const isChecked = this.checked;

    if (isChecked) {
        html.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        html.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }

    // Force repaint
    html.style.backgroundColor = html.style.backgroundColor;
});

// Click event for mobile touch support
darkModeToggle.addEventListener('click', function (e) {
    e.stopPropagation();
});

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Translation data
const translations = {
    en: {
        'nav.home': 'Home',
        'nav.network': 'Network',
        'nav.about': 'About',
        'nav.services': 'What We Do',
        'nav.contact': 'Contact',
        'nav.connect': 'Connect',
        'hero.title': 'Fresh. Fast. Fair.',
        'hero.subtitle': 'Direct from farmers to your doorstep. No middlemen, no compromises, just pure freshness.',
        'network.title': 'Join Our Network',
        'network.farmer': 'Farmer',
        'network.farmer.desc': 'Proceed as a Farmer',
        'network.vendor': 'Vendor',
        'network.vendor.desc': 'Proceed as a Vendor',
        'network.consumer': 'Consumer',
        'network.consumer.desc': 'Proceed as a Consumer',
        'about.title': 'About Grosity',
        'about.intro': 'is a Patiala-based fresh produce startup that connects farmers, vendors, and customers through a simple, transparent, and sustainable supply chain.',
        'about.p1': 'We buy vegetables directly from farmers and deliver them to vendors and homes across the city, ensuring every product is fresh, reasonably priced, and responsibly handled.',
        'about.p2': 'Our goal is to make the everyday vegetable supply stress-free, with no more early morning mandi rush for vendors, and no unstable prices. Grosity empowers farmers with fair rates, supports vendors with consistent supply, and delivers freshness to customers right at their doorsteps.',
        'about.tagline': 'Behind every basket we deliver is a promise:',
        'about.tagline.bold': 'Fresh. Fast. Fair.',
        'about.tagline.end': "That's Grosity, a movement to make local food fresher, faster, fairer and closer to you.",
        'about.farmers.title': '🌾 For Farmers',
        'about.farmers.desc': 'Fair rates and consistent demand. No more price volatility. Direct connection to market opportunity.',
        'about.vendors.title': '🏪 For Vendors',
        'about.vendors.desc': 'No more 4 AM mandi runs. Reliable, consistent supply delivered right to your shop. Fresh stock daily.',
        'about.customers.title': '👨‍👩‍👧‍👦 For Customers',
        'about.customers.desc': 'Farm-fresh vegetables at fair prices. Delivered fast to your doorstep. Quality you can trust.',
        'about.sustainable.title': '♻️ Sustainable',
        'about.sustainable.desc': 'Shorter supply chains mean less waste. Fresher produce. Better for farmers, vendors, customers, and the planet.',
        'services.title': 'How Grosity Works',
        'services.sourcing.title': 'Direct Sourcing',
        'services.sourcing.desc': 'We work directly with local farmers, ensuring fair prices and bypassing exploitative middlemen in the supply chain.',
        'services.delivery.title': 'Fast Delivery',
        'services.delivery.desc': 'Farm to vendor to customer. Our streamlined logistics ensure produce reaches you at peak freshness within hours.',
        'services.pricing.title': 'Transparent Pricing',
        'services.pricing.desc': 'No hidden costs. No sudden price spikes. Fair rates for farmers, affordable prices for customers.',
        'services.impact.title': 'Sustainable Impact',
        'services.impact.desc': 'Short supply chains reduce waste and carbon footprint. Supporting local agriculture and community economy.',
        'contact.title': 'Get In Touch',
        'contact.info': 'Contact Information',
        'contact.email': 'Email',
        'contact.phone': 'Phone',
        'contact.location': 'Location',
        'contact.location.value': 'Patiala, Punjab, India',
        'contact.form.name': 'Your Name',
        'contact.form.email': 'Your Email',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Your Message',
        'contact.form.submit': 'Send Message',
        'connect.title': 'Connect With Us',
        'connect.subtitle': 'Follow us on social media to stay updated with our latest produce, stories, and community impact.',
        'footer.rights': 'Grosity. All rights reserved.'
    },
    hi: {
        'nav.home': 'होम',
        'nav.network': 'नेटवर्क',
        'nav.about': 'हमारे बारे में',
        'nav.services': 'हम क्या करते हैं',
        'nav.contact': 'संपर्क करें',
        'nav.connect': 'जुड़ें',
        'hero.title': 'ताज़ा। तेज़। निष्पक्ष।',
        'hero.subtitle': 'किसानों से सीधे आपके दरवाजे तक। कोई बिचौलिए नहीं, कोई समझौता नहीं, बस शुद्ध ताजगी।',
        'network.title': 'हमारे नेटवर्क में शामिल हों',
        'network.farmer': 'किसान',
        'network.farmer.desc': 'किसान के रूप में आगे बढ़ें',
        'network.vendor': 'विक्रेता',
        'network.vendor.desc': 'विक्रेता के रूप में आगे बढ़ें',
        'network.consumer': 'उपभोक्ता',
        'network.consumer.desc': 'उपभोक्ता के रूप में आगे बढ़ें',
        'about.title': 'ग्रोसिटी के बारे में',
        'about.intro': 'पटियाला स्थित एक ताजा उपज स्टार्टअप है जो एक सरल, पारदर्शी और टिकाऊ आपूर्ति श्रृंखला के माध्यम से किसानों, विक्रेताओं और ग्राहकों को जोड़ता है।',
        'about.p1': 'हम किसानों से सीधे सब्जियां खरीदते हैं और उन्हें शहर भर के विक्रेताओं और घरों तक पहुंचाते हैं, यह सुनिश्चित करते हुए कि हर उत्पाद ताजा, उचित मूल्य पर और जिम्मेदारी से संभाला जाता है।',
        'about.p2': 'हमारा लक्ष्य रोजमर्रा की सब्जी आपूर्ति को तनाव मुक्त बनाना है, विक्रेताओं के लिए सुबह 4 बजे मंडी की भागदौड़ नहीं, और कोई अस्थिर कीमतें नहीं। ग्रोसिटी किसानों को उचित दरों के साथ सशक्त बनाता है, विक्रेताओं को लगातार आपूर्ति के साथ समर्थन करता है, और ग्राहकों को उनके दरवाजे पर ताजगी प्रदान करता है।',
        'about.tagline': 'हर टोकरी के पीछे एक वादा है:',
        'about.tagline.bold': 'ताज़ा। तेज़। निष्पक्ष।',
        'about.tagline.end': 'यही है ग्रोसिटी, स्थानीय भोजन को ताजा, तेज, निष्पक्ष और आपके करीब बनाने का एक आंदोलन।',
        'about.farmers.title': '🌾 किसानों के लिए',
        'about.farmers.desc': 'उचित दरें और लगातार मांग। अब कोई मूल्य अस्थिरता नहीं। बाजार के अवसर से सीधा संबंध।',
        'about.vendors.title': '🏪 विक्रेताओं के लिए',
        'about.vendors.desc': 'अब सुबह 4 बजे मंडी जाने की जरूरत नहीं। विश्वसनीय, लगातार आपूर्ति सीधे आपकी दुकान पर। रोजाना ताजा स्टॉक।',
        'about.customers.title': '👨‍👩‍👧‍👦 ग्राहकों के लिए',
        'about.customers.desc': 'उचित कीमतों पर खेत-ताजा सब्जियां। आपके दरवाजे पर तेजी से डिलीवरी। गुणवत्ता जिस पर आप भरोसा कर सकते हैं।',
        'about.sustainable.title': '♻️ टिकाऊ',
        'about.sustainable.desc': 'छोटी आपूर्ति श्रृंखलाओं का मतलब है कम बर्बादी। ताजा उपज। किसानों, विक्रेताओं, ग्राहकों और ग्रह के लिए बेहतर।',
        'services.title': 'ग्रोसिटी कैसे काम करता है',
        'services.sourcing.title': 'प्रत्यक्ष सोर्सिंग',
        'services.sourcing.desc': 'हम स्थानीय किसानों के साथ सीधे काम करते हैं, उचित कीमतों को सुनिश्चित करते हुए और आपूर्ति श्रृंखला में शोषक बिचौलियों को दरकिनार करते हैं।',
        'services.delivery.title': 'तेज डिलीवरी',
        'services.delivery.desc': 'खेत से विक्रेता से ग्राहक तक। हमारी सुव्यवस्थित लॉजिस्टिक्स सुनिश्चित करती है कि उपज घंटों के भीतर चरम ताजगी पर आप तक पहुंचे।',
        'services.pricing.title': 'पारदर्शी मूल्य निर्धारण',
        'services.pricing.desc': 'कोई छिपी हुई लागत नहीं। कोई अचानक मूल्य वृद्धि नहीं। किसानों के लिए उचित दरें, ग्राहकों के लिए किफायती कीमतें।',
        'services.impact.title': 'टिकाऊ प्रभाव',
        'services.impact.desc': 'छोटी आपूर्ति श्रृंखलाएं बर्बादी और कार्बन फुटप्रिंट को कम करती हैं। स्थानीय कृषि और सामुदायिक अर्थव्यवस्था का समर्थन।',
        'contact.title': 'संपर्क में रहें',
        'contact.info': 'संपर्क जानकारी',
        'contact.email': 'ईमेल',
        'contact.phone': 'फोन',
        'contact.location': 'स्थान',
        'contact.location.value': 'पटियाला, पंजाब, भारत',
        'contact.form.name': 'आपका नाम',
        'contact.form.email': 'आपका ईमेल',
        'contact.form.subject': 'विषय',
        'contact.form.message': 'आपका संदेश',
        'contact.form.submit': 'संदेश भेजें',
        'connect.title': 'हमसे जुड़ें',
        'connect.subtitle': 'हमारी नवीनतम उपज, कहानियों और सामुदायिक प्रभाव के बारे में अपडेट रहने के लिए सोशल मीडिया पर हमें फॉलो करें।',
        'footer.rights': 'ग्रोसिटी। सर्वाधिकार सुरक्षित।'
    },
    pa: {
        'nav.home': 'ਹੋਮ',
        'nav.network': 'ਨੈੱਟਵਰਕ',
        'nav.about': 'ਸਾਡੇ ਬਾਰੇ',
        'nav.services': 'ਅਸੀਂ ਕੀ ਕਰਦੇ ਹਾਂ',
        'nav.contact': 'ਸੰਪਰਕ ਕਰੋ',
        'nav.connect': 'ਜੁੜੋ',
        'hero.title': 'ਤਾਜ਼ਾ। ਤੇਜ਼। ਨਿਰਪੱਖ।',
        'hero.subtitle': 'ਕਿਸਾਨਾਂ ਤੋਂ ਸਿੱਧੇ ਤੁਹਾਡੇ ਦਰਵਾਜ਼ੇ ਤੱਕ। ਕੋਈ ਵਿਚੋਲੇ ਨਹੀਂ, ਕੋਈ ਸਮਝੌਤਾ ਨਹੀਂ, ਸਿਰਫ਼ ਸ਼ੁੱਧ ਤਾਜ਼ਗੀ।',
        'network.title': 'ਸਾਡੇ ਨੈੱਟਵਰਕ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ',
        'network.farmer': 'ਕਿਸਾਨ',
        'network.farmer.desc': 'ਕਿਸਾਨ ਵਜੋਂ ਅੱਗੇ ਵਧੋ',
        'network.vendor': 'ਵਿਕਰੇਤਾ',
        'network.vendor.desc': 'ਵਿਕਰੇਤਾ ਵਜੋਂ ਅੱਗੇ ਵਧੋ',
        'network.consumer': 'ਖਪਤਕਾਰ',
        'network.consumer.desc': 'ਖਪਤਕਾਰ ਵਜੋਂ ਅੱਗੇ ਵਧੋ',
        'about.title': 'ਗ੍ਰੋਸਿਟੀ ਬਾਰੇ',
        'about.intro': 'ਪਟਿਆਲਾ ਸਥਿਤ ਇੱਕ ਤਾਜ਼ੀ ਉਪਜ ਸਟਾਰਟਅੱਪ ਹੈ ਜੋ ਇੱਕ ਸਰਲ, ਪਾਰਦਰਸ਼ੀ ਅਤੇ ਟਿਕਾਊ ਸਪਲਾਈ ਚੇਨ ਰਾਹੀਂ ਕਿਸਾਨਾਂ, ਵਿਕਰੇਤਾਵਾਂ ਅਤੇ ਗਾਹਕਾਂ ਨੂੰ ਜੋੜਦਾ ਹੈ।',
        'about.p1': 'ਅਸੀਂ ਕਿਸਾਨਾਂ ਤੋਂ ਸਿੱਧੇ ਸਬਜ਼ੀਆਂ ਖਰੀਦਦੇ ਹਾਂ ਅਤੇ ਉਹਨਾਂ ਨੂੰ ਸ਼ਹਿਰ ਭਰ ਦੇ ਵਿਕਰੇਤਾਵਾਂ ਅਤੇ ਘਰਾਂ ਤੱਕ ਪਹੁੰਚਾਉਂਦੇ ਹਾਂ, ਇਹ ਯਕੀਨੀ ਬਣਾਉਂਦੇ ਹੋਏ ਕਿ ਹਰ ਉਤਪਾਦ ਤਾਜ਼ਾ, ਉਚਿਤ ਕੀਮਤ ਤੇ ਅਤੇ ਜ਼ਿੰਮੇਵਾਰੀ ਨਾਲ ਸੰਭਾਲਿਆ ਜਾਂਦਾ ਹੈ।',
        'about.p2': 'ਸਾਡਾ ਟੀਚਾ ਰੋਜ਼ਾਨਾ ਸਬਜ਼ੀਆਂ ਦੀ ਸਪਲਾਈ ਨੂੰ ਤਣਾਅ ਮੁਕਤ ਬਣਾਉਣਾ ਹੈ, ਵਿਕਰੇਤਾਵਾਂ ਲਈ ਸਵੇਰੇ 4 ਵਜੇ ਮੰਡੀ ਦੀ ਭੱਜ-ਦੌੜ ਨਹੀਂ, ਅਤੇ ਕੋਈ ਅਸਥਿਰ ਕੀਮਤਾਂ ਨਹੀਂ। ਗ੍ਰੋਸਿਟੀ ਕਿਸਾਨਾਂ ਨੂੰ ਉਚਿਤ ਦਰਾਂ ਨਾਲ ਸਸ਼ਕਤ ਬਣਾਉਂਦੀ ਹੈ, ਵਿਕਰੇਤਾਵਾਂ ਨੂੰ ਲਗਾਤਾਰ ਸਪਲਾਈ ਨਾਲ ਸਹਾਇਤਾ ਕਰਦੀ ਹੈ, ਅਤੇ ਗਾਹਕਾਂ ਨੂੰ ਉਹਨਾਂ ਦੇ ਦਰਵਾਜ਼ੇ ਤੇ ਤਾਜ਼ਗੀ ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ।',
        'about.tagline': 'ਹਰ ਟੋਕਰੀ ਦੇ ਪਿੱਛੇ ਇੱਕ ਵਾਅਦਾ ਹੈ:',
        'about.tagline.bold': 'ਤਾਜ਼ਾ। ਤੇਜ਼। ਨਿਰਪੱਖ।',
        'about.tagline.end': 'ਇਹ ਹੈ ਗ੍ਰੋਸਿਟੀ, ਸਥਾਨਕ ਭੋਜਨ ਨੂੰ ਤਾਜ਼ਾ, ਤੇਜ਼, ਨਿਰਪੱਖ ਅਤੇ ਤੁਹਾਡੇ ਨੇੜੇ ਬਣਾਉਣ ਦੀ ਇੱਕ ਮੁਹਿੰਮ।',
        'about.farmers.title': '🌾 ਕਿਸਾਨਾਂ ਲਈ',
        'about.farmers.desc': 'ਉਚਿਤ ਦਰਾਂ ਅਤੇ ਲਗਾਤਾਰ ਮੰਗ। ਹੁਣ ਕੋਈ ਕੀਮਤ ਅਸਥਿਰਤਾ ਨਹੀਂ। ਬਾਜ਼ਾਰ ਦੇ ਮੌਕੇ ਨਾਲ ਸਿੱਧਾ ਸੰਬੰਧ।',
        'about.vendors.title': '🏪 ਵਿਕਰੇਤਾਵਾਂ ਲਈ',
        'about.vendors.desc': 'ਹੁਣ ਸਵੇਰੇ 4 ਵਜੇ ਮੰਡੀ ਜਾਣ ਦੀ ਲੋੜ ਨਹੀਂ। ਭਰੋਸੇਯੋਗ, ਲਗਾਤਾਰ ਸਪਲਾਈ ਸਿੱਧੇ ਤੁਹਾਡੀ ਦੁਕਾਨ ਤੇ। ਰੋਜ਼ਾਨਾ ਤਾਜ਼ਾ ਸਟਾਕ।',
        'about.customers.title': '👨‍👩‍👧‍👦 ਗਾਹਕਾਂ ਲਈ',
        'about.customers.desc': 'ਉਚਿਤ ਕੀਮਤਾਂ ਤੇ ਖੇਤ-ਤਾਜ਼ੀਆਂ ਸਬਜ਼ੀਆਂ। ਤੁਹਾਡੇ ਦਰਵਾਜ਼ੇ ਤੇ ਤੇਜ਼ੀ ਨਾਲ ਡਿਲੀਵਰੀ। ਗੁਣਵੱਤਾ ਜਿਸ ਤੇ ਤੁਸੀਂ ਭਰੋਸਾ ਕਰ ਸਕਦੇ ਹੋ।',
        'about.sustainable.title': '♻️ ਟਿਕਾਊ',
        'about.sustainable.desc': 'ਛੋਟੀਆਂ ਸਪਲਾਈ ਚੇਨਾਂ ਦਾ ਮਤਲਬ ਹੈ ਘੱਟ ਬਰਬਾਦੀ। ਤਾਜ਼ੀ ਉਪਜ। ਕਿਸਾਨਾਂ, ਵਿਕਰੇਤਾਵਾਂ, ਗਾਹਕਾਂ ਅਤੇ ਧਰਤੀ ਲਈ ਬਿਹਤਰ।',
        'services.title': 'ਗ੍ਰੋਸਿਟੀ ਕਿਵੇਂ ਕੰਮ ਕਰਦੀ ਹੈ',
        'services.sourcing.title': 'ਸਿੱਧੀ ਸੋਰਸਿੰਗ',
        'services.sourcing.desc': 'ਅਸੀਂ ਸਥਾਨਕ ਕਿਸਾਨਾਂ ਨਾਲ ਸਿੱਧੇ ਕੰਮ ਕਰਦੇ ਹਾਂ, ਉਚਿਤ ਕੀਮਤਾਂ ਨੂੰ ਯਕੀਨੀ ਬਣਾਉਂਦੇ ਹੋਏ ਅਤੇ ਸਪਲਾਈ ਚੇਨ ਵਿੱਚ ਸ਼ੋਸ਼ਕ ਵਿਚੋਲਿਆਂ ਨੂੰ ਦਰਕਿਨਾਰ ਕਰਦੇ ਹੋਏ।',
        'services.delivery.title': 'ਤੇਜ਼ ਡਿਲੀਵਰੀ',
        'services.delivery.desc': 'ਖੇਤ ਤੋਂ ਵਿਕਰੇਤਾ ਤੋਂ ਗਾਹਕ ਤੱਕ। ਸਾਡੀ ਸੁਚਾਰੂ ਲੌਜਿਸਟਿਕਸ ਯਕੀਨੀ ਬਣਾਉਂਦੀ ਹੈ ਕਿ ਉਪਜ ਘੰਟਿਆਂ ਵਿੱਚ ਚਰਮ ਤਾਜ਼ਗੀ ਤੇ ਤੁਹਾਡੇ ਤੱਕ ਪਹੁੰਚੇ।',
        'services.pricing.title': 'ਪਾਰਦਰਸ਼ੀ ਕੀਮਤ ਨਿਰਧਾਰਨ',
        'services.pricing.desc': 'ਕੋਈ ਲੁਕੀਆਂ ਲਾਗਤਾਂ ਨਹੀਂ। ਕੋਈ ਅਚਾਨਕ ਕੀਮਤ ਵਾਧਾ ਨਹੀਂ। ਕਿਸਾਨਾਂ ਲਈ ਉਚਿਤ ਦਰਾਂ, ਗਾਹਕਾਂ ਲਈ ਕਿਫਾਇਤੀ ਕੀਮਤਾਂ।',
        'services.impact.title': 'ਟਿਕਾਊ ਪ੍ਰਭਾਵ',
        'services.impact.desc': 'ਛੋਟੀਆਂ ਸਪਲਾਈ ਚੇਨਾਂ ਬਰਬਾਦੀ ਅਤੇ ਕਾਰਬਨ ਫੁੱਟਪ੍ਰਿੰਟ ਨੂੰ ਘਟਾਉਂਦੀਆਂ ਹਨ। ਸਥਾਨਕ ਖੇਤੀਬਾੜੀ ਅਤੇ ਸਮੁਦਾਇਕ ਆਰਥਿਕਤਾ ਦਾ ਸਮਰਥਨ।',
        'contact.title': 'ਸੰਪਰਕ ਵਿੱਚ ਰਹੋ',
        'contact.info': 'ਸੰਪਰਕ ਜਾਣਕਾਰੀ',
        'contact.email': 'ਈਮੇਲ',
        'contact.phone': 'ਫ਼ੋਨ',
        'contact.location': 'ਸਥਾਨ',
        'contact.location.value': 'ਪਟਿਆਲਾ, ਪੰਜਾਬ, ਭਾਰਤ',
        'contact.form.name': 'ਤੁਹਾਡਾ ਨਾਮ',
        'contact.form.email': 'ਤੁਹਾਡਾ ਈਮੇਲ',
        'contact.form.subject': 'ਵਿਸ਼ਾ',
        'contact.form.message': 'ਤੁਹਾਡਾ ਸੁਨੇਹਾ',
        'contact.form.submit': 'ਸੁਨੇਹਾ ਭੇਜੋ',
        'connect.title': 'ਸਾਡੇ ਨਾਲ ਜੁੜੋ',
        'connect.subtitle': 'ਸਾਡੀ ਨਵੀਨਤਮ ਉਪਜ, ਕਹਾਣੀਆਂ ਅਤੇ ਸਮੁਦਾਇਕ ਪ੍ਰਭਾਵ ਬਾਰੇ ਅਪਡੇਟ ਰਹਿਣ ਲਈ ਸੋਸ਼ਲ ਮੀਡੀਆ ਤੇ ਸਾਨੂੰ ਫਾਲੋ ਕਰੋ।',
        'footer.rights': 'ਗ੍ਰੋਸਿਟੀ। ਸਾਰੇ ਅਧਿਕਾਰ ਰਾਖਵੇਂ।'
    }
};

function translatePage(langCode) {
    const lang = translations[langCode] || translations.en;
    const elements = document.querySelectorAll('[data-translate]');

    // Add staggered animation to elements
    elements.forEach((element, index) => {
        // Stagger the animation slightly for each element
        setTimeout(() => {
            element.classList.add('translating');

            // Change text at the midpoint of animation (when opacity is 0)
            setTimeout(() => {
                const key = element.getAttribute('data-translate');
                if (lang[key]) {
                    element.textContent = lang[key];
                }
            }, 300);

            // Remove animation class after animation completes
            setTimeout(() => {
                element.classList.remove('translating');
            }, 600);
        }, index * 20); // 20ms delay between each element
    });
}

// Language Selector Functions
function toggleLanguageDropdown() {
    document.body.classList.toggle('dropdown-expanded');
}

function selectLanguage(langCode, langName) {
    // Show loader
    showLoader();

    // Track language change
    trackLanguageChange(langCode, langName);

    // Update selected language display
    document.getElementById('selectedLanguage').textContent = langName;

    // Store selected language
    localStorage.setItem('selectedLanguage', langCode);
    localStorage.setItem('selectedLanguageName', langName);

    // Update selected state in dropdown
    document.querySelectorAll('.dropdown-row').forEach(row => {
        row.classList.remove('selected');
    });
    document.querySelector(`[data-lang="${langCode}"]`).classList.add('selected');

    // Close dropdown
    document.body.classList.remove('dropdown-expanded');

    // Start translation after loader appears
    setTimeout(() => {
        translatePage(langCode);

        // Hide loader after all translations complete
        // Calculate total time: stagger delay * elements + animation time
        const elements = document.querySelectorAll('[data-translate]').length;
        const totalTime = (elements * 20) + 700;

        setTimeout(() => {
            hideLoader();
        }, totalTime);
    }, 300);

    console.log(`Language changed to: ${langName} (${langCode})`);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function () {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    const savedLangName = localStorage.getItem('selectedLanguageName') || 'English';

    // Set initial language
    document.getElementById('selectedLanguage').textContent = savedLangName;
    document.querySelector(`[data-lang="${savedLang}"]`)?.classList.add('selected');

    // Apply translation
    translatePage(savedLang);
});

// General Loader Functions - Simplified
function showLoader() {
    const loader = document.getElementById('truckLoader');
    loader.classList.add('active');
}

function hideLoader() {
    const loader = document.getElementById('truckLoader');
    loader.classList.remove('active');
}

// Dropdown close on outside click
document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown-container')) {
        document.body.classList.remove('dropdown-expanded');
    }
});

// Form submit handler
function handleSubmit(event) {
    event.preventDefault();

    // Show loader
    showLoader();

    // Get form data
    const formData = {
        name: event.target.name.value,
        email: event.target.email.value,
        subject: event.target.subject.value,
        message: event.target.message.value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'new'
    };

    // Save to Firebase Firestore
    db.collection('contacts').add(formData)
        .then(function(docRef) {
            console.log('✅ Message saved with ID:', docRef.id);
            hideLoader();

            // Track form submission in Firebase Analytics
            analytics.logEvent('form_submit', {
                form_name: 'contact_form',
                success: true
            });
            
            // Update admin_analytics collection
            const today = new Date().toISOString().split('T')[0];
            db.collection('admin_analytics').doc(today).update({
                contactSubmissions: firebase.firestore.FieldValue.increment(1),
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            }).catch(err => console.log('Analytics update:', err));

            // Show success message immediately
            alert('Thank you for your message! We will get back to you soon.\n\nFor immediate assistance:\n📧 grosity.connect@gmail.com\n📱 +91 73096 85242');
            event.target.reset();
        })
        .catch(function(error) {
            console.error('❌ Error saving message:', error);
            hideLoader();

            // Track form submission error
            analytics.logEvent('form_submit', {
                form_name: 'contact_form',
                success: false,
                error: error.message
            });

            // Show error message immediately
            alert('Sorry, there was an error submitting your message.\n\nPlease contact us directly:\n📧 grosity.connect@gmail.com\n📱 +91 73096 85242');
        });
}


// Network monitoring and general loader usage examples
// Show loader for slow page loads (optional - uncomment if needed)
/*
let networkTimeout;
document.addEventListener('DOMContentLoaded', function() {
    networkTimeout = setTimeout(() => {
        if (document.readyState !== 'complete') {
            showLoader();
        }
    }, 2000);
});

window.addEventListener('load', function() {
    clearTimeout(networkTimeout);
    hideLoader();
});
*/

// Example: Use loader for fetch requests
// Wrap your API calls like this:
/*
async function fetchWithLoader(url, options) {
    showLoader();
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        hideLoader();
        return data;
    } catch (error) {
        hideLoader();
        console.error('Network error:', error);
        alert('Network error. Please check your connection.');
        throw error;
    }
}

// Usage example:
fetchWithLoader('/api/data')
    .then(data => console.log(data))
    .catch(err => console.error(err));
*/


// Chatbot Functions
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    const isOpening = !chatWindow.classList.contains('active');
    chatWindow.classList.toggle('active');
    
    if (isOpening) {
        trackChatbotOpen();
        // Focus input when opening
        setTimeout(() => {
            document.getElementById('chatInput').focus();
        }, 300);
    } else {
        trackChatbotClose();
    }
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Get response from Gemini API
        const response = await getGeminiResponse(message);
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Add bot response
        addMessage(response, 'bot');
    } catch (error) {
        console.error('Error getting response:', error);
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Fallback response
        const fallbackResponse = getFallbackResponse(message);
        addMessage(fallbackResponse, 'bot');
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    // Track message
    trackChatbotMessage(text, sender === 'user');
    
    if (sender === 'bot') {
        // Format the message with clickable links
        const formattedText = formatMessageWithLinks(text);
        messageDiv.innerHTML = `
            <img src="cappi.png" alt="Cappi" class="message-avatar">
            <div class="message-content">
                ${formattedText}
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function formatMessageWithLinks(text) {
    // Split by newlines to preserve formatting
    const lines = text.split('\n');
    let formattedHTML = '';
    
    lines.forEach((line, index) => {
        if (line.trim() === '') {
            formattedHTML += '<br>';
            return;
        }
        
        let formattedLine = line;
        
        // Make phone numbers clickable
        formattedLine = formattedLine.replace(/(\+91\s*\d{5}\s*\d{5})/g, '<a href="tel:$1" class="chat-link">$1</a>');
        
        // Make emails clickable
        formattedLine = formattedLine.replace(/(grosity\.connect@gmail\.com)/g, '<a href="mailto:$1" class="chat-link">$1</a>');
        
        formattedHTML += `<p>${formattedLine}</p>`;
    });
    
    return formattedHTML;
}

async function askFAQ(question) {
    // Track FAQ click
    trackFAQClick(question);
    
    // Add user question
    addMessage(question, 'user');
    
    // Show typing indicator
    showTypingIndicator();
    
    // Use pre-defined answers for FAQ buttons (no API call)
    setTimeout(() => {
        removeTypingIndicator();
        const response = getFAQResponse(question);
        addMessage(response, 'bot');
    }, 600);
}

// Pre-defined FAQ responses (instant, no API needed)
function getFAQResponse(question) {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('what is grosity')) {
        return "Grosity is a Patiala-based fresh produce startup that connects farmers, vendors, and customers through a transparent supply chain.\n\nWe deliver farm-fresh vegetables directly from farmers to your doorstep - no middlemen, no compromises! 🌾✨";
    }
    
    if (lowerQuestion.includes('how do i order')) {
        return "Ordering is easy! 📦\n\n1. Click 'Consumer' button on website\n2. Or WhatsApp us at:\n+91 73096 85242\n\n3. Tell us what you need\n4. We deliver to your doorstep!\n\nFast, fresh, and fair! 🚚";
    }
    
    if (lowerQuestion.includes('delivery areas')) {
        return "We deliver in Patiala and nearby areas in Punjab! 📍\n\nOur delivery is super fast - farm to door within hours of harvest.\n\nPlanning to expand soon!\n\nContact us:\n+91 73096 85242";
    }
    
    if (lowerQuestion.includes('for farmers')) {
        return "🌾 Benefits for Farmers:\n\n✅ Fair & consistent rates\n✅ No price volatility\n✅ Direct market access\n✅ Guaranteed demand\n✅ No exploitative middlemen\n\nJoin our network!\n\nContact:\n+91 73096 85242\ngrosity.connect@gmail.com";
    }
    
    if (lowerQuestion.includes('for vendors')) {
        return "🏪 Benefits for Vendors:\n\n✅ No more 4 AM mandi runs\n✅ Reliable daily supply\n✅ Fresh stock guaranteed\n✅ Delivered to your shop\n✅ Consistent pricing\n\nInterested?\n\nCall us:\n+91 73096 85242\ngrosity.connect@gmail.com";
    }
    
    if (lowerQuestion.includes('contact info')) {
        return "📞 Contact Grosity:\n\n📧 Email:\ngrosity.connect@gmail.com\n\n📱 Phone:\n+91 73096 85242\n\n📍 Location:\nPatiala, Punjab, India\n\nWe're here to help! Reach out anytime 😊";
    }
    
    // Fallback for any other FAQ question
    return getOfflineResponse(question);
}

// Keep the old async function for typed messages (uses AI)
async function askFAQOld(question) {
    // Add user question
    addMessage(question, 'user');
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Get response from Gemini API
        const response = await getGeminiResponse(question);
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Add bot response
        addMessage(response, 'bot');
    } catch (error) {
        console.error('Error getting response:', error);
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Fallback response
        const fallbackResponse = getFallbackResponse(question);
        addMessage(fallbackResponse, 'bot');
    }
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <img src="cappi.png" alt="Cappi" class="message-avatar">
        <div class="typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Track online/offline status
let isCappiOnline = true;

// Update status indicator
function updateCappiStatus(online) {
    isCappiOnline = online;
    const statusElement = document.querySelector('.chat-status');
    if (statusElement) {
        if (online) {
            statusElement.textContent = 'Online';
            statusElement.classList.remove('offline');
        } else {
            statusElement.textContent = 'Offline';
            statusElement.classList.add('offline');
        }
    }
}

// Check Cappi status on page load
async function checkCappiStatus() {
    try {
        console.log('🔍 Checking Cappi status...');
        
        // Set status to checking
        const statusElement = document.querySelector('.chat-status');
        if (statusElement) {
            statusElement.textContent = 'Checking...';
        }
        
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Hello'
            })
        });

        if (response.ok) {
            const data = await response.json();
            // Check if we got a valid response (not an error)
            if (data.candidates?.[0]?.content?.parts?.[0]?.text && !data.offline && !data.error) {
                console.log('✅ Cappi is ONLINE');
                updateCappiStatus(true);
            } else {
                console.log('⚠️ Cappi is OFFLINE - API returned error or offline status');
                console.log('Response data:', data);
                updateCappiStatus(false);
            }
        } else {
            console.log('⚠️ Cappi is OFFLINE - HTTP error:', response.status);
            updateCappiStatus(false);
        }
    } catch (error) {
        console.error('💥 Cappi status check failed:', error);
        updateCappiStatus(false);
    }
}

// Check status when page loads
window.addEventListener('load', function() {
    setTimeout(checkCappiStatus, 1500);
});

// Gemini API Integration via Backend
async function getGeminiResponse(userMessage) {
    try {
        console.log('🔍 Calling Cappi backend API...');
        
        // Call our backend API endpoint
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userMessage
            })
        });

        const data = await response.json();
        console.log('✅ Backend Response:', data);
        
        // Check if API returned offline status
        if (!response.ok || data.offline || data.error) {
            console.log('⚠️ API is offline, using local responses');
            updateCappiStatus(false);
            return getOfflineResponse(userMessage);
        }
        
        // Extract reply from response (same format as Marcus)
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (reply && reply.trim()) {
            // API is working
            console.log('✅ Cappi is ONLINE');
            updateCappiStatus(true);
            return reply;
        } else {
            console.log('⚠️ Empty response, going offline');
            updateCappiStatus(false);
            return getOfflineResponse(userMessage);
        }
        
    } catch (error) {
        console.error('💥 Cappi Error:', error);
        // Set offline status
        updateCappiStatus(false);
        // Use offline responses
        return getOfflineResponse(userMessage);
    }
}

// Offline mode - Comprehensive responses
function getOfflineResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // What is Grosity
    if (lowerMessage.includes('what is grosity') || lowerMessage.includes('about grosity')) {
        return "Grosity is a Patiala-based fresh produce startup that connects farmers, vendors, and customers through a transparent supply chain.\n\nWe deliver farm-fresh vegetables directly from farmers to your doorstep - no middlemen, no compromises! 🌾✨";
    }
    
    // How to order
    if (lowerMessage.includes('how') && (lowerMessage.includes('order') || lowerMessage.includes('buy'))) {
        return "Ordering is easy! 📦\n\n1. Click 'Consumer' button on website\n2. Or WhatsApp us at:\n+91 73096 85242\n\n3. Tell us what you need\n4. We deliver to your doorstep!";
    }
    
    // Delivery areas
    if (lowerMessage.includes('deliver') || lowerMessage.includes('area') || lowerMessage.includes('location')) {
        return "We deliver in Patiala and nearby areas in Punjab! 📍\n\nFarm to door within hours of harvest.\n\nContact us:\n+91 73096 85242";
    }
    
    // For farmers
    if (lowerMessage.includes('farmer')) {
        return "🌾 Benefits for Farmers:\n\n✅ Fair & consistent rates\n✅ No price volatility\n✅ Direct market access\n✅ Guaranteed demand\n\nJoin us:\n+91 73096 85242\ngrosity.connect@gmail.com";
    }
    
    // For vendors
    if (lowerMessage.includes('vendor') || lowerMessage.includes('shop')) {
        return "🏪 Benefits for Vendors:\n\n✅ No 4 AM mandi runs\n✅ Reliable daily supply\n✅ Fresh stock guaranteed\n✅ Delivered to shop\n\nContact:\n+91 73096 85242\ngrosity.connect@gmail.com";
    }
    
    // Contact information
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
        return "📞 Contact Grosity:\n\n📧 Email:\ngrosity.connect@gmail.com\n\n📱 Phone:\n+91 73096 85242\n\n📍 Location:\nPatiala, Punjab, India\n\nWe're here to help!";
    }
    
    // Pricing
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate')) {
        return "We offer transparent pricing with no hidden costs! 💰\n\nFair rates for farmers, affordable prices for customers.\n\nFor current rates:\n+91 73096 85242\ngrosity.connect@gmail.com";
    }
    
    // Quality/Freshness
    if (lowerMessage.includes('fresh') || lowerMessage.includes('quality')) {
        return "Our vegetables go from farm to your door within hours! 🥬\n\nDirect from local farmers = maximum freshness.\n\nOrder now:\n+91 73096 85242";
    }
    
    // Off-topic detection
    if (lowerMessage.includes('cricket') || lowerMessage.includes('politics') || 
        lowerMessage.includes('weather') || lowerMessage.includes('news') ||
        lowerMessage.includes('movie') || lowerMessage.includes('joke')) {
        return "I'm Cappi, Grosity's FAQ assistant! 🌾\n\nI can only help with:\n• Fresh produce\n• Ordering\n• Delivery info\n• Joining our network\n\nWhat would you like to know about Grosity?";
    }
    
    // Default response
    return "I'm currently in offline mode. 📴\n\nFor detailed information, please contact us:\n\n📱 Phone:\n+91 73096 85242\n\n📧 Email:\ngrosity.connect@gmail.com\n\nWe're here to help!";
}

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // FAQ: What is Grosity?
    if (lowerMessage.includes('what is grosity') || lowerMessage === 'what is grosity?') {
        return "Grosity is a Patiala-based fresh produce startup that connects farmers, vendors, and customers through a transparent supply chain.\n\nWe deliver farm-fresh vegetables directly from farmers to your doorstep - no middlemen, no compromises! 🌾✨";
    }
    
    // FAQ: How to order
    if (lowerMessage.includes('how do i order') || lowerMessage.includes('how to order')) {
        return "Ordering is super easy! 📦\n\n1. Click the 'Consumer' button on our website\n2. Or WhatsApp us at:\n+91 73096 85242\n\n3. Tell us what you need\n4. We'll deliver fresh produce to your doorstep!\n\nFast, fresh, and fair! 🚚";
    }
    
    // FAQ: Delivery areas
    if (lowerMessage.includes('delivery area') || lowerMessage.includes('where do you deliver')) {
        return "We currently deliver in Patiala and nearby areas in Punjab! 📍\n\nOur delivery is super fast - we get produce from farm to your door within hours of harvest.\n\nPlanning to expand soon! Want delivery in your area?\n\nContact us:\n+91 73096 85242";
    }
    
    // FAQ: For farmers
    if (lowerMessage.includes('for farmers') || (lowerMessage.includes('farmer') && !lowerMessage.includes('from'))) {
        return "🌾 Benefits for Farmers:\n\n✅ Fair & consistent rates\n✅ No price volatility\n✅ Direct market access\n✅ Guaranteed demand\n✅ No exploitative middlemen\n\nJoin our network!\n\nContact:\n+91 73096 85242\ngrosity.connect@gmail.com";
    }
    
    // FAQ: For vendors
    if (lowerMessage.includes('for vendors') || (lowerMessage.includes('vendor') && !lowerMessage.includes('to'))) {
        return "🏪 Benefits for Vendors:\n\n✅ No more 4 AM mandi runs\n✅ Reliable daily supply\n✅ Fresh stock guaranteed\n✅ Delivered to your shop\n✅ Consistent pricing\n\nInterested?\n\nCall us:\n+91 73096 85242\ngrosity.connect@gmail.com";
    }
    
    // FAQ: Contact info
    if (lowerMessage.includes('contact info') || lowerMessage.includes('contact details')) {
        return "📞 Contact Grosity:\n\n📧 Email:\ngrosity.connect@gmail.com\n\n📱 Phone:\n+91 73096 85242\n\n📍 Location:\nPatiala, Punjab, India\n\nWe're here to help! Reach out anytime 😊";
    }
    
    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|namaste|sat sri akal)/)) {
        return "Hello! 👋\n\nI'm Cappi, your Grosity FAQ assistant.\n\nClick any question button above or ask me anything about Grosity!";
    }
    
    // About Grosity (general)
    if (lowerMessage.includes('grosity') || lowerMessage.includes('about')) {
        return "Grosity connects farmers, vendors, and customers directly!\n\nWe ensure fresh produce, fair prices, and fast delivery.\n\nNo middlemen = better prices for everyone! 🌾💚";
    }
    
    // Customers/Order (general)
    if (lowerMessage.includes('order') || lowerMessage.includes('buy') || lowerMessage.includes('customer')) {
        return "You can order fresh vegetables via WhatsApp or click the 'Consumer' button on our website!\n\nWhatsApp:\n+91 73096 85242\n\nWe deliver farm-fresh produce right to your doorstep 📦🥬";
    }
    
    // Contact (general)
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
        return "📧 Email:\ngrosity.connect@gmail.com\n\n📱 Phone:\n+91 73096 85242\n\n📍 Location:\nPatiala, Punjab\n\nFeel free to reach out anytime!";
    }
    
    // Delivery (general)
    if (lowerMessage.includes('deliver') || lowerMessage.includes('shipping') || lowerMessage.includes('area')) {
        return "We deliver fresh produce within hours of harvest!\n\nCurrently serving Patiala and nearby areas.\n\nFast, fresh, and fair! 🚚✨";
    }
    
    // Pricing
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate')) {
        return "We offer transparent pricing with no hidden costs!\n\nFair rates for farmers, affordable prices for customers.\n\nContact us for current rates:\n+91 73096 85242\ngrosity.connect@gmail.com";
    }
    
    // Fresh/Quality
    if (lowerMessage.includes('fresh') || lowerMessage.includes('quality')) {
        return "Our produce goes from farm to your door within hours!\n\nWe work directly with local farmers to ensure maximum freshness.\n\nNo long supply chains = fresher vegetables! 🥬✨";
    }
    
    // Timing/Hours
    if (lowerMessage.includes('time') || lowerMessage.includes('hour') || lowerMessage.includes('when')) {
        return "We operate daily to ensure fresh supply!\n\nFor specific delivery times and availability, please contact us:\n\n+91 73096 85242\ngrosity.connect@gmail.com";
    }
    
    // Thanks
    if (lowerMessage.match(/(thank|thanks|dhanyavaad|shukriya)/)) {
        return "You're welcome! 😊\n\nFeel free to ask more questions or contact us directly.\n\nHappy to help! 🌾";
    }
    
    // Default response
    const responses = [
        "Great question!\n\nFor detailed information, please contact us:\n\n📱 Phone:\n+91 73096 85242\n\n📧 Email:\ngrosity.connect@gmail.com",
        "I'd love to help with that!\n\nYou can reach our team at:\n\n+91 73096 85242\ngrosity.connect@gmail.com",
        "For specific queries, our team is available at:\n\n📧 Email:\ngrosity.connect@gmail.com\n\n📱 Phone:\n+91 73096 85242"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Close chat when clicking outside
document.addEventListener('click', function(e) {
    const chatWindow = document.getElementById('chatWindow');
    const chatBtn = document.querySelector('.chatBtn');
    
    if (chatWindow && chatWindow.classList.contains('active')) {
        if (!chatWindow.contains(e.target) && !chatBtn.contains(e.target)) {
            chatWindow.classList.remove('active');
        }
    }
});


// ============================================
// FIREBASE ANALYTICS TRACKING
// ============================================

// Track scroll depth
let scrollDepthTracked = {
    '25': false,
    '50': false,
    '75': false,
    '90': false,
    '100': false
};

window.addEventListener('scroll', function() {
    const scrollPercentage = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollPercentage >= 25 && !scrollDepthTracked['25']) {
        scrollDepthTracked['25'] = true;
        analytics.logEvent('scroll_depth', { depth_percentage: 25 });
    }
    
    if (scrollPercentage >= 50 && !scrollDepthTracked['50']) {
        scrollDepthTracked['50'] = true;
        analytics.logEvent('scroll_depth', { depth_percentage: 50 });
    }
    
    if (scrollPercentage >= 75 && !scrollDepthTracked['75']) {
        scrollDepthTracked['75'] = true;
        analytics.logEvent('scroll_depth', { depth_percentage: 75 });
    }
    
    if (scrollPercentage >= 90 && !scrollDepthTracked['90']) {
        scrollDepthTracked['90'] = true;
        analytics.logEvent('scroll_depth', { depth_percentage: 90 });
    }
    
    if (scrollPercentage >= 100 && !scrollDepthTracked['100']) {
        scrollDepthTracked['100'] = true;
        analytics.logEvent('scroll_depth', { depth_percentage: 100 });
    }
}, { passive: true });

// Track engagement time (10+ seconds = engaged user)
let engagementStartTime = Date.now();
let isPageVisible = true;
let totalEngagementTime = 0;
let engagedUserTracked = false;

// Track when user leaves/returns to page
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // User left the page
        isPageVisible = false;
        const sessionTime = Math.round((Date.now() - engagementStartTime) / 1000);
        totalEngagementTime += sessionTime;
        
        analytics.logEvent('user_engagement', {
            engagement_time_msec: sessionTime * 1000
        });
    } else {
        // User returned to page
        isPageVisible = true;
        engagementStartTime = Date.now();
    }
});

// Check for engaged user (10+ seconds)
setTimeout(function() {
    if (!engagedUserTracked) {
        engagedUserTracked = true;
        analytics.logEvent('engaged_user', {
            engagement_threshold: '10_seconds'
        });
    }
}, 10000); // 10 seconds

// Track total time on page when leaving
window.addEventListener('beforeunload', function() {
    if (isPageVisible) {
        const sessionTime = Math.round((Date.now() - engagementStartTime) / 1000);
        totalEngagementTime += sessionTime;
        
        analytics.logEvent('session_end', {
            total_time_seconds: totalEngagementTime,
            engagement_time_msec: totalEngagementTime * 1000
        });
    }
});

// Track chatbot interactions
function trackChatbotOpen() {
    analytics.logEvent('chatbot_open');
    
    // Update admin_analytics collection
    const today = new Date().toISOString().split('T')[0];
    db.collection('admin_analytics').doc(today).update({
        chatbotInteractions: firebase.firestore.FieldValue.increment(1),
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(err => console.log('Analytics update:', err));
}

function trackChatbotClose() {
    analytics.logEvent('chatbot_close');
}

function trackChatbotMessage(message, isUser) {
    analytics.logEvent('chatbot_message', {
        message_type: isUser ? 'user' : 'bot',
        message_length: message.length
    });
}

function trackFAQClick(question) {
    analytics.logEvent('faq_click', {
        question: question
    });
}

function trackLanguageChange(langCode, langName) {
    analytics.logEvent('language_change', {
        language_code: langCode,
        language_name: langName
    });
}

// Track button clicks
document.addEventListener('click', function(e) {
    // Track CTA buttons
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        const button = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button');
        analytics.logEvent('button_click', {
            button_text: button.textContent.trim(),
            button_class: button.className
        });
    }
    
    // Track navigation links
    if (e.target.tagName === 'A' || e.target.closest('a')) {
        const link = e.target.tagName === 'A' ? e.target : e.target.closest('a');
        analytics.logEvent('link_click', {
            link_text: link.textContent.trim(),
            link_url: link.href,
            outbound: link.hostname !== window.location.hostname
        });
    }
});

// Track social media clicks
document.querySelectorAll('.socialContainer').forEach(function(socialLink) {
    socialLink.addEventListener('click', function() {
        const platform = this.classList.contains('containerOne') ? 'Instagram' :
                        this.classList.contains('containerTwo') ? 'LinkedIn' :
                        this.classList.contains('containerThree') ? 'WhatsApp' :
                        this.classList.contains('containerFour') ? 'Facebook' : 'Unknown';
        
        analytics.logEvent('social_click', {
            platform: platform,
            link_url: this.href
        });
    });
});

// Track section views
const sections = document.querySelectorAll('section[id]');
const sectionViews = new Set();

const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting && !sectionViews.has(entry.target.id)) {
            sectionViews.add(entry.target.id);
            analytics.logEvent('section_view', {
                section_id: entry.target.id,
                section_name: entry.target.querySelector('h2')?.textContent || entry.target.id
            });
        }
    });
}, { threshold: 0.5 });

sections.forEach(function(section) {
    sectionObserver.observe(section);
});

// Track card clicks (Farmer/Vendor/Consumer)
document.querySelectorAll('.card').forEach(function(card) {
    card.addEventListener('click', function() {
        const cardTitle = this.querySelector('.title')?.textContent || 'Unknown';
        const cardType = this.classList.contains('card-farmer') ? 'Farmer' :
                        this.classList.contains('card-vendor') ? 'Vendor' :
                        this.classList.contains('card-consumer') ? 'Consumer' : 'Unknown';
        
        analytics.logEvent('card_click', {
            card_title: cardTitle,
            card_type: cardType
        });
    });
});
