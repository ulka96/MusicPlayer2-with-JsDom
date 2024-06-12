const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const songEl = document.getElementById("song");

const imageEl = document.getElementById("image");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");

const progressContainerEl = document.getElementById("progress-container");
const progressEl = document.getElementById("progress");

const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const progressContainerVolumeEl = document.getElementById("progress-container-volume");
const progressVolumeEl = document.getElementById("progress-volume");

// Data

const fakeData = [
{
    name: "the_pianist_soundtrack_-_nocturne",
    artist: "Frédéric Chopin",
    title: "The_Pianist_Soundtrack_-_Nocturne",
    duration: "4:27",
},

{     
name: "skyfall",
artist: "Adele",
title: "Skyfall",
duration: "4:46",

},

{     
name: "summer Moved On",
 artist: "A-HA",
title: "Summer Moved On",
duration: "4:37",

},

{     
name: "englishman_in_New_York",
artist: "Sting",
title: "Englishman_in_New_York",
duration: "4:25",

},

{     
name: "intizar",
 artist: "Elmira Rahimova",
title: "Intizar",
duration: "5:23",

},


];

let isPlaying = false;
let songIndex = 0;

durationEl.textContent = `${fakeData[songIndex].duration}`;

const playSong = () => {
    songEl.play();
    isPlaying = true;
    playBtn.innerHTML = '<img src="./assets/pause-solid.svg" alt="" class="w-12 h-12 bg-white rounded-[50%]">'
};

const pauseSong = () => {
    songEl.pause();
    isPlaying = false;
    playBtn.innerHTML = '<img src="./assets/Vector (1).png" alt="" class="w-12 h-12">'
};

playBtn.addEventListener("click", () => {
    // if(isPlaying) {                       //ya bele veririk ya da ? : ile
    //     pauseSong();
    // }
    // else {
    //     playSong();
    // }

    isPlaying ? pauseSong() : playSong();
});

songEl.addEventListener("timeupdate", (event) => {
// console.dir(event.target);

// const duration = songEl.duration;
// const currentTime = songEl.currentTime;

// const{duration, currentTime} = songEl;       //yuxaridaki 2 setrin yerine object distraction-la bele yaziriq ve
                                                //bele yazanda yuxarida function yazmaya da bilirik (event) olur
const {duration, currentTime} = event.target;                     //arrow function olur
if(!duration) return;                  //duration NaN olmasin deye
// console.log(duration, currentTime);

const durationMinute = Math.floor(duration / 60);  //233/60= 3.88 // 3
const durationSecond = Math.floor(duration % 60);    //233%60 = 53.11 // 53
//    console.log(durationMinute, durationSecond);

const currentTimeMinute = Math.floor(currentTime / 60);  //2.76443/60
const currentTimeSecond = Math.floor(currentTime % 60);    //2.76443 % 60

durationEl.textContent = `${durationMinute} : ${String(durationSecond).padStart(2,0)}`
currentTimeEl.textContent = `${currentTimeMinute} : ${String(currentTimeSecond).padStart(2,0)}`

progressEl.style.width = `${(currentTime / duration) * 100}%`;

// console.log((currentTime / duration) * 100);

});

nextBtn.addEventListener("click", () => {
songIndex < fakeData.length - 1 ? songIndex++ : (songIndex = 0);
// console.log(fakeData[songIndex].name);
displaySong();
playSong();

});

prevBtn.addEventListener("click", () => {
songIndex > 0 ? songIndex-- : (songIndex = fakeData.length - 1);
console.log(songIndex);
displaySong();
playSong();

 });

 const displaySong = () => {
    songEl.src = `./songs/${fakeData[songIndex].name}.mp3`;
    imageEl.src = `./assets/${fakeData[songIndex].name}.jpeg`;
    artistEl.textContent = `${fakeData[songIndex].artist}`;
    titleEl.textContent = `${fakeData[songIndex].title}`;
 };

 progressContainerEl.addEventListener("click", function (event) {
//   console.log(event.target.getBoundingClientRect());      //progressin widthini, heightini, hundurluyunu gosterir
//   console.log(event.offsetX, event.offsetY);          //kliklediyimiz hissenin width ve height gosterir
 const {offsetX: clicked} = event;
 const {width} = this.getBoundingClientRect();
 console.log(clicked, width);              //kliklediyimiz hisseni ve widthi gosterir

songEl.currentTime = (clicked / width) * songEl.duration;

 });

 const nextSong = () => {
songIndex < fakeData.length - 1 ? songIndex++ : (songIndex = 0);
displaySong();
playSong();
 };
 

 progressContainerVolumeEl.addEventListener("click", (event) => {
    const clickPercent = event.offsetX / event.target.offsetWidth;
    songEl.volume = clickPercent;  // Set the volume directly to the click percentage
    
    // Update the visual progress bar for volume
    progressVolumeEl.style.width = `${clickPercent * 100}%`;
});




 songEl.addEventListener("ended", nextSong);