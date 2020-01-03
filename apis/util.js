function dg(x){
    return document.getElementById(x);
}

function saveObj(k, x){
    localStorage.setItem(k, JSON.stringify(x));
}

function loadObj(k){
    return JSON.parse(localStorage.getItem(k));
}