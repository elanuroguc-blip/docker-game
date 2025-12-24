export const getEquipments = async (charId) => {
    const equipmentMap = {
        1: { item: "Çelik Zırh", bonusHp: 50, bonusAtk: 5 },
        2: { item: "Kristal Asa", bonusHp: 10, bonusAtk: 40 },
        3: { item: "Elven Yayı", bonusHp: 20, bonusAtk: 25 }
    };
    // Karakter ID'sine göre ilgili ekipmanı dönüyoruz
    return equipmentMap[charId] || { item: "Paslı Kılıç", bonusHp: 0, bonusAtk: 0 };
};
