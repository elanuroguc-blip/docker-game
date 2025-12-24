import { getCharacters } from './services/country.js';
import { getEquipments } from './services/weather.js';

// STATE: Uygulamanın anlık durumu
const gameState = {
    characters: [],
    selectedChar: null,
    equipment: null
};

async function init() {
    gameState.characters = await getCharacters();
    renderSelect();
}

async function handleSelection(id) {
    const char = gameState.characters.find(c => c.id == id);
    gameState.selectedChar = char;

    // Mikro mimari bağlantısı: Karakter seçildiğinde ekipman servisini tetikle
    if (char) {
        gameState.equipment = await getEquipments(char.id);
    }
    renderCard();
}

function renderCard() {
    const display = document.getElementById("game-card");
    const { selectedChar, equipment } = gameState;

    if (!selectedChar) return;

    display.innerHTML = `
        <div class="card">
            <h1>${selectedChar.img} ${selectedChar.name}</h1>
            <p><strong>Temel HP:</strong> ${selectedChar.baseHp}</p>
            <p><strong>Temel Saldırı:</strong> ${selectedChar.baseAtk}</p>
            <hr>
            <div class="inv">
                <h3>⚔️ Kuşanılan: ${equipment.item}</h3>
                <p>Ekipman Bonusu: +${equipment.bonusHp} HP / +${equipment.bonusAtk} ATK</p>
                <h2 style="color: gold">TOPLAM GÜÇ: ${selectedChar.baseAtk + equipment.bonusAtk}</h2>
            </div>
        </div>
    `;
}

function renderSelect() {
    const select = document.getElementById("charSelector");
    gameState.characters.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.name;
        select.appendChild(opt);
    });
}

window.handleSelection = handleSelection;
init();
