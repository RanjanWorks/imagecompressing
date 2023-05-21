
      let range_container = document.querySelector(".range");
      let number_container = document.querySelector(".number");
      let slider = document.getElementById("sliderC");
      let sliderInput = document.getElementById("sliderInput");
      let link = document.getElementById("link");
      let img2 = document.getElementById("img2");
      let main_box = document.querySelector(".main_box");
      let upload_container = document.querySelector(".upload_container");
      let kbInput = document.getElementById("kbInput");
      var fileInput = document.getElementById("fileInput");
      var previewImage = document.getElementById("img1");
      var compressedImagePreview = document.getElementById("img2");
      var fileLabel = document.getElementById('fileLabel')
   
      var fileEname = document.querySelector("[data-name]");
      var percent = document.querySelector("[data-percent]");
      var modal = document.querySelector('dialog')
   var  allfiles = []
   
      var targetSizeInKB = 40;

      function changeType(e) {
        if (e.value === "kb") {
          hideShowRangeNumber("none", "flex");
        } else {
          hideShowRangeNumber("flex", "none");
        }
      }

      function hideShowRangeNumber(range, number) {
        range_container.style.display = range;
        number_container.style.display = number;
      }

      function compare() {
        let slideval = slider.value;
        img2.style.clipPath = `polygon(0 0,${slideval}% 0, ${slideval}% 100%, 0 100%)`;
      }

      function hideShowSelectMainBox(hide, show) {
        main_box.style.display = show;
        upload_container.style.display = hide;
      }

      sliderInput.addEventListener("input", () => {
        percent.innerHTML = sliderInput.value + "%";
        targetSizeInKB = 105 - sliderInput.value;
    
      });
   function kbSelect(e){
targetSizeInKB = e.value
   }

      function startCompressor() {
   
      removeBoxes()

     allfiles.forEach(file=>{
      callMainFunc(file,targetSizeInKB)
     })
      }
      function download() {
        link.click();
      }

      function labelClick(){
        fileLabel.click()
      }

     function addMore(){
        labelClick()
      }

      function downloadall(){
        document.querySelectorAll('.ranjan').forEach(a=>{
          a.click()
        })
      }
      function ImageNewSelect(){
        modal.close()
        labelClick()
      }
  