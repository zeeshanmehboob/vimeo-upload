const form = document.getElementById("uploadForm");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  resultDiv.innerHTML = "Uploading...";

  try {
    const response = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.url) {
      const videoId = result.url.split("/").pop();
      resultDiv.innerHTML = `
        <p><strong>Video uploaded successfully!</strong></p>
        <a href="${result.url}" target="_blank">${result.url}</a>
      `;
    } else {
      resultDiv.innerText = "Error: " + (result.error || "Unknown error");
    }
  } catch (err) {
    resultDiv.innerText = `Unexpected error: ${err.message}`;
  }
});
