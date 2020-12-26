function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    var isDarkMode
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
           document.body.style.backgroundColor = "#121212";
        }
         
    }
    else if(m == 30 && m == 60 )
    {
        if(cp == false)
            alertSound.play();
        cp == true;
        document.body.style.backgroundColor = "red";
    }
    else
        document.body.style.backgroundColor = "#121212";
    
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
    
    setTimeout(showTime, 500);
}
var cp = false;
var ccp = false;
var alertSound = new Audio('alert.mp3');
var tick = new Audio('tick.mp3');
Notification.requestPermission(function (result) {
        if(result == 'denied') {
            alert('알림이 차단되어 있습니다.\n플래그 알림이 작동하지 않습니다.\n브라우저의 사이트 설정에서 변경하실 수 있습니다.');
            return false;
        }
});


class FlagAlerter{
    constructor(timeBefore, toggleBtn, tittle, msg)
    {
        this.timeBefore = timeBefore;
        this.toggleBtn = toggleBtn;
        this.tittle = tittle;
        this.msg = msg;
        this.isEnabled =  window.localStorage.getItem("flagAlertEnabled" + timeBefore);
        if (this.isEnabled == null)
            this.isEnabled = false;
        toggleBtn.checked = this.isEnabled;
        toggleBtn.setAttribute("change", changed);

        this.isTrigged = false;
    }
    changed(){
        this.isEnabled = toggleBtn.checked;
        window.localStorage.setItem("flagAlertEnabled" + timeBefore, this.isEnabled);
    }

    //"12/19/21시" 플래그
    tick()
    {
        if(isEnabled == false)
            return;
        var date = new Date();
        var h = date.getHours(); // 0 - 23
        var m = date.getMinutes(); // 0 - 59

        if(m > 1 && m < 10)
            this.isTrigged = false;
        if(this.isTrigged == true)
            return;
        if(timeBefore == 0)
        {
            if(h == 12 || h == 19 || h== 21)
            {
                //trigger alarm.
            }
            else return;
        }
        else// if (timeBefore > 0)
        {
            if(h == 11 || h == 18 || h== 20)
                if(60-timeBefore>=this.timeBefore)
                {
                    //trigger alarm
                }
            else return;
        }
        isTrigged = true;
        new Notification(tittle, {body:msg});
        setTimeout(function(){
                notification.close();
            }, 3000);
    }
}
new FlagAlerter(5,  document.getElementsByClassName("5min")[0], "플래그 5분전", "플래그 레이스 5분 전입니다. 메이플은 켜져있나요?");
new FlagAlerter(3,  document.getElementsByClassName("3min")[0], "플래그 3분전", "플래그 레이스 3분 전입니다. 메이플은 켜져있나요?");
new FlagAlerter(1,  document.getElementsByClassName("1min")[0], "플래그 1분전", "플래그 레이스 1분 전입니다. 캐릭터 바꿔주세요");
new FlagAlerter(0,  document.getElementsByClassName("0min")[0], "플래그 레이스", "플래그 레이스 시작합니다.");


showTime();
