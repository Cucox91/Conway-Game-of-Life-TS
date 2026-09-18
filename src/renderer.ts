


let printInterval = (ctx: CanvasRenderingContext2D | null) => {
  // Draw White Square
  if (ctx) {
    let rectColor = 'blue'
    let xPos = 0;
    let yPos = 0;

    setInterval(() => {
      rectColor = rectColor === 'blue' ? 'red' : 'blue'
      xPos++;
      yPos++;
    }, 50);


    let render = () => {
      ctx.fillStyle = rectColor
      ctx.fillRect(xPos, yPos, 10, 10)
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  } else {
    console.error("Couldn't load 2d Context for the Canvas")
  }
}

const canvas = document.getElementById('graphicsCanvas') as HTMLCanvasElement
if (canvas) {
  const ctx = canvas.getContext('2d');
  printInterval(ctx);

} else {
  console.error("Canvas element not found.")
}
