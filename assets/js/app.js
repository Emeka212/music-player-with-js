// Img slider //
const img_slider = document.querySelectorAll('.img_slider img');
let img_slider_index = 0;

const change_img = ()=>{
	img_slider[img_slider_index].classList.toggle('active');

	if (img_slider_index >= img_slider.length - 1) {
		img_slider_index = 0
	}
	else{
		img_slider_index++;
	}

	img_slider[img_slider_index].classList.toggle('active');
}
setInterval(()=>{
	change_img();
}, 3000);

// Navigations //
// Showing music player //
const music_player_section = document.querySelector('.music_player_section');
let click_count = 1;
music_player_section.onclick = ()=>{
	if (click_count >= 2) {
		music_player_section.classList.add('active');
		click_count = 1;
		return;
	}
	click_count++;
	setTimeout(()=>{
		click_count=1;
	}, 250);
}

// Removing music player //
const close_btn = document.querySelector('.music_player_section .close_btn');
close_btn.onclick = ()=>{
	music_player_section.classList.remove('active');
}

// Access/show playlist //
const play_list_section = document.querySelector('.playlist_section');
const show_playlist_btn = document.querySelector('.music_player_section .show_playlist_btn');
show_playlist_btn.onclick = ()=>{
	play_list_section.classList.add('active');
}


// remove/close playlist //
const close_playlist_btn = document.querySelector('.playlist_section .icon');
close_playlist_btn.onclick = ()=>{
	play_list_section.classList.remove('active');
}

// music e.t.c//
let current_music = 0;

const music = document.querySelector("#audio_source");
const seekbar = document.querySelector(".music_seek_bar");
const song_name = document.querySelector(".current_song_name");
const artist = document.querySelector(".artist_name");
const cover_img = document.querySelector(".cover");
const current_music_time = document.querySelector(".current_time");
const current_music_duration = document.querySelector(".duration");

const queue = document.querySelectorAll('.queue');

// select all button //
const forward_btn = document.querySelector('i.fa-forward');
const backward_btn = document.querySelector('i.fa-backward');
const play_btn = document.querySelector('i.fa-play');
const pause_btn = document.querySelector('i.fa-pause');
const repeat_btn = document.querySelector('i.fa-redo');
const volume_btn = document.querySelector('i.fa-volume-up');
const volume_slider = document.querySelector('.volume_slider');

// play btn click event //
play_btn.onclick = ()=>{
	music.play();
	play_btn.classList.remove('active');
	pause_btn.classList.add('active');
}

// pause btn click event //
pause_btn.onclick = ()=>{
	music.pause();
	pause_btn.classList.remove('active');
	play_btn.classList.add('active');
}

// function for setting up music //
const set_music = (i)=>{
	seekbar.value = 0;
	let song = songs[i];
	current_music = i;

	music.src = song.path;

	song_name.innerHTML = song.name;
	artist.innerHTML = song.artist;
	cover_img.src = song.cover;

	setTimeout(()=>{
		seekbar.max = music.duration;
		current_music_duration.innerHTML = format_time(music.duration);
	}, 300);
	current_music_time.innerHTML = '00 : 00';
} 

set_music(0);

// format suration in 00:00 format //
const format_time = (time)=>{
	let min = Math.floor(time / 60);
	if (min < 10) {
		min = '0' + min;
	}

	let sec = Math.floor(time % 60);
	if (sec < 10) {
		sec = '0' + sec;
	}

	return `${min} : ${sec}`;
}

// seekbar event //
setInterval(()=>{
	seekbar.value = music.currentTime;
	current_music_time.innerHTML = format_time(music.currentTime);
	if (Math.floor(music.currentTime) == Math.floor(seekbar.max)) {
		if (repeat_btn.classList.contains('active')) {
			set_music(current_music);
			play_btn.click();
		}
		else{
			forward_btn.click();
		}
	}
}, 500);

seekbar.onchange = ()=>{
	music.currentTime = seekbar.value;
}

// forward btn //
forward_btn.onclick = ()=>{
	if (current_music >= songs.length - 1) {
		current_music = 0;
	}
	else{
		current_music++;
	}
	set_music(current_music);
	play_btn.click();
}

// backward btn //
backward_btn.onclick = ()=>{
	if (current_music <= 0) {
		current_music = songs.length - 1;
	}
	else{
		current_music--;
	}
	set_music(current_music);
	play_btn.click();
}

// reapeat button //
repeat_btn.onclick = ()=>{
	repeat_btn.classList.toggle('active');
}

// volune section //
volume_btn.onclick = ()=>{
	volume_btn.classList.toggle('active');
	volume_slider.classList.toggle('active');
}

volume_slider.oninput = ()=>{
	music.volume = volume_slider.value;
}

// queue section //
queue.forEach((item, 1))