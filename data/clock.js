function drawClock(now) {
    var canvas = document.getElementById("clock");
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = Math.min(centerX, centerY);
    ctx.setTransform(1, 0, 0, 1, 0, 0); 
    ctx.translate(centerX, centerY);
    drawFace(ctx, radius);
    drawTicks(ctx, radius);
    drawHands(ctx, radius, now);
    const formatierer = new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
    });    
    document.getElementById("date").innerHTML = formatierer.format(now);
}

function drawFace(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.95, 0, 2 * Math.PI);
    ctx.fillStyle = "#555555";
    ctx.fill();
}

function drawTicks(ctx, radius) {
    for (let i = 0; i < 60; i++) {
        const angle = (i * Math.PI) / 30;
        ctx.save();
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.strokeStyle = "#ecec5e";
        ctx.lineWidth = (i % 5 === 0) ? radius * 0.018 : radius * 0.01;
        const outer = radius * 0.95;
        const inner = (i % 5 === 0) ? outer - radius * 0.12 : outer - radius * 0.06;
        ctx.moveTo(0, -inner);
        ctx.lineTo(0, -outer);
        ctx.stroke();
        ctx.restore();
    }
}

function drawHands(ctx, radius, now) {

    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    hour = hour % 12;
    const hourAngle = (hour * Math.PI) / 6 + (minute * Math.PI) / (6 * 60) + (second * Math.PI) / (360 * 60);
    const minuteAngle = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
    const secondAngle = (second * Math.PI) / 30;
    drawHand(ctx, hourAngle, radius * 0.5, radius * 0.05, "#ffffff");
    drawHand(ctx, minuteAngle, radius * 0.75, radius * 0.035, "#ffffff");
    // Sekundenzeiger
    const secLength = radius * 0.8;
    drawHand(ctx, secondAngle, secLength, radius * 0.012, "#e95555");
    // Kreis am Sekundenzeiger (50% größer, gefüllt)
    ctx.save();
    ctx.rotate(secondAngle);
    ctx.beginPath();
    ctx.lineWidth = radius * 0.012;
    ctx.strokeStyle = "#ff5252";
    ctx.arc(0, -secLength * 0.8, radius * 0.06, 0, 2 * Math.PI); // <-- größerer Kreis
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawHand(ctx, angle, length, width, color) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "butt";
    ctx.strokeStyle = color;
    ctx.rotate(angle);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.restore();
}

 