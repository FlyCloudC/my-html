var render, physical, blocks;
var dt = 50;
window.onload = function(){
    physical = new Physical();
    render = new Render(dg("myCanvas"), physical);
    render.start(9);
    setInterval(function(){
        physical.updata();
        render.updata();
    }, dt);
}


var touch = (function () {
    var x, y, t=0;
    return function (e) {
        if(x == e.clientX && y == e.clientY) return;
        x = e.clientX, y = e.clientY;
        physical.addDrop(x, y, ++t % 4);
    }
})();
//性能
//曲线



