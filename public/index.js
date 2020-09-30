var buttonList = document.querySelectorAll("button");
var buttonArray = [...buttonList];
var sounds = [
  "crash",
  "kick-bass",
  "snare",
  "tom-1",
  "tom-2",
  "tom-3",
  "tom-4",
];

buttonArray.forEach((button, index) => {
  button.addEventListener("click", () => handleClick(index));
});

document.addEventListener("keydown", logkey);

function logkey(e) {
  switch (e.key) {
    case "w":
      handleClick(0);
      toggleFontWhenKey("w");
      break;
    case "a":
      handleClick(1);
      toggleFontWhenKey("a");
      break;
    case "s":
      handleClick(2);
      toggleFontWhenKey("s");
      break;
    case "d":
      handleClick(3);
      toggleFontWhenKey("d");
      break;
    case "j":
      handleClick(4);
      toggleFontWhenKey("j");
      break;
    case "k":
      handleClick(5);
      toggleFontWhenKey("k");
      break;
    case "l":
      handleClick(6);
      toggleFontWhenKey("l");
      break;

    default:
      break;
  }
}

function toggleFontWhenKey(key) {
  document.getElementsByClassName(key)[0].classList.toggle("biggerFont");
  setTimeout(() => {
    document.getElementsByClassName(key)[0].classList.toggle("biggerFont");
  }, 300);
}

function handleClick(soundsIndex) {
  new Audio("sounds/" + sounds[soundsIndex] + ".mp3").play();
}
