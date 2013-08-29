//Add a new lap time 
function AddATime(row) {
    //declare variables
    var table = document.getElementById("myTable");
    var thisRow = table.rows[row];
    var numberRow = row - 1;
    var NumberLaps = parseInt($('#NumberOfLaps').val());
    var rowLength = thisRow.cells.length;
    var tdid = thisRow.cells.length - 2;
    var newTDid = "td" + row + "-" + tdid;

    if (hmsToSecondsOnly(document.clockform.clock.value) == 0) {
        alert('cannot add a time before you start the clock');  //cannot add a time before you start the clock

    }
    else {
        //--check to see if the runner has finished or DNF, if not add a new run time --//
        if (4 + NumberLaps == rowLength || thisRow.style.display == 'none') {   //if number of laps = runners laps
            alert('cannot add any more laps');  //race is over for this runner, throw an error
           
        }
        else {                                                  //else, add a new run time for this runner

            runTime(row);                              //function to add a new run time

            createTotalHeading(row);         //function to check to see if this is final lap, if so add final time
        }
    }
}
 
//create a new heading
function createHeading() {
    //declare variables
        var table = document.getElementById("myTable");               //set the table
        var lapNumber = (table.rows[0].cells.length - 2);             //the current lap number
        var tr = document.getElementById('myTable').tHead.children[0],//the table header
        th = document.createElement('td');                            //create a new td element
        th.innerHTML = "<b>Lap #" + lapNumber + "</b>";               //put the current lap number inside the td
        tr.appendChild(th);                                           //add the lap number to the header
}

//mark the runner for DNF with timeout
function setForDNF(x) {
    var y = "newCheckbox" + x;                          //declare the check box
    var z = document.getElementById(y);                 //grab the checkbox element
    $(z).prop('checked', true);                         //set the checkbox to check
    setTimeout(function () { $(z).prop('checked', false); }, 5000)  //5 seconds later uncheck it
}

//change the button color
function ChangeColor(x) {
    //declare variables
    var y = document.getElementById(x);                 //grab the button element  
    var day = y.style.backgroundColor;                  //set a case variable
    switch (day) {                                      
        case '':                                        //if the button color is default
            y.style.backgroundColor = 'yellow';         //change the button color to yellow
            break;
        case 'yellow':                                  //if the button color is yellow
            y.style.backgroundColor = 'orange';         //change the button color to orange
            break;
        case 'orange':                                  //if the button color is orange
            y.style.backgroundColor = 'purple';         //change the button color to purple
            break;
        case 'purple':                                  //if the button color is purple
            y.style.backgroundColor = 'red';            //change the button color to red
            break;
        case 'red':                                     //if the button color is red
                                                        //do nothing.
            break;
    }
    blinkingButton(x);                                  //function to blink the button when finished
}

//add the remaining lap times
function AddRemaining() {
    //declare variables
        var table = document.getElementById('myTable');     //set the table
        var heading = table.rows[0];                        //set the table header
        var rowCount = table.rows.length;                   //count of number of rows

    //--
        for (var i = 1; i < rowCount; i++)                  //go through all the rows
        {
            var buttonNumber = "button" + i;                //set all the button numbers for remaining
            var bbuttonNumber = "bbutton" + i;              //set all the big button numbers for remaining
            var row = table.rows[i];                        //set the row number for remaining
    //--
            if (heading.cells.length > row.cells.length && row.style.display == '') {  //if the header is longer than current row
                AddATime(i);
                setLapNumber(i);                             //function to set the lap number for remaining
            }
        }
        blinkingButton("RemainingButton");                   //function to blink the remaining button
}

//blinking button function
function blinkingButton(x) {
    //declare the variables
    var y = document.getElementById(x);                     //set the button id

    //--function to blink--//
    for (var i = 0; i < 20; i++) {
        $(y).stop().animate({ borderColor: "#3737A2" }, 250)
          .animate({ borderColor: "#FFFFFF" }, 250);
    }
}

