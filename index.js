// Mock Data de Apartamentos
const apartments = [
    {
        id: 1,
        name: "B1 - Rialto Residences",
        location: "La Esmeralda, Santiago de los Caballeros",
        img: "imgs/B1R.avif",
        description: "None",
        address: "Calle Padre Fortín 25, La Esmeralda, Santiago de los Caballeros, 51000, RD",
        ssid: "Picasso08",
        pass: "Picasso08"
    },
    {
        id: 2,
        name: "B4 - Marcella Residences",
        location: "La Esmeralda, Santiago de los Caballeros",
        img: "imgs/B4M.webp",
        description: "None",
        address: "Calle Padre Fortín 25, La Esmeralda, Santiago de los Caballeros, 51000, RD",
        ssid: "Casso",
        pass: "casso0804"
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
                    <div class="apt-info">
                        <h3 class="apt-name">${apt.name}</h3>
                        <p class="apt-loc">📍 ${apt.location}</p>
                        <button class="btn-info" onclick="openModal(${apt.id})">Ver información</button>
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
                    <button class="close-modal" onclick="closeModal()">✕</button>
                </div>
                <img src="${apt.img}" style="width:100%; border-radius:16px; margin-bottom:20px;">
                <p style="color:#666">${apt.description}</p>
                <p style="margin-top:10px; font-weight:500;">📍 ${apt.address}</p>
                
                <div class="wifi-box">
                    <p style="font-size:0.8rem; font-weight:700; margin-bottom:12px;">INFORMACIÓN WI-FI</p>
                    <div class="wifi-row">
                        <span>Red: <strong>${apt.ssid}</strong></span>
                    </div>
                    <div class="wifi-row">
                        <span>Clave: <strong id="pass-field">••••••••</strong></span>
                        <button class="copy-btn" onclick="copyPass('${apt.pass}')">Copiar</button>
                    </div>
                    <button style="border:none; background:none; color:var(--primary); font-size:0.8rem; padding:0; cursor:pointer;" onclick="togglePass('${apt.pass}')">Mostrar contraseña</button>
                </div>

                <div class="action-grid">
                    <a href="https://maps.google.com/?q=${apt.name}" target="_blank" class="action-btn btn-maps">Ver en Maps</a>
                    <a href="https://wa.me/1800000000" class="action-btn btn-wa">WhatsApp</a>
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