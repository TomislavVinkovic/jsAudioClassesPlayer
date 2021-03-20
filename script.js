let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume= document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let isPaused = false;



let timer;
let autoplay = 0;

let index_no = 0;
let Playing_song = false;

//create a audio Element
let track = document.createElement('audio');

let currentTimeTimer = setInterval(updateCurrentTime, 1000);

function updateCurrentTime(){
	if(isPaused == false){
		setTimeout(function () {
			const h = Math.floor(track.currentTime / 3600);
			const m = Math.floor((track.currentTime % 3600) / 60);
			const s = (track.currentTime % 60).toFixed(0);
			let time = [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s].filter(a => a).join(':');
			document.getElementById("currenttracktime").textContent = time;
		}, 100);
	}
}

//All songs list
let audioFiles = [

];

let elements = document.getElementsByClassName("audiofile");
for(var i = 0; i < elements.length; i++){
	audioFiles.push(
		{
			name: (elements[i].value).replace(".mp3", "").replace(".wav", "").replace(".m4a", "").replace(".wma", ""),
			path: "audio/" + elements[i].value,
		}
	)
}


// All functions

function select_song(clicked_value) {
	document.getElementById(index_no).style.backgroundColor = "#3d4242";
	index_no = Number(clicked_value);
	document.getElementById(clicked_value).style.backgroundColor = "#FF6666";
	load_track(index_no);
	playsong();
}

//kreira playlistu
function create_playlist(){
	var list = document.getElementById("playlistconainer")
	var i;
	if(audioFiles.length !== 0){
		for(i = 0; i<audioFiles.length; ++i){
			var li = document.createElement("li");
			li.setAttribute("class", "playli");
			li.setAttribute("id", i);
			li.setAttribute("onclick", "select_song(" + i + ")" );
			var h1 = document.createElement("h1");
			h1.setAttribute("class", "playsong");
			if(i == 0){
				li.setAttribute("class", "playliactive");
			}
			else li.setAttribute("class", "playli")
			h1.appendChild(document.createTextNode(audioFiles[i].name));
			li.appendChild(h1);
			list.appendChild(li);
		}
	}
	else{
		document.getElementById("present").textContent = "0";
		document.getElementById("total").textContent = "0";
		document.getElementById("title").textContent = "No files in the folder!";
	}
	
}

//hides the playlist
function hidePlaylist(){
	playlist = document.getElementById("playlistconainer");
	if(playlist.style.display === "none"){
		playlist.style.display = "block";
		document.getElementById("arrow").classList.add('fa-angle-down');
		document.getElementById("arrow").classList.remove('fa-angle-up');
	}
	else {
		playlist.style.display = "none";
		document.getElementById("arrow").classList.add('fa-angle-up');
		document.getElementById("arrow").classList.remove('fa-angle-down');
	}
}

//Loads the track
function load_track(index_no){
	clearInterval(timer);
	reset_slider();

	track.src = audioFiles[index_no].path;
	title.innerHTML = audioFiles[index_no].name;	
    track.load();

	timer = setInterval(range_slider ,1000);
	total.innerHTML = audioFiles.length;
	present.innerHTML = index_no + 1;

	setTimeout(function () {
		const h = Math.floor(track.duration / 3600);
    	const m = Math.floor((track.duration % 3600) / 60);
    	const s = (track.duration % 60).toFixed(0);
		let time = [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s].filter(a => a).join(':');
		document.getElementById("tracktime").textContent = time;
	}, 100);
	document.getElementById("currenttracktime").textContent = "0:00";
}

load_track(index_no);


//mute sound function
function mute_sound(){
	track.volume = 0;
	volume.value = 0;
	volume_show.innerHTML = 0;
}


// checking.. the song is playing or not
 function justplay(){
 	if(Playing_song==false){
 		playsong();

 	}else{
 		pausesong();
 	}
 }


// reset song slider
 function reset_slider(){
 	slider.value = 0;
 }

// play song
function playsong(){
  track.play();
  Playing_song = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
  isPaused = false;
}

//pause song
function pausesong(){
	track.pause();
	Playing_song = false;
	play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
	isPaused = true;
}


// next song
function next_song(){
	if (index_no < audioFiles.length - 1) {
		document.getElementById(index_no).style.backgroundColor = "#3d4242";
		index_no += 1;
		document.getElementById(index_no).style.backgroundColor = "#FF6666";
		load_track(index_no);
		playsong();
	}else{
		document.getElementById(index_no).style.backgroundColor = "#3d4242";
		index_no = 0;
		document.getElementById(index_no).style.backgroundColor = "#FF6666";
		load_track(index_no);
		playsong();

	}
}


// previous song
function previous_song(){
	if (index_no > 0) {
		document.getElementById(index_no).style.backgroundColor = "#3d4242";
		index_no -= 1;
		document.getElementById(index_no).style.backgroundColor = "#FF6666";
		load_track(index_no);
		playsong();

	}else{
		index_no = audioFiles.length;
		document.getElementById(index_no).style.backgroundColor = "#FF6666";
		load_track(index_no);
		playsong();
	}
}


// change volume
function volume_change(){
	volume_show.innerHTML = recent_volume.value;
	track.volume = recent_volume.value / 100;
}

// change slider position 
function change_duration(){
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
	setTimeout(function () {
		const h = Math.floor(track.currentTime / 3600);
		const m = Math.floor((track.currentTime % 3600) / 60);
		const s = (track.currentTime % 60).toFixed(0);
		let time = [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s].filter(a => a).join(':');
		document.getElementById("currenttracktime").textContent = time;
	}, 100);
}

// autoplay function
function autoplay_switch(){
	if (autoplay==1){
       autoplay = 0;
       auto_play.style.background = "rgba(255,255,255,0.2)";
	}else{
       autoplay = 1;
       auto_play.style.background = "#FF6666";
	}
}


function range_slider(){
	let position = 0;
        
        // update slider position
		if(!isNaN(track.duration)){
		   position = track.currentTime * (100 / track.duration);
		   slider.value =  position;
	      }

       
       // function will run when the song is over
       if(track.ended){
       	 play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
		   if (autoplay == 1) {
			   document.getElementById(index_no).style.backgroundColor = "#3d4242";
			   index_no += 1;
			   document.getElementById(index_no).style.backgroundColor = "#FF6666";
		       load_track(index_no);
		       playsong();
           }
	    }
     }