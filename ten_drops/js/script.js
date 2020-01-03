var output, canvas, cxt, timer;
var size, slen, bl;
var vx = [1, 0, -1, 0], vy = [0, 1, 0, -1];
var vdrop = 4, dt = 15;
var map, drops, ds;
var dropc, score, cb;

function Drop(x, y, d){
    this.d = d;
    this.vx = vx[d] * vdrop;
    this.vy = vy[d] * vdrop;
    this.x = bl * (x + 0.5 * (1 + vx[d]));
    this.y = bl * (y + 0.5 * (1 + vy[d]));
}

function turn(x){return Math.floor(x / bl);}///

function dg(x){return document.getElementById(x);}

var touch = (function () {
    var x, y;
    return function (e) {
        if(x == e.clientX && y == e.clientY) return;
        x = e.clientX, y = e.clientY;
        if(drops.length || !dropc) return;
        --dropc, cb = 0;
        add(turn(x), turn(y));
    }
})();

function add(x, y){
    ++map[x][y];
    if(map[x][y] == 5){
        if(cb) ++dropc;
        score += 10 * ++cb;
        map[x][y] = 0;
        for(var i = 0; i < 4; ++i)
            drops.push(new Drop(x, y, i));
    }
}

window.onload = function(){
    output = dg("p");
    canvas = dg("c");
    cxt = canvas.getContext("2d");
    cxt.lineWidth = 1;
    start(9);
}

function start(s){
    size = s;
    bl = Math.floor((screen.availWidth - 2) / s);///
    ds = bl * 0.3;
    slen = s * bl + 2;
    canvas.width = slen;
    canvas.height = slen;
    drops = new Array();
    map = new Array();
    for(var i = 0; i < s; ++i){
        map[i] = new Array();
        for(var j = 0; j < s; ++j){
            var r = Math.floor(Math.random() * 13) - 8;
            map[i][j] = r > 0 ? r : 0;
        }
    }
    dropc = 10, score = 0;
    timer = setInterval(updata, dt);
}

function updata(){
    output.innerHTML =
        "分数：" + score + "</br>水滴：" + dropc;
    if(!(dropc > 0 || drops.length > 0)){
        clearInterval(timer);
        alert("最终得分: " + score);
        start(9);
        return;
    }
    canvas.width = slen;
    //绘制map
    cxt.fillStyle = "#233CCC";
    cxt.fillRect(0, 0, slen, slen);
    //绘制固定drop
    cxt.strokeStyle = "#00DCFF";
    for(var i = 0; i < size; ++i) for(var j = 0; j < size; ++j)
        if(map[i][j]){
            var x = (i + 0.5) * bl, y = (j + 0.5) * bl,
                r = (map[i][j] + 1) * 0.3 * ds;
            cxt.moveTo(x + r, y);
            cxt.arc(x, y, r, 0, 6.285);
            cxt.stroke();
        }
    //移动并绘制drop
    for(var i = 0; i < drops.length; ++i){
        var d = drops[i];
        d.x += d.vx, d.y+= d.vy;
        var gx = turn(d.x), gy = turn(d.y);
        if(gx < 0 || gy < 0 || gx >= size || gy >= size){
            drops.splice(i--, 1);
        } else if(map[gx][gy]){
            add(gx, gy);
            drops.splice(i--, 1);
        } else{
            cxt.moveTo(d.x + ds * vx[d.d], d.y + ds * vy[d.d]);
            cxt.quadraticCurveTo(
                d.x + ds * (vx[d.d] + vx[(d.d +1) % 4]),
                d.y + ds * (vy[d.d] + vy[(d.d +1) % 4]),
                d.x - ds * vx[d.d], d.y - ds * vy[d.d]);
            cxt.quadraticCurveTo(
                d.x + ds * (vx[d.d] + vx[(d.d +3) % 4]),
                d.y + ds * (vy[d.d] + vy[(d.d +3) % 4]),
                d.x + ds * vx[d.d], d.y + ds * vy[d.d]);
            cxt.stroke();
        }
    }
}
