/* =====================================================
   AI MUSIC GENRE CLASSIFIER
   SCRIPT.JS
   PART - 1
=====================================================*/

// =====================================================
// DOM ELEMENTS
// =====================================================

const uploadForm = document.getElementById("uploadForm");

const fileInput = document.getElementById("audio");

const dropArea = document.getElementById("dropArea");

const fileName = document.getElementById("fileName");

const audioPlayer = document.getElementById("audioPlayer");


// =====================================================
// SUPPORTED FILE TYPES
// =====================================================

const allowedExtensions = [

    "au",

    "wav"

];


// =====================================================
// SHOW FILE
// =====================================================

function displayFile(file){

    fileName.textContent = file.name;

    fileName.classList.add("file-selected");

}


// =====================================================
// AUDIO PREVIEW
// =====================================================

function previewAudio(file){

    const url = URL.createObjectURL(file);

    audioPlayer.src = url;

    audioPlayer.style.display = "block";

}


// =====================================================
// FILE VALIDATION
// =====================================================

function validateFile(file){

    const extension =

        file.name

        .split(".")

        .pop()

        .toLowerCase();

    if(!allowedExtensions.includes(extension)){

        alert(

            "Please upload a .au or .wav audio file."

        );

        return false;

    }

    return true;

}


// =====================================================
// HANDLE FILE
// =====================================================

function handleFile(file){

    if(!validateFile(file)){

        return;

    }

    displayFile(file);

    previewAudio(file);

}


// =====================================================
// FILE BROWSER
// =====================================================

fileInput.addEventListener(

    "change",

    function(){

        if(this.files.length===0){

            return;

        }

        handleFile(this.files[0]);

    }

);


// =====================================================
// DRAG EVENTS
// =====================================================

dropArea.addEventListener(

    "dragover",

    function(event){

        event.preventDefault();

        dropArea.classList.add("dragging");

    }

);

dropArea.addEventListener(

    "dragleave",

    function(){

        dropArea.classList.remove("dragging");

    }

);

dropArea.addEventListener(

    "drop",

    function(event){

        event.preventDefault();

        dropArea.classList.remove("dragging");

        if(event.dataTransfer.files.length===0){

            return;

        }

        const file = event.dataTransfer.files[0];

        handleFile(file);

        fileInput.files = event.dataTransfer.files;

    }

);


// =====================================================
// CLICK ANYWHERE TO OPEN FILE DIALOG
// =====================================================

dropArea.addEventListener(

    "click",

    function(){

        fileInput.click();

    }

);


// =====================================================
// PAGE ANIMATION
// =====================================================

window.addEventListener(

    "load",

    function(){

        document

            .querySelectorAll(

                ".hero, .upload-section, .features"

            )

            .forEach(function(section){

                section.classList.add("fade-in");

            });

    }

);


// =====================================================
// DEBUG
// =====================================================

console.log(

    "AI Music Genre Classifier Ready"

);

/* =====================================================
   PART - 2
   LOADING + FORM HANDLING + UI EFFECTS
=====================================================*/

// =====================================================
// CREATE LOADING SCREEN
// =====================================================

const loading = document.createElement("div");

loading.className = "loading";

loading.innerHTML = `

<div class="spinner"></div>

<h2>Analyzing Music...</h2>

<p>Please wait while our AI predicts the genre.</p>

<div class="wave">

<span></span>

<span></span>

<span></span>

<span></span>

<span></span>

</div>

`;

document.body.appendChild(loading);


// =====================================================
// SHOW LOADING
// =====================================================

function showLoading(){

    loading.classList.add("show");

}


// =====================================================
// HIDE LOADING
// =====================================================

function hideLoading(){

    loading.classList.remove("show");

}


// =====================================================
// FORM SUBMIT
// =====================================================

uploadForm.addEventListener(

    "submit",

    function(event){

        if(fileInput.files.length===0){

            event.preventDefault();

            alert("Please choose an audio file.");

            return;

        }

        showLoading();

    }

);


// =====================================================
// PREVENT MULTIPLE SUBMITS
// =====================================================

