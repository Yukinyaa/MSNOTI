
function toBoolean(str) {
    if(str === null)
        return null;
    if(typeof str === 'boolean')
        return str;
    if (typeof str === 'undefined') {
        return false;
    } else if (typeof str === 'string') {           
        switch (str.toLowerCase()) {
        case 'false':
        case 'no':
        case '0':
        case "":
            return false;
        default:
            return true;
        }
    } else if (typeof str === 'number') {
        return str !== 0
    }
    else {return true;}
}

class FlagAlerter{
    constructor(timeBefore, toggleBtn, tittle, msg)
    {
        this.timeBefore = timeBefore;
        this.toggleBtn = toggleBtn;
        this.tittle = tittle;
        this.msg = msg;
        this.isEnabled = toBoolean(window.localStorage.getItem("flagAlertEnabled" + this.timeBefore));
        if (this.isEnabled == null)
            this.isEnabled = false;
        toggleBtn.checked = this.isEnabled;


        this.isTrigged = false;
    }

    //"12/19/21시" 플래그
    tick()
    {
        if(this.toggleBtn.checked != this.isEnabled)
        {
            this.isEnabled = this.toggleBtn.checked;
            window.localStorage.setItem("flagAlertEnabled" + this.timeBefore, this.toggleBtn.checked);
        }

        
        if(this.isEnabled == false)
            return;
        var date = new Date();
        var h = date.getHours(); // 0 - 23
        var m = date.getMinutes(); // 0 - 59

        if(m == 1)
            this.isTrigged = false;
        if(this.isTrigged == true)
            return;
        if(this.timeBefore == 0)
        {
            if((h == 12 || h == 19 || h== 21)&&(m==0)){}// trigger alarm.
            else return;
        }
        else// if timeBefore > 0
        {
            if(h == 11 || h == 18 || h== 20 && (60-this.timeBefore == m)){}// trigger alarm
            else return;
        }
        this.isTrigged = true;
        var notification = new Notification(this.tittle, {body:this.msg});
        setTimeout(function(){
                notification.close();
            }, 3000);
    }
}
var a5 = new FlagAlerter(5,  document.getElementsByClassName("5min")[0], "플래그 5분전", "플래그 레이스 5분 전입니다. 메이플은 켜져있나요?");
var a3 = new FlagAlerter(3,  document.getElementsByClassName("3min")[0], "플래그 3분전", "플래그 레이스 3분 전입니다. 메이플은 켜져있나요?");
var a1 = new FlagAlerter(1,  document.getElementsByClassName("1min")[0], "플래그 1분전", "플래그 레이스 1분 전입니다. 캐릭터 바꿔주세요");
var a0 = new FlagAlerter(0,  document.getElementsByClassName("0min")[0], "플래그 레이스", "플래그 레이스 시작합니다.");
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
    a5.tick();    
    a3.tick();
    a1.tick();
    a0.tick();

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
