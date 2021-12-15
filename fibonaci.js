const fibonaciList = getFiboList();
presentFiboList(fibonaciList);
let ans = document.getElementById("answer");
const btn = document.getElementById("is");
btn.addEventListener("click", chkThanCalc);

function chkThanCalc() {
  const isChecked = document.getElementById("chkTosave");
  if (isChecked.checked) {
    calcPresent();
  } else {
    let getNum1 = getNums();
    chkValidationcalc(getNum1);
  }
}

function recursiveCalcFibonaci(num) {
  const cache=[]
  function memoizeFibonaci(index, cache) {
    if (cache[index]) {
      return cache[index];
    } else {
      if (index <2) return index;
      else {
        cache[index] =
          memoizeFibonaci(index - 1, cache) + memoizeFibonaci(index - 2, cache);
      }
    }
    return cache[index];
  }
return memoizeFibonaci(num,cache)
}

function calcPresent() {
  errMsg = document.getElementById("numberIs");
  errMsg.classList.remove("is-invalid");
  loadSpinner();
  let inputNum = getNums();
  chkValidation(inputNum);
}

function loadSpinner() {
  document.getElementById("answer").innerText = ``;
  let spinner = document.getElementById("spin");
  spinner.classList.remove("d-none");
}

function FetchingAnswer() {
  spinner = document.getElementById("spin");
  fetching();
}

async function fetching() {
  try {
    const response = await fetch(`http://localhost:5050/fibonacci/${getNum1}`);
    const data = await response.json();
    if (!response.ok) {
      throw Error(response.text());
    } else {
      ans.classList.remove("text-danger");
      ans.classList.add("fs-5");
      ans.innerText = `${data.result}`;
      addTolist(data);
    }
  } catch (Error) {
    ans.innerText = `Server Error: 42 is the meaning of life`;
    ans.classList.add("text-danger");
    ans.classList.remove("fs-5");
  } finally {
    spinner.classList.add("d-none");
  }
}

function chkValidation(inputNum) {
  if (inputNum > 0 && inputNum <= 50) {
    FetchingAnswer(inputNum);
  } else {
    showError();
  }
}
function chkValidationcalc(inputNum) {
  if (inputNum > 0 && inputNum <= 50) {
    let answer = recursiveCalcFibonaci(inputNum);
    document.getElementById("answer").innerText = `${answer}`;
  } else {
    showError();
  }
}

function getNums() {
  getNum1 = document.getElementById("numberIs").value;
  return getNum1;
}

function showError() {
  spinner = document.getElementById("spin");
  spinner.classList.add("d-none");
  errMsg = document.getElementById("numberIs");
  errMsg.classList.add("is-invalid");
}

async function getFiboList() {
  const response = await fetch(`http://localhost:5050/getFibonacciResults`);
  const fiboList = await response.json();
  return fiboList.results;
}

async function presentFiboList(fibolist) {
  const list = await fibolist;
  for (let i = 0; i < list.length; i++) {
    addTolist(list[i]);
  }
  let spinner = document.getElementById("spin2");
  spinner.classList.add("d-none");
}

const ascending = document.getElementById("asc");
ascending.addEventListener("click", sortPresentAscending);
const descending= document.getElementById("desc");
descending.addEventListener("click", sortPresentDesending)
const dateAscend = document.getElementById("dateAscend")
dateAscend.addEventListener("click", sortPresentDateAscending);
const dateDescend = document.getElementById("dateDes");
dateDescend.addEventListener("click", sortPresentDateDescending);
async function sortPresentDateAscending() {
  array = await getFiboList();
  let updatedList = sortDateAscending(array);
  const listArea = document.getElementById("listResult");
  listArea.innerHTML = "";
  presentFiboList(updatedList);
}
async function sortPresentDesending() {
  array = await getFiboList();
  let updatedList = sortDescending(sortAscending(array));
  const listArea = document.getElementById("listResult");
  listArea.innerHTML = "";
  presentFiboList(updatedList);
}

async function sortPresentAscending(){
  array= await getFiboList();
  let updatedList=sortAscending(array);
  const listArea = document.getElementById("listResult");
  listArea.innerHTML=""
  presentFiboList(updatedList);
}


async function sortPresentDateDescending() {
  array = await getFiboList();
  let updatedList = sortDateDescending(sortDateAscending(array));
  const listArea = document.getElementById("listResult");
  listArea.innerHTML = "";
   presentFiboList(updatedList);}

function sortDescending(array){
  let arrayDescend=array.reverse();
  return arrayDescend
}
function sortAscending(array){
    array.sort(function (a, b)  {
   return a.number - b.number;})
  
  return array;
}

function sortDateAscending(array) {
   array.sort(function (a, b) {
    return a.createdDate - b.createdDate;
  });

  return array;
}

function sortDateDescending(array){
  let arrayDescend=array.reverse();
  return arrayDescend
}

function addTolist(item) {
  const listArea = document.getElementById("listResult");
  let li = document.createElement("li");
  listArea.appendChild(li);
  li.classList.add("border-bottom");
  li.classList.add("border-dark");
  li.classList.add("py-2");
  let calcDate = new Date(item.createdDate);
  li.innerHTML += `The Fibonnaci Of <b>${item.number}</b> is <b>${item.result}</b>  Calculated at:${calcDate}`;
}
