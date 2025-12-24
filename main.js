import { getCharacters } from './services/country.js';
import { getEquipments } from './services/weather.js';

const state = {
    chars: [],
    selected: null,
    item: null
};

async function init() {
    try {
        state.chars = await getCharacters();
        const select = document.getElementById("charSelector");
        
        state.chars.forEach(c => {
            const opt = document.createElement("option");
            opt.value = c.id;
            opt.textContent = c.name;
            select.appendChild(opt);
        });
    } catch (e) {
        console.error("Veri yükleme hatası:", e);
    }
}

async function handleSelection(id) {
    if(!id) return;
    const char = state.chars.find(c => c.id == id);
    state.selected = char;
    state.item = await getEquipments(char.id);
    render();
}

function render() {
    const card = document.getElementById("game-card");
    const { selected, item } = state;

    card.innerHTML = `
        <div class="card">
            <h1>${selected.img}</h1>
            <h2>${selected.name}</h2>
            <p>Can: ${selected.baseHp + item.bonusHp}</p>
            <p>Saldırı: ${selected.baseAtk + item.bonusAtk}</p>
            <small>Kuşanılan: ${item.item}</small>
        </div>
    `;
}

// Global scope hatasını engellemek için:
window.handleSelection = handleSelection;
init();
window.handleSelection = handleSelection;
init();
