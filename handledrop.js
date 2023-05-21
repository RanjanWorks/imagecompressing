 
    
const dropArea = document.getElementById("drop-area");



dropArea.addEventListener("dragenter", preventDefault);
dropArea.addEventListener("dragover", preventDefault);
dropArea.addEventListener("dragleave", preventDefault);
dropArea.addEventListener("drop", preventDefault);


dropArea.addEventListener("dragenter", highlight);
dropArea.addEventListener("dragover", highlight);
dropArea.addEventListener("dragleave", unhighlight);


dropArea.addEventListener("drop", handleDrop);

function preventDefault(event) {
  event.preventDefault();
  event.stopPropagation();
}


function highlight() {
  dropArea.classList.add("hover");
}


function unhighlight() {
  dropArea.classList.remove("hover");
}


function handleDrop(event) {
  [...event.dataTransfer.files].forEach((file) => {
validateFile(file)
});
}



   