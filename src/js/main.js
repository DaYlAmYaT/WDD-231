import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

const parkInfoLinks = [
  {
    name: "Current Conditions &#x203A;",
    link: "conditions.html",
    image: parkData.images[2].url,
    description:
      "See what conditions to expect in the park before leaving on your trip!"
  },
  {
    name: "Fees and Passes &#x203A;",
    link: "fees.html",
    image: parkData.images[3].url,
    description: "Learn about the fees and passes that are available."
  },
  {
    name: "Visitor Centers &#x203A;",
    link: "visitor_centers.html",
    image: parkData.images[9].url,
    description: "Learn about the visitor centers in the park."
  }
];

setHeaderInfo(parkData);
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
function setHeaderInfo(data) {
  // insert data into disclaimer section
  const disclaimer = document.querySelector(".disclaimer > a");
  disclaimer.href = data.url;
  disclaimer.innerHTML = data.fullName;
  // update the title of the site. Notice that we can select things in the head just like in the body with querySelector
  document.querySelector("head > title").textContent = data.fullName;
  // set the banner image
  document.querySelector(".hero-banner > img").src = data.images[0].url;
  // use the template function above to set the rest of the park specific info in the header
  document.querySelector(".hero-banner__content").innerHTML =
    parkInfoTemplate(data);
}

function introTempalte(data) {
  return `
  <div class="intro">
    <h1>${data.fullName}</h1>
    <p>${data.description}</p>
  </div>
  `;
}

function mediaCardTemplate(info) {
  return `
  <div class="card">
    <img src="${info.image}" alt="${info.name}">
    <a href="${info.link}">
      <h2>${info.name}</h2>
    </a>
    <p>${info.description}</p>
  </div>
  `;
}

const introElement = document.querySelector(".intro");
introElement.innerHTML = introTempalte(parkData);

const parkInfoElement = document.querySelector('#parkInfo');
parkInfoLinks.forEach(parkInfo => {
  parkInfoElement.innerHTML += mediaCardTemplate(parkInfo);
});

function getMailingAddress(addresses) {
  const mailing = addresses.find((address) => address.type === "Mailing");
  return mailing;
}

function getVoicePhone(phoneNumbers) {
  const voice = phoneNumbers.find((phoneNumber) => phoneNumber.type === "Voice");
  return voice.phoneNumber;
}

function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses);
  const voice = getVoicePhone(info.contacts.phoneNumbers)
  
  return `<section class="contact">
  <h3>Contact Info</h3>
  <h4>Mailing Address:</h4>
  <div><p>${mailing.line1}<p>
  <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p></div>
  <h4>Phone:</h4>
  <p>${voice}</p>
  </section>`;
}

const footerElement = document.querySelector("#park-footer");
footerElement.innerHTML = footerTemplate(parkData);