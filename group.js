let input;
let groupList, personList;

class Person{
  constructor(id, gender, group){
    this.id = id;
    this.gender = gender;
    this.group = group;
    this.wishList = new Array();
    personList.push(this);
    group.add(this);
  }
}

window.onload = () => {
  input = document.getElementById('input');
  personList = new Array();
  groupList = new Array();

  for(let i = 0; i < 8; ++i)
    groupList.push(new Set());
    
  for(let i = 1; i <= 56; ++i)
    new Person(i, i < 17, groupList[i % 8]);
  
}

let randPerson =
  () => personList[Math.floor(Math.random() * personList.length)];

function getSatis(group, x) {
  let res = 0;
  for (let p of group)
    for (let { person, weight } of p.wishList)
      if (group.has(person)) res += x ? weight > 0 : weight;
  return res;
}

function getAllSatis(x) {
  let res = 0;
  for(let group of groupList) res += getSatis(group, x);
  return res;
}

function swap(x, y) {
  x.group.delete(x);
  y.group.delete(y);
  [x.group ,y.group] = [y.group ,x.group];
  x.group.add(x);
  y.group.add(y);
}

function exchange(T) {
  let d = 0;
  let x = randPerson(), y = randPerson();
  while(x.gender != y.gender || x.group == y.group || x == y)
    y = randPerson();
  d -= getSatis(x.group) + getSatis(y.group);
  swap(x, y);
  d += getSatis(x.group) + getSatis(y.group);
  if(d < 0 && Math.exp(d / T) < Math.random()) swap(x, y);
}

function annealing(T, r, Tmin, cool){
  while(T > Tmin) cool(T), T *= r;
}

function start() {
  let ans = 0, fi = 0;
  for(let tot = 1; tot <= 50; ++tot) {
    //生成数据
    for(let p of personList) {
      p.wishList.length = 0;
      for(let i = 0; i < 5; ++i) {
       let person = randPerson();
       let weight = -((-8) ** i);
       p.wishList.push({ person, weight });
      }
    }
    
    if (tot == 1) console.log(getAllSatis());

    //模拟退火
    annealing(10, 0.9995, 0.00001, exchange);

    //统计效率
    ans += getAllSatis(), fi += 3 * personList.length +getAllSatis(1);
    if (tot % 10 == 0)
      console.log(`${tot} 满意度:${Math.floor(ans / tot)} 满意率：${fi / (tot * 5 * 

personList.length )}`);
  }
}
