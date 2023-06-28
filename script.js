console.log("welcome");
let songIndex = 0;
let audioElement = new Audio('data/1.mp3');


let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let song = [
    {songname:"The Adventures of Mr Hardy", filepath:"data/1.mp3", cover:"data/1.jpg"},
    {songname:"Black Box", filepath:"data/2.mp3", cover:"data/2.jpg"},
    {songname:"When you are not with me", filepath:"data/3.mp3", cover:"data/3.jpg"},
    {songname:"We Wish You A Merry Christmas", filepath:"data/4.mp3", cover:"data/4.jpg"},
    {songname:"Remembering you", filepath:"data/5.mp3", cover:"data/5.jpg"},
    {songname:"Old Story From Scotland", filepath:"data/6.mp3", cover:"data/6.jpg"}
]

// audioElement.play();



// play/pause
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        masterSongName.innerText = song[songIndex].songname;
        gif.style.opacity=1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

// listen to event
audioElement.addEventListener('timeupdate',()=>{
  

    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    
    myprogressbar.value = progress;
})

myprogressbar.addEventListener('change',()=>{
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100;
})


songItem.forEach((element,i) => {
    console.log(element,i);
    element.getElementsByTagName('img')[0].src = song[i].cover; 
    element.getElementsByClassName('songName')[0].innerText = song[i].songname;
    // element.getElementsByClassName("timestamp")[0].innerText = song[i].time;
});

// paly and pause

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach( (element)=>{
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach( (element)=>{
    element.addEventListener('click', (e)=>{
        
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `data/${songIndex+1}.mp3`;
        masterSongName.innerText = song[songIndex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        
    })
})

document.getElementById('next') .addEventListener('click', ()=>{
    if(songIndex >= 5)
    {
        songIndex = 0;
    }
    else {
             songIndex += 1;
         }
         audioElement.src = `data/${songIndex+1}.mp3`;
         masterSongName.innerText = song[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous') .addEventListener('click', ()=>{
    if(songIndex <= 0)
    {
        songIndex = 5;
    }
    else {
             songIndex -= 1;
         }
    audioElement.src = `data/${songIndex+1}.mp3`;
    masterSongName.innerText = song[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})