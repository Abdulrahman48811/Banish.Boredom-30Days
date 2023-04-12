const linkContainer = document.getElementById("link-container");
const activity = document.getElementById("activity");
const type = document.getElementById("type");
const participants = document.getElementById("participants");
const price = document.getElementById("price");
const link = document.getElementById("link");

const onBoredClicked = () => {
    fetch("https://www.boredapi.com/api/activity/")
    .then((res) => res.json())
    .then((data) => {
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
    })
    .catch((error) => console.log(error));
  };
  
  const boredButton = document.getElementById("bored-button");
  boredButton.onclick = onBoredClicked;
  