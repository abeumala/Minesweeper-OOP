
const field = document.getElementById('field');
const cell = document.getElementsByClassName('cell');
console.log(cell, 'cell');
const cols = 20;
const rows = 15;

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
		row.setAttribute('class', 'row');
		for (let j = 0; j < cols; j++) {
			const col = document.createElement('div')
			col.setAttribute('class', 'col hidden cell');
			col.setAttribute('id', `${i} ${j}`);
			if(coordenadas.includes(`[${i},${j}]`)){
				col.setAttribute('class', 'col bomb cell')
				row.appendChild(col);
			}
			row.appendChild(col);
		}
		field.appendChild(row);
	}
	makeCellClickable()
}

createField(cols,rows);

function restart () {
	createField(cols,rows);
	document.getElementById('happy-face').src  = 'happyface.jpg';
}

function gameOver (clickInput) {

	if (clickInput) {
		document.getElementById('happy-face').src  = 'sadface.png';
		// alert('GO NEXT')
	} else {
		console.log('YOU WON')	
	}
	
}

function makeCellClickable () {
	for (var i = 0; i < cell.length; i++) {
		cell[i].addEventListener('contextmenu', function(ev) {
		    ev.preventDefault();
		    let myCell = this;
		    if (myCell.children[0] && myCell.children[0].nodeName == 'IMG') {
		    	myCell.innerHTML = ""
		    }else{
				myCell.innerHTML = "<img class='bombImage' src='flag.png'/>"
		    }
		    
		    return false;
		}, false);
    	cell[i].addEventListener('click', function () {
    	const myCell = this;
    	if(myCell.classList.contains("bomb")) {
    		myCell.innerHTML
    		gameOver(true);
    	 } else {
    	 	let bombCount = 0;
    	 	let id = myCell.id.split(" ");
    	 	let y = parseInt(id[0]);
    	 	let x = parseInt(id[1]);

    	 	let upperCellPos = y - 1 + " " + x;
    	 	let upperCell = document.getElementById(upperCellPos);

    	 	bombCount += checkBomb(upperCell)

    	 	let upperRightCellPos = y - 1 + " " + (x + 1);
    	 	let upperRightCell = document.getElementById(upperRightCellPos);

    	 	bombCount += checkBomb(upperRightCell)

    	 	let upperLeftCellPos = y - 1 + " " + (x - 1);
    	 	let upperLeftCell = document.getElementById(upperLeftCellPos);

    	 	bombCount += checkBomb(upperLeftCell)

    	 	let rightCellPos = y + " " + (x + 1);
    	 	let rightCell = document.getElementById(rightCellPos);

    	 	bombCount += checkBomb(rightCell)

    	 	let leftCellPos = y + " " + (x - 1);
    	 	let leftCell = document.getElementById(leftCellPos);

    	 	bombCount += checkBomb(leftCell)

    	 	let lowerRightCellPos = y + 1 + " " + (x + 1);
    	 	let lowerRightCell = document.getElementById(lowerRightCellPos);

    	 	bombCount += checkBomb(lowerRightCell)

    	 	let lowerLeftCellPos = y + 1 + " " + (x - 1);
    	 	let lowerLeftCell = document.getElementById(lowerLeftCellPos);

    	 	bombCount += checkBomb(lowerLeftCell)

    	 	let lowerCellPos = y + 1 + " " + x;
    	 	let lowerCell = document.getElementById(lowerCellPos);

    	 	bombCount += checkBomb(lowerCell)


    	 	console.log(bombCount)

    	 	
    	 	myCell.innerHTML = "<span class='bombcount'>"+bombCount+"</span>";
    	}
  	});
  }	
}

function checkBomb(cell) {
	if (cell && cell.classList.contains('bomb')) {
		return 1
	} else {
	return 0
	}
}


// function CountBombs () {
// 	bombCounter = 0;
// 	for (var i = 0; i < rows; i++) {
// 		for (var j = 0; j < cols; j++)
// 			if ()
// 		}

// 	}
// }

