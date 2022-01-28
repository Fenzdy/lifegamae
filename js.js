class GameLife {
	constructor(canvasId, btnStart, btnStop, time, survivedDayField) { 
		this.canvas = document.getElementById(canvasId);
		this.btnStart = document.getElementById(btnStart);
		this.btnStop = document.getElementById(btnStop);
		this.context = this.canvas.getContext('2d');
		this.array=[];
		this.height = 30;
		this.width = 30;
		this.dayLength = document.getElementById(time);
		this.daysSurvived = 0;
		this.survivedDayField = survivedDayField;
		this.counter=0;
		this.timer;
		this.canvas.addEventListener('click', (ev) => {this.setLife(ev)});
		this.btnStart.addEventListener('click', () => {this.startSimulation()});
		this.btnStop.addEventListener('click', () => {this.stopSimulation()});
		this.init()
	}

	init() {
		this._setArray();
	}

	setLife(ev){
		let x = ev.offsetX;
		let y = ev.offsetY;
		x = Math.floor(x/10);
		y = Math.floor(y/10);
		this.array[y][x]= this.array[y][x] == 1 ? 0 : 1;
		this.rendering();
	}

	rendering(){
		this.context.clearRect(0, 0, 300, 300);
		for (let i=0; i<this.height; i++){
			for (let j=0; j<this.width; j++){
				if (this.array[i][j]==1){
					this.context.fillRect(j*10, i*10, 10, 10);
				}
			}
		}
	}
	
	startSimulation(){
		this.timer = setTimeout(() => { 
			let resultArray = [];
			for (let i=0; i<this.height; i++){
				resultArray[i]=[];
				for (let j=0; j<this.width; j++){
					let counter = 0;
					if (this.array[i][j]==1) counter++;
					if (this.array[this._verticalFields(i)-1][j]==1) counter++;
					if (this.array[i][this._horizontalFields(j)+1]==1) counter++;
					if (this.array[this._horizontalFields(i)+1][j]==1) counter++;
					if (this.array[i][this._verticalFields(j)-1]==1) counter++;
					if (this.array[this._verticalFields(i)-1][this._horizontalFields(j)+1]==1) counter++;
					if (this.array[this._horizontalFields(i)+1][this._horizontalFields(j)+1]==1) counter++;
					if (this.array[this._horizontalFields(i)+1][this._verticalFields(j)-1]==1) counter++;
					if (this.array[this._verticalFields(i)-1][this._verticalFields(j)-1]==1) counter++;
					
					if(counter==3) {
						resultArray[i][j]=1
					} else if (counter < 3 && counter > 3) {
						resultArray[i][j]==0;
					}
				}
			}
			this.daysSurvived++
			document.getElementById(this.survivedDayField).innerHTML = this.daysSurvived;
			this.array = resultArray;
			this.rendering();
			this.startSimulation()
			
		}, parseInt(this.dayLength.value) * 1000)
	}

	stopSimulation(){
		clearTimeout(this.timer)
	}

	_setArray(){
		this.array = new Array(this.height);
		for (var i=0; i<this.height; i++){
			this.array[i]=new Array(this.width);;
			for (var j=0; j < this.width; j++){
				this.array[i][j]=0;
			}
		}
	}

	_verticalFields(i) {
		if(i==0) return this.height;
		else return i;
	}

	_horizontalFields(i) {
		if(i==this.width - 1) return -1;
		else return i;
	}
}

new GameLife('canvas', 'start', 'stop', 'time', 'count')




