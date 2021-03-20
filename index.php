<!DOCTYPE html>
<html>
<head>
    <title>Audio classes player</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="stylesheet" type="text/css" href="playlist.css">

</head>

<body onload="create_playlist()">

    <div class=" container-fluid h-100" style="padding: 0;background: #5A5A5A;">
        <div class="row" style=" margin: 0;">
            <div class="col-lg-12 col-sm-12" style="background: #5A5A5A;">
                <div class="row">
                    <div class="col-lg-3 col-sm-6" style="color: #fff; text-align: left;">
                        <p id="logo"><i class="fa fa-music"></i>Audio classes player</p>
                    </div>
                    <div class="col-lg-7 d-sm-none d-md-block"></div>
                </div>

                <div class="row" style="margin-top: 20px;">
                    <div class="col-lg-4 d-sm-none d-md-block"></div>
                    <div class="col-lg-4 col-sm-12">
                        <!--- song title & artist name --->
                        <p id="title">title.mp3</p>
                    </div>
                    <div class="col-lg-4 d-sm-none d-md-block"></div>
                </div>

                <div class="row">
                    <div class="col-lg-4 d-sm-none d-md-block"></div>
                    <div class="col-lg-4 col-sm-12">
                        <div class="middle">
                            <button onclick="previous_song()" id="pre"><i class="fa fa-step-backward" aria-hidden="true"></i></button>
                            <button onclick="justplay()" id="play"><i class="fa fa-play" aria-hidden="true"></i></button>
                            <button onclick="next_song()" id="next"><i class="fa fa-step-forward" aria-hidden="true"></i></button>
                        </div>
                    </div>
                    <div class="col-lg-4 d-sm-none d-md-block"></div>
                </div>

                <div class="row">
                    <div class="col-lg-4 col-sm-3"></div>
                    <div class="col-lg-4 col-sm-6">
                        <button id="auto" onclick="autoplay_switch()">Auto play <i class="fa fa-circle-o-notch" aria-hidden="true"></i></button>
                    </div>
                    <div class="col-lg-4 col-sm-3"></div>
                </div>

                <!--volume controls-->
                <div class="row">
                    <div class="col-xl-4 col-lg-3 col-sm-3"></div>
                    <div class="col-xl-6 col-lg-8 col-sm-8" id="soundcontrols" style="text-align: left;">
                        <p id="volume_show" style="display: inline;">90</p>
                        <i class="fa fa-volume-up" aria-hidden="true" onclick="mute_sound()" id="volume_icon"></i>
                        <i class="fa fa-volume-down volumedown"></i>
                        <input type="range" min="0" max="100" value="90" onchange="volume_change()" id="volume">
                        <i class="fa fa-volume-up volumeup"></i>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12">
                        <div class="duration">
                            <p id="currenttracktime" style="display: inline;"></p>
                            <input type="range" min="0" max="100" value="0" id="duration_slider" onchange="change_duration()">
                            <p id="tracktime" style="display: inline;"></p>
                        </div>
                    </div>
                </div>


            </div>
                <!--<div class="col-lg-1 col-sm-12"></div>--> <!--Seperator DIV-->
                
            </div>
        <div class="row" style="margin-top: 50px; background: #5A5A5A;">
            <div class="col-12" style="width: 100%;">
                    <div class="playlist">
                        <ul class="playul">
                            <li class="playheader" onclick="hidePlaylist();">
                                <h1 class="playsong"><i class="fa fa-music"></i>&nbsp;Playlist</h1>
                                <p style="display: inline-block;margin-left: 10px;background: #3d4242;padding-left: 15px;padding-right: 15px;padding-top: 5px;padding-bottom: 5px; border-radius: 5px;" ><span id="present">1</span>/<span id="total">5</span></p>
                                <p style="display: inline-block;margin-left: 10px;"><span><i class="fa fa-angle-down" aria-hidden="true" id="arrow"></i></span></p>
                            </li>
                            <ul id="playlistconainer" class="playul" onload="create_playlist()">
                            </ul>
                        </ul>
                    </div>
            </div>
        </div>
        
    </div>
   
  
    <?php
            $dir = "audio/";
            // Open a directory, and read its contents
            if (is_dir($dir)){
                if ($dh = opendir($dir)){
                    while (($file = readdir($dh)) !== false){
                        $fileParts = pathinfo($file);
                        if($fileParts['extension'] == "mp3" || $fileParts['extension'] == "wav" || $fileParts['extension'] == "m4a" || $fileParts['extension'] == "wma"){
    ?>
                    <input type="hidden" class="audiofile" value="<?php echo $file ?>" />
    <?php
                        } 
                    }
                    closedir($dh);
                }
            }
            else{
            echo "$dir is not a valid directory";
            }
    ?>
    <!--- Add javascript file --->
    <script type="text/javascript"></script>
    <script src="script.js"></script>

</body>
</html>