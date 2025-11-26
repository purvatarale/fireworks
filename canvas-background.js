(() => {
  const canvas = document.getElementById("canvas-background");

  const context = canvas.getContext("2d");

  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  const numOfStars = 50;
  const random = (min, max) => Math.random() * (max - min) + min;

  const drawBackground = () => {
    const gradient = context.createRadialGradient(0, 0, height, 0, 0, width);
    gradient.addColorStop(0, "#002D62");
    gradient.addColorStop(0.5, "#0066b2");
    gradient.addColorStop(1, "#6699CC");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  };

  const drawForeground = () => {
    context.fillStyle = "#13274F";
    context.fillRect(0, height * 0.95, width, height);

    context.fillStyle = "#002D62";
    context.fillRect(0, height * 0.955, width, height);
  };

  const drawStars = () => {
    let countOfStars = numOfStars;

    context.fillStyle = "#E6E6FA";

    while (countOfStars--) {
      const x = random(25, width - 50);
      const y = random(25, height * 0.5);
      const size = random(1, 4);

      context.fillRect(x, y, size, size);
    }
  };

  drawBackground();
  drawForeground();
  drawStars();
})();
