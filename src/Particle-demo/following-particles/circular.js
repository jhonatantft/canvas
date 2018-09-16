var canvas = document.querySelector('canvas');
var box = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

var colors = [
    '#2185c5',
    '#7ecefd',
    '#fff6e5',
    '#FF69B4',
    '#69ffb4'
];

addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

addEventListener('click', function () {
    box.clearRect(0, 0, innerWidth, innerWidth);
})

function randomIntFromRange (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor (colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function Particle (x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    // this.distanceFromCenter = randomIntFromRange(50, 120);
    this.distanceFromCenter = {
        x: randomIntFromRange(50, 120),
        y: randomIntFromRange(50, 120)
    };

    this.lastMousePosition = {
        x: x,
        y: y
    }
    
    this.update = function () {
        var lastPoint = {
            x: this.x,
            y: this.y
        }
        this.radians += this.velocity;

        // Drag effect
        this.lastMousePosition.x += (mouse.x - this.lastMousePosition.x) * 0.05;
        this.lastMousePosition.y += (mouse.y - this.lastMousePosition.y) * 0.05;

        this.x = this.lastMousePosition.x + Math.cos(this.radians) * this.distanceFromCenter.x;
        this.y = this.lastMousePosition.y + Math.sin(this.radians) * this.distanceFromCenter.y;

        this.draw(lastPoint);
    }

    this.draw = function (lastPoint) {
        box.beginPath();
        // box.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // box.fillStyle = this.color;
        // box.fill();
        box.strokeStyle = this.color;
        box.lineWidth = this.radius;
        box.moveTo(lastPoint.x, lastPoint.y);
        box.lineTo(this.x, this.y);
        box.stroke()
        box.closePath();
    }
}

var particles;
function init() {
    particles = [];

    for (var i = 0; i < 50; i++) {
        var radius = (Math.random() * 2) + 1;
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
    }
}

function animate () {
    requestAnimationFrame(animate);
    box.fillStyle = 'rgba(255, 255, 255, 0.05)';
    box.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(function(particle) {
        particle.update();
    });
}

init();
animate();

function Circle (x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function () {
        box.beginPath();
        box.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        box.strokeStyle = 'blue';
        box.stroke();
    };

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - radius < 0) {
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > innerHeight || this.y - radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };
}
