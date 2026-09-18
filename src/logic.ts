let mapX: number[] = [-1, 0, 1, 1, 1, 0, -1, -1];
let mapY: number[] = [-1, -1, -1, 0, 1, 1, 1, 0];

// In this function we will set the initial configuration for the game.
export function initGameLogic(): boolean[][] {
    let buffer: boolean[][] = Array.from({ length: 140 }, () => Array.from({ length: 140 }, () => false));

    // Set initial values here.
    buffer[60][20] = false;
    buffer[60][21] = false;
    buffer[60][22] = true;
    buffer[61][20] = true;
    buffer[61][21] = false;
    buffer[61][22] = true;
    buffer[62][20] = false;
    buffer[62][21] = true;
    buffer[62][22] = true;

    buffer[60][23] = false;
    buffer[60][24] = false;
    buffer[60][25] = true;
    buffer[61][23] = true;
    buffer[61][24] = false;
    buffer[61][25] = true;
    buffer[62][23] = false;
    buffer[62][24] = true;
    buffer[62][25] = true;

    buffer[50][20] = false;
    buffer[50][21] = false;
    buffer[50][22] = true;
    buffer[51][20] = true;
    buffer[51][21] = false;
    buffer[51][22] = true;
    buffer[52][20] = false;
    buffer[52][21] = true;
    buffer[52][22] = true;

    buffer[50][23] = false;
    buffer[50][24] = false;
    buffer[50][25] = true;
    buffer[51][23] = true;
    buffer[51][24] = false;
    buffer[51][25] = true;
    buffer[52][23] = false;
    buffer[52][24] = true;
    buffer[52][25] = true;

    return buffer;
}

// This function will generate the next iteration to be displayed.
export function nextIteration(buffer: boolean[][]): boolean[][] | null {
    let newBuffer: boolean[][] = Array.from({ length: 140 }, () => Array.from({ length: 140 }, () => false));
    const totalCols = buffer[0].length;
    const totalRows = buffer.length;

    if (buffer) {
        for (let i = 0; i < totalCols; i++) {
            for (let j = 0; j < totalRows; j++) {
                const neighbors = calculateNeighbors(buffer, i, j);

                if (buffer[i][j] && (neighbors < 2 || neighbors > 3)) {
                    // Die
                    newBuffer[i][j] = false;
                } else if (buffer[i][j] && (neighbors == 2 || neighbors == 3)) {
                    // Survive
                    newBuffer[i][j] = true;
                } else if (!buffer[i][j] && neighbors == 3) {
                    // Born
                    newBuffer[i][j] = true;
                }
            }
        }
    }
    return newBuffer;
}

export function calculateNeighbors(buffer: boolean[][], x: number, y: number): number {
    const totalCols = buffer[0].length;
    const totalRows = buffer.length;
    let count = 0;
    let newX = 0;
    let newY = 0;
    for (let i = 0; i < mapX.length; i++) {
        newX = x + mapX[i];
        newY = y + mapY[i];

        if (newX >= 0 && newX < totalCols && newY >= 0 && newY < totalCols && buffer[newX][newY]) {
            count++;
        }
    }
    return count;
}