let soundlist = ["crash", "kick-bass", "snare", "tom-1", "tom-2", "tom-3", "tom-4"];


for(let i = 0; i < document.querySelectorAll(".drum").length; i++){
    document.querySelectorAll("button")[i].addEventListener("click", 
        function (){

            var sndPath = "sounds/" + soundlist[i] + ".mp3"
            console.log("constructed path: " + sndPath);
            var snd = new Audio(sndPath);
            snd.play();

            // alert("I got clicked!");
        }
    );
    

}




