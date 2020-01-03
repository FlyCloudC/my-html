var page, img;

function dg(x){return document.getElementById(x);}

window.onload = function(){
    page = dg("in2");
    img = dg("img");
    alert(img.noResize);
    img.noResize = false;
}

function getPage(){
    img.src = "http://www.171english.cn/gaozhong/books/xuanxiu6/images/"
        + page.value + ".jpg";
}