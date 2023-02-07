export const capitalize = (word) => {
  const firstLetter = word.charAt(0);

  const firstLetterCap = firstLetter.toUpperCase();

  const remainingLetters = word.slice(1);

  return firstLetterCap + remainingLetters;
}

export const makeParagraphs = (text) => {
  return !text ? [] : text.split("\n");
}