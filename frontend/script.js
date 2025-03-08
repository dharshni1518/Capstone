async function translateText() {
    const text = document.getElementById("inputText").value;

    const response = await fetch("http://localhost:5000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text })
    });

    const data = await response.json();
    document.getElementById("outputText").innerText = data.translated_text;
}

async function uploadTextFile() {
    const fileInput = document.getElementById("textFile").files[0];
    if (!fileInput) return alert("Please select a file.");

    const formData = new FormData();
    formData.append("file", fileInput);

    const response = await fetch("http://localhost:5000/upload-text", {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    document.getElementById("fileOutput").innerText = data.translated_text || "Error translating file";
}

async function uploadImage() {
    const fileInput = document.getElementById("imageFile").files[0];
    if (!fileInput) return alert("Please select an image.");

    const formData = new FormData();
    formData.append("file", fileInput);

    const response = await fetch("http://localhost:5000/upload-image", {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    document.getElementById("imageOutput").innerText = data.translated_text || "Error translating image";
}
