function generateQR() {
  const input = document.getElementById("qrInput").value.trim();
  const output = document.getElementById("qrOutput");
  const history = document.getElementById("qrHistory");

  if (!input) {
    alert("Please enter some text or URL!");
    return;
  }

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(input)}`;

  // Show current QR
  output.innerHTML = `<img src="${qrUrl}" alt="QR Code" />`;

  // Save and update history
  const saved = JSON.parse(localStorage.getItem("qrHistory") || "[]");
  saved.unshift(qrUrl);
  localStorage.setItem("qrHistory", JSON.stringify(saved.slice(0, 10)));
  renderHistory();
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem("qrHistory") || "[]");
  const historyContainer = document.getElementById("qrHistory");
  historyContainer.innerHTML = "";

  if (history.length === 0) {
    historyContainer.innerHTML = "<p>No history yet.</p>";
    return;
  }

  history.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Previous QR";
    historyContainer.appendChild(img);
  });
}

function clearHistory() {
  localStorage.removeItem("qrHistory");
  renderHistory();
  document.getElementById("qrOutput").innerHTML = "";
}

document.addEventListener("DOMContentLoaded", renderHistory);
