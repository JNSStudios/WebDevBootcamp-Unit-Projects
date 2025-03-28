for(let i = 0; i < document.querySelectorAll(".drum").length; i++){
    document.querySelectorAll("button")[i].addEventListener("click", 
        function (){

             playSound(this.innerHTML);
             buttonAnim(this.innerHTML); // pass the innerHTML of the button that was clicked to the buttonAnim function

            // alert("I got clicked!");
        }
    );
    

}

document.addEventListener("keydown", 
    function(event){
        playSound(event.key);
        buttonAnim(event.key); 
        
    }
);

function playSound(keyPressed){

    let inputDict = { // dictionary to map keys to indices
        "w": "crash",
        "a": "kick-bass",
        "s": "snare",
        "d": "tom-1", 
        "j": "tom-2", 
        "k": "tom-3", 
        "l": "tom-4"  
    };

    let soundName = inputDict[keyPressed]; // get key index from dictionary

    // if the key pressed is not in the dictionary, exit the function
    if (soundName === undefined){
        console.log("Sound not in dictionary");
        return; // exit the function
    }

    var sndPath = "sounds/" + soundName + ".mp3"
    console.log("constructed path: " + sndPath);
    var snd = new Audio(sndPath);
    snd.play();
}


function buttonAnim(currentKey) {

    var activeButton = document.querySelector("." + currentKey); // get the button that corresponds to the key pressed
    activeButton.classList.add("pressed"); // add the "pressed" class to the button that was clicked or key pressed
    setTimeout(function () {
        activeButton.classList.remove("pressed");

    },
    100 // set a timeout to remove the "pressed" class after 100 milliseconds
    );

}