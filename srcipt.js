// Getting elements using DOM
let masterplay = document.getElementById("masterplay");
let seekbar = document.getElementById("seekbar");
let songname = document.getElementById("songname");
let songplaybtn = Array.from(document.getElementsByClassName("songplay-btn"));
let gif = document.getElementById("gif");
let previous = document.getElementById("previous");
let next = document.getElementById("next");

// Initializing variables
let audioElement = new Audio("\\1.mp3");
let playing_song;
let songIndex = 0;
let progress = 0;
let src;
let songs = [
  {
    songname: "Song Name 1 - Artist Name",
    filePath: "\\1.mp3",
    coverPath: "\\1.jpg",
  },
  {
    songname: "Song Name 2 - Artist Name",
    filePath: "\\2.mp3",
    coverPath: "\\2.jpg",
  },
  {
    songname: "Song Name 3 - Artist Name",
    filePath: "\\3.mp3",
    coverPath: "\\3.jpg",
  },
  {
    songname: "Song Name 4 - Artist Name",
    filePath: "\\4.mp3",
    coverPath: "\\4.jpg",
  },
  {
    songname: "Song Name 5 - Artist Name",
    filePath: "\\5.mp3",
    coverPath: "\\5.jpg",
  },
  {
    songname: "Song Name 6 - Artist Name",
    filePath: "\\6.mp3",
    coverPath: "\\6.jpg",
  },
  {
    songname: "Song Name 7 - Artist Name",
    filePath: "\\7.mp3",
    coverPath: "\\7.jpg",
  },
  {
    songname: "Song Name 8 - Artist Name",
    filePath: "\\8.mp3",
    coverPath: "\\8.jpg",
  },
  {
    songname: "Song Name 9 - Artist Name",
    filePath: "\\9.mp3",
    coverPath: "\\9.jpg",
  },
];

// adding song name
let coverimage = Array.from(document.getElementsByClassName("song1"));
coverimage.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByTagName("span")[0].innerText = songs[i].songname;
});
// Listening Events

// Play-Pause button event
masterplay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterplay.classList.remove("fa-circle-play");
    masterplay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    songname.innerText = songs[songIndex].songname;
    seekbar_update()
    songplaybtn.forEach((element) => {
      if (element.id == songIndex) {
        element.classList.remove("fa-play");
        element.classList.add("fa-pause");
      }
    });
  }
  else {
    audioElement.pause();
    masterplay.classList.remove("fa-circle-pause");
    masterplay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
    makeallplays();
  }
});

// previous button event
previous.addEventListener("click", () => {
  audioElement.pause();
  makeallplays()
  if (songIndex <= 0) {
    songIndex = 8;
    audioElement = new Audio(`${songIndex}.mp3`);
    audioElement.play();
    masterplay.classList.remove("fa-circle-play");
    masterplay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    seekbar_update()
    playing_song = document.getElementById(`${songIndex}`)
    playing_song.classList.remove("fa-play")
    playing_song.classList.add("fa-pause")
  } else {
    songIndex = songIndex - 1;
    audioElement = new Audio(`${songIndex}.mp3`);
    audioElement.play();
    masterplay.classList.remove("fa-circle-play");
    masterplay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    seekbar_update()
    playing_song = document.getElementById(`${songIndex}`)
    playing_song.classList.remove("fa-play")
    playing_song.classList.add("fa-pause")
  }
});
// next button event
next.addEventListener("click", () => {
  audioElement.pause();
  makeallplays()
  if (songIndex >= 9) {
    songIndex = 0;
    audioElement = new Audio(`${songIndex}.mp3`);
    audioElement.play();
    masterplay.classList.remove("fa-circle-play");
    masterplay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    seekbar.value = 0;
    seekbar_update()
    playing_song = document.getElementById(`${songIndex}`)
    playing_song.classList.remove("fa-play")
    playing_song.classList.add("fa-pause")
  } else {
    songIndex = songIndex + 1;
    audioElement = new Audio(`${songIndex}.mp3`);
    audioElement.play();
    masterplay.classList.remove("fa-circle-play");
    masterplay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    seekbar.value = 0;
    seekbar_update()
    playing_song = document.getElementById(`${songIndex}`)
    playing_song.classList.remove("fa-play")
    playing_song.classList.add("fa-pause")
  }
});

// playing songs from display button
function makeallplays() {
  songplaybtn.forEach((e) => {
    e.classList.add("fa-play");
    audioElement.pause();
  });
}
songplaybtn.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-play")) {
      makeallplays();
      songIndex = parseInt(e.target.id);
      audioElement = new Audio(`${songIndex}.mp3`);
      audioElement.play();
      seekbar.value = 0;
      seekbar_update();
      e.target.classList.remove("fa-play");
      e.target.classList.add("fa-pause");
      masterplay.classList.remove("fa-circle-play");
      masterplay.classList.add("fa-circle-pause");
      songname.innerText = songs[songIndex].songname;
      gif.style.opacity = 1;
    } else {
      audioElement.pause();
      e.target.classList.remove("fa-pause");
      e.target.classList.add("fa-play");
      masterplay.classList.remove("fa-circle-pause");
      masterplay.classList.add("fa-circle-play");
      gif.style.opacity = 0;
    }
  });
});

// Seekbar update with song
function seekbar_update() {
  audioElement.addEventListener("timeupdate", () => {
    progress = parseInt(
      (audioElement.currentTime / audioElement.duration) * 100
    );
    seekbar.value = progress;
  });

  // moving seekbar to forward or rewine the song
  seekbar.addEventListener("change", () => {
    audioElement.currentTime = parseInt(
      (audioElement.duration * seekbar.value) / 100
    );
  });
}


// Autoplay next song
let timerid = setInterval(() => {
  if (seekbar.value == 100){
    seekbar.value = 0
    seekbar_update()
    makeallplays();
    if(songIndex<=7){
      songIndex = songIndex + 1;
      audioElement = new Audio(`${songIndex}.mp3`);
      audioElement.play();
      playing_song = document.getElementById(`${songIndex}`)
      playing_song.classList.remove("fa-play")
      playing_song.classList.add("fa-pause")
    }
    else{
      songIndex = 0;
      audioElement = new Audio(`${songIndex}.mp3`);
      audioElement.play();
      playing_song = document.getElementById(`${songIndex}`)
      playing_song.classList.remove("fa-play")
      playing_song.classList.add("fa-pause")
    }
  }
}, 1000);
