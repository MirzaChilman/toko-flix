export default {
  calculatePrice: (vote) => {
    let harga;

    /*

    let styles = 'btn-danger';
    let statusButton = 'Buy';

    variable di atas tadinya di pakai jika rating 0 maka bla bla
    karena task yang dulu di now_playing Indonesia mostly rating belum ada
    tapi setelah sekarang udah pake now_playing aja, sepertinya tidak perlu validasinya
    */

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

      /* styles = 'btn-secondary disabled';
      statusButton = 'Sudah dipunyai'; */
    }
    return { harga };
  },
};
