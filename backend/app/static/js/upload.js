/*=====================================================
    AI MUSIC CLASSIFIER
    UPLOAD.JS
=====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const uploadForm = document.getElementById("uploadForm");
    const fileInput = document.getElementById("audio");
    const dropArea = document.getElementById("dropArea");
    const fileName = document.getElementById("fileName");
    const audioPlayer = document.getElementById("audioPlayer");

    // If this isn't the upload page, stop here.
    if (!uploadForm || !fileInput || !dropArea) {
        return;
    }

    const allowedExtensions = ["au", "wav"];

    // ==========================================
    // Validate File
    // ==========================================

    function validateFile(file){

        const extension = file.name
            .split(".")
            .pop()
            .toLowerCase();

        if(!allowedExtensions.includes(extension)){

            showToast(
                "Only .au and .wav files are allowed.",
                "error"
            );

            return false;
        }

        return true;
    }

    // ==========================================
    // Preview
    // ==========================================

    function preview(file){

        fileName.textContent = file.name;

        if(audioPlayer){

            audioPlayer.src =
                URL.createObjectURL(file);

            audioPlayer.style.display="block";
        }

    }

    // ==========================================
    // Handle File
    // ==========================================

    function handleFile(file){

        if(!validateFile(file))
            return;

        preview(file);

        console.log(file.name);

    }

    // ==========================================
    // File Select
    // ==========================================

    fileInput.addEventListener(

        "change",

        function(){

            if(this.files.length){

                handleFile(this.files[0]);

            }

        }

    );

    // ==========================================
    // Click Upload Area
    // ==========================================

    dropArea.addEventListener(

        "click",

        function(){

            fileInput.click();

        }

    );

    // ==========================================
    // Drag Over
    // ==========================================

    dropArea.addEventListener(

        "dragover",

        function(e){

            e.preventDefault();

            dropArea.classList.add("dragging");

        }

    );

    // ==========================================
    // Drag Leave
    // ==========================================

    dropArea.addEventListener(

        "dragleave",

        function(){

            dropArea.classList.remove("dragging");

        }

    );

    // ==========================================
    // Drop
    // ==========================================

    dropArea.addEventListener(

        "drop",

        function(e){

            e.preventDefault();

            dropArea.classList.remove("dragging");

            if(!e.dataTransfer.files.length)
                return;

            fileInput.files =
                e.dataTransfer.files;

            handleFile(
                e.dataTransfer.files[0]
            );

        }

    );

    // ==========================================
    // Submit
    // ==========================================

    uploadForm.addEventListener(

        "submit",

        function(e){

            if(fileInput.files.length===0){

                e.preventDefault();

                showToast(
                    "Please select an audio file.",
                    "error"
                );

                return;

            }

            showLoading();

        }

    );

    console.log("upload.js Loaded");

});