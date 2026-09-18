import { initGameLogic, nextIteration, calculateNeighbors } from './logic'

// Initialize Canvas
const canvas = document.getElementById('graphicsCanvas') as HTMLCanvasElement
if (canvas) {
  const ctx = canvas.getContext('2d');
  printIntervalNew(ctx);
} else {
  console.error("Canvas element not found.")
}

function printIntervalNew(ctx: CanvasRenderingContext2D | null) {
  if (!ctx) {
    console.error("Couldn't load context into canvas");
    return;
  }

  let buffer = initGameLogic();
  let lastUpdateTime = 0;
  const updateIntervals = 50;

  let render = (timestamp: number) => {
    // Check if one second has passed since the last game updated.
    if (timestamp - lastUpdateTime >= updateIntervals) {
      buffer = nextIteration(buffer)!;
      lastUpdateTime = timestamp;
      console.log("Logic Updated");
    }

    // Clean the canvas.
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw the current state
    ctx.fillStyle = 'white';
    for (let i = 0; i < buffer.length; i++) {
      for (let j = 0; j < buffer[0].length; j++) {
        if (buffer[i][j]) {
          ctx.fillRect(i * 10, j * 10, 10, 10);
        }
      }
    }
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function printInterval(ctx: CanvasRenderingContext2D | null) {
  // Draw White Square
  if (ctx) {
    let buffer = initGameLogic();

    // The infinite loop goes here.
    setInterval(() => {
      buffer = nextIteration(buffer)!;
      console.log("Intervaling...");
    }, 1000);

    let render = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = 'white';

      for (let i = 0; i < buffer.length; i++) {
        for (let j = 0; j < buffer[0].length; j++) {
          if (buffer[i][j]) {
            ctx.fillRect(i * 10, j * 10, 10, 10)
          }
        }
      }
      console.log("Rendering...");
      requestAnimationFrame(render); // 30 times before restart.
    }
    requestAnimationFrame(render);
  } else {
    console.error("Couldn't load 2d Context for the Canvas")
  }
}