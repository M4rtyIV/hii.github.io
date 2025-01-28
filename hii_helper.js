/**********************************************
 * HI&I HELPER FUNCTIONS START
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
    if(getField(x).QuestionType === 'DbCheckbox'){
        for(var cb=0; cb<getField(x).Choices.length; cb++){
            getField(x).Choices[cb].Selected=false;
        }
    }
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
    return myYear + '-' + myMonth + '-' + myDay + 'T01:00:00.0';
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

function dynamicGridHeight(x,y,z){              //need to pass grid and response.data.Items.length
    if(y<z){                               //adjust the height of the grid based on size
        getField(x).gridOptions.minRowsToShow = y + 1;
        getField(x).refreshGrid(); 
    } else {
        getField(x).gridOptions.minRowsToShow = z;
        getField(x).refreshGrid(); 
    }    
}

function clearGrid(x){
    getField(x).Answer=[];
    getField(x).gridOptions.data=[];
    getField(x).refreshGrid();
}

function getMappings(x){
    for(var i=0; i<getField(x).dbSettings.mappings.length; i++){
        console.log('%c'+x+' mapping ','color:red; font-weight: bold;','Field:', getField(x).dbSettings.mappings[i].ClientID, 'DB_Column:', getField(x).dbSettings.mappings[i].ColumnName);
    }
}

function getFormLayoutItems(){
    for(var x=0; x<intForm.layout.length; x++){                                     //write Section and FormText client IDs to console.
        console.log('%cSection:','color:orange; font-weight:bold;',intForm.layout[x].Label,': ',intForm.layout[x].ClientID);
        for(var y=0; y<intForm.layout[x].contents.length; y++){
            for(var z=0; z<intForm.layout[x].contents[y].columns.length; z++){
                for(var a=0; a<intForm.layout[x].contents[y].columns[z].items.length; a++){
                    if(intForm.layout[x].contents[y].columns[z].items[a].QuestionType==='FormText'){
                        console.log('%cFormText:','color:white; font-weight:bold;',intForm.layout[x].contents[y].columns[z].items[a].ClientID, intForm.layout[x].contents[y].columns[z].items[a].formtext);
                    }
                    if(intForm.layout[x].contents[y].columns[z].items[a].QuestionType==='Button'){
                        console.log('%cButton:','color:lightgreen; font-weight:bold;',intForm.layout[x].contents[y].columns[z].items[a].ClientID);
                    }
                }
            }
        }
    }
}

function getFormSections(){
    for(var x=0; x<intForm.layout.length; x++){                                     //write Section Info to console.
        console.log('%cSection:','color:orange; font-weight:bold;',intForm.layout[x].Label,': ',intForm.layout[x].ClientID);
    }
}

function getFormText(){
    for(var x=0; x<intForm.layout.length; x++){                                     //write FormText to console.
        for(var y=0; y<intForm.layout[x].contents.length; y++){
            for(var z=0; z<intForm.layout[x].contents[y].columns.length; z++){
                for(var a=0; a<intForm.layout[x].contents[y].columns[z].items.length; a++){
                    if(intForm.layout[x].contents[y].columns[z].items[a].QuestionType==='FormText'){
                        console.log('%cFormText:','color:white; font-weight:bold;',intForm.layout[x].contents[y].columns[z].items[a].ClientID, intForm.layout[x].contents[y].columns[z].items[a].formtext);
                    }
                }
            }
        }
    }
}

function getFormButtons(){
    for(var x=0; x<intForm.layout.length; x++){                                     //write Section and Buttons to console.
        console.log('%cSection:','color:orange; font-weight:bold;',intForm.layout[x].Label);
        for(var y=0; y<intForm.layout[x].contents.length; y++){
            for(var z=0; z<intForm.layout[x].contents[y].columns.length; z++){
                for(var a=0; a<intForm.layout[x].contents[y].columns[z].items.length; a++){
                    if(intForm.layout[x].contents[y].columns[z].items[a].QuestionType==='Button'){
                        console.log('%cButton:','color:lightgreen; font-weight:bold;',intForm.layout[x].contents[y].columns[z].items[a].ClientID);
                    }
                }
            }
        }
    }
}

console.log('%cHelper script written by HI&I for the sole use of its clients (last Updated 1-28-2025). This script should not be shared outside of HI&I clients except with the written permission of HI&I personnel.','color:#261683; font-size:12px; background-color:#00F5D8;');
/**********************************************
 * HI&I HELPER FUNCTIONS END
 * *******************************************/
