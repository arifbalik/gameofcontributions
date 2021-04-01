const rows = 7;
const columns = 52; 
const totalCells = rows * columns;
var allCellsDied = false
var speedScaler = 1

var cells = new Array(rows);
var nextCells = new Array(rows);
for (var i = 0; i < rows; i++) {
    cells[i] = new Array(columns);
    nextCells[i] = new Array(columns);
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function begin() {  
    while(1){
        var rects = document.getElementsByTagName('rect');
        if (rects == undefined)
            return;

        for (var i = 0, l = totalCells; i < l; i++) 
            cells[parseInt(i / columns)][parseInt(i % columns)] = parseInt(rects[i].getAttribute("data-level"))

        while(!allCellsDied) {
            await sleep(100 * speedScaler);
            for (var i = 1, l = rows - 1; i < l; i++) {
                for (var k = 1, j = columns - 1; k < j; k++) {
                    var liveNeigbours = (cells[i - 1][k - 1] ? 1 : 0) + (cells[i - 1][k] ? 1 : 0) + (cells[i - 1][k + 1] ? 1 : 0) + (cells[i][k - 1] ? 1 : 0) + (cells[i][k + 1] ? 1 : 0) + (cells[i + 1][k - 1] ? 1 : 0) + (cells[i + 1][k] ? 1 : 0) + (cells[i + 1][k + 1] ? 1 : 0);

                    nextCells[i][k] = (liveNeigbours > 3 || liveNeigbours < 2) ? 0 : (cells[i][k] == 0 && liveNeigbours == 3) ? 3 : cells[i][k];

                }
            }
            allCellsDied = true;
            for (var i = 0, l = totalCells; i < l; i++) {
                rects[i].setAttribute("data-level", nextCells[parseInt(i / columns)][parseInt(i % columns)]);
                allCellsDied = allCellsDied && (cells[parseInt(i / columns)][parseInt(i % columns)] == nextCells[parseInt(i / columns)][parseInt(i % columns)])
                cells[parseInt(i / columns)][parseInt(i % columns)] = nextCells[parseInt(i / columns)][parseInt(i % columns)];
            
            }

            
        }

        for (var i = 0, l = totalCells; i < l; i++) {
            rects[i].setAttribute("data-level", Math.floor(Math.random() * 2) ? 3 : 0); 
            nextCells[parseInt(i / columns)][parseInt(i % columns)] = 0;
            await sleep(10);
        }
        allCellsDied = false;
        speedScaler = 1
    }
}

 begin()

