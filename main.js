
const field = document.getElementById('field');
const cell = document.getElementsByClassName('cell'); // class is added in createField for loop
const cols = 17;
const rows = 13;
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
	bombsNumber = Math.floor((cols * rows) * 0.2);
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
			element.innerHTML = "<span id='bomb-container'><img class='flag-img' src='./img/bomb.png'/></span>"
		});

		// displayBombs.forEach(function(element) {
		// 	element.innerHTML = "<img class='flag-img' src='./img/bomb.png'/>"
		// });
	} else {
		console.log('YOU WON')	
	}
	
}

function makeCellClickable () {
	for (var i = 0; i < cell.length; i++) {
		cell[i].addEventListener('contextmenu', function(event) {  //contextmenu captures right click
			if (!counting) { //counting is a global 
				timer();	
				counting = true;
			}

		    let myCells = this;
			event.preventDefault();
		    if (myCells.children[0] && myCells.children[0].children[0].nodeName === 'IMG') {
				myCells.innerHTML = "";
		    	bombsNumber++

		    } else {
				myCells.innerHTML = "<span id='flag-container'><img class='flag-img' src='./img/flag.png'/></span>"
				bombsNumber--
		    }
		    
			let bombsCountdown = document.getElementById('bombs-counter');
			bombsCountdown.innerHTML = bombsNumber;
		    return false;
		}, false);


    	cell[i].addEventListener('click', function () {  //left click event listener
    	const myCells = this;
    	if (!counting) {
			timer();	
			counting = true;
		}
    	if(myCells.classList.contains("bomb")) {
    		gameOver(true);
    	 } else {
    	 	let nearBombCount = 0;
    	 	let id = myCells.id.split(" ");
    	 	let y = parseInt(id[0]);
    	 	let x = parseInt(id[1]);

    	 	let upperCellPos = y - 1 + " " + x;
    	 	let upperCell = document.getElementById(upperCellPos);

    	 	nearBombCount += checkBomb(upperCell)

    	 	let upperRightCellPos = y - 1 + " " + (x + 1);
    	 	let upperRightCell = document.getElementById(upperRightCellPos);

    	 	nearBombCount += checkBomb(upperRightCell)

    	 	let upperLeftCellPos = y - 1 + " " + (x - 1);
    	 	let upperLeftCell = document.getElementById(upperLeftCellPos);

    	 	nearBombCount += checkBomb(upperLeftCell)

    	 	let rightCellPos = y + " " + (x + 1);
    	 	let rightCell = document.getElementById(rightCellPos);

    	 	nearBombCount += checkBomb(rightCell)

    	 	let leftCellPos = y + " " + (x - 1);
    	 	let leftCell = document.getElementById(leftCellPos);

    	 	nearBombCount += checkBomb(leftCell)

    	 	let lowerRightCellPos = y + 1 + " " + (x + 1);
    	 	let lowerRightCell = document.getElementById(lowerRightCellPos);

    	 	nearBombCount += checkBomb(lowerRightCell)

    	 	let lowerLeftCellPos = y + 1 + " " + (x - 1);
    	 	let lowerLeftCell = document.getElementById(lowerLeftCellPos);

    	 	nearBombCount += checkBomb(lowerLeftCell)

    	 	let lowerCellPos = y + 1 + " " + x;
    	 	let lowerCell = document.getElementById(lowerCellPos);

    	 	nearBombCount += checkBomb(lowerCell)
    	 	
    	 	myCells.innerHTML = "<span class='bombs-near'>"+nearBombCount+"</span>";
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
    content.textContent = "0";
    seconds = 0; 
}





