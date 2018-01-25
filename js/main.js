
window.onload = function () {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
	try {
	    tizen.application.getCurrentApplication().exit();
	} catch (ignore) {
	}
    });

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(xhttp.responseText);
            var bitcoin_usd = response.bid;
            var bitcoin_changes_hour = parseFloat(response.changes.percent.hour).toFixed(2);
            var bitcoin_changes_day = parseFloat(response.changes.percent.day).toFixed(2);
            var bitcoin_changes_week = parseFloat(response.changes.percent.week).toFixed(2);
            var bitcoin_changes_month = parseFloat(response.changes.percent.month).toFixed(2);
            
            document.getElementById("bitcoin").innerHTML = "$" + bitcoin_usd;

            //handle color change (green or red) based on positive/negative change percentage
            handleChangesColor(bitcoin_changes_hour, "changesHour");
            handleChangesColor(bitcoin_changes_day, "changesDay");
            handleChangesColor(bitcoin_changes_week, "changesWeek");
            handleChangesColor(bitcoin_changes_month, "changesMonth");
            
        }
    };
    xhttp.open("GET", "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD", true);
    xhttp.send();
    
    //function to handle the color of change percentage elements
    function handleChangesColor(bitcoin_changes_period, changesPeriodElementID) {
    	 if(bitcoin_changes_period >= 0){
         	document.getElementById(changesPeriodElementID).style.backgroundColor  = "#35d638";
         	document.getElementById(changesPeriodElementID).style.borderColor  = "#35d638";
         	document.getElementById(changesPeriodElementID).innerHTML = "+" + bitcoin_changes_period + "%";
         }
         else{
         	document.getElementById(changesPeriodElementID).style.backgroundColor  = "#ff3c64";
         	document.getElementById(changesPeriodElementID).style.borderColor  = "#ff3c64";
         	document.getElementById(changesPeriodElementID).innerHTML = bitcoin_changes_period + "%";
         }
    }
};
