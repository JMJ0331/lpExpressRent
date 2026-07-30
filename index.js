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

// Renderizar Tarjetas
function renderApartments(filter = "") {
    grid.innerHTML = "";
    const filtered = apartments.filter(apt => apt.name.toLowerCase().includes(filter.toLowerCase()));

    filtered.forEach(apt => {
        const card = document.createElement('div');
        card.className = "apt-card reveal active";
        card.innerHTML = `
                    <img src="${apt.img}" class="apt-img" loading="lazy">
                    <div class="apt-info" onclick="openModal(${apt.id})">
                        <h3 class="apt-name">${apt.name}</h3>
                        <p class="apt-loc">📍 ${apt.location}</p>
                        <button class="button button-empty button-sm">Ver información</button>
                    </div>
                `;
        grid.appendChild(card);
    });
}

function renderCarousel() {
    apartments.forEach(apt => {
        const card = document.createElement('div');
        card.className = "mini-apt-card";
        card.innerHTML = `
                    <img src="${apt.img}" style="width:100%; height:120px; object-fit:cover;">
                    <div style="padding:12px">
                        <h4 style="font-size:0.9rem">${apt.name}</h4>
                        <p style="font-size:0.7rem; color:#666">${apt.location}</p>
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
    modalBody.innerHTML = `
                <div class="modal-header">
                    <h2 style="font-size:1.5rem">${apt.name}</h2>
                    <button class="button button-empty button-sm" onclick="closeModal()">✕</button>
                </div>
                <img src="${apt.img}" style="width:100%; border-radius:16px; margin-bottom:20px;">
                <p style="color:#666">${apt.description}</p>
                <p style="margin-top:10px; font-weight:500;">📍 ${apt.address}</p>
                <p>Ayuda al cliente: ${apt.contacts} (WhatsApp)<p>
                
                <div class="wifi-box">
                    <p style="font-size:0.8rem; font-weight:700; margin-bottom:12px;">INFORMACIÓN WI-FI</p>
                    <div class="wifi-row">
                        <span>Red: <strong>${apt.ssid}</strong></span>
                    </div>
                    <div class="wifi-row">
                        <span>Clave: <strong id="pass-field">••••••••</strong></span>
                        <button class="button button-empty button-sm" onclick="copyPass('${apt.pass}')">Copiar</button>
                    </div>
                    <button style="border:none; background:none; color:var(--primary); font-size:0.8rem; padding:0; cursor:pointer; text-decoration: underline;" onclick="togglePass('${apt.pass}')">Mostrar contraseña</button>
                </div>

                <div class="action-grid">
                    <a href="${apt.maps}" target="_blank" 
                    class="action-btn button button-empty button-sm">Ver en Maps</a>
                    <a href="https://wa.me/18572597334" class="action-btn btn-wa button button-filled button-sm">WhatsApp</a>
                </div>
            `;

    // piensa en si es mejor usar el location's link del departamento en vez del nombre para abrir el mapa
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.closeModal = function () {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

window.togglePass = function (pass) {
    const el = document.getElementById('pass-field');
    el.innerText = el.innerText === '••••••••' ? pass : '••••••••';
}

window.copyPass = function (pass) {
    navigator.clipboard.writeText(pass);
    alert("Contraseña copiada al portapapeles");
}

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