
const button = document.querySelector("#download-button");
const complimentText = document.querySelector("#compliment");
const statusText = document.querySelector("#status");

let compliments = [];

async function loadCompliments() {
  const response = await fetch("./compliments.txt");

  if (!response.ok) {
    throw new Error("Could not load compliments.txt");
  }

  const fileText = await response.text();

  compliments = fileText
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);

  if (!compliments.length) {
    throw new Error("The compliments file is empty.");
  }
}

function downloadCompliment(text) {
  const blob = new Blob(
    [text + "\n"],
    { type: "text/plain;charset=utf-8" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "compliment.txt";

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

button.addEventListener("click", async () => {
  button.disabled = true;
  button.textContent = "Loading...";
  statusText.textContent = "Finding a compliment...";

  try {
    if (!compliments.length) {
      await loadCompliments();
    }

    const chosen =
      compliments[Math.floor(Math.random() * compliments.length)];

    complimentText.textContent = chosen;
    downloadCompliment(chosen);

    statusText.textContent =
      `Downloaded! ${compliments.length.toLocaleString()} compliments available.`;

  } catch (error) {
    console.error(error);

    statusText.textContent =
      "Could not load compliments.txt. Make sure all four files are in the same folder.";

  } finally {
    button.disabled = false;
    button.textContent = "Download Compliment";
  }
});
