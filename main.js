import { getCharacters } from './services/karakter.js';
import { getEquipments } from './services/ekipman.js';
import { getRandomMonster } from './services/canavar.js'; // Yeni import

const state = {
    chars: [],
    selected: null,
    item: null,
    monster: null, // Canavar state'i
    battleLog: ""
};

async function init() {
    state.chars = await getCharacters();
    const select = document.getElementById("charSelector");
    state.chars.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.name;
        select.appendChild(opt);
    });
}

async function handleSelection(id) {
    if(!id) return;
    const char = state.chars.find(c => c.id == id);
    state.selected = char;
    state.item = await getEquipments(char.id);
    state.monster = await getRandomMonster(); // Karakter seçilince canavar da gelsin
    state.battleLog = "Savaşa hazırsın! Saldır butonuna bas.";
    render();
}

// SAVAŞ FONKSİYONU
async function startBattle() {
    if(!state.selected || !state.monster) return;

    const playerAtk = state.selected.baseAtk + state.item.bonusAtk;
    const monsterAtk = state.monster.atk;

    // Basit bir vuruş hesaplaması
    state.monster.hp -= playerAtk;
    state.selected.baseHp -= monsterAtk;

    if (state.monster.hp <= 0) {
        state.battleLog = `🏆 TEBRİKLER! ${state.monster.name} yenildi!`;
        state.monster = await getRandomMonster(); // Yeni canavar çağır
    } else if (state.selected.baseHp <= 0) {
        state.battleLog = "💀 ÖLDÜN! Oyun bitti.";
    } else {
        state.battleLog = `⚔️ ${state.monster.name} canavarına ${playerAtk} hasar verdin! O da sana ${monsterAtk} vurdu.`;
    }
    render();
}

function render() {
    const card = document.getElementById("game-card");
    const { selected, item, monster, battleLog } = state;

    card.innerHTML = `
        <div class="card">
            <h2>${selected.img} ${selected.name}</h2>
            <p>❤️ Canın: ${selected.baseHp + item.bonusHp}</p>
            <p>⚔️ Gücün: ${selected.baseAtk + item.bonusAtk}</p>
            <hr>
            <div class="monster-box">
                <h3>Düşman: ${monster.img} ${monster.name}</h3>
                <p>👾 Düşman Canı: ${monster.hp}</p>
            </div>
            <p id="log"><em>${battleLog}</em></p>
            <button class="attack-btn" onclick="startBattle()">💥 SALDIR!</button>
        </div>
    `;
}

window.handleSelection = handleSelection;
window.startBattle = startBattle;
init();
