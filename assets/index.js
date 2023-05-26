window.addEventListener("WebComponentsReady ", function () {
    window.WebComponentsReady = true;
});

function simulateFileInput(url) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const file = new File([blob], 'game.gbc');

            const fileInput = document.getElementById('fileInput');
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInput.files = dataTransfer.files;

            const changeEvent = new Event('change', {
                bubbles: true
            });
            fileInput.dispatchEvent(changeEvent);
        })
        .catch(error => {
            console.error(error);
        });
}

function showOverlay() {
    document.getElementById("overlay").classList.add("visible");
}
function hideOverlay() {
    document.getElementById("overlay").classList.remove("visible");
}
window.addEventListener("load", showOverlay);
document.getElementById("closeOverlayBtn").addEventListener("click", hideOverlay);