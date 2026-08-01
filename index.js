// Mock Data de Apartamentos
const apartments = [
    {
        id: 1,
        name: "Villa Santana - Hotel",
        location: "Sajoma, Inoa",
        img: "imgs/VSH.jpeg",
        description: "None",
        address: "Calle Padre Fortín 25, La Esmeralda, Santiago de los Caballeros, 51000, RD",
        ssid: "BPN-((( Rafi ))) -5g",
        pass: "3412085110",
        maps: "https://www.google.com/maps/dir/?api=1&destination=19.350972,-70.988778",
        contacts: '(809) 975-2323, (829) 627-2584, (809) 850-7608'
    },
    {
        id: 2,
        name: "B1 - Rialto Residences",
        location: "La Esmeralda, Santiago de los Caballeros",
        img: "imgs/B1R.avif",
        description: "None",
        address: "Calle Padre Fortín 25, La Esmeralda, Santiago de los Caballeros, 51000, RD",
        ssid: "Picasso08",
        pass: "Picasso08",
        maps: "https://www.google.com/maps/dir/?api=1&destination=Rialto+Residences,+Calle+Padre+Fortín+25,+La+Esmeralda,+Santiago+de+los+Caballeros,+República+Dominicana"
    },
    {
        id: 3,
        name: "B4 - Marcella Residences",
        location: "La Esmeralda, Santiago de los Caballeros",
        img: "imgs/B4M.webp",
        description: "None",
        address: "Calle Padre Fortín 25, La Esmeralda, Santiago de los Caballeros, 51000, RD",
        ssid: "Casso",
        pass: "casso0804",
        maps: "https://www.google.com/maps/dir/?api=1&destination=Rialto+Residences,+Calle+Padre+Fortín+25,+La+Esmeralda,+Santiago+de+los+Caballeros,+República+Dominicana"
    },
    {
        id: 4,
        name: "B4 - Jardines del Cerro II",
        location: "Jardines del Cerro II, Santiago de los Caballeros",
        img: "imgs/B4JDCII.avif",
        description: "None",
        address: "Jardines del Cerro II, Av. Hispanoamericana, Santiago de los Caballeros, 51000, RD",
        ssid: "B4-5G",
        pass: "B@420019",
        maps: "https://www.google.com/maps/dir/?api=1&destination=Torres+Jardines+del+Cerro+II,+Av.+Hispanoamericana,+Santiago,+República+Dominicana"
    },
    {
        id: 5,
        name: "B4 - Soha Suites II",
        location: "La Esmeralda, Santiago de los Caballeros",
        img: "imgs/B4SSII.avif",
        description: "None",
        address: "Calle Padre Fortín 25, La Esmeralda, Santiago de los Caballeros, 51000, RD",
        ssid: "SOHA 2 APTO B4",
        pass: "Leev2023",
        maps: "https://www.google.com/maps/dir/?api=1&destination=SOHA+Suites+II,+C.+Obispo+Morell+de+Sta.+Cruz+Esq,+Santiago+de+los+Caballeros+51000,+Dominican+Republic"
    },
    {
        id: 6,
        name: "A4 - Soha Suites II",
        location: "La Esmeralda, Santiago de los Caballeros",
        img: "imgs/A4SSII.avif",
        description: "None",
        address: "Calle Padre Fortín 25, La Esmeralda, Santiago de los Caballeros, 51000, RD",
        ssid: "Apt4A_EXT",
        pass: "8097345448",
        maps: "https://www.google.com/maps/dir/?api=1&destination=SOHA+Suites+II,+C.+Obispo+Morell+de+Sta.+Cruz+Esq,+Santiago+de+los+Caballeros+51000,+Dominican+Republic"
    },
    {
        id: 7,
        name: "B9 - Rialto Residences",
        location: "La Esmeralda, Santiago de los Caballeros",
        img: "imgs/B9R.avif",
        description: "None",
        address: "Calle Padre Fortín 25, La Esmeralda, Santiago de los Caballeros, 51000, RD",
        ssid: "Altice",
        pass: "EJE6946e",
        maps: "https://www.google.com/maps/dir/?api=1&destination=Rialto+Residences,+Calle+Padre+Fortín+25,+La+Esmeralda,+Santiago+de+los+Caballeros,+República+Dominicana"
    }
];

