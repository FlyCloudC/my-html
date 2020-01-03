var output, canvas, cxt;
var size, slen, bl, ps;
var map, lastput, nc;

function dg(x){return document.getElementById(x);}

function turn(x){return Math.floor(x / bl - 0.5);}///

function outmap(x, y){return x < 0 || y < 0 || x >= size || y >= size;}

window.onload = function(){
    output = dg("p");
    canvas = dg("c");
    cxt = canvas.getContext("2d");
    document.addEventListener("touchend", touch, false);
    start(13);
}

function touch(e){
    var t = e.changedTouches[0];
    var x = turn(t.pageX), y = turn(t.pageY);
    if(outmap(x, y) || ! putPiece(x, y)) return;
    check(x, y);
    nc = 3 - nc;
}

function start(s){
    size = s;
    bl = Math.floor(screen.availWidth / (s + 1));///
    ps = bl * 0.4;
    slen = (s + 1) * bl;
    canvas.width = slen;
    canvas.height = slen;
    nc = 2;
    map = new Array();
    for(var i = 0; i < s; ++i){
        map[i] = new Array();
        for(var j = 0; j < s; ++j) map[i][j] = 0;
    }
    lastput = new Array();
    //绘制棋盘
    for(var i = bl; i <= slen - bl; i += bl){
        cxt.moveTo(i, bl), cxt.lineTo(i, slen - bl);
        cxt.moveTo(bl, i), cxt.lineTo(slen - bl, i);
    }
    cxt.stroke();
}

function putPiece(bx, by){
    if(map[bx][by]) return false;
    var x = (bx + 1) * bl, y = (by +1) * bl;
    cxt.beginPath();
    cxt.moveTo(x + ps, y);
    cxt.arc(x, y, ps, 0, 6.285);
    cxt.stroke();
    cxt.fillStyle = nc == 1 ? "white" : "black";
    cxt.fill();
    map[bx][by] = nc;
    lastput.push([x, y]);
    return true;
}

function ct(x, y, dx, dy){
    return (outmap(x, y) || map[x][y] != nc) ? 0 :
        1 + ct(x + dx, y + dy, dx, dy);
}

function check(x, y){
    if(ct(x, y, 0, 1) + ct(x, y, 0, -1) > 5 ||
        ct(x, y, 1, 0) + ct(x, y, -1, 0) > 5 ||
        ct(x, y, 1, 1) + ct(x, y, -1, -1) > 5 ||
        ct(x, y, -1, 1) + ct(x, y, 1, -1) > 5)
        alert((nc == 1 ? "白" : "黑") + "方胜利"), start(13);
}

function undo(){
    var i = lastput.length - 1;
    if(i < 0) return;
    var x = lastput[i][0], y = lastput[i][1], bbl = 0.5 * bl;
    
    cxt.beginPath();
    cxt.fillStyle = "white";
    cxt.fillRect(x - bbl, y - bbl, bl, bl);
    
    cxt.beginPath();
    cxt.moveTo(x - bbl, y);
    cxt.lineTo(x + bbl, y);
    cxt.moveTo(x, y - bbl);
    cxt.lineTo(x, y + bbl);
    cxt.stroke();
    
    map[turn(x)][turn(y)] = 0;
    lastput.splice(i, 1);
    nc = 3 - nc;
}