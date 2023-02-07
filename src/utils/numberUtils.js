export const divideByComma = (num) => {
  return !num || num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}