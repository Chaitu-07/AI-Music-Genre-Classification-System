/*=====================================================
    AI MUSIC CLASSIFIER
    MAIN.JS
    Shared Across All Pages
=====================================================*/

// ===========================================
// Page Loaded
// ===========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeAnimations();

    initializeLoading();

    initializeRipple();

});


// ===========================================
// Fade Animation
// ===========================================

function initializeAnimations(){

    const fadeElements = document.querySelectorAll(

        ".fade-in"

    );

    fadeElements.forEach((element,index)=>{

        element.style.opacity = "0";

        element.style.transform = "translateY(30px)";

        setTimeout(()=>{

            element.style.opacity = "1";

            element.style.transform = "translateY(0)";

            element.style.transition =

                "all .7s ease";

        },150*index);

    });

}


// ===========================================
// Loading Overlay
// ===========================================

const loadingOverlay = document.createElement("div");

loadingOverlay.className = "loading";

loadingOverlay.innerHTML = `

<div class="spinner"></div>

<h2>Analyzing Audio...</h2>

<p>Please wait while AI predicts the genre.</p>

`;

document.body.appendChild(

    loadingOverlay

);


function showLoading(){

    loadingOverlay.classList.add("show");

}


function hideLoading(){

    loadingOverlay.classList.remove("show");

}


// ===========================================
// Toast Notification
// ===========================================

function showToast(

    message,

    type="info"

){

    const toast =

        document.createElement("div");

    toast.className="toast";

    toast.innerHTML=message;

    toast.style.position="fixed";

    toast.style.top="30px";

    toast.style.right="30px";

    toast.style.zIndex="9999";

    toast.style.padding="15px 25px";

    toast.style.borderRadius="12px";

    toast.style.color="white";

    toast.style.fontWeight="600";

    toast.style.opacity="0";

    toast.style.transition=".4s";

    toast.style.transform="translateX(80px)";

    if(type==="success"){

        toast.style.background="#22c55e";

    }

    else if(type==="error"){

        toast.style.background="#ef4444";

    }

    else{

        toast.style.background="#3b82f6";

    }

    document.body.appendChild(

        toast

    );

    requestAnimationFrame(()=>{

        toast.style.opacity="1";

        toast.style.transform="translateX(0)";

    });

    setTimeout(()=>{

        toast.style.opacity="0";

        toast.style.transform="translateX(80px)";

        setTimeout(()=>{

            toast.remove();

        },400);

    },3000);

}


// ===========================================
// Ripple Effect
// ===========================================

function initializeRipple(){

    document

    .querySelectorAll(

        ".predict-btn"

    )

    .forEach(button=>{

        button.addEventListener(

            "click",

            function(e){

                const ripple=

                    document.createElement(

                        "span"

                    );

                ripple.className=

                    "ripple";

                ripple.style.left=

                    e.offsetX+"px";

                ripple.style.top=

                    e.offsetY+"px";

                this.appendChild(

                    ripple

                );

                setTimeout(()=>{

                    ripple.remove();

                },600);

            }

        );

    });

}


// ===========================================
// Console
// ===========================================

console.log(

    "main.js Loaded"

);