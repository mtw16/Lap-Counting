//Add the runners when the app loads
function createRunners() {
    //declare variables
    var NumberRunners = parseInt($('#NumberOfRunners').val());              
    var NumberLaps = parseInt($('#NumberOfLaps').val());

    //--set the number of runners and create the runners on the table--//
        if (NumberRunners >= 100) {                         //check value entered for # of runners
            alert("cannot add more than 100 runners");      //if > 100 runners, throw an error
        }
        else {
            $('.configuration-save-box').effect('drop')     //Hide the save button and run code
            for (var i = 0; i < NumberRunners; i++) {       //this function loops = the number of runners
                addRunner();
            }
            blinkingButton("returnbutton");                 //blink Go Race! button when the app is ready
        }
}

//show the main body of the document
function showBody() {
    $(".reorderSetup").fadeToggle();   
    $(".buttons-box").fadeToggle();
    $(".createRunnersButton").hide();
    $('.container').fadeToggle('fast');
}

//Add a runner 
function addRunner() {           
    //declare variables
        var table = document.getElementById('myTable');
        var columnCount = table.rows[0].cells.length;           //count the no. of columns in table 
        var rowCount = table.rows.length;                       //count of table rows including header
        var rowNumber = rowCount - 1;                           //count of table rows minus the header
        var bbuttonid = "bbutton" + rowNumber;                  //the big button id
        var buttonid = "button" + rowCount;                     //the small button id
        var buttonNumber = rowCount;                            //set the value on the button
        var checkBoxid = "newCheckbox" + rowCount;              //the checkbox id
        var runnerNumber = "Runner #" + rowCount;               //the runner's number
        var row = table.insertRow(rowCount);                    //insert a row at the end of the table 
        row.setAttribute('class', 'hidethis');                  //set the class attribute of the row

    //--create a new check box--//
        var cell1 = row.insertCell(0);                          //create a new cell in current row, position 0 
        var element1 = document.createElement("input");         //create a new element           
        element1.type = "checkbox";                             //set the element type to checkbox
        element1.setAttribute('id', checkBoxid);                //set the id attribute for the checkbox        
        cell1.appendChild(element1);                            //append element to cell

    //--create a new button--//
        var cell3 = row.insertCell(1);                          //create a new cell in current row, position 1
        var element3 = document.createElement("input");         //create a new element 
        element3.type = "button";                               //set the element type to button
        element3.setAttribute('id', buttonid);                  //set the id attribute
        element3.setAttribute('class', buttonid);               //set the class attribute 
        element3.onclick = function () {                        //create the onclick function
            AddATime(rowCount);
            setLapNumber(rowCount);
        };
        if (buttonNumber < 10) {                                //set the value on the button 
            element3.setAttribute("value", "0" + buttonNumber); //if the button # is < 10, add a leading '0'
        }
        else {
            element3.setAttribute("value", buttonNumber);       //else, add button number
        }
        cell3.appendChild(element3);                            //append element to cell

    //--create a label for runner #--//
        var cell2 = row.insertCell(2);                          //create a new cell in current row, position 2
        var element2 = document.createElement("p");             //create a new p element
        element2.type = "text";                                 //set the element type to text
        element2.setAttribute('id', 'newInput');                //set the id attribute
        cell2.appendChild(element2);                            //append element to cell
        element2.innerHTML = runnerNumber;                      //set the inner text of the element
        element2.setAttribute("style", "width:85px;");          //set the width of the element

    //--run ending code--//
        updateAthletes();                                       //function to update the number of athletes
        runnerButton(rowCount);                                 //function to create a new Big runner button
}

//create the big runner button
function runnerButton(B) {
    //declare variables
        var buttonid = "button" + B;
        var bbuttonid = "bbutton" + B;
        var labelid = "buttonLabel" + B;
        var runnerNumber = "Runner #" + B;
        var buttonzBox = document.getElementById('mainTable-box');

    //--create a new div --//
        var element1 = document.createElement("div");           //create the div element                    
        element1.setAttribute("id", B);                         //set the div id
        element1.setAttribute("class", "bbutton-box");          //set the div class
        element1.setAttribute("style", "width:90px; height:125px; float:left;");//set the div style
        buttonzBox.appendChild(element1);                       //append element to the mainTable-box

    //--create a new span--//
        var element1a = document.createElement("span");        //create a new element
        element1a.setAttribute('id', "remainingLaps");         //set the id attribute

    //--create a new text --//
        var element2 = document.createElement("text");         //create a new text element
        element2.setAttribute("id", labelid);                  //set the id for the text
        element2.setAttribute("class", "buttonPLabel");        //set the class 
        element2.innerHTML = runnerNumber;                     //add the runner number
    
    //--create a new span --//
        var element3 = document.createElement("span");         //create a new element
        element3.setAttribute('id', "buttonNumber");           //set the id attribute

    //--create a new button --//
        var element4 = document.createElement("button");       //create a new element 
        element4.setAttribute('id', bbuttonid);                //set the id attribute
        if (B < 10) {
            element4.innerHTML = "0" + B ;                     //set the text on the button   
        }
        else {
            element4.innerHTML =  B;                           //set the text on the button
        }
        element4.setAttribute("style", "width:90px; height:125px;"); //set the style attribute
        element4.onclick = function () {                        // set the on click functions
            AddATime(B);                                        //function to Add a new time for this runner
            updateLaps()                                        //function to update the total # of laps
            setLapNumber(B);                                    //function to Update # of remaining laps

        };
    //--add all of the elements to the mainTable-box--//
        element1.appendChild(element3);                         //add the first span to the mainTable-box
        element3.appendChild(element4);                         //add the button to the first span
        element1.appendChild(element1a);                        //add the second span to the mainTable-box
        element1a.appendChild(element2);                        //add the text to the second span
 };   

//delete the selected rows from table
function deleteSelectedRows() {
    //declare variables
        var table = document.getElementById('myTable');             
        var rowCount = table.rows.length;

    //--loop through each row, and select the row that is checked for DNF --//
        for (var i = 0; i < rowCount; i++) {                    //loop through the rows
        //declare variables
            var row = table.rows[i];
            var newnumber = i;
            var newButton = "bbutton" + i;
            var chkbox = row.cells[0].childNodes[0];

            //--if the check box is checked,  delete it --//
            if (null != chkbox && true == chkbox.checked) {
                nbRows = row.cells[0].rowSpan;                  // the number of row to delete
                for (var j = 0; j < nbRows; j++) {              //delete the selected rows
                    if (row.style.display == 'none') {          //if the row is hidden, skip it
                        row.style.display = '';
                        alert("something went wrong!");
                    } else {
                        row.style.display = 'none';             //else, set the display to none (delete it)
                        chkbox.checked = false;                 //reset the check box  
                        document.getElementById(newButton).style.backgroundColor = 'red';//set its button color
                        var Buttonid = "buttonLabel" + i;
                        document.getElementById(Buttonid).innerHTML = "DNF";
                    }
                    rowCount--;                                 //decrease row count by one
                }

                i--;
            }
        }
   
}

//update the total number of athletes
function updateAthletes() {
    //declare variables
    var numOfVisibleRows = $('tr:visible').length;              //number of visible rows including header
    var rowsLeft = numOfVisibleRows - 1;                        //number of visible rows without header
    document.getElementById("athletesTotal").innerHTML = rowsLeft; //set the total number of athletes
    updateLaps()                                                //function to update the total number of laps
}