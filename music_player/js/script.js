var audio, iframe, mname;

function dg(x){return document.getElementById(x);}

window.onload = function(){
    audio = dg("au");
    iframe = dg("ifr");
    mname = dg("in");
}

function timer(){
    if(audio.ended){
        mname.value = parseInt(mname.value) + 1;
        getMusic();
    } else setTimeout(timer, 1000);
}

function getMusic(){
    audio.src = "http://music.163.com/song/media/outer/url?id="
        + mname.value + ".mp3";
    setTimeout(timer, 4000);
}

function getList(){
    iframe.height = 3000;
    iframe.src = "http://music.163.com/outchain/player?type=0&id="
        + mname.value;
}
// 577543756