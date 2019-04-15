
const field = document.getElementById('field');
const cell = document.getElementsByClassName('cell');
console.log(cell, 'cell');
const cols = 10;
const rows = 10;


function createField(cols, rows) {
	while (field.firstChild) {
    field.removeChild(field.firstChild);
	}
	console.log(cell);
	let counter = 0;
	let bombsNumber = (cols * rows) * 0.2
	let coordenadas = []
	while(counter < bombsNumber) {
		randomRow = Math.floor(Math.random() * rows);
		randomCol = Math.floor(Math.random() * cols);
		if(!coordenadas.includes(`[${randomRow},${randomCol}]`)){
			coordenadas.push(`[${randomRow},${randomCol}]`)
			console.log(coordenadas.includes(`[${randomRow},${randomCol}]`))
			counter++
		}
	
	}

	console.log(coordenadas)

	for (let i = 0; i < rows; i++){
		const row = document.createElement('div');
		row.setAttribute('class', 'row hidden');
		for (let j = 0; j < cols; j++) {
			const col = document.createElement('div')
			col.setAttribute('class', 'col hidden cell');
			if(coordenadas.includes(`[${i},${j}]`)){
				col.setAttribute('class', 'col bomb cell')
				row.appendChild(col);
			}
			row.appendChild(col);

		}
		field.appendChild(row);
	}
	
	makeMyCell()
}

createField(cols,rows);

function restart () {
	createField(cols,rows);
}

function gameOver (clickInput) {

	if (clickInput) {
		alert('GO NEXT')
		restart()
	} else {
		console.log('YOU WON')	
	}
	
}

function makeMyCell () {
	for (var i = 0; i < cell.length; i++) {
    cell[i].addEventListener('click', function () {
    	const myCell = this;
    	if(myCell.classList.contains("bomb")) {
    		gameOver(true);
    	}
  	});
  }	
}


function printNums () {
	let counter = 0;
	for (let i = -1; i = 1; i++) {
		for (let j = -1; j = 1; j++){
			if (!myCell.classList.contains("bomb")){

			}
		}
	}
}


// cell.addEventListener("click", function(){
// 	console.log(this);
// });

// function toggleClass () {

// }


// field.onclick = function(){
// 	console.log(this);
// }
// function drawMines () {
// 	for (let x = 0; x < field.length; x++) {
// 	  for (let z = 0; z < field.length; z++) {
//       	if (field[x][z] === field[rand1][rand2]) {
// 	      	var elem = document.createElement('img'); //creates element by tagname
// 					elem.src = "mineImg.png";
// 					elem.setAttribute("class", "mine");
// 		}	
// 	}	
// }






// function createField(cols, rows) {
// 	let counter = 0;
// 	for (let i = 0; i < rows; i++){
// 		const row = document.createElement('div');
// 		row.setAttribute('class', 'row hidden');
// 		for (let j = 0; j < cols; j++) {
// 			const col = document.createElement('div')
// 			col.setAttribute('class', 'col hidden');
// 			// if (Math.random < 0.15)
// 			if (counter < 20) {
// 				col.setAttribute('class', 'bomb');
// 				counter ++;
// 			}
// 			row.appendChild(col);
// 		}
// 		field.appendChild(row);
// 	}

// }