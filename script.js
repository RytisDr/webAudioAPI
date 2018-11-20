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

  const barWidth = (WIDTH / bufferLength) * 13;

  let barHeight;
  let x = 0;
  let bars = 150;
  audio.addEventListener("play", () => {
    function renderframe() {
      requestAnimationFrame(renderframe);
      x = 0;

      analyser.getByteFrequencyData(dataArray);
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (let i = 0; i < bars; i++) {
        barHeight = dataArray[i] * 2.5;

        ctx.fillStyle = "hsl(350, 50%, 50%)";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 10;
      }
    }
    renderframe();
  });
}
