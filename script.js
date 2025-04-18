let qr;

function generateQRCode() {
  const input = document.getElementById("qrInput").value.trim();
  if (!input) return alert("Please enter text or URL");

  if (!qr) {
    qr = new QRious({
      element: document.getElementById("qrCode"),
      size: 250,
      value: input
    });
  } else {
    qr.value = input;
  }

  document.getElementById("downloadBtn").style.display = "inline-block";
}

function downloadQRCode() {
  const canvas = document.getElementById("qrCode");
  const link = document.createElement("a");
  link.download = "qr-code.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
