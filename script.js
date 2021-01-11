var audio = document.createElement("AUDIO");
var playing;
var slowed = false;

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

function slowed_toggle() {
    if(playlist[playing].hasOwnProperty('song_file_slowed')){
        slowed = slowed ? false : true;
        var song_name = slowed ? playlist[playing].name + " (𝒔𝒍𝒐𝒘𝒆𝒅 𝒏 𝒓𝒆𝒗𝒆𝒓𝒃)" : playlist[playing].name;
        var duration = audio.duration;
        var current = audio.currentTime;
        var src = slowed ? playlist[playing].song_file_slowed : playlist[playing].song_file;
        
        document.getElementById("slowed").textContent = slowed ? "Switch to normal" : "Switch to slowed";
        document.getElementById("song_name").textContent = song_name;
        audio.src = src;

        audio.onloadedmetadata = function() {
            audio.currentTime = Math.floor((duration / audio.duration) * current);
            audio.play();
            audio.onloadedmetadata = null;
        }
    }
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
    
    var song_name = slowed ? playlist[id].name + " (𝒔𝒍𝒐𝒘𝒆𝒅 𝒏 𝒓𝒆𝒗𝒆𝒓𝒃)" : playlist[id].name;
    document.getElementById("song_name").textContent = song_name;
    document.getElementById("artist_name").textContent = playlist[id].artist;

    var src = slowed ? playlist[id].song_file_slowed : playlist[id].song_file;
    audio.src = src;
    if(playlist[id].hasOwnProperty('song_file_slowed')){
        document.getElementById("slowed").textContent = slowed ? "Switch to normal" : "Switch to slowed";
    } else {
        document.getElementById("slowed").textContent = "";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    playing = Math.floor(Math.random() * playlist.length);
    // playing = 3;
    audio.volume = 0.2;
    play_from_playlist(playing);
});

audio.addEventListener("ended", function () {
    next();
});