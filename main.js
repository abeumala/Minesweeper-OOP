
const field = document.getElementById('field');
const cell = document.getElementsByClassName('cell'); // class is added in createField for loop
const cols = 20;
const rows = 15;
let bombsNumber = 0;
let counting = false;

let content = document.getElementsByTagName('span')[0],
    seconds = 0, 	
    t;

function createField (cols, rows) {

	while (field.firstChild) {
    	field.removeChild(field.firstChild);
	}

	let counter = 0;
	bombsNumber = (cols * rows) * 0.2
	let bombsCountdown = document.getElementById('bombs-counter');
	bombsCountdown.innerHTML = bombsNumber;
	let coordenadas = []
	while(counter < bombsNumber) {
		randomRow = Math.floor(Math.random() * rows);
		randomCol = Math.floor(Math.random() * cols);
		if(!coordenadas.includes(`[${randomRow},${randomCol}]`)){
			coordenadas.push(`[${randomRow},${randomCol}]`)
			counter++
		}
	}

	for (let i = 0; i < rows; i++) {
		const row = document.createElement('div');
		row.setAttribute('class', 'row');
		for (let j = 0; j < cols; j++) {
			const col = document.createElement('div')
			col.setAttribute('class', 'col cell');
			col.setAttribute('id', `${i} ${j}`);
			if(coordenadas.includes(`[${i},${j}]`)){
				col.setAttribute('class', 'col bomb cell');
			}
			row.appendChild(col);
		}
		field.appendChild(row);
	}
	makeCellClickable()
}

createField(cols,rows);

function restart () {
	clearTimer();
	counting = false;
	createField(cols,rows);
	document.getElementById('happy-face').src  = './img/happyface.jpg';
	let bombsCountdown = document.getElementById('bombs-counter');
	bombsCountdown.innerHTML = bombsNumber;
}

function gameOver (clickInput) {
	stopTimer()
	if (clickInput) {
		document.getElementById('happy-face').src  = './img/sadface.png';
		let displayBombs = document.querySelectorAll('.bomb');
		displayBombs.forEach(function(element) {
			element.innerHTML = "<img class='flag-img' src='./img/bomb.png'/>"
		})
		//let revealBombs = document.getElementById('bomb');
		//revealBombs.innerHTML = <img class="flag-img" src="./img/flag.png">
	} else {
		console.log('YOU WON')	
	}
	
}

function makeCellClickable () {
	for (var i = 0; i < cell.length; i++) {
		cell[i].addEventListener('contextmenu', function(ev) {
			if (!counting) { //counting is a global 
				timer();	
				counting = true;
			}
			console.log(ev);
		    let myCells = this;
		    console.log(myCells);
		    event.preventDefault();
		    if (myCells.children[0] && myCells.children[0].nodeName == 'IMG') {
		    	bombsNumber++

		    } else {
				myCells.innerHTML = "<img class='flag-img' src='./img/flag.png'/>"
				bombsNumber--
		    }
		    
			let bombsCountdown = document.getElementById('bombs-counter');
			bombsCountdown.innerHTML = bombsNumber;
		    return false;
		}, false);
    	cell[i].addEventListener('click', function () {
    	const myCells = this;
    	if (!counting) {
			timer();	
			counting = true;
		}
    	if(myCells.classList.contains("bomb")) {
    		gameOver(true);
    	 } else {
    	 	let bombCount = 0;
    	 	let id = myCells.id.split(" ");
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
    	 	
    	 	myCells.innerHTML = "<span class='bombcount'>"+bombCount+"</span>";
    	}
  	});
  }	
}


function checkBomb(cell) {
	if (cell && cell.classList.contains('bomb')) {
		return 1
	} 
	return 0	
}

function add() {
    seconds++;
    
    //console.log(`${seconds}`);
    content.textContent = seconds;
}

function timer() {
    t = setInterval(add, 1000);
}

function stopTimer() {
	clearInterval(t);
}

function clearTimer() {
    content.textContent = "";
    seconds = 0; 
}





