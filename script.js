const image = document.querySelector("#cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const background = document.getElementById("background");

const input = document.querySelector("input");
const songs = [
  {
    path:
      "m.mp3",
    displayName: "Happyness",
    artist: "سلنا گومز",
    cover:
      "sel.jpg",

  },
  {
    path:
      "Ariana_Grande_Positions_320 (1).mp3",
    displayName: "Positions",
    artist: "آریانا گرنده",
    cover:
      "arian.jpg",

  }, {
    path:
      "03.barbie_girl.mp3",
    displayName: "Barbie girl",
    artist: "باربی",
    cover:
      "barbie.jpeg",

  },
  {
    path:
      "aint.mp3",
    displayName: "I aint your mamma",
    artist: "جنیفر لوپز",
    cover:
      "jennif.png",

  },

  {
    path: "shakira.mp3",
    displayName: "WAKA WAKA",
    artist: "شکیرا",
    cover: "sh.webp",
  },
  {
    path:
      "rockabye.mp3",
    displayName: "Rockabye",
    artist: "آنه ماری",
    cover:
      "anne.jpg",

  },
  {
    path: "lush.mp3",
    displayName: "lush life",
    artist: "زارا لارسون",
    cover: "zarra1.jpg",
  },


];

function changevaloum(event) {

  let x = input.value
  
  if (x <= 9) {
    x = Number(".0" + x)
  }
  else if (9 < x <= 99) {
    x = Number("." + x)
  }



  music.volume = x

}

let isPlaying = false;

function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();

}


function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

playBtn.addEventListener("click", function () {
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})


function loadSong(s) {

  title.textContent = s.displayName;
  const duration = music.duration;
  artist.textContent = s.artist
  music.src = s.path;
  changeCover(s.cover);
}

function changeCover(cover) {
  image.classList.remove("active");
  setTimeout(() => {
    image.src = cover; background.src = cover;
    image.classList.add("active");
  },);

}


let songIndex = 0;


function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}



function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  let number = songs[songIndex]
  image.src = number.cover;
  background.src = number.cover;
  title.textContent = number.displayName;
  artist.textContent = number.artist;
  music.src = number.path;

  image.classList.remove("active");

  setTimeout(() => {

    image.classList.add("active");

  },);
  playSong();
}


loadSong(songs[songIndex]);


function updateProgressBar(e) {
  if (isPlaying) {
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;


    progress.style.width = (currentTime / duration) * 100 + "%";

  }
}


function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
}


prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
input.addEventListener("change", changevaloum);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
