document.addEventListener('DOMContentLoaded', () => {
    // Menu Trigger Logic
    const menuTrigger = document.getElementById('menu-trigger');
    const navDrawer = document.getElementById('nav-drawer');
    const drawerClose = document.getElementById('drawer-close');

    if (menuTrigger && navDrawer) {
        menuTrigger.addEventListener('click', () => {
            navDrawer.classList.add('active');
            document.body.classList.add('drawer-active');
        });
    }

    if (drawerClose && navDrawer) {
        drawerClose.addEventListener('click', () => {
            navDrawer.classList.remove('active');
            document.body.classList.remove('drawer-active');
        });
    }

    // WhatsApp Interaction Logic for Product Cards
    const waButtons = document.querySelectorAll('.action-btn a[href*="wa.me"]');
    waButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const parentLink = btn.parentElement;
            const card = parentLink.closest('.product-card');
            
            if (card) {
                e.preventDefault();
                const titleElement = card.querySelector('.product-title');
                const priceElement = card.querySelector('.product-price');

                let title = titleElement ? titleElement.innerText : 'Produit';
                
                let price = '';
                if (priceElement) {
                    const clone = priceElement.cloneNode(true);
                    const oldPrice = clone.querySelector('.old-price');
                    if (oldPrice) clone.removeChild(oldPrice);
                    price = clone.textContent.trim();
                }

                const message = "Bonjour, je suis intéressé par ce produit :\n\n" + 
                                "*Titre:* " + title + "\n" +
                                "*Prix:* " + price + "\n\n" +
                                "Est-ce que ce produit est disponible ?";
                
                const waUrl = "https://wa.me/212656268002?text=" + encodeURIComponent(message);
                window.open(waUrl, '_blank');
            }
        });
    });

    // Scroll reveal animation
    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.collection-card, .product-card, .about-row, .support-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        observer.observe(el);
    });

    // Hero Image Slider
    const sliderContainer = document.querySelector('.hero-slider-container');
    if (sliderContainer) {
        const heroImages = ['slider/1.png', 'slider/2.png', 'slider/3.png', 'slider/4.png', 'slider/5.png', 'slider/6.png', 'slider/7.png'];
        let currentIndex = 0;
        sliderContainer.innerHTML = heroImages.map((img, i) => `<div class="hero-slide ${i === 0 ? 'active' : ''}" style="background-image: url('${img}');"></div>`).join('');
        const slides = sliderContainer.querySelectorAll('.hero-slide');
        setInterval(() => {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % heroImages.length;
            slides[currentIndex].classList.add('active');
        }, 5000);
    }

    // Language Logic
    const langBtns = document.querySelectorAll('.nav-lang-btn');
    const translations = {
        fr: {
            promo: "PROMO", pack: "Pack", heroTitle: "GANDOURA EN LIGNE", heroSubtitle: "Mode Marocaine de qualité",
            bestSellers: "Meilleurs Ventes", qualityCraft: "Artisanat de qualité", needHelp: "Besoin d'aide ?",
            availability: "Disponibilité 24h/7j", contactUs: "Nous contacter", directContact: "Contact Direct",
            shipping: "Livraison", shippingDesc: "Expédition sous 24h/48h Partout dans le monde",
            footerAbout: "Inspirée par la pure tradition de Marrakech, notre boutique vous propose des tenues marocaines élégantes et modernes, confectionnées avec passion dans nos ateliers au Maroc.",
            collection: "Collection", about: "À Propos", ourStory: "Notre histoire", legal: "Mentions Légales",
            privacy: "Politique de confidentialité", cgv: "C.G.V", usefulLinks: "Liens Utiles",
            exchange: "Echange & Retour", deliveryTime: "Délai de livraison", paymentWays: "Moyens de Paiement",
            blog: "Blog", allRights: "Tous droits réservés", waOrderCombined: "COMMANDER SUR WHATSAPP"
        },
        ar: {
            promo: "تخفيضات", pack: "باقة", heroTitle: "قندورة أونلاين", heroSubtitle: "موضة مغربية بأعلى جودة",
            bestSellers: "الأكثر مبيعاً", qualityCraft: "صناعة تقليدية عالية الجودة", needHelp: "هل تحتاج مساعدة؟",
            availability: "متوفر 24/7", contactUs: "اتصل بنا", directContact: "اتصال مباشر",
            shipping: "التوصيل", shippingDesc: "شحن خلال 24/48 ساعة لجميع أنحاء العالم",
            footerAbout: "مستوحى من تقاليد مراكش الأصيلة، يقدم لكم متجرنا ملابس مغربية أنيقة وعصرية، مصنوعة بشغف في ورشنا بالمغرب.",
            collection: "المجموعات", about: "حول المتجر", ourStory: "قصتنا", legal: "إشعار قانوني",
            privacy: "سياسة الخصوصية", cgv: "الشروط العامة", usefulLinks: "روابط مفيدة",
            exchange: "الاستبدال والاسترجاع", deliveryTime: "موعد التسليم", paymentWays: "طرق الدفع",
            blog: "المدونة", allRights: "كل الحقوق محفوظة", waOrderCombined: "اطلب عبر واتساب"
        }
    };

    function updateLanguage(lang) {
        document.body.classList.toggle('rtl', lang === 'ar');
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                if (el.classList.contains('wa-text')) {
                    el.innerHTML = translations[lang][key].split(' ').map(word => '<span>' + word + '</span>').join('');
                } else { el.innerText = translations[lang][key]; }
            }
        });
        langBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-lang') === lang));
        localStorage.setItem('preferredLang', lang);
        if (typeof lucide !== 'undefined') { lucide.createIcons(); }
    }

    langBtns.forEach(btn => btn.addEventListener('click', () => updateLanguage(btn.getAttribute('data-lang'))));
    updateLanguage(localStorage.getItem('preferredLang') || 'fr');
});
