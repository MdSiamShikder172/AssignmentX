function connect() {
    // Get the search term and trim any leading or trailing whitespace
    const searchTerm = document.getElementById("searchBox").value.trim();
    document.getElementById("searchBox").value = ""; // Clear input box
    
    // Check if searchTerm is empty and alert the user
    if (!searchTerm) {
        alert("Please enter a country name.");
        return;
    }

    // Create the URL using backticks (template literals)
    const url = `https://restcountries.com/v3.1/name/${searchTerm}`;
    
    // Fetch data from the API
    fetch(url)
        .then(res => {
            // Check if the response status is OK (status code 200)
            if (!res.ok) {
                throw new Error("Country not found or invalid response.");
            }
            return res.json();
        })
        .then(data => display(data)) // Call the display function on success
        .catch(error => {
            // Handle errors (e.g., network issues, no country found)
            console.error('Error:', error);
            alert("An error occurred: " + error.message);
        });
}

function display(data) {
    const displayArea = document.getElementById("displayArea");
    displayArea.innerHTML = ""; // Clear previous content

    data.forEach(country => {
        const newDiv = document.createElement("div");
        newDiv.classList.add("innerDivStyle");

        newDiv.innerHTML = `
            <h5>${country.name.common}</h5>
            <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
            <p>Region: ${country.region || "N/A"}</p>
            <p>Population: ${country.population ? country.population.toLocaleString() : "N/A"}</p>
            <button class="btn btn-info btn-sm" onclick="showMore('${country.name.common}')">More Details</button>
        `;

        displayArea.appendChild(newDiv);
    });
}

function showMore(countryName) {
    // Create the URL using backticks (template literals)
    const url = `https://restcountries.com/v3.1/name/${countryName}`;
    
    // Fetch country details
    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to fetch country details.");
            }
            return res.json();
        })
        .then(data => {
            const country = data[0];
            
            // Build a detailed message
            const capital = country.capital ? country.capital[0] : "N/A";
            const population = country.population ? country.population.toLocaleString() : "N/A";
            const area = country.area ? country.area.toLocaleString() : "N/A";
            const region = country.region || "N/A";
            
            // Display country details in an alert
            alert(`
                Name: ${country.name.common}
                Capital: ${capital}
                Population: ${population}
                Area: ${area} km²
                Region: ${region}
            `);
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred: " + error.message);
        });
}
