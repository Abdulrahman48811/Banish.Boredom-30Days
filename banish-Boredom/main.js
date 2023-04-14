const list = document.getElementById("list");
const placeholderCard = document.getElementById("primary-card");
const linkContainer = document.getElementById("link-container");
const activity = document.getElementById("activity");
const type = document.getElementById("type");
const participants = document.getElementById("participants");
const price = document.getElementById("price");
const link = document.getElementById("link");

let currentActivity;

const onBoredClicked = () => {
    fetch("https://www.boredapi.com/api/activity/")
    .then((res) => res.json())
    .then((data) => {
        console.log(data.link);
        activity.innerText = data.activity;
        type.innerText = data.type;
        participants.innerText = data.participants;
        price.innerText = data.price;
        if (data.link.length) {
          link.href = data.link;
          linkContainer.hidden = false;
        } else {
          linkContainer.hidden = true;
        }
        currentActivity = data;
      })
    .catch((error) => console.log(error));
  };
  
  const boredButton = document.getElementById("bored-button");
  boredButton.onclick = onBoredClicked;

  const onNopeClicked = () => {
    onBoredClicked();
  };
  
  const nopeButton = document.getElementById("nope-button");
  nopeButton.onclick = onNopeClicked;

  const onLikeClicked = () => {
    const savedActivitiesString = localStorage.getItem("activities");
  
    const savedActivities = JSON.parse(savedActivitiesString) ?? [];
  
    savedActivities.push(currentActivity);
  
    localStorage.setItem("activities", JSON.stringify(savedActivities));
  
    onBoredClicked(); // a forth place we call this!
  };
  
  const likeButton = document.getElementById("like-button");
  likeButton.onclick = onLikeClicked;

  window.onload = () => {
    const savedActivitiesString = localStorage.getItem("activities");
  
    const savedActivities = JSON.parse(savedActivitiesString) ?? [];
  
    savedActivities.forEach((savedActivity) => {
      const newCard = placeholderCard.cloneNode(true);
      console.log(newCard);
      newCard.id = savedActivity.key;
  
      const newCardActivity = newCard.querySelector(".activity");
      newCardActivity.innerText = savedActivity.activity;
  
      const newCardType = newCard.querySelector(".type");
      newCardType.innerText = savedActivity.type;
  
      const newCardParticipants = newCard.querySelector(".participants");
      newCardParticipants.innerText = savedActivity.participants;
  
      const newCardPrice = newCard.querySelector(".price");
      newCardPrice.innerText = savedActivity.price;
  
      if (savedActivity.link) {
        const newCardLink = newCard.querySelector(".link");
        const newCardLinkContainer = newCard.querySelector(".link-container");
        console.log(newCardLinkContainer);
        newCardLink.href = savedActivity.link;
        newCardLinkContainer.hidden = false;
      }
  
      const newCardDeleteButton = newCard.querySelector(".delete-button");
      newCardDeleteButton.onclick = () => {
        console.log("delete: ", savedActivity.key);
      };
  
      list.appendChild(newCard);
    });
  
    onBoredClicked();
  };
  
