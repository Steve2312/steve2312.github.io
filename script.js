var audio = document.createElement("AUDIO");
var playing;
var playlist = [
    {
        name: "Crystal clear",
        artist: "Crystal Statues, Resonance, crescent, STM (prod.yandere)",
        song_file: "song1.mp3",
        url: "https://soundcloud.com/crystalstatues/crystal-clear"
    },
    {
        name: "there for you",
        artist: "Crystal Statues, 8485, STM (prod.yandere)",
        song_file: "song2.mp3",
        url: "https://soundcloud.com/crystalstatues/there4u"
    },
    {
        name: "fuxk'd up",
        artist: "kid sora, luvbackpack (neverquest)",
        song_file: "song3.mp3",
        url: "https://soundcloud.com/1kidsora/kid-sora-luvbackpack-fuxkd-up-prod-neverquest"
    },
    {
        name: "god's menu (𝒔𝒍𝒐𝒘𝒆𝒅 𝒏 𝒓𝒆𝒗𝒆𝒓𝒃)",
        artist: "stray kids",
        song_file: "song4.mp3",
        url: "https://www.youtube.com/watch?v=FeBwV8vheGQ"
    }
];

function change_volume() {
    var value = document.getElementById("volume_slider").value / 100;
    audio.volume = value;
}

function play_pause() {
    audio.paused ? play() : pause();
}

function pause() {
    audio.pause();
    document.getElementById("media_button").className = "fas fa-play";
}

function play() {
    audio.play();
    document.getElementById("media_button").className = "fas fa-pause";
}

function open_song_website() {
    var win = window.open(playlist[playing].url, '_blank');
    win.focus();
}

function previous() {
    var id = playing - 1;
    if (id < 0) id = playlist.length - 1;
    play_from_playlist(id);
    play();
}

function next() {
    var id = (playing + 1) % playlist.length;
    play_from_playlist(id);
    play();
}

function play_from_playlist(id) {
    playing = id;
    document.getElementById("song_name").textContent = playlist[id].name;
    document.getElementById("artist_name").textContent = playlist[id].artist;
    audio.src = playlist[id].song_file;
}

document.addEventListener('DOMContentLoaded', function () {
    // playing = Math.floor(Math.random() * playlist.length);
    playing = 3;
    audio.volume = 0.2;
    play_from_playlist(playing);
});

audio.addEventListener("ended", function () {
    next();
});