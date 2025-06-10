// api.js
const baseUrl = "https://developer.nps.gov/api/v1/";

async function getJson(endpoint) {
  // replace this with your actual key
  const apiKey = "2avwTn9PeS5jCscHbUIXFefH5fVzXcTvhvmhsc4m";
  // construct the url: baseUrl + endpoint + parameters
  const url = baseUrl + endpoint;
  // set the options. The important one here is the X-Api-Key
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey
      }
  }
  // make the request
  const response = await fetch(url, options)
  const data = await response.json()
  console.log(data)
  return data;
}

async function renderClimbingList() {
    const mydata = await getJson('activities/parks?q=climbing');
    const myparks = mydata.data[0].parks;
    console.log(myparks);
    const html = myparks.map(listTemplate).join(' ');
    const listelement = document.querySelector('#outputList');
    listelement.innerHTML = html;
}

function listTemplate(item) {
    return `<li><a href="${item.url}">${item.fullName}</a> ${item.states}</li>`
}

renderClimbingList()
