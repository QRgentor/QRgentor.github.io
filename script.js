function generateQRCode() {
  const input = document.getElementById('qrInput').value.trim();
  const output = document.getElementById('qrOutput');
  if (!input) {
    output.innerHTML = "<p>Please enter a URL or text.</p>";
    return;
  }

  const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(input)}`;
  output.innerHTML = `<img src="${qrURL}" alt="QR Code" />`;

  saveToHistory(input);
  displayHistory();
}

function saveToHistory(text) {
  let history = JSON.parse(localStorage.getItem("qrHistory")) || [];
  if (!history.includes(text)) {
    history.unshift(text);
    localStorage.setItem("qrHistory", JSON.stringify(history.slice(0, 10))); // Limit to 10 items
  }
}

function displayHistory() {
  const history = JSON.parse(localStorage.getItem("qrHistory")) || [];
  const container = document.getElementById("qrHistory");
  container.innerHTML = history.map(item => {
    const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(item)}`;
    return `
      <div class="history-item">
        <img src="${qrURL}" alt="QR">
        <p>${item}</p>
      </div>
    `;
  }).join("");
}

function clearQRHistory() {
  localStorage.removeItem("qrHistory");
  displayHistory();
}

document.addEventListener("DOMContentLoaded", displayHistory);
