function Physical(){
    this.drops = new Array();
    this.map = new Array();
}

Physical.prototype = {
    constructor : Physical,
    updata : function(){
        for(var i in this.drops){
            var d = this.drops[i];
            d.x += d.vx, d.y+= d.vy;
        }
    },
    addDrop : function(x, y, d){
        this.drops.push(new Drop(x, y, d));
        //alert(this.drops.length + " " + x + " " + y + " " + d);
    }
}
//+++++++++++++++++++++++
function Drop(x, y, d){
    this.x = x, this.y = y;
    this.vx = d > 1 ? d == 2 ? -1 : 1 : 0;
    this.vy = d < 2 ? d ? -1 : 1 : 0;
}