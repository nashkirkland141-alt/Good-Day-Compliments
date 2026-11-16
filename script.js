
let compliments = [];

const complimentDisplay = document.getElementById("compliment");
const button = document.getElementById("newCompliment");

async function loadCompliments() {
    try {
        const response = await fetch("./compliments.txt");

        if (!response.ok) {
            throw new Error("Could not load compliments");
        }

        const text = await response.text();

        compliments = text
            .split(/\r?\n/)
            .filter(line => line.trim() !== "");

    } catch (error) {
        complimentDisplay.textContent =
            "Couldn't load the compliments. Try refreshing the page.";
    }
}

button.addEventListener("click", () => {
    if (compliments.length === 0) {
        complimentDisplay.textContent = "Loading compliments...";
        return;
    }

    const randomIndex = Math.floor(Math.random() * compliments.length);

    complimentDisplay.textContent = compliments[randomIndex];
});

loadCompliments();
