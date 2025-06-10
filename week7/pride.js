function displayQuotes(quotes) {
    const listElement = document.querySelector("#quoteList");
    listElement.innerHTML = "";
    quotes.forEach(quote => {
        listElement.innerHTML += `<li>${quote}</li>`
    });
}

function checkForQuotes() {
    const storedQuotes = localStorage.getItem("pride-prejudice");
    if (storedQuotes) {
        // Load from localStorage
        const quotes = JSON.parse(storedQuotes);
        displayQuotes(quotes);
        console.log("Loaded quotes from localStorage.");
        document.querySelector("#button").classList.add("hide")
    }
}

async function loadQuotes() {
    // No localStorage data, fetch from API
    const I_NUMBER = "737072339";  // Replace with your actual I-NUMBER

    try {
        const response = await fetch("quotes.json", {
            headers: {
                "I-NUMBER": I_NUMBER
            }
        });

        if (!response.ok) {
            throw new Error("Unauthorized or error fetching data");
        }

        const data = await response.json();
        console.log(data);
        const prideBook = data.books.find(book => book.title === "Pride and Prejudice");
        if (!prideBook) {
            throw new Error("Book not found");
        }

        const quotes = prideBook.quotes;
        displayQuotes(quotes);

        // Store in localStorage
        localStorage.setItem("pride-prejudice", JSON.stringify(quotes));
        console.log("Fetched quotes from API and saved to localStorage.");

        // Hide button
        document.querySelector("button").classList.add("hide")
    } catch (error) {
        console.error("Error:", error);
    }
}

checkForQuotes();
document.querySelector('#button').addEventListener("click", loadQuotes);