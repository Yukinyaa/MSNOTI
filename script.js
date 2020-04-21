function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if((m == 45 || m == 15) && s == 0)
    {
        document.body.style.backgroundColor = "pink";
        tick.play();
    }
    else if( (m == 29 || m == 59) && s > 30 )
    {
        cp == false;
        if(s % 2 == 0)
        {
            tick.play();
            document.body.style.backgroundColor = "pink";
        }
        else
        {
           document.body.style.backgroundColor = "white";
        }
         
    }
    else if(m == 30 && m == 60 )
    {
        if(cp == false)
            alert.play();
        cp == true;
        document.body.style.backgroundColor = "red";
    }
    else
            document.body.style.backgroundColor = "white";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
    
    setTimeout(showTime, 1000);
}
var cp = false;
var ccp = false;
var alert = new Audio('alert.mp3');
var tick = new Audio('tick.mp3');

showTime();
