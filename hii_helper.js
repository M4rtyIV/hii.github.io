/**********************************************
 * 
 * HI&I HELPER FUNCTIONS START
 * 
 * *******************************************/
function getField(clientID){                    //this is the most amazing function ever to prevent you from having to put intForm.getElementByClientID every time
    return intForm.getElementByClientID(clientID);
}

function hideField(x){          //this hides a field and ensures it is not required - pass just the clientID
    getField(x).show = false;
    if(getField(x).type !== "Section_Type")getField(x).validation.required = false;
}
function showField(x){          //this shows a field - pass just the clientID
    getField(x).show = true;
}
function toggleField(x){        //show a field if hidden, hide a field if shown
    if(getField(x).show === true){
        getField(x).show = false;
        if(getField(x).type !== "Section_Type")getField(x).validation.required = false;
    } else {
        getField(x).show = true;
    }
}
function prefillField(x,y){     //this easily prefills a field with a value - pass the clientID and a value
    getField(x).Answer = y;
}

function blastField(x){         //this reverts a field back to original - pass just the clientID
    getField(x).show = true;
    getField(x).Answer = null;                  //this should handle different question types
    getField(x).validation.required = false;
    getField(x).readonly = false;
}

function requiredField(x){      //this makes a field required and ensures it is shown - pass just the clientID
    getField(x).show = true;
    getField(x).validation.required = true;
}

function hideColumn(x,y){       //this lets you hide a column in a grid - pass the clientID and the column number to hide
    getField(x).gridOptions.columnDefs[y].visible = false;
    getField(x).refreshGrid();
}

function formatNumber(num, decimalPlaces, mode) {
    //this lets you format a number - pass the clientID of the number field, number of decimal places, and t or r for truncate or round
    // If mode is 'r' (round), round the number using Math.round
    
    if (mode === 'r') {
        return parseFloat(getField(num).Answer.toFixed(decimalPlaces));
    }
    // If mode is 't' (truncate), truncate the number to the specified decimal places
    const factor = Math.pow(10, decimalPlaces);
    const truncatedNumber = Math.floor(getField(num).Answer * factor) / factor;
    return truncatedNumber;
}

function isEmpty(x){            //this checks for a field being blank and returns true/false - pass just the clientID
  return (getField(x).Answer === null || 
            getField(x).Answer.length === 0 || 
            getField(x).Answer ===' ' || 
            getField(x).Answer ==='null' ||
            getField(x).Answer === '');
}

function formatCPDate(x) {      //this transforms an Integrify date field into a CP formatted date - pass just the clientID
    var d = new Date(getField(x).Answer);
    var myYear = d.getFullYear();
    var intMonth = d.getMonth();
    intMonth = intMonth + 1;
    var myMonth;
    if (intMonth < 10)
        myMonth = '0' + intMonth;
    else
        myMonth = intMonth;

    var intDay = d.getDate();
    var myDay;
    if (intDay < 10)
        myDay = '0' + intDay;
    else
        myDay = intDay;
    return myYear + '-' + myMonth + '-' + myDay + 'T00:00:00.0';
}

function selectAllChkbx(x,y){       //this lets you select/unselect all via a separate checkbox control - pass ClientID of grid and checkbox
    var grid = getField(x);
    var chkbx = getField(y);
    if (chkbx.Choices[0].Selected === false) {
        for (var i = 0; i < grid.Answer.length; i++) {grid.Answer[i].delete = false;}
    }
    if (chkbx.Choices[0].Selected === true) {
        for (var j = 0; j < grid.Answer.length; j++) {grid.Answer[j].delete = true;}
    }
}

function dynamicGridHeight(x,y){              //need to pass grid and response.data.Items.length
    if(y<5){                               //adjust the height of the grid based on size
        getField(x).gridOptions.minRowsToShow = y + 1;
        getField(x).refreshGrid(); 
    } else {
        getField(x).gridOptions.minRowsToShow = 6;
        getField(x).refreshGrid(); 
    }    
}

function clearGrid(x){
    getField(x).Answer=[];
    getField(x).gridOptions.data=[];
    getField(x).refreshGrid();
}
console.log('%cHelper script written by HI&I for the sole use of its clients. This script should not be shared outside of HI&I clients except with the written permission of HI&I personnel.','color:lime; font-size:9px;');
/**********************************************
 * 
 * HI&I HELPER FUNCTIONS END
 * 
 * *******************************************/
