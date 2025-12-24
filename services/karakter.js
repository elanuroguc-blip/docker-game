export const getCharacters = async () => {
    // Stateless veri: Sunucudan geliyormuş gibi simüle ediyoruz
    const characters = [
        { id: 1, name: "Savaşçı", baseHp: 150, baseAtk: 20, img: "🛡️" },
        { id: 2, name: "Büyücü", baseHp: 80, baseAtk: 45, img: "🪄" },
        { id: 3, name: "Okçu", baseHp: 110, baseAtk: 30, img: "🏹" }
    ];
    return characters;
};
