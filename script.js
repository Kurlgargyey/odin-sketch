// make one div with 16 children divs
function buildRow(size){
 const row = document.createElement("div");
 for (let i=1; i<=size; i++){
  const col = document.createElement("div");
  col.classList.add(`${i}`)
  col.classList.add("column")
  col.dataset.lightness = 100;
  row.appendChild(col);
 }
 return row;
}

// make one div with 16 children divs, each of which have 16 children divs.
function buildGrid(size){
 const container = document.createElement("div");
 container.classList.add("container");
 for (let i=1; i<=size; i++){
  const row = buildRow(size);
  row.classList.add(`${i}`)
  row.classList.add("row")
  container.appendChild(row);
 }
 return container;
}

function insertPad(parent, size){
 const container = buildGrid(size);
 parent.insertBefore(container, parent.firstChild);

 const cells = document.querySelectorAll(".column");
 cells.forEach((cell) => {
  cell.addEventListener("mouseover", function(e) {
   cell.dataset.lightness -= 10;

   e.target.style.backgroundColor = `hsl(${Math.round(Math.random()*360)}, 
   ${Math.round(Math.random()*100)}%, 
   ${cell.dataset.lightness}%)`;
  })
 });
}

function resetPad(parent){
 parent.removeChild(document.querySelector(".container"));
 
 let size = prompt("How many rows would you like the new pad to have?", "16");
 if (size === null){
  size = 16;
 }
 while (+size > 100 || +size < 1 ||  isNaN(size)){
  size = prompt("Please input a positive number no greater than 100.", "16");
 }

 size = +size;
 insertPad(parent, size);
}

const maindiv = document.querySelector("#maindiv");
insertPad(maindiv, 16);

const resetbtn = document.querySelector("#resetbutton");
resetbtn.addEventListener('click', function(){
 resetPad(maindiv);
});