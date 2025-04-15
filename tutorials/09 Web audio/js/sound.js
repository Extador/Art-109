

let song = document.querySelector("#song");
let playBtn = document.querySelector("#play-button");

playBtn.addEventListener('click', function () {
    song.play();
})

let pauseBtn = document.querySelector("#pause-button");

pauseBtn.addEventListener('click', function () {
    song.pause();

})

song.volume = 0.2