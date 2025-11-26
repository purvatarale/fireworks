(() => {
  const canvas = document.getElementById("canvas-background");
  const context = canvas.getContext("2d");

  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  const drawBackground = () => {
    const gradient = context.createRadialGradient(0, 0, height, 0, 0, width);
    gradient.addColorStop(0, "#002D62");
    gradient.addColorStop(0.5, "#0066b2");
    gradient.addColorStop(1, "#6699CC");

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  };

  drawBackground();

  const drawForeground = () => {
    context.fillStyle = "#13274F";
    context.fillRect(0, height * 0.95, width, height);

    context.fillStyle = "#002D62";
    context.fillRect(0, height * 0.955, width, height);
  };

  drawForeground();
})();
