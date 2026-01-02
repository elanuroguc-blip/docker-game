// Stateless: Bir oyun ID'si girer, globaldeki popülerlik sırasını döner.
export const getGlobalRank = async (gameId) => {
    const rankings = {
        1: { globalRank: 1, trend: 'Increasing' }, // LoL
        2: { globalRank: 5, trend: 'Stable' },     // Valorant
        3: { globalRank: 12, trend: 'Decreasing' } // CS2
    };
    return rankings[gameId] || { globalRank: 99, trend: 'New' };
};
