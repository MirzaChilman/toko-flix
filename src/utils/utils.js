/**
 *
 * @param {number} vote
 * @returns {string}
 */
export const calculatePrice = (vote) => {
  let price;

  if (vote > 0 && vote <= 3) {
    price = `${vote * 3500}`;
  } else if (vote > 3 && vote <= 6) {
    price = `${vote * 8250}`;
  } else if (vote > 6 && vote <= 8) {
    price = `${vote * 16350}`;
  } else if (vote > 8 && vote <= 10) {
    price = `${vote * 21250}`;
  } else {
    price = "Unavailable";
  }
  return price;
};
