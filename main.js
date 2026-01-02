import { getGlobalRank } from './services/liste.js';
import { getGameCategoryByAge } from './services/sezon.js';
import { getGameMeta } from './services/tür.js';

async function buildGameRanking() {
    const rawGames = [
        { id: 1, name: "Elden Ring", genre: "Soulslike", year: 2022 },
        { id: 2, name: "League of Legends", genre: "MOBA", year: 2009 },
        { id: 3, name: "Cyberpunk 2077", genre: "RPG", year: 2020 }
    ];

    const finalRanking = await Promise.all(rawGames.map(async (game) => {
        const rankInfo = await getGlobalRank(game.id);
        const ageTag = getGameCategoryByAge(game.year);
        const metaInfo = getGameMeta(game.genre);

        return { ...game, ...rankInfo, ageTag, metaInfo };
    }));

    // Global Rank'a göre sırala (Ranking mantığı)
    finalRanking.sort((a, b) => a.globalRank - b.globalRank);

    renderList(finalRanking);
}

function renderList(games) {
    const list = document.getElementById('game-list');
    list.innerHTML = games.map(game => `
        <div class="card">
            <span class="rank">#${game.globalRank}</span>
            <h3>${game.name} <small>${game.ageTag}</small></h3>
            <p><strong>Tür:</strong> ${game.genre} | <strong>Meta:</strong> ${game.metaInfo}</p>
            <div class="trend-tag">${game.trend === 'Increasing' ? '📈 Yükselişte' : '📉 Düşüşte'}</div>
        </div>
    `).join('');
}

buildGameRanking();