//create a new line on the array box for current runner
function addMyTimeArray(x) {
    //declare variables
        var pid = "newInput" + x;                               //set the p id attribute
        var pid2 = "newInput-2" + x;                               //set the p id attribute
        
        var timeBox = document.getElementById("myTime-box");    //create a var for the array box
        var pText = document.getElementById(pid);               //create a var for the p

        var timeBox2 = document.getElementById("myTime-box2");    //create a var for the seconds box
        var pText2 = document.getElementById(pid2);               //create a var for the p
        
        if (!pText)
        {
        var element2 = document.createElement("p");             //create a new p element
        element2.type = "text";                                 //set the element type to text
        element2.setAttribute('id', pid);                       //set the id attribute
        timeBox.appendChild(element2);                          //append element to div
        
        var element3 = document.createElement("p");             //create a new p element
        element3.type = "text";                                 //set the element type to text
        element3.setAttribute('id', pid2);                       //set the id attribute
        timeBox2.appendChild(element3);                          //append element to div
        
             pushToArray(x);                                    //function to push the current time to array
    }
    else
    {
            pushToArray(x);                                 //function to push the current time to array
    }
}

//--Leave this here--//
var x = [];
var secondsArray = [];
for (i = 1; i <= 100 ; i++) {
    x[i] = [];
    secondsArray[i] = [];
};
//--Leave this here--//

//push the time to the current runners array
function pushToArray(y) {
    //declare variables
        var pid = "newInput" + y;                       //set the p id attribute
        var pText = document.getElementById(pid);       //create a var for the p 

        var pid2 = "newInput-2" + y;                       //set the p id attribute
        var pText2 = document.getElementById(pid2);       //create a var for the p 

        var runnerNumber = "<b>Runner #" + y + ":</b> "; //set the runner number
    //--push to the runners array--//
        var time = new Date();                          //create a new time
        x[y].push(time);                                //push the time to the current runners array
        pText.innerHTML = runnerNumber + x[y];          //push the runners array to the array box
}

//push the runners time to the time table
function runTime(y) {
    //declare variables
    
        var buttonNumber = "button" + y;
        var bbuttonNumber = "bbutton" + y;
        var table = document.getElementById('myTable');                  //set the table
        var thisRow = table.rows[y];                                     //set the current row
        var w = thisRow.cells.length;                                   //current rows length
        var T = w - 3;                                                   //this lap
        var z = T;                                                       //this array
        var q = z - 1;                                                  //previous array
        var row = y;
        var minTime = $('#minimumTime').val();                          //set the minimum time
        var currentTime = document.clockform.clock.value;               //set the current time
        
    //--function to push the time to the time table--//
        if (z <= 0) {              //if this is the first lap
        
            if (hmsToSecondsOnly(currentTime) < hmsToSecondsOnly(minTime)) { //if the current time < minimum time
                    alert("cannot add a time lower than minimum time"); //throw an error message
                }
            else {      //else, add the time
                    addMyTimeArray(y);                            //function to add the time to the array box
                    var timeBox = thisRow.insertCell(-1);               //insert a new cell on this row
                    timeBox.innerHTML = document.clockform.clock.value; //set the cell = to the current time
                    secondsArray[y].push(document.clockform.clock.value);                                //push the time to the current runners array
                    var secondsbox = "newInput-2" + y;
                    document.getElementById(secondsbox).innerHTML = "<b>Runner #" + y + ":</b> " + secondsArray[y];
                    ChangeColor(buttonNumber);                          //function to change the button color
                    ChangeColor(bbuttonNumber);                         //function to change the big button color
                    setForDNF(y);                                     //function to set the runner for DNF
               }
        }
        else {
            var w = thisRow.cells.length;                                   //current rows length
            var T = w - 3;                                                   //this lap
            var thisTime = hmsToSecondsOnly(minTime);
            var foo = T + 1;
            var currentMinTime = thisTime * foo;
            var newMintime = parseInt(currentMinTime);
            var thisLapTime = parseInt(thisTime);

            //--get the time--//
            if (hmsToSecondsOnly(currentTime) < currentMinTime) {
                    alert("cannot add a time lower than minimum time");
                }
            else {
                addMyTimeArray(y);                            //function to add the time to the array box
                var a = x[y][z].getTime();
                var b = x[y][q].getTime();
                var c = (a - b) / 1000;
                var D = rectime(c);
            //--push the runners time to the seconds box--//
                secondsArray[y].push(D);                                //push the time to the current runners array
                var secondsbox = "newInput-2" + y;
                document.getElementById(secondsbox).innerHTML = "<b>Runner #" + y + ":</b> " + secondsArray[y];
                    //--push the time to the runner's row--//
                        var timeBox2 = thisRow.insertCell(-1);   //create the new cell at the end of the row
                        timeBox2.innerHTML = D;
                        ChangeColor(buttonNumber);                          //function to change the button color
                        ChangeColor(bbuttonNumber);                      //function to change the big button color
                        setForDNF(y);                                     //function to set the runner for DNF
                }
            }
        var heading = table.rows[0];
        if (heading.cells.length < thisRow.cells.length)
            //check to see if the Lap # header is created, if so do nothing - if not create a new Lap # header
        {
            createHeading();
        }
        
   //#end-region//
}

