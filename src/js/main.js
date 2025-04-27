import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

// change the title and include the full name and link of the park
const parkTitleElement = document.querySelector(".hero-banner__title");
parkTitleElement.innerHTML = parkData.fullName;
parkTitleElement.href = parkData.url;
document.title = parkData.fullName;
// change the image
const heroPicElement = document.querySelector("#here-banner__image");
heroPicElement.src = parkData.images[0].url;
heroPicElement.alt = parkData.images[0].altText;
// change the info of the park (name, designation, and states)
const infoElement = document.querySelector(".hero-banner__content");
infoElement.innerHTML = parkInfoTemplate(parkData);
function parkInfoTemplate(info) {
    return `<a href="/" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
      <span>${info.designation}</span>
      <span>${info.states}</span>
    </p>`;
  }