const grid = document.getElementById('apartmentsGrid');
const otherApts = document.getElementById('otherApts');
const searchInput = document.getElementById('searchInput');
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');

// Helper para parsear números de contacto de servicio al cliente
function getContactList(apt) {
    if (apt.contacts && typeof apt.contacts === 'string' && apt.contacts.trim() !== '') {
        const parts = apt.contacts.split(',').map(s => s.trim()).filter(Boolean);
        if (parts.length > 0) {
            return parts.map(numStr => {
                let digits = numStr.replace(/\D/g, '');
                if (digits.length === 10) digits = '1' + digits;
                return {
                    display: numStr,
                    tel: `tel:+${digits}`,
                    wa: `https://wa.me/${digits}?text=${encodeURIComponent(`Hola, necesito información sobre ${apt.name}`)}`
                };
            });
        }
    }

    // Contactos por defecto para Express Rent
    return [
        {
            display: "(809) 946-8400",
            tel: "tel:+18099468400",
            wa: `https://wa.me/18099468400?text=${encodeURIComponent(`Hola, solicito ayuda con el alojamiento ${apt.name}`)}`
        },
        {
            display: "(857) 259-7334",
            tel: "tel:+18572597334",
            wa: `https://wa.me/18572597334?text=${encodeURIComponent(`Hola, solicito ayuda con el alojamiento ${apt.name}`)}`
        },
        {
            display: "(849) 537-2927",
            tel: "tel:+18495372927",
            wa: `https://wa.me/18495372927?text=${encodeURIComponent(`Hola, solicito ayuda con el alojamiento ${apt.name}`)}`
        }
    ];
}

