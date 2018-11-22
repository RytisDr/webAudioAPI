/* https://medium.com/@ginalee1114/how-to-music-visualizer-web-audio-api-aa007f4ea525?fbclid=IwAR02MMQepNLRl8RZ59VyUOw_LJwNlf2344a-PtMwwtqG0rH_O7QW7SRAoMg */
/* Gina Lee */
window.addEventListener("DOMContentLoaded", init);
function init() {
  const canvas = document.querySelector("canvas");
  const audio = document.querySelector("audio");
  //Canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");

  const context = new AudioContext();
  let src = context.createMediaElementSource(audio);
  const analyser = context.createAnalyser();

  src.connect(analyser);
  analyser.connect(context.destination);
  analyser.fftSize = 16384;
  const bufferLength = analyser.frequencyBinCount;
  console.table(bufferLength);
  const dataArray = new Uint8Array(bufferLength);
  console.log("DATA-ARRAY: ", dataArray);
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  const barWidth = (WIDTH / bufferLength) * 30;

  let barHeight;
  let x = 0;
  let bars = 150;
  audio.addEventListener("play", () => {
    function renderframe() {
      requestAnimationFrame(renderframe);
      x = 0;

      analyser.getByteFrequencyData(dataArray);
      ctx.fillStyle = "rgba(0,0,0,0.2)";

      // ctx.arc(0, 0, 0, 0, 2 * Math.PI, true);

      // for (let i = 0; i < bars; i++) {
      //   var centerX = Math.random + 50;
      //   var centerY = Math.random + 50;
      //   var radius = dataArray[i] * 10;

      //   ctx.beginPath();
      //   ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);

      //   centerX += radius + 10;

      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (let i = 0; i < bars; i++) {
        barHeight = dataArray[i] * 6;

        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
        x += barWidth + 10;
        if (dataArray[i] < 50) {
          ctx.fillStyle = "hsl(310, 50%, 50%)";
        } else if (dataArray[i] < 100) {
          ctx.fillStyle = "hsl(0, 50%, 50%)";
        } else if (dataArray[i] < 140) {
          ctx.fillStyle = "hsl(180, 50%, 50%)";
        } else if (dataArray[i] < 160) {
          ctx.fillStyle = "hsl(60, 50%, 50%)";
        } else if (dataArray[i] < 180) {
          ctx.fillStyle = "hsl(270, 50%, 50%)";
        } else if (dataArray[i] < 200) {
          ctx.fillStyle = "hsl(130, 50%, 50%)";
        } else {
          ctx.fillStyle = "hsl(240, 50%, 50%)";
        }

        // document.querySelector("canvas").style.transform =
        //   "rotate(" + `${dataArray[i]}` + "deg)";
      }
    }

    renderframe();
  });
}
