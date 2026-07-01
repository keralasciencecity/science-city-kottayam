/*
   Kerala Science City Kottayam - Main JavaScript
   Interactive Utilities, Bilingual Handler, and Interactive Widget Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Navigation Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    // --- 3. Bilingual Language System ---
    const langToggleBtn = document.getElementById('lang-toggle-btn');
    
    // Set default language from localStorage or default to English
    let currentLang = localStorage.getItem('ksc_lang') || 'lang-en';
    document.body.className = currentLang;
    updateLangToggleButton(currentLang);

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            if (document.body.classList.contains('lang-en')) {
                currentLang = 'lang-ml';
            } else {
                currentLang = 'lang-en';
            }
            document.body.className = currentLang;
            localStorage.setItem('ksc_lang', currentLang);
            updateLangToggleButton(currentLang);
            
            // Dispatch custom event so other components (like calculator) can adapt live
            window.dispatchEvent(new CustomEvent('langChanged', { detail: { lang: currentLang } }));
        });
    }

    function updateLangToggleButton(lang) {
        if (!langToggleBtn) return;
        if (lang === 'lang-en') {
            langToggleBtn.innerHTML = '<i class="fas fa-globe"></i> മലയാളം';
        } else {
            langToggleBtn.innerHTML = '<i class="fas fa-globe"></i> English';
        }
    }

    // --- 4. Interactive Science Trivia Widget ---
    const triviaTextEl = document.getElementById('trivia-text');
    const triviaNextBtn = document.getElementById('trivia-next-btn');
    
    const triviaFacts = [
        {
            en: "Light takes about 8 minutes and 20 seconds to travel from the Sun to the Earth.",
            ml: "സൂര്യനിൽ നിന്നും പ്രകാശം ഭൂമിയിലെത്താൻ ഏകദേശം 8 മിനിറ്റും 20 സെക്കൻഡും സമയമെടുക്കും."
        },
        {
            en: "An adult human body consists of approximately 7 octillion atoms!",
            ml: "ഒരു മുതിർന്ന മനുഷ്യശരീരത്തിൽ ഏകദേശം 7 ഒക്ടില്യൺ (7 കഴിഞ്ഞു 27 പൂജ്യങ്ങൾ) ആറ്റങ്ങൾ അടങ്ങിയിരിക്കുന്നു!"
        },
        {
            en: "Water expands by about 9% when it freezes into ice, which is why ice floats.",
            ml: "വെള്ളം തണുത്തു ഐസ് ആകുമ്പോൾ വ്യാപ്തി 9% വർദ്ധിക്കുന്നു, അതുകൊണ്ടാണ് ഐസ് വെള്ളത്തിൽ പൊങ്ങിക്കിടക്കുന്നത്."
        },
        {
            en: "DNA is so dense that a single gram of it can store about 215 petabytes (215 million gigabytes) of data.",
            ml: "ഒരു ഗ്രാം ഡി.എൻ.എ-യിൽ ഏകദേശം 215 പെറ്റാബൈറ്റ് (21.5 കോടി ജിഗാബൈറ്റ്) വിവരങ്ങൾ സംഭരിക്കാൻ സാധിക്കും."
        },
        {
            en: "Sound travels about 4 times faster in water than it does in air.",
            ml: "ശബ്ദം വായുവിനേക്കാൾ നാല് മടങ്ങ് വേഗത്തിലാണ് വെള്ളത്തിലൂടെ സഞ്ചരിക്കുന്നത്."
        },
        {
            en: "Venus is the hottest planet in our solar system, with surface temperatures reaching 471°C.",
            ml: "നമ്മുടെ സൗരയൂഥത്തിലെ ഏറ്റവും ചൂടേറിയ ഗ്രഹം ശുക്രൻ (Venus) ആണ്. ഉപരിതല താപനില 471 ഡിഗ്രി സെൽഷ്യസ് വരെയാകാം."
        }
    ];

    let currentTriviaIndex = 0;

    function displayTrivia(index) {
        if (!triviaTextEl) return;
        const fact = triviaFacts[index];
        triviaTextEl.innerHTML = `
            <p class="lang-en animate-fade-in">"${fact.en}"</p>
            <p class="lang-ml animate-fade-in">"${fact.ml}"</p>
        `;
    }

    if (triviaNextBtn) {
        // Initialize first trivia
        currentTriviaIndex = Math.floor(Math.random() * triviaFacts.length);
        displayTrivia(currentTriviaIndex);

        triviaNextBtn.addEventListener('click', () => {
            triviaTextEl.style.opacity = 0;
            setTimeout(() => {
                currentTriviaIndex = (currentTriviaIndex + 1) % triviaFacts.length;
                displayTrivia(currentTriviaIndex);
                triviaTextEl.style.opacity = 1;
            }, 250);
        });
    }

    // --- 5. Interactive Ticket Calculator (visit.html) ---
    const calcForm = document.getElementById('ticket-calc-form');
    if (calcForm) {
        const adultQtyInput = document.getElementById('calc-adult');
        const childQtyInput = document.getElementById('calc-child');
        const theatreAdultQtyInput = document.getElementById('calc-theatre-adult');
        const theatreChildQtyInput = document.getElementById('calc-theatre-child');
        const groupDiscountCheck = document.getElementById('calc-group');
        
        // Result display elements
        const resGalleriesAdult = document.getElementById('res-galleries-adult');
        const resGalleriesChild = document.getElementById('res-galleries-child');
        const resTheatreAdult = document.getElementById('res-theatre-adult');
        const resTheatreChild = document.getElementById('res-theatre-child');
        const resSubtotal = document.getElementById('res-subtotal');
        const resDiscount = document.getElementById('res-discount');
        const resTotal = document.getElementById('res-total');
        
        function calculateTickets() {
            const qtyAdult = parseInt(adultQtyInput.value) || 0;
            const qtyChild = parseInt(childQtyInput.value) || 0;
            const qtyTheatreAdult = parseInt(theatreAdultQtyInput.value) || 0;
            const qtyTheatreChild = parseInt(theatreChildQtyInput.value) || 0;
            const isGroup = groupDiscountCheck.checked;
            
            // Standard Rates
            let rateGalleriesAdult = 50;
            let rateGalleriesChild = 30;
            let rateTheatreAdult = 50;
            let rateTheatreChild = 30;
            
            let discountMultiplier = 0;
            
            // Group Rates Policy:
            // Child / Organised Group of Students rate is flat ₹30 per head for both.
            
            const costGalleriesAdult = qtyAdult * rateGalleriesAdult;
            const costGalleriesChild = qtyChild * rateGalleriesChild;
            const costTheatreAdult = qtyTheatreAdult * rateTheatreAdult;
            const costTheatreChild = qtyTheatreChild * rateTheatreChild;
            
            const subtotal = costGalleriesAdult + costGalleriesChild + costTheatreAdult + costTheatreChild;
            const discount = 0;
            const total = subtotal;
            
            // Update UI elements
            if (resGalleriesAdult) resGalleriesAdult.textContent = `₹${costGalleriesAdult}`;
            if (resGalleriesChild) resGalleriesChild.textContent = `₹${costGalleriesChild}`;
            if (resTheatreAdult) resTheatreAdult.textContent = `₹${costTheatreAdult}`;
            if (resTheatreChild) resTheatreChild.textContent = `₹${costTheatreChild}`;
            if (resSubtotal) resSubtotal.textContent = `₹${subtotal}`;
            if (resDiscount) resDiscount.textContent = `₹${discount.toFixed(0)}`;
            if (resTotal) resTotal.textContent = `₹${total.toFixed(0)}`;
        }
        
        // Add event listeners to all inputs
        [adultQtyInput, childQtyInput, theatreAdultQtyInput, theatreChildQtyInput].forEach(input => {
            if (input) {
                input.addEventListener('input', calculateTickets);
                input.addEventListener('change', calculateTickets);
            }
        });
        
        if (groupDiscountCheck) {
            groupDiscountCheck.addEventListener('change', calculateTickets);
        }
        
        // Initialize calculation
        calculateTickets();
        
        // Listen to language change to trigger recalculation if needed
        window.addEventListener('langChanged', calculateTickets);
    }

    // --- 6. Event Category Filters (events.html) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    if (filterButtons.length > 0 && eventCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                eventCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.classList.contains(filterValue)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // --- 7. Past Events Photo Lightbox (events.html) ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        // Create lightbox container and append to body
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.position = 'fixed';
        lightbox.style.zIndex = '2000';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.background = 'rgba(4, 6, 12, 0.95)';
        lightbox.style.backdropFilter = 'blur(10px)';
        lightbox.style.display = 'none';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.flexDirection = 'column';
        lightbox.style.cursor = 'zoom-out';
        
        lightbox.innerHTML = `
            <span class="lightbox-close" style="position:absolute; top:30px; right:30px; font-size:2.5rem; color:#fff; cursor:pointer; transition:var(--transition-smooth);">&times;</span>
            <img class="lightbox-img" src="" alt="" style="max-width:85%; max-height:75%; border-radius:8px; border:2px solid rgba(255,255,255,0.1); box-shadow:0 0 30px rgba(0,0,0,0.6); object-fit:contain;">
            <div class="lightbox-caption" style="margin-top:20px; font-family:var(--font-heading); font-size:1.1rem; text-align:center; padding:0 20px; max-width:800px;"></div>
        `;
        
        document.body.appendChild(lightbox);
        
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const img = item.querySelector('img');
                const title = item.querySelector('h3').innerHTML;
                const desc = item.querySelector('p').innerHTML;
                
                lightboxImg.src = img.src;
                lightboxCaption.innerHTML = `<h3 style="margin-bottom:8px; color:var(--primary-cyan);">${title}</h3><p style="color:var(--text-secondary); font-size:0.95rem;">${desc}</p>`;
                
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Stop scroll
            });
        });
        
        // Close controls
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore scroll
            }
        });
        
        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // --- 8. Inquiry / Booking Form Modal Confirmation ---
    const inquiryForm = document.getElementById('inquiry-form');
    const registerForm = document.getElementById('register-form');
    
    function showConfirmationPopup(isMalayalam) {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.zIndex = '3000';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.background = 'rgba(7, 10, 19, 0.9)';
        modal.style.backdropFilter = 'blur(15px)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.opacity = '0';
        modal.style.transition = 'opacity 0.4s ease';

        const contentEn = `
            <div class="glass-panel" style="max-width:500px; width:90%; text-align:center; padding:40px; border-color:var(--primary-cyan); box-shadow:0 0 40px rgba(0, 229, 255, 0.2);">
                <div style="font-size:4rem; color:var(--primary-cyan); margin-bottom:20px;"><i class="fas fa-check-circle animate-fade-in"></i></div>
                <h2 style="margin-bottom:15px; font-size:1.8rem; background: linear-gradient(135deg, #fff, var(--primary-cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Inquiry Submitted!</h2>
                <p style="color:var(--text-secondary); margin-bottom:25px;">Thank you for contacting Kerala Science City Kottayam. Our team will get back to you shortly regarding your booking request.</p>
                <button class="btn btn-primary close-modal-btn">Great, Thanks</button>
            </div>
        `;

        const contentMl = `
            <div class="glass-panel" style="max-width:500px; width:90%; text-align:center; padding:40px; border-color:var(--secondary-purple); box-shadow:0 0 40px rgba(157, 78, 221, 0.2);">
                <div style="font-size:4rem; color:var(--secondary-purple); margin-bottom:20px;"><i class="fas fa-check-circle animate-fade-in"></i></div>
                <h2 style="margin-bottom:15px; font-size:1.6rem; background: linear-gradient(135deg, #fff, var(--secondary-purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">അന്വേഷണം സമർപ്പിച്ചു!</h2>
                <p style="color:var(--text-secondary); margin-bottom:25px;">കേരള സയൻസ് സിറ്റി കോട്ടയവുമായി ബന്ധപ്പെട്ടതിന് നന്ദി. നിങ്ങളുടെ ബുക്കിംഗ് അന്വേഷണത്തെക്കുറിച്ച് ഞങ്ങളുടെ ടീം ഉടൻ തന്നെ നിങ്ങളെ ബന്ധപ്പെടുന്നതാണ്.</p>
                <button class="btn btn-primary close-modal-btn" style="background:linear-gradient(135deg, var(--secondary-purple), var(--primary-cyan));">ശരി, നന്ദി</button>
            </div>
        `;

        modal.innerHTML = isMalayalam ? contentMl : contentEn;
        document.body.appendChild(modal);
        
        // Fade in
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 50);

        const closeBtn = modal.querySelector('.close-modal-btn');
        closeBtn.addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
            }, 400);
        });
    }

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const isMl = document.body.classList.contains('lang-ml');
            showConfirmationPopup(isMl);
            inquiryForm.reset();
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const isMl = document.body.classList.contains('lang-ml');
            showConfirmationPopup(isMl);
            registerForm.reset();
        });
    }
});