// Renderizar Tarjetas
function renderApartments(filter = "") {
    grid.innerHTML = "";
    const filtered = apartments.filter(apt => apt.name.toLowerCase().includes(filter.toLowerCase()));

    if (filtered.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 24px;">No se encontraron alojamientos con ese nombre.</p>`;
        return;
    }

    filtered.forEach(apt => {
        const card = document.createElement('div');
        card.className = "apt-card reveal active";
        card.onclick = () => openModal(apt.id);
        card.innerHTML = `
            <img src="${apt.img}" class="apt-img" loading="lazy" alt="${apt.name}">
            <div class="apt-info">
                <h3 class="apt-name">${apt.name}</h3>
                <p class="apt-loc"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline; vertical-align:-1px; margin-right:3px"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${apt.location}</p>
                <button class="button button-empty button-sm" style="margin-top: auto; width: 100%;">Ver detalles y Wi-Fi</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderCarousel() {
    otherApts.innerHTML = "";
    apartments.forEach(apt => {
        const card = document.createElement('div');
        card.className = "mini-apt-card";
        card.onclick = () => openModal(apt.id);
        card.innerHTML = `
            <img src="${apt.img}" style="width:100%; height:110px; object-fit:cover;" alt="${apt.name}">
            <div style="padding:10px 12px">
                <h4 style="font-size:0.9rem; font-weight:700; color:#0f172a">${apt.name}</h4>
                <p style="font-size:0.75rem; color:#64748b; margin-top:2px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline; vertical-align:-1px; margin-right:3px"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${apt.location}</p>
            </div>
        `;
        otherApts.appendChild(card);
    });
}

// Buscador
searchInput.addEventListener('input', (e) => {
    renderApartments(e.target.value);
});

// Modal Logic
window.openModal = function (id) {
    const apt = apartments.find(a => a.id === id);
    if (!apt) return;

    const contactsList = getContactList(apt);
    const contactsHtml = contactsList.map(item => `
        <div class="contact-item">
            <div class="contact-info">
                <span class="contact-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <span>${item.display}</span>
            </div>
            <div class="contact-item-actions">
                <a href="${item.tel}" class="contact-action-btn call" title="Llamar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Llamar
                </a>
                <a href="${item.wa}" target="_blank" rel="noopener" class="contact-action-btn wa" title="WhatsApp">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.012 2c-5.506 0-9.989 4.478-9.989 9.984 0 1.758.459 3.474 1.33 4.982l-1.413 5.164 5.285-1.386c1.455.795 3.101 1.216 4.787 1.216 5.507 0 9.99-4.478 9.99-9.984 0-2.667-1.038-5.176-2.925-7.062-1.886-1.886-4.396-2.924-7.065-2.924zm5.834 14.164c-.244.686-1.42 1.309-1.961 1.391-.497.075-1.144.106-1.846-.118-.426-.136-1.002-.317-1.728-.63-3.053-1.319-5.043-4.417-5.196-4.622-.153-.204-1.246-1.658-1.246-3.161 0-1.503.786-2.242 1.066-2.548.28-.306.611-.383.815-.383.204 0 .408.003.586.012.188.009.439-.071.688.528.255.612.867 2.116.943 2.27.076.153.127.332.025.535-.102.204-.153.332-.306.51-.153.178-.322.398-.459.535-.153.153-.312.319-.134.625.178.306.792 1.306 1.7 2.115 1.168 1.04 2.154 1.363 2.46 1.516.306.153.484.128.663-.077.178-.204.765-.893.969-1.2.204-.306.408-.255.688-.153.28.102 1.785.842 2.091.995.306.153.51.23.586.357.076.128.076.739-.168 1.425z"/></svg>
                    Chat
                </a>
                <button onclick="copyText('${item.display}', this)" class="contact-action-btn copy" title="Copiar número">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    <span class="copy-label">Copiar</span>
                </button>
            </div>
        </div>
    `).join('');

    modalBody.innerHTML = `
        <div class="modal-top">
            <div>
                <h2 class="modal-title">${apt.name}</h2>
                <span class="modal-location-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline; vertical-align:-1px; margin-right:3px"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${apt.location}</span>
            </div>
            <button class="modal-close-btn" onclick="closeModal()" aria-label="Cerrar modal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>

        <div class="modal-image-wrapper">
            <img src="${apt.img}" alt="${apt.name}" class="modal-image">
        </div>

        <div class="modal-section address-box">
            <div class="section-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Dirección exacta</span>
            </div>
            <p class="address-text">${apt.address}</p>
        </div>

        <div class="modal-section wifi-box">
            <div class="section-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
                <span>Acceso a Wi-Fi</span>
            </div>
            <div class="wifi-details">
                <div class="wifi-row">
                    <span>Nombre de Red (SSID):</span>
                    <strong style="color: #0f172a;">${apt.ssid}</strong>
                </div>
                <div class="wifi-row">
                    <span>Contraseña:</span>
                    <div class="wifi-pass-container">
                        <strong id="pass-field" style="color: #0f172a; font-family: monospace; font-size: 1rem;">••••••••</strong>
                        <button class="wifi-toggle-btn" onclick="togglePass('${apt.pass}')" id="toggle-btn">Mostrar</button>
                        <button class="contact-action-btn copy" onclick="copyText('${apt.pass}', this)">
                            <span class="copy-label">Copiar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section contacts-box">
            <div class="section-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>Servicio al Cliente & Soporte</span>
            </div>
            <div class="contacts-list">
                ${contactsHtml}
            </div>
        </div>

        <div class="modal-actions-grid">
            <a href="${apt.maps}" target="_blank" rel="noopener" class="action-btn btn-maps">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
                Ver en Google Maps
            </a>
        </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.closeModal = function () {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

window.togglePass = function (pass) {
    const el = document.getElementById('pass-field');
    const toggleBtn = document.getElementById('toggle-btn');
    if (!el) return;
    if (el.innerText === '••••••••') {
        el.innerText = pass;
        if (toggleBtn) toggleBtn.innerText = 'Ocultar';
    } else {
        el.innerText = '••••••••';
        if (toggleBtn) toggleBtn.innerText = 'Mostrar';
    }
}

window.copyText = function (text, btnElement) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        const label = btnElement.querySelector('.copy-label') || btnElement;
        const originalText = label.innerText;
        label.innerText = "¡Copiado!";
        btnElement.classList.add('copied');
        setTimeout(() => {
            label.innerText = originalText;
            btnElement.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error("Error al copiar text: ", err);
    });
}

// Escuchar tecla Escape para cerrar modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// Animaciones al hacer scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderApartments();
    renderCarousel();
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// Cerrar modal al clickear fuera
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});