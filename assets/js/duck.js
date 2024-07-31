// Get the div with the class bird-container
const duckContainer = document.querySelector(".duck-container");

// Function to generate a random percentage between 20 and 80
function getRandomPercentage() {
  return Math.floor(Math.random() * 61) + 20;
}

// Function to change the position of the bird container
function changePosition() {
  const randomPercentage = getRandomPercentage();
  duckContainer.style.top = `${randomPercentage}%`;
}

// Change the position every 8 seconds
setInterval(changePosition, 8000);
