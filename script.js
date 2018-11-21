/* https://medium.com/@ginalee1114/how-to-music-visualizer-web-audio-api-aa007f4ea525?fbclid=IwAR02MMQepNLRl8RZ59VyUOw_LJwNlf2344a-PtMwwtqG0rH_O7QW7SRAoMg 
https://github.com/gg-1414/music-visualizer*/
/* Code Base from Gina Lee */

window.addEventListener("DOMContentLoaded", init);
function init() {
  //autoplay sound is not allowed on the web at the moment (2018/11/21)
  document.querySelector("audio").addEventListener("click", initAudio);
}

function initAudio() {
  //audio file
  const audio = document.querySelector("audio");

  //Canvas
  const canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext("2d");

  //create audio Context only once
  let context;
  if (context == undefined) {
    context = new AudioContext();
  }
  //connect source to the Analyser and the Analyser to AudioContext destination (audio output)
  let src = context.createMediaElementSource(audio);
  const analyser = context.createAnalyser();
  src.connect(analyser);
  analyser.connect(context.destination);

  //lower the fft size for smaller amount of bars (but wider ones)
  analyser.fftSize = 16384;
  //this is the audio data we are visualizing, frequency bin count
  const bufferLength = analyser.frequencyBinCount;

  const dataArray = new Uint8Array(bufferLength);
  //console.log("DATA-ARRAY: ", dataArray);

  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  const barWidth = (WIDTH / bufferLength) * 13;

  let barHeight;
  let x = 0;
  let bars = 360;
  audio.addEventListener("play", () => {
    function renderframe() {
      requestAnimationFrame(renderframe);
      x = 0;

      analyser.getByteFrequencyData(dataArray);
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      for (let i = 0; i < bars; i++) {
        barHeight = dataArray[i] * 2.5;
        if (dataArray[i] > 200) {
          ctx.fillStyle = "hsl(350, 50%, 50%)";
        } else if (dataArray[i] > 180) {
          ctx.fillStyle = "hsl(144, 50%, 50%)";
        } else {
          ctx.fillStyle = "hsl(256, 50%, 50%)";
        }

        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
        ctx.rotate(0.1);
        x += barWidth + 10;
      }
    }
    renderframe();
  });
}