const predictButton = document.querySelector(".predict-btn");

uploadForm.addEventListener(

    "submit",

    function(){

        predictButton.disabled = true;

        predictButton.innerHTML =

        '<i class="fa-solid fa-spinner fa-spin"></i> Predicting...';

    }

);


// =====================================================
// HIDE LOADING AFTER PAGE LOAD
// =====================================================

window.addEventListener(

    "pageshow",

    function(){

        hideLoading();

        if(predictButton){

            predictButton.disabled = false;

            predictButton.innerHTML =

            '<i class="fa-solid fa-wand-magic-sparkles"></i> Predict Genre';

        }

    }

);


// =====================================================
// SMOOTH SCROLL TO RESULT
// =====================================================

window.addEventListener(

    "load",

    function(){

        const result =

        document.querySelector(".result-section");

        if(result){

            setTimeout(function(){

                result.scrollIntoView({

                    behavior:"smooth",

                    block:"center"

                });

            },400);

        }

    }

);


// =====================================================
// ANIMATE PROGRESS BARS
// =====================================================

function animateProgressBars(){

    document

    .querySelectorAll(".progress-bar")

    .forEach(function(bar){

        const value =

        bar.dataset.value || 0;

        setTimeout(function(){

            bar.style.width =

            value + "%";

        },300);

    });

    document

    .querySelectorAll(".small-bar")

    .forEach(function(bar){

        const value =

        bar.dataset.value || 0;

        setTimeout(function(){

            bar.style.width =

            value + "%";

        },500);

    });

}

animateProgressBars();


// =====================================================
// CARD ANIMATION
// =====================================================

document

.querySelectorAll(

".feature-card"

)

.forEach(function(card){

    card.addEventListener(

        "mouseenter",

        function(){

            card.classList.add("glow");

        }

    );

    card.addEventListener(

        "mouseleave",

        function(){

            card.classList.remove("glow");

        }

    );

});


// =====================================================
// RESET AUDIO PLAYER
// =====================================================

function resetPreview(){

    audioPlayer.pause();

    audioPlayer.removeAttribute("src");

    audioPlayer.load();

    audioPlayer.style.display="none";

    fileName.textContent="No file selected";

    fileName.classList.remove("file-selected");

}


// =====================================================
// OPTIONAL RESET BUTTON
// =====================================================

const resetButton = document.querySelector(".reset-btn");

if(resetButton){

    resetButton.addEventListener(

        "click",

        function(){

            fileInput.value="";

            resetPreview();

        }

    );

}


// =====================================================
// FILE SIZE DISPLAY
// =====================================================

function showFileSize(file){

    const kb = file.size / 1024;

    const mb = kb / 1024;

    let text;

    if(mb >= 1){

        text = mb.toFixed(2) + " MB";

    }

    else{

        text = kb.toFixed(1) + " KB";

    }

    console.log("File Size:", text);

}

/* =====================================================
   PART - 3
   TOASTS + PROGRESS + UX IMPROVEMENTS
=====================================================*/

// =====================================================
// CREATE TOAST CONTAINER
// =====================================================

const toastContainer = document.createElement("div");

toastContainer.id = "toastContainer";

toastContainer.style.position = "fixed";
toastContainer.style.top = "25px";
toastContainer.style.right = "25px";
toastContainer.style.zIndex = "99999";

document.body.appendChild(toastContainer);


// =====================================================
// SHOW TOAST
// =====================================================

function showToast(message,type="info"){

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.textContent = message;

    toast.style.background = "#1f2937";

    if(type==="success"){

        toast.style.borderLeft="5px solid #22c55e";

    }

    else if(type==="error"){

        toast.style.borderLeft="5px solid #ef4444";

    }

    else{

        toast.style.borderLeft="5px solid #3b82f6";

    }

    toast.style.color="#fff";

    toast.style.padding="14px 20px";

    toast.style.marginBottom="12px";

    toast.style.borderRadius="10px";

    toast.style.boxShadow="0 8px 25px rgba(0,0,0,.25)";

    toast.style.opacity="0";

    toast.style.transform="translateX(50px)";

    toast.style.transition=".35s";

    toastContainer.appendChild(toast);

    requestAnimationFrame(()=>{

        toast.style.opacity="1";

        toast.style.transform="translateX(0)";

    });

    setTimeout(()=>{

        toast.style.opacity="0";

        toast.style.transform="translateX(50px)";

        setTimeout(()=>{

            toast.remove();

        },350);

    },3000);

}


