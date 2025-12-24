export const getRandomMonster = async () => {
    const monsters = [
        { name: "Kara Ejderha", hp: 200, atk: 15, img: "🐲" },
        { name: "Vahşi Ork", hp: 120, atk: 10, img: "👹" },
        { name: "İskelet Şövalye", hp: 80, atk: 20, img: "💀" }
    ];
    // Rastgele bir canavar seçer
    const randomIndex = Math.floor(Math.random() * monsters.length);
    return monsters[randomIndex];
};
