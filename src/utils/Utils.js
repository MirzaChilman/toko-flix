export default {
  calculatePrice: (vote) => {
    let harga;

    if (vote > 0 && vote <= 3) {
      harga = `Rp.${vote * 3500}`;
    } else if (vote > 3 && vote <= 6) {
      harga = `Rp.${vote * 8250}`;
    } else if (vote > 6 && vote <= 8) {
      harga = `Rp.${vote * 16350}`;
    } else if (vote > 8 && vote <= 10) {
      harga = `Rp.${vote * 21250}`;
    } else {
      harga = 'Belum Tersedia';
    }
    return { harga };
  },
  titleToSlug: (string) => {
    const str = string.replace(/\s+/g, '-').toLowerCase();
    return str;
  },
};