// =====================================================
// IMPROVED VALIDATION
// =====================================================

function validateFile(file){

    const extension =

        file.name

        .split(".")

        .pop()

        .toLowerCase();

    if(!allowedExtensions.includes(extension)){

        showToast(

            "Only .AU and .WAV files are supported.",

            "error"

        );

        return false;

    }

    return true;

}


// =====================================================
// DRAG ENTER
// =====================================================

dropArea.addEventListener(

    "dragenter",

    function(){

        dropArea.classList.add("dragging");

    }

);


// =====================================================
// DRAG LEAVE
// =====================================================

dropArea.addEventListener(

    "dragleave",

    function(){

        dropArea.classList.remove("dragging");

    }

);


// =====================================================
// SUCCESS MESSAGE
// =====================================================

fileInput.addEventListener(

    "change",

    function(){

        if(this.files.length){

            showToast(

                "Audio file selected successfully.",

                "success"

            );

        }

    }

);


// =====================================================
// FILE TYPE DISPLAY
// =====================================================

function showFileInformation(file){

    console.log("File Name :",file.name);

    console.log("Extension :",file.name.split(".").pop());

    console.log("Size :",file.size);

}


// =====================================================
// UPDATE HANDLE FILE
// =====================================================

const oldHandleFile = handleFile;

handleFile = function(file){

    oldHandleFile(file);

    showFileInformation(file);

};


// =====================================================
// UPLOAD PROGRESS
// =====================================================

function fakeUploadProgress(){

    let progress = 0;

    const interval = setInterval(()=>{

        progress+=5;

        console.log(

            "Uploading...",

            progress+"%"

        );

        if(progress>=100){

            clearInterval(interval);

        }

    },70);

}


// =====================================================
// FORM SUBMIT
// =====================================================

uploadForm.addEventListener(

    "submit",

    function(){

        fakeUploadProgress();

    }

);


// =====================================================
// DOUBLE CLICK RESET
// =====================================================

dropArea.addEventListener(

    "dblclick",

    function(){

        fileInput.value="";

        resetPreview();

        showToast(

            "Selection cleared.",

            "info"

        );

    }

);


// =====================================================
// ESC KEY
// =====================================================

document.addEventListener(

    "keydown",

    function(e){

        if(e.key==="Escape"){

            fileInput.value="";

            resetPreview();

        }

    }

);


// =====================================================
// ENTER KEY
// =====================================================

document.addEventListener(

    "keydown",

    function(e){

        if(

            e.key==="Enter"

            &&

            document.activeElement!==fileInput

        ){

            if(fileInput.files.length){

                uploadForm.requestSubmit();

            }

        }

    }

);


// =====================================================
// AUDIO EVENTS
// =====================================================

audioPlayer.addEventListener(

    "play",

    function(){

        console.log("Playing Audio");

    }

);

audioPlayer.addEventListener(

    "pause",

    function(){

        console.log("Paused");

    }

);

audioPlayer.addEventListener(

    "ended",

    function(){

        console.log("Finished");

    }

);


// =====================================================
// HOVER EFFECT
// =====================================================

dropArea.addEventListener(

    "mouseenter",

    function(){

        dropArea.style.transform="scale(1.01)";

    }

);

dropArea.addEventListener(

    "mouseleave",

    function(){

        dropArea.style.transform="scale(1)";

    }

);

/* =====================================================
   PART - 4
   FINAL POLISH + BACKEND READY
=====================================================*/

// =====================================================
// RESULT CARD ANIMATION
// =====================================================

