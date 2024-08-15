console.log('HI&I Helper Functions Loaded');
function hideField(x){          //this hides a field and ensures it is not required - pass just the clientID
    intForm.getElementByClientID(x).show = false;
    if(intForm.getElementByClientID(x).type !== "Section_Type")intForm.getElementByClientID(x).validation.required = false;
}
function showField(x){          //this shows a field - pass just the clientID
    intForm.getElementByClientID(x).show = true;
}
function toggleField(x){        //show a field if hidden, hide a field if shown
    if(intForm.getElementByClientID(x).show === true){
        intForm.getElementByClientID(x).show = false;
        if(intForm.getElementByClientID(x).type !== "Section_Type")intForm.getElementByClientID(x).validation.required = false;
    } else {
        intForm.getElementByClientID(x).show = true;
    }
}
function prefillField(x,y){     //this easily prefills a field with a value - pass the clientID and a value
    intForm.getElementByClientID(x).Answer = y;
}

function blastField(x){         //this reverts a field back to original - pass just the clientID
    intForm.getElementByClientID(x).show = true;
    intForm.getElementByClientID(x).Answer = null;                  //this should handle different question types
    intForm.getElementByClientID(x).validation.required = false;
    intForm.getElementByClientID(x).readonly = false;
}

function requiredField(x){      //this makes a field required and ensures it is shown - pass just the clientID
    intForm.getElementByClientID(x).show = true;
    intForm.getElementByClientID(x).validation.required = true;
}

function hideColumn(x,y){       //this lets you hide a column in a grid - pass the clientID and the column number to hide
    intForm.getElementByClientID(x).gridOptions.columnDefs[y].visible = false;
    intForm.getElementByClientID(x).refreshGrid();
}

function formatNumber(num, decimalPlaces, mode) {
    //this lets you format a number - pass the clientID of the number field, number of decimal places, and t or r for truncate or round
    // If mode is 'r' (round), round the number using Math.round
    
    if (mode === 'r') {
        return parseFloat(intForm.getElementByClientID(num).Answer.toFixed(decimalPlaces));
    }
    // If mode is 't' (truncate), truncate the number to the specified decimal places
    const factor = Math.pow(10, decimalPlaces);
    const truncatedNumber = Math.floor(intForm.getElementByClientID(num).Answer * factor) / factor;
    return truncatedNumber;
}

function isEmpty(x){            //this checks for a field being blank and returns true/false - pass just the clientID
  return (intForm.getElementByClientID(x).Answer === null || 
            intForm.getElementByClientID(x).Answer.length === 0 || 
            intForm.getElementByClientID(x).Answer ===' ' || 
            intForm.getElementByClientID(x).Answer ==='null' ||
            intForm.getElementByClientID(x).Answer === '');
}

function formatCPDate(x) {      //this transforms an Integrify date field into a CP formatted date - pass just the clientID
    var d = new Date(intForm.getElementByClientID(x).Answer);
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
    var grid = intForm.getElementByClientID(x);
    var chkbx = intForm.getElementByClientID(y);
    if (chkbx.Choices[0].Selected === false) {
        for (var i = 0; i < grid.Answer.length; i++) {grid.Answer[i].delete = false;}
    }
    if (chkbx.Choices[0].Selected === true) {
        for (var j = 0; j < grid.Answer.length; j++) {grid.Answer[j].delete = true;}
    }
}
