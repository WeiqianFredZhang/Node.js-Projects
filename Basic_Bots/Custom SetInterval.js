console.clear();

var timeToWait, minTime = 1000, maxTime = 3000;
function recursion() {
  
    // do something
  
    // after you write if-else statements, you can customize how long and what you do in every recursion.
  
    timeToWait = Math.round(Math.random() * (maxTime - minTime)) + minTime;
    setTimeout(recursion, timeToWait);
}
recursion();






// a useful but simple built-in function

const oneMinute = 60000;
function mystery(){
    // do something
    // do another thing
}
setInterval(mystery(),oneMinute);  // the function mystery() runs once per minute


// the above is the same as
setInterval(()=>{
    // do something
    // do another thing
},oneMinute);
