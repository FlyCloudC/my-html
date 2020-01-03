let log = (p =>
  x => p.innerHTML += x + '</br>'
)(document.getElementById('o'));

let loadJs = (() => {
  const head = document.getElementsByTagName('head')[0];
  return path => {
    let script = document.createElement('script');
    script.src = path;
    script.await = false;
    head.appendChild(script);
  }
})();

let includeJs = (() => {
  const jsList = [
    'stack',
    'queue'
  ];
  let isLoad = [];
  return list => {
    list.forEach(v => {
      if(isLoad[v]) return;
      if(jsList.includes(v)){
        log(`load ${v}`);
        loadJs(`container/${v}.js`);
        isLoad[v] = true;
      } else {log(`${v} is not found`)}
    });
  };
})();

//------------

includeJs(['stack','a']);
includeJs(['queue','stack']);

log('XD');