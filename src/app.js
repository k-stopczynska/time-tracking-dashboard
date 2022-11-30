const buttons = document.querySelectorAll(".button");
const titles = document.querySelectorAll(".title");
const wrappers = document.querySelectorAll(".wrapper");
const titlesArr = [...titles];
const wrappersArr = [...wrappers];

const createCard = (title, timeframe, currentElem, previousElem) => {
  const description = document.createElement("div");
  const current = document.createElement("h2");
  const previous = document.createElement("p");
  description.classList.add("description");
  current.classList.add("current");
  previous.classList.add("previous");
  const message = ["Previous", "Last week", "Last month"];
  let textMessage;
  timeframe === "daily"
    ? (textMessage = message[0])
    : timeframe === "weekly"
    ? (textMessage = message[1])
    : (textMessage = message[2]);
  current.innerText = `${currentElem}hrs`;
  previous.innerText = `${textMessage}-${previousElem}hrs`;
  description.appendChild(current);
  description.appendChild(previous);
  wrappersArr
    .find((wrapper) => wrapper.children[0].children[0].innerText === title)
    .appendChild(description);
  wrappers.forEach((wrapper) => wrapper.classList.add("animate"));
};

const fetchData = async (timeframe = "weekly") => {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error("something bad happened");
    }
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
      let titleData = data[i].title;
      let timeframes = Object.entries(data[i].timeframes);
      for (let j = 0; j < timeframes.length; j++) {
        if (timeframe === timeframes[j][0]) {
          let timeframeData = timeframes[j][0];
          let currentData = timeframes[j][1].current;
          let previousData = timeframes[j][1].previous;
          createCard(titleData, timeframeData, currentData, previousData);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const timeframeHandler = (e) => {
  buttons.forEach((button) => button.classList.remove("active"));
  wrappers.forEach((wrapper) => wrapper.lastChild.remove());
  wrappersArr.forEach((wrapper) => wrapper.classList.remove("animate"));
  const buttonClicked = e.target;
  buttonClicked.classList.add("active");
  const buttonTimeframe = buttonClicked.innerText.toLowerCase();
  fetchData(buttonTimeframe);
};

buttons.forEach((button) => button.addEventListener("click", timeframeHandler));

fetchData();
