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

window.onload = onBoredClicked;
