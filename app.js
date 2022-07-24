const container = document.querySelector('.container');
const music_img = document.querySelector('#music-img');
const audio = document.querySelector('#audio');
const music_title = document.querySelector('.title');
const music_singer = document.querySelector('.singer');
const previus = document.querySelector('#prev');
const play = document.querySelector('#play');
const next = document.querySelector('#next');
const current = document.querySelector('#current-time');
const totalTime = document.querySelector('#total-time');
const slider = document.querySelector('#slider');
const volumeIcon = document.querySelector('.volume i')
const volumeBar = document.getElementById('volume-bar')


const player = new Player(musiclist);

window.addEventListener('load', () =>{
    let music = player.getMusic();
    console.log(music)
    displayMusic(music)
    displayMusicList(player.musiclist)
    for(i of mcslist.children){
        i.classList.remove('nowPlaying')
    }
    document.querySelector(`#li-music-${player.musicIndex}`).classList.add('nowPlaying')
} )

let displayMusic = (music) => {
    music_title.textContent = music.getname()
    music_img.src = 'img/' + music.img;
    music_singer.textContent = music.singer;
    audio.src = 'mp3/' + music.file
}
// play-pause button
// play.addEventListener('click', 
 const playMsc = ()=>{
    audio.play()
    const isMusicPlay = container.classList.contains('playing');
    isMusicPlay ? pauseMusic() : playMusic()
    }
function playMusic() {
        container.classList.add('playing');
        audio.play()
        play.querySelector('i').classList = 'fa-solid fa-pause'

    }
function pauseMusic() {
        container.classList.remove('playing')
        play.querySelector('i').classList = 'fa-solid fa-play'
        
        audio.pause()
    }
    

// next button
next.addEventListener('click', () =>{
    player.next()
    displayMusic(player.getMusic())
    playMusic()
    for(i of mcslist.children){
        i.classList.remove('nowPlaying')
    }
    document.querySelector(`#li-music-${player.musicIndex}`).classList.add('nowPlaying')
})
// prev button
previus.addEventListener('click', () =>{
    player.previus()
    displayMusic(player.getMusic())
    playMusic()
    for(i of mcslist.children){
        i.classList.remove('nowPlaying')
    }
    document.querySelector(`#li-music-${player.musicIndex}`).classList.add('nowPlaying')
})

// audio second
const calculatetime = (time) =>{
    let minute =Math.floor(time / 60)
    let second = Math.floor(time%60)
    let updatedtime = second<10 ? `0${second}` : second;
    return `${minute}:${updatedtime}`
}

audio.addEventListener('loadedmetadata', () =>{
    totalTime.textContent = calculatetime(audio.duration)
    slider.max = Math.floor(audio.duration) 
})

audio.addEventListener('timeupdate', () =>{
    slider.value = Math.floor(audio.currentTime);
    current.textContent = calculatetime(slider.value)
})

slider.addEventListener('input', () =>{
    current.textContent = calculatetime(slider.value);
    audio.currentTime = slider.value
})

// volume
let muted = false
volumeIcon.addEventListener('click', () => {
    muted ? unmute() : mute();
})
const unmute = () =>{
    volumeIcon.classList = 'fa-solid fa-volume-high'  
    muted = false
    volumeBar.value = 100;
    audio.muted = false
}
const mute = () => {
    volumeIcon.classList = 'fa-solid fa-volume-xmark'    
    
    
    muted = true
    audio.muted = true
    volumeBar.value = 0;
}

// volumeslider
volumeBar.addEventListener('input', (e) =>{
    let value = e.target.value;
    audio.volume = value/100;
    if (value == 0){
        volumeIcon.classList = 'fa-solid fa-volume-xmark'    
        muted = true
        audio.muted = true
    }else{
        volumeIcon.classList = 'fa-solid fa-volume-high'
        muted = false
        audio.muted = false
    }
})

// music list func

const displayMusicList = (list) => {
    let musiclist;

    for (let i in list){
        musiclist = `
        <li li-index='${i}' id='li-music-${i}' onclick='selectecMusic(this)' class="list-group-item d-flex justify-content-between align-items-center">
            <span>${list[i].getname()}</span>
            <span id='music-${i}' class="badge bg-primary rounded-pill"></span>
            <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
        </li> 
        `
        document.getElementById('music-list').insertAdjacentHTML('beforeend', musiclist);

    let audioTag = document.querySelector(`.music-${i}`)
    audioTag.addEventListener('loadeddata',() =>{
        document.querySelector(`#music-${i}`).textContent = calculatetime(audioTag.duration)
    } )
    }
}

// selected musc from music list
const mcslist = document.getElementById('music-list')
const selectecMusic = (msc) =>{
    const index = msc.getAttribute('li-index')
    player.musicIndex = index
    displayMusic(player.getMusic())
    for(i of mcslist.children){
        i.classList.remove('nowPlaying')
    }
    document.querySelector(`#li-music-${index}`).classList.add('nowPlaying')
    if(container.classList.contains('playing')){
        audio.play()
    }else{
       play.click() 
    }
    
}

// event on end of music

audio.addEventListener('ended', ()=>{
    next.click()
})