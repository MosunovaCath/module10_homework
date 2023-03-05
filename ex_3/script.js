const chat = document.getElementById("chat");
const messageInput = document.getElementById("message-input");
const sentMessageBtn = document.getElementById("send-message");
const sentGeoBtn = document.getElementById("send-geo");
const errorRow = document.getElementById("errors-row");

const websocket = new WebSocket("wss://echo-ws-service.herokuapp.com");

websocket.addEventListener("open", () => console.log("connected"));

sentMessageBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const message = messageInput.value;
  websocket.send(message);
  chat.innerHTML += `<p class='our-message'> ${message} </p>`;
  messageInput.value = "";
});

websocket.addEventListener("message", (event) => {
  console.log(event);
  if (!event.data.includes("openstreetmap.org")) {
    chat.innerHTML += `<p class='server-message'> ${event.data} </p>`;
  }
  //    else {
  //     errorRow.innerHTML = "<p>Server is trying to send URL</p>";
  //   }
});

sentGeoBtn.addEventListener("click", (event) => {
  event.preventDefault();
  console.log(navigator);
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        const mapURL = `https://www.openstreetmap.org/#map=19/${latitude}/${longitude}`;
        websocket.send(mapURL);
        chat.innerHTML += `<p class='our-message'> Your GEO is <a href="${mapURL}" target="_black">Show Geo</a></p>`;
      },
      () => {
        errorRow.innerHTML = "<p>Please allow your GEO</p>";
      }
    );
  } else {
    errorRow.innerHTML = "<p>No geolocation in your browser</p>";
  }
});
// let a = 10;
// a += 5;
// a  = a +5;
// let i =0;

// i++
// i += 1
// i = i +1

// for (let j = 0; j <= 10; j += 2) {
//   console.log(j);
// }
