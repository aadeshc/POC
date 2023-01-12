import logo from './logo.svg';
import './App.css';
import { read, utils } from 'xlsx';
import {useEffect} from 'react'
import {saveAs} from 'file-saver'
var XLSX = require('xlsx')


async function test(){


  const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();
  const wb = read(f);
  const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
  const csv = utils.sheet_to_csv((wb.Sheets[wb.SheetNames[0]]))
  console.log(csv);

  var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
saveAs(blob, "file.csv");
 }


 function excelFileToJSON(file){
  try {
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function(e) {

        var data = e.target.result;
        var workbook = XLSX.read(data, {
            type : 'binary'
        });
        var result = {};
        var firstSheetName = workbook.SheetNames[0];
        //reading only first sheet data
        var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
        alert(JSON.stringify(jsonData));
        const csv = utils.sheet_to_csv((workbook.Sheets[workbook.SheetNames[0]]))
         console.log(csv);
          var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
        saveAs(blob, "file.csv");
        }
    }catch(e){
        console.error(e);
    }
}

 const test1= (event)=>{
               const file = event.target.files
               excelFileToJSON(file[0])
 }

 function App() {
  

 
  
  return (
    <div className="App">
        <input type="file" id="myFile" name="filename" onClick={test1}/>
    </div>
  );
}

export default App;
