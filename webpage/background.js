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
    //return (change)
    return ((zyklus*damp)+change)/(zyklus+1)
 }
