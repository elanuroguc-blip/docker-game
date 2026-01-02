// Stateless: Oyunun türüne göre sistem gereksinimi veya zorluk seviyesi döner.
export const getGameMeta = (genre) => {
    const metaData = {
        'Soulslike': 'Hardcore / High Difficulty',
        'MOBA': 'Competitive / Team Based',
        'RPG': 'Immersive / Story Driven'
    };
    return metaData[genre] || 'Casual Play';
};
