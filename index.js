import { contrastChecker } from "./contrastChecker.js";

const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", () => {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${seedColor().slice(
      1
    )}&mode=${mode()}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      const colors = data.colors.map((item) => item.hex.value); // takes the X colors from the JSON file and stores it in an array
      colorFiller(colors);
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

/*
async function checkContrast(textColor, bgColor) {
  const response = await fetch(
    `https://webaim.org/resources/contrastchecker/?fcolor=${textColor}&bcolor=${bgColor}&api`
  );
  const data = await response.json();
  return data.ratio;
}

async function textColorPicker(baseColor) {
  const whiteContrast = await checkContrast("FFFFFF", baseColor);
  const blackContrast = await checkContrast("000000", baseColor);

  return whiteContrast > blackContrast ? "#FFFFFF" : "#000000";
}

textColorPicker("0000FF").then(console.log);
*/
