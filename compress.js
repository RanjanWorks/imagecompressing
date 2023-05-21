// Function to reduce image size to custom KB size
function reduceImageSize(file, targetSizeInKB, callback) {
  var reader = new FileReader();
  reader.onload = function (event) {
    var image = new Image();
    image.onload = function () {
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      var maxWidth = 800; // Adjust this value as needed
      var maxHeight = 600; // Adjust this value as needed
      var width = image.width;
      var height = image.height;

      // Calculate the new dimensions while maintaining aspect ratio
      if (width > height && width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      } else if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      // Set the canvas dimensions to the new dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw the image on the canvas
      context.drawImage(image, 0, 0, width, height);

      // Calculate the initial compression level
      var initialCompressionLevel = 1;

      // Compress the image using a binary search algorithm to find the suitable compression level
      var minCompressionLevel = 0;
      var maxCompressionLevel = 1;
      var finalCompressionLevel = 1;

      while (minCompressionLevel <= maxCompressionLevel) {
        var compressionLevel = (minCompressionLevel + maxCompressionLevel) / 2;
        var compressedDataURL = canvas.toDataURL(
          "image/jpeg",
          compressionLevel
        );
        var compressedSizeInKB = getImageSizeInKB(compressedDataURL);

        if (compressedSizeInKB > targetSizeInKB) {
          maxCompressionLevel = compressionLevel - 0.01;
        } else {
          finalCompressionLevel = compressionLevel;
          minCompressionLevel = compressionLevel + 0.01;
        }
      }

      // Get the compressed data URL using the final compression level
      var compressedDataURL = canvas.toDataURL(
        "image/jpeg",
        finalCompressionLevel
      );

      var blob = dataURLToBlob(compressedDataURL);
      callback(blob, compressedDataURL);
    };
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function dataURLToBlob(dataURL) {
  var parts = dataURL.split(",");
  var mime = parts[0].match(/:(.*?);/)[1];
  var bstr = atob(parts[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

function getImageSizeInKB(dataURL) {
  var head = dataURL.split(",")[0];
  var bytes =
    Math.floor((dataURL.length - head.length) * 0.75 + head.length) / 1024;
  return bytes.toFixed(2);
}

fileInput.addEventListener("change", function (e) {
  [...e.target.files].forEach((file) => {
    validateFile(file);
  });
});

function validateFile(file) {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  if (file && allowedTypes.includes(file.type)) {
    allfiles.push(file);
    hideShowSelectMainBox("none", "flex");
    callMainFunc(file, targetSizeInKB);
  } else {
    fileEname.innerText = file.type;
    modal.showModal();
  }
}

function createImageContainer(url, src, asize, name, nsize, downloadName) {
  let Imagebox = document.createElement("div");
  Imagebox.className = "image_container";
  let name_size = document.createElement("div");
  name_size.className = "name_size";
  let span1 = document.createElement("span");
  let span2 = document.createElement("span");
  let span3 = document.createElement("span");
  span2.innerHTML = "|";
  name_size.append(span1);
  name_size.append(span2);
  name_size.append(span3);
  span1.innerHTML = name;
  span3.innerHTML = asize;
  Imagebox.append(name_size);
  let img = document.createElement("img");
  img.src = src;
  let name_size2 = document.createElement("div");
  name_size2.className = "name_size";
  let span4 = document.createElement("span");
  let span5 = document.createElement("span");
  span4.innerText = "New size";
  span5.innerHTML = nsize;
  name_size2.append(span4);
  name_size2.append(span5);
  let downloadBtn = document.createElement("a");
  downloadBtn.className = "ranjan";
  downloadBtn.innerText = "Download";
  downloadBtn.href = url;
  downloadBtn.download = downloadName;
  Imagebox.append(name_size);
  Imagebox.append(img);
  Imagebox.append(name_size2);
  Imagebox.append(downloadBtn);

  document.querySelector(".img_main_container").append(Imagebox);
  console.log(alllinks);
}
function callMainFunc(file, targetSizeInKB) {
  reduceImageSize(
    file,
    targetSizeInKB,
    function (compressedImageBlob, compressedDataURL) {
      // Display the compressed image preview
      var reader = new FileReader();
      reader.onload = function (event) {
        let fileName = file.name.substring(0, 5) + "...";
        let fileSize = formatBytes(file.size);
        let newsize = formatBytes(compressedImageBlob.size);
        let newName = file.name;
        let mo =
          newName.split(".")[0].substring(0, 5) +
          "-Ranjan." +
          newName.split(".")[1];

        createImageContainer(
          compressedDataURL,
          compressedDataURL,
          fileSize,
          fileName,
          newsize,
          mo
        );
      };

      reader.readAsDataURL(compressedImageBlob);
    }
  );
}

// Function to convert bytes to KB or MB
function formatBytes(bytes) {
  if (bytes < 1024) {
    return bytes + " bytes";
  } else if (bytes < 1024 * 1024) {
    var kilobytes = Math.round(bytes / 1024); // Remove decimal places
    return kilobytes + " KB";
  } else {
    var megabytes = (bytes / (1024 * 1024)).toFixed(2);
    return megabytes + " MB";
  }
}

function removeBoxes() {
  let boxes = document.querySelectorAll(".image_container");
  if (boxes.length >= 0) {
    boxes.forEach((box) => {
      box.remove();
    });
  }
}
