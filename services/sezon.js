// Stateless: Oyunun çıkış tarihine göre "Yeni" veya "Klasik" etiketi üretir.
export const getGameCategoryByAge = (releaseYear) => {
    const currentYear = new Date().getFullYear();
    if (currentYear - releaseYear <= 2) return "🔥 NEW RELEASE";
    if (currentYear - releaseYear >= 10) return "🏛️ CLASSIC";
    return "🎮 ACTIVE";
};
