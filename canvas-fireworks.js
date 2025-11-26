(() => {
  const canvas = document.getElementById("fireworks");

  const context = canvas.getContext("2d");

  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  const positions = {
    mouseX: 0,
    mouseY: 0,
    anchorX: 0,
    anchorY: 0,
  };

  const fireworks = [];
  const flecks = [];
  const flecks2 = [];
  const flecks3 = [];
  const numberOfFlecks = 25;

  const random = (min, max) => Math.random() * (max - min) + min;

  const getDistance = (x1, y1, x2, y2) => {
    const xDistance = x1 - x2;
    const yDistance = y1 - y2;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  };

  let mouseClicked = false;

  const drawAnchor = () => {
    positions.anchorX = width / 2;
    positions.anchorY = height * 0.9;

    context.clearRect(0, 0, width, height);

    context.save();

    context.translate(positions.anchorX, positions.anchorY);

    context.restore();
  };

  const attachEventListeners = () => {
    canvas.addEventListener("mousemove", (e) => {
      positions.mouseX = e.pageX;
      positions.mouseY = e.pageY;
    });

    canvas.addEventListener("mousedown", () => (mouseClicked = true));
    canvas.addEventListener("mouseup", () => (mouseClicked = false));
  };

  const loop = () => {
    requestAnimationFrame(loop);
    drawAnchor();
    if (mouseClicked) {
      fireworks.push(new Firework());
    }

    let fireworkIndex = fireworks.length;
    while (fireworkIndex--) {
      fireworks[fireworkIndex].draw(fireworkIndex);
    }

    let fleckIndex = flecks.length;
    while (fleckIndex--) {
      flecks[fleckIndex].draw(fleckIndex);
    }

    let fleckIndex2 = flecks2.length;
    while (fleckIndex2--) {
      flecks2[fleckIndex2].draw(fleckIndex2);
    }

    let fleckIndex3 = flecks3.length;
    while (fleckIndex3--) {
      flecks3[fleckIndex3].draw(fleckIndex3);
    }
  };

  window.addEventListener("load", () => {
    attachEventListeners();
    loop();
  });

  class Firework {
    constructor() {
      const init = () => {
        let fireworkLength = 8;

        this.x = positions.anchorX;
        this.y = positions.anchorY;

        this.target_x = positions.mouseX;
        this.target_y = positions.mouseY;

        this.distanceToTarget = getDistance(
          this.x,
          this.y,
          this.target_x,
          this.target_y
        );
        this.distanceTraveled = 0;

        this.coordinates = [];
        this.angle = Math.atan2(
          this.target_y - positions.anchorY,
          this.target_x - positions.anchorX
        );
        this.speed = 15;
        this.friction = 0.99;
        this.hue = random(0, 360);

        while (fireworkLength--) {
          this.coordinates.push([this.x, this.y]);
        }
      };

      this.animate = (index) => {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);

        this.speed *= this.friction;

        let velocity_x = Math.cos(this.angle) * this.speed;
        let velocity_y = Math.sin(this.angle) * this.speed;

        this.distanceTraveled = getDistance(
          positions.anchorX,
          positions.anchorY,
          this.x + velocity_x,
          this.y + velocity_y
        );

        if (this.distanceTraveled >= this.distanceToTarget) {
          let i = numberOfFlecks;

          while (i--) {
            flecks.push(new Fleck(this.target_x, this.target_y));
            flecks2.push(new Fleck(this.target_x + 50, this.target_y - 50));
            flecks3.push(new Fleck(this.target_x - 100, this.target_y - 100));
          }

          fireworks.splice(index, 1);
        } else {
          this.x += velocity_x;
          this.y += velocity_y;
        }
      };

      this.draw = (index) => {
        context.beginPath();
        context.moveTo(
          this.coordinates[this.coordinates.length - 1][0],
          this.coordinates[this.coordinates.length - 1][1]
        );
        context.lineTo(this.x, this.y);

        context.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
        context.stroke();

        this.animate(index);
      };

      init();
    }
  }

  class Fleck {
    constructor(x, y) {
      const init = () => {
        let fleckLength = 7;

        this.x = x;
        this.y = y;

        this.coordinates = [];

        this.angle = random(0, Math.PI * 2);
        this.speed = random(1, 10);

        this.friction = 0.95;
        this.gravity = 2;

        this.hue = random(0, 360);
        this.alpha = 1;
        this.decay = random(0.015, 0.03);

        while (fleckLength--) {
          this.coordinates.push([this.x, this.y]);
        }
      };

      this.animate = (index) => {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);

        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;

        this.alpha -= this.decay;

        if (this.alpha <= this.decay) {
          flecks.splice(index, 1);
          flecks2.splice(index, 1);
          flecks3.splice(index, 1);
        }
      };

      this.draw = (index) => {
        context.beginPath();
        context.moveTo(
          this.coordinates[this.coordinates.length - 1][0],
          this.coordinates[this.coordinates.length - 1][1]
        );
        context.lineTo(this.x, this.y);

        context.strokeStyle = `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
        context.stroke();

        this.animate(index);
      };

      init();
    }
  }
})();
