console.clear();

var timeToWait, minTime = 1000, maxTime = 3000;
function recursion() {
  
    // do something
  
    timeToWait = Math.round(Math.random() * (maxTime - minTime)) + minTime;
    setTimeout(recursion, timeToWait);
}
recursion();
