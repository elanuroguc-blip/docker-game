import { getCharacters } from './services/karakter.js';
import { getEquipments } from './services/ekipman.js';

const state = {
    chars: [],
    selected: null,
    item: null
};

async function init() {
    try {
        state.chars = await getCharacters();
        const select = document.getElementById("charSelector");
        
        // Önce temizle
        select.innerHTML = '<option value="">Bir Sınıf Seçin...</option>';
        
        state.chars.forEach(c => {
            const opt = document.createElement("option");
            opt.value = c.id;
            opt.textContent = c.name;
            select.appendChild(opt);
        });
        console.log("Karakterler yüklendi:", state.chars);
    } catch (e) {
        console.error("Yükleme hatası:", e);
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
        <div style="margin-top: 20px; padding: 20px; border: 2px solid #e94560; border-radius: 10px; background: #16213e;">
            <h1 style="font-size: 60px; margin: 0;">${selected.img}</h1>
            <h2 style="color: #e94560;">${selected.name}</h2>
            <p>❤️ Can: ${selected.baseHp + item.bonusHp}</p>
            <p>⚔️ Saldırı: ${selected.baseAtk + item.bonusAtk}</p>
            <hr>
            <small style="color: gold;">🛡️ Ekipman: ${item.item}</small>
        </div>
    `;
}

// Seçim yapıldığında çalışması için global'e bağla
window.handleSelection = handleSelection;

// Sayfa yüklenince başlat
init();
