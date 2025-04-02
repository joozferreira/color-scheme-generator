export function contrastChecker(color) {
  const hexCode = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];

  const red =
    hexCode.indexOf(color.slice(1, 2)) * 16 +
    hexCode.indexOf(color.slice(2, 3));

  const green =
    hexCode.indexOf(color.slice(3, 4)) * 16 +
    hexCode.indexOf(color.slice(4, 5));

  const blue =
    hexCode.indexOf(color.slice(5, 6)) * 16 + hexCode.indexOf(color.slice(6));

  // Brightness function taken from https://stackoverflow.com/a/51567564
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

  return brightness > 155 ? "#000000" : "#FFFFFF";
}
