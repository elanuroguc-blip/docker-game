// Dışarıdan dosya import etmemize gerek kalmadı, API'den çekeceğiz.
const API_URL = "https://www.dnd5eapi.co/api";

const state = {
    chars: [],
    selected: null,
    monster: null,
    battleLog: ""
};

// 1. Karakter Sınıflarını API'den Çekme
async function init() {
    const response = await fetch(`${API_URL}/classes`);
    const data = await response.json();
    
    // API'den gelen verileri state'e aktaralım
    state.chars = data.results; 

    const select = document.getElementById("charSelector");
    state.chars.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.index; // API'nin kullandığı benzersiz ID
        opt.textContent = c.name; // Savaşçı, Büyücü vb.
        select.appendChild(opt);
    });
}

// 2. Seçilen Karakter ve Rastgele Canavar Detaylarını Çekme
async function handleSelection(index) {
    if(!index) return;

    // Karakter detayını çek
    const charRes = await fetch(`${API_URL}/classes/${index}`);
    const charData = await charRes.json();

    state.selected = {
        name: charData.name,
        baseHp: charData.hit_die * 10, // Canı zar tipine göre belirleyelim
        baseAtk: 20,
        img: "🛡️"
    };

    // Rastgele bir canavar çek
    const monsterRes = await fetch(`${API_URL}/monsters`);
    const monsterData = await monsterRes.json();
    const randomMonster = monsterData.results[Math.floor(Math.random() * monsterData.results.length)];

    // Seçilen canavarın detayını çek
    const mDetailRes = await fetch(`${API_URL}${randomMonster.url}`);
    const mDetail = await mDetailRes.json();

    state.monster = {
        name: mDetail.name,
        hp: mDetail.hit_points,
        atk: 15,
        img: "👾"
    };

    state.battleLog = "Savaşa hazırsın! Saldır butonuna bas.";
    render();
}
