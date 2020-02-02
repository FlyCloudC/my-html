let audio, show;
let key = ["tex", "spd", "pit", "vol", "per"];
let value= [];

function dg(x){return document.getElementById(x);}

window.onload = function(){
    audio = dg("au");
    show = dg("showurl");
    for(let i = 0; i < key.length; ++i) value[i] = dg(key[i]);
}

function say(){
    let url =  "http://tts.baidu.com/text2audio?cuid=baike&lan=zh&ctp=1&pdt=301";
    for(let i = 0; i < key.length; ++i)
        if(value[i].value)
            url += "&" + key[i] + "=" + value[i].value;
    audio.src = url;
    show.innerHTML = encodeURI(url);
}