//create the "Total Time" header when the race is over
function createTotalHeading(row) {
    //declare variables
        var table = document.getElementById("myTable");
        var thisRow = table.rows[row];
        var rowLength = thisRow.cells.length;
        var NumberLaps = parseInt($('#NumberOfLaps').val());
        var heading = table.rows[0];
    //--create the total time heading--//
        if (3 + NumberLaps == rowLength) {                                          //if this is the last lap
            var K = thisRow.insertCell(-1);                 //insert a new cell at the end of the row, after final lap
            if (hmsToSecondsOnly(document.clockform.clock.value) == 0) {
                K.innerHTML = "Error";                       //push the total time to the cell
            }
        else{
            K.innerHTML = document.clockform.clock.value;                           //push the total time to the cell
        }
        if (heading.cells.length < thisRow.cells.length)
            //check to see if the Lap # header is created, if so do nothing - if not create a new Lap # header
        {
            var tr = document.getElementById('myTable').tHead.children[0],      //set the table
            th = document.createElement('td');                                  //create a new heading cell
            th.innerHTML = "Total Time";                                  //push the text "total time" to the cell
            tr.appendChild(th);                                                 //add the cell to the header
        }
    }
}
 
//convert the time from milliseconds to seconds
function rectime(sec) {
    var hr = Math.floor(sec / 3600);
    var min = Math.floor((sec - (hr * 3600)) / 60);
    sec -= ((hr * 3600) + (min * 60));
    sec += ''; min += '';
    while (hr.length < 2) { hr = '0' + hr; }
    while (min.length < 2) { min = '0' + min; }
    while (sec.length < 2) { sec = '0' + sec; }
    hr = (hr) ? ':' + hr : '';
    return hr + '00:' + min + ':' + sec;
}

//update the total number of Laps
function updateLaps() {

    //declare variables
    var lapsLeft1 = parseInt($('#NumberOfLaps').val());

    //--set the total number of laps--//
        if (!lapsLeft1) {
            var table = document.getElementById('myTable');                 //set the table
            var numOfVisibleColumns = table.rows[0].cells.length;           //get the number of visible columns, 
            var lapsLeft2 = numOfVisibleColumns - 3;                        //set the number of laps
            document.getElementById("lapsTotal").innerHTML = lapsLeft2;     //push the total number of laps 
        }
        else {
            document.getElementById("lapsTotal").innerHTML = lapsLeft1;     //push the total number of laps 
        }
}

//set the remaining laps for current runner
function setLapNumber(x) {
    var table = document.getElementById('myTable');                             //set the table
    var w = table.rows[x].cells.length;                                         //get the number of rows
    var thisRow = table.rows[x];
    var Lap = w - 3;                                                            //calculate the number of laps
    var labelNumber = "buttonLabel" + x;                                        //set the button label id
    var y = document.getElementById(labelNumber);                               //get the button label by id
    var lapsLeft1 = parseInt($('#NumberOfLaps').val());                         //get the number of laps
    var remainingLaps = lapsLeft1 - Lap;                                        //calculate the remaining laps
    if (thisRow.style.display == 'none') {   //if number of laps = runners laps
        var Buttonid = "buttonLabel" + row;
        document.getElementById(Buttonid).innerHTML = "DNF";
    }
    else {
        if (!lapsLeft1 || remainingLaps < 0) {
            y.innerHTML = "Remaining: 0";                               //push the remaining laps to the button label
        }
        else {
            y.innerHTML = "Remaining: " + remainingLaps;                //push the remaining laps to the button label
        }
    }

}

//convert the time from HH:mm:ss to seconds
function hmsToSecondsOnly(str) {
    var p = str.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
}

