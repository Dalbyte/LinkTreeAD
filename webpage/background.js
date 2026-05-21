// Get all Backgroundlayer
var layer = document.querySelectorAll('.background');
//console.log(layer);



// Mous Parallax add
document.addEventListener("mousemove", parallaxmaus);
function parallaxmaus(e){
  //console.log("mousemove");
  layer.forEach(layer => {
    let speed = layer.getAttribute('speed');
    const x =  (e.pageX.map(0,window.innerWidth,-window.innerWidth/2,window.innerWidth/2) * speed)/10;
    const y = (e.pageY.map(0,window.innerHeight,-window.innerHeight/2,window.innerHeight/2) * speed)/10;
    //console.log(`translateX(${x}px), translateY(${y}px)`)
    //console.log("Y: "+e.pageY)
    layer.style.transform = `translate(${x}px,${y}px)`;
  })
}


// Gyro
  
  // Request permission for iOS 13+ devices
  if (
    DeviceMotionEvent &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    DeviceMotionEvent.requestPermission();
  }


// Event
  window.addEventListener("deviceorientation", parallaxgyro);

  function parallaxgyro(event){
  // console.log("gyro");

  layer.forEach(layer => {
    const speed = layer.getAttribute('speed')/3;

    // damping
    let zyklen = 140;

    dampY = damping(zyklen, dampY, event.beta);
    dampX = damping(zyklen, dampX, event.gamma);

    // console.log("dampY :"+dampY);
    // console.log("dampX :"+dampX);

    const y = dampY* speed;
    const x = dampX* speed;
    //console.log(`translateX(${x}px), translateY(${y}px)`)
    layer.style.transform = `translate(${-x}px,${-y}px)`;
  })

  }


  Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

var dampX = 0;
var dampY = 0;

function damping(zyklus, damp, change) {
    return ((zyklus*damp)+change)/(zyklus+1)
}

// ── Depth of Field ─────────────────────────────────────
var dofTime = 0;

function updateDOF() {
    dofTime += 0.004;

    // two overlapping sine waves = organic, non-repeating focus shift
    var focusDepth = 5.5
        + Math.sin(dofTime * 0.8) * 3.5
        + Math.sin(dofTime * 1.7) * 1.5;

    layer.forEach(function(el) {
        var speed = parseFloat(el.getAttribute('speed'));
        var distance = Math.abs(speed - focusDepth);
        var blur = Math.pow(distance, 1.3) * 1.6;
        el.style.filter = 'blur(' + blur.toFixed(2) + 'px)';
    });

    requestAnimationFrame(updateDOF);
}

updateDOF();
