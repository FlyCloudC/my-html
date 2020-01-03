function Render(c, p){
    this.canvas = c;
    this.canvas.height = 50 + (this.canvas.width =
        screen.availWidth - screen.availWidth % 10);
    this.cxt = this.canvas.getContext("2d");
    this.cxt.lineWidth = 3;
    this.drops = p.drops;
    this.map = p.map;
    this.size = p.size;
}
Render.prototype = {
    constructor : Render,
    updata : function(){
        this.canvas.height = this.canvas.height;
        for(var i in this.drops){
        //绘制map
        var a = this.canvas.width;
        var b = (a - 2) / n;///
        for(var i=1; i <= a; i += b){
            this.cxt.moveTo(i, 0);
            this.cxt.lineTo(i, a);
        }
        for(var i=1; i <= a; i += b){
            this.cxt.moveTo(0, i);
            this.cxt.lineTo(a, i);
        }
        this.cxt.stroke();
            var d = this.drops[i];
            this.cxt.moveTo(d.x + 10, d.y);
            this.cxt.arc(d.x, d.y, 10, 0, 6.285);
            this.cxt.stroke();
        }
    }
}