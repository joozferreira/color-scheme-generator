const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", () => {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${seedColor().slice(
      1
    )}&mode=${mode()}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      colorFiller(data.colors.map((item) => item.hex.value));
    });
});

function seedColor() {
  return document.getElementById("seed-color").value;
}

function mode() {
  return document.getElementById("mode").value;
}

function colorFiller(array) {
  const main = document.getElementById("results-section");
  main.innerHTML = "";
  array.forEach((item) => {
    const colorBlock = document.createElement("div");
    // Creation of the two sections of the global block
    createUpperBlock(item, colorBlock);
    createLowerBlock(item, colorBlock);
    // Addition of copy option
    colorBlock.addEventListener("click", () => {
      navigator.clipboard.writeText(item);
    });
    // Addition of copy option
    main.appendChild(colorBlock);
  });
}

function createUpperBlock(color, block) {
  const colorUpperBlock = document.createElement("div");
  const colorUpperBlockText = document.createElement("p");
  colorUpperBlock.style.backgroundColor = color;
  colorUpperBlockText.textContent = `${color}`;
  colorUpperBlockText.style.color = contrastChecker(color);
  colorUpperBlock.classList.add("color-upper-block");
  colorUpperBlock.appendChild(colorUpperBlockText);
  block.appendChild(colorUpperBlock);
}

function createLowerBlock(color, block) {
  const colorLowerBlock = document.createElement("div");
  colorLowerBlock.textContent = `${color}`;
  colorLowerBlock.classList.add("color-lower-block");
  block.appendChild(colorLowerBlock);
}

function contrastChecker(color) {
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
