// fetch.js
const url = "https://pokeapi.co/api/v2/pokemon/ditto";
const urlList = "https://pokeapi.co/api/v2/pokemon";
let results = null;
async function getPokemon(myurl) {
  const response = await fetch(myurl);
  //check to see if the fetch was successful
  if (response.ok) {
    // the API will send us JSON...but we have to convert the response before we can use it
    // .json() also returns a promise...so we await it as well.
    const data = await response.json();
    doStuff(data);
  }
}
async function getPokemonList(myurl) {
  const response = await fetch(myurl);
  //check to see if the fetch was successful
  if (response.ok) {
    // the API will send us JSON...but we have to convert the response before we can use it
    // .json() also returns a promise...so we await it as well.
    const data = await response.json();
    doStuffList(data);
  }
}

function doStuff(data) {
  results = data;
  console.log("first: ", results);
  const element = document.querySelector("#output");
  element.innerHTML = `
    <h2>${results.name}</h2>
    <img src="${results.sprites.front_default}" alt="Image of ${results.name}">
    `;
}
function doStuffList(data) {
  console.log(data);
  const pokeListElement = document.querySelector("#outputList");
  let pokeList = data.results;
  pokeList = sortPokemon(pokeList);
  pokeList.forEach((currentItem) => {
    const html = `<li>${currentItem.name}</li>`;
    // note the += here...
    pokeListElement.innerHTML += html;
  });
}
getPokemon(url);
getPokemonList(urlList)
console.log("second: ", results);

function compare(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

function sortPokemon(list) {
  let sortedList = list.sort(compare);
  return sortedList;
}