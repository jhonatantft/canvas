var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var box = canvas.getContext('2d');

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



var circleArray = [];

for (var i = 0; i < 100; i++) {
    var radius = 30
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5) * 2;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

var circle = new Circle(200, 200, 3, 3, 30);

function animate () {
    requestAnimationFrame(animate);
    box.clearRect(0, 0, innerWidth, innerWidth);

    for ( var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
animate();

// Box
// box.fillStyle = 'rgb(255, 0, 0, 0.5)';
// box.fillRect(100, 100, 100, 100);
// box.fillStyle = 'rgb(0, 255, 0, 0.5)';
// box.fillRect(400, 100, 100, 100);
// box.fillStyle = 'rgb(0, 0, 255, 0.5)';
// box.fillRect(300, 300, 100, 100);

// Line
// box.beginPath();
// box.moveTo(50, 300);
// box.lineTo(300, 100);
// box.lineTo(400, 300);
// box.strokeStyle = '#fa34a3';
// box.stroke();

// // Arc / Circle
// box.beginPath();
// box.arc(300, 300, 30, 0, Math.PI * 2, false);
// box.strokeStyle = 'blue';
// box.stroke();

// for (var i = 0; i < 3000; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     box.beginPath();
//     box.arc(x, y, 30, 0, Math.PI * 2, false);
//     box.strokeStyle = 'blue';
//     box.stroke();
// }