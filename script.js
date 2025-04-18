function getVideoId(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}

function generateThumbnailHtml(videoId) {
  const imgUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  return `
    <div class="thumbnail">
      <img src="${imgUrl}" alt="YouTube Thumbnail" />
      <a href="${imgUrl}" download>Download Thumbnail</a>
    </div>
  `;
}

function fetchThumbnail() {
  const url = document.getElementById("videoUrl").value.trim();
  const videoId = getVideoId(url);

  if (!videoId) {
    alert("Invalid YouTube URL");
    return;
  }

  const html = generateThumbnailHtml(videoId);
  document.getElementById("thumbnails").insertAdjacentHTML("afterbegin", html);

  saveToHistory(videoId);
}

function saveToHistory(videoId) {
  let history = JSON.parse(localStorage.getItem("thumbnailHistory")) || [];
  if (!history.includes(videoId)) {
    history.unshift(videoId);
    localStorage.setItem("thumbnailHistory", JSON.stringify(history));
  }
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("thumbnailHistory")) || [];
  history.forEach(videoId => {
    const html = generateThumbnailHtml(videoId);
    document.getElementById("thumbnails").insertAdjacentHTML("beforeend", html);
  });
}

function clearHistory() {
  localStorage.removeItem("thumbnailHistory");
  document.getElementById("thumbnails").innerHTML = "";
}

// Load thumbnails on page load
document.addEventListener("DOMContentLoaded", loadHistory);
