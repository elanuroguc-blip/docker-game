export const getEquipments = async (charId) => {
    const items = {
        1: { item: "Efsanevi Kalkan", bonusHp: 40, bonusAtk: 5 },
        2: { item: "Kadim Asa", bonusHp: 5, bonusAtk: 45 },
        3: { item: "Gölge Yayı", bonusHp: 15, bonusAtk: 25 }
    };
    return items[charId] || { item: "Tahta Kılıç", bonusHp: 0, bonusAtk: 0 };
};