window.addEventListener("load", function () {

    const resultCard = document.querySelector(".result-card");

    if(resultCard){

        resultCard.classList.add("slide-up");
        resultCard.classList.add("success");

    }

});

// =====================================================
// ANIMATE CONFIDENCE BAR
// =====================================================

function animateConfidenceBar(){

    const progress = document.querySelector(".progress-bar");

    if(!progress){

        return;

    }

    const value = progress.dataset.value || 0;

    progress.style.width = "0%";

    setTimeout(function(){

        progress.style.width = value + "%";

    },300);

}

animateConfidenceBar();

// =====================================================
// TOP-3 PROGRESS BARS
// =====================================================

function animateTopBars(){

    const bars = document.querySelectorAll(".small-bar");

    bars.forEach(function(bar,index){

        const value = bar.dataset.value || 0;

        setTimeout(function(){

            bar.style.width = value + "%";

        },300 + index*200);

    });

}

animateTopBars();

// =====================================================
// AUTO HIDE TOASTS
// =====================================================

setInterval(function(){

    document.querySelectorAll(".toast").forEach(function(toast){

        if(toast.style.opacity==="0"){

            toast.remove();

        }

    });

},1000);

// =====================================================
// FILE DRAG COUNTER
// =====================================================

let dragCounter = 0;

dropArea.addEventListener("dragenter",function(){

    dragCounter++;

    dropArea.classList.add("dragging");

});

dropArea.addEventListener("dragleave",function(){

    dragCounter--;

    if(dragCounter<=0){

        dropArea.classList.remove("dragging");

        dragCounter=0;

    }

});

dropArea.addEventListener("drop",function(){

    dragCounter=0;

    dropArea.classList.remove("dragging");

});

// =====================================================
// REMOVE OBJECT URL
// =====================================================

audioPlayer.addEventListener("loadeddata",function(){

    console.log("Audio Loaded");

});

audioPlayer.addEventListener("emptied",function(){

    console.log("Preview Cleared");

});

// =====================================================
// WINDOW FOCUS
// =====================================================

window.addEventListener("focus",function(){

    if(document.hidden===false){

        console.log("Application Active");

    }

});

// =====================================================
// PAGE VISIBILITY
// =====================================================

document.addEventListener(

    "visibilitychange",

    function(){

        if(document.hidden){

            console.log("Page Hidden");

        }

        else{

            console.log("Page Visible");

        }

    }

);

// =====================================================
// PREPARE FOR FUTURE CONFIDENCE API
// =====================================================

function updatePrediction(data){

    /*
    Expected format

    {

        genre:"Rock",

        confidence:87.32,

        top_predictions:[

            {genre:"Rock",confidence:87.32},

            {genre:"Metal",confidence:8.14},

            {genre:"Blues",confidence:4.54}

        ]

    }

    */

    console.log(data);

}

// =====================================================
// RESET FORM AFTER SUCCESS
// =====================================================

function clearSelection(){

    fileInput.value="";

    resetPreview();

}

window.addEventListener(

    "pageshow",

    function(){

        clearSelection();

    }

);

// =====================================================
// BUTTON RIPPLE EFFECT
// =====================================================

document.querySelectorAll("button").forEach(function(btn){

    btn.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        ripple.className="ripple";

        ripple.style.left=e.offsetX+"px";

        ripple.style.top=e.offsetY+"px";

        btn.appendChild(ripple);

        setTimeout(function(){

            ripple.remove();

        },600);

    });

});

// =====================================================
// FEATURE CARD STAGGER ANIMATION
// =====================================================

const featureCards=document.querySelectorAll(".feature-card");

featureCards.forEach(function(card,index){

    card.style.opacity="0";

    card.style.transform="translateY(40px)";

    setTimeout(function(){

        card.style.opacity="1";

        card.style.transform="translateY(0)";

    },300+(index*180));

});

// =====================================================
// BACKEND STATUS
// =====================================================

console.log("Flask Backend Ready");

// =====================================================
// END
// =====================================================

console.log("Music Genre Classifier Loaded Successfully");