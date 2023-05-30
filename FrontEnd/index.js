var id;
var printer;
let printOption = 0;
function checkPrinter(event){
  event.preventDefault();
  printer = event.target.elements.printerID.value;
  console.log(printer);
  fetch('http://127.0.0.1:8080/checkPrinter', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
        },
        body: printer,
    })
    .then(response => response.text())
    .then(result => {
        id = result;
        if(id=="NotFound"){
            alert("Printer not found");
        }
        else{
            // inject the html Element
            inject(printer, id);
        }
    })
    .catch(error => {
        console.error(error);
    });
}

function inject(printer, id){
    // create the Form
    const form = document.createElement('form');
    // create heading
    const header = "Printing at printer: "+printer;
    const heading = document.createElement('h1');
    heading.textContent = header;
    // create the file uploading box
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('name', 'file');
    fileInput.setAttribute('id', 'fileInput');
    fileInput.setAttribute("required","")
    // create the radio buttons
    const bwOption = document.createElement('input');
    bwOption.setAttribute('type','radio');
    bwOption.setAttribute('name','printOption');
    bwOption.setAttribute('id','bwOption');
    bwOption.setAttribute('value','bw');
    bwOption.setAttribute('checked','checked');
    const bwLabel = document.createElement('label');
    bwLabel.textContent = "Black & White (Default)";
    bwOption.addEventListener("change", () => {
        printOption = 0;
        console.log("printOption: ",printOption);
    });
    const colorOption = document.createElement('input');
    colorOption.setAttribute('type','radio');
    colorOption.setAttribute('name','printOption');
    colorOption.setAttribute('id','colorOption');
    colorOption.setAttribute('value','bw');
    // colorOption.setAttribute('checked','checked');
    const colorLabel = document.createElement('label');
    colorLabel.textContent = "Colour";
    // const colorOption = document.getElementById("colorOption");
    colorOption.addEventListener("change", () => {
        printOption = 1;
        console.log("printOption: ",printOption);
    });
    const brk = document.createElement("br");
    // create submit button
    const submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('value', 'Submit');
    // link submit to a function for sending the file to printer
    submitButton.onclick = function(event) {
        event.preventDefault();
        printFile();
    };
    // Creating form
    form.appendChild(heading);
    form.appendChild(brk);
    form.appendChild(fileInput);
    form.appendChild(brk);
    form.appendChild(submitButton);

    // creating and appending the options container
    const options = document.getElementById('options');
    options.innerHTML='';
    options.appendChild(bwOption);
    options.appendChild(bwLabel);
    options.appendChild(brk);
    options.appendChild(colorOption);
    options.appendChild(colorLabel);

    // Creating the pages div
    const start = document.createElement('input');
    start.setAttribute('type','text');
    start.setAttribute('id','start');
    // start.setAttribute('value','0');
    const end = document.createElement('input');
    end.setAttribute('type','text');
    end.setAttribute('id','end');
    // start.setAttribute('value','0');
    
    // Appending everything to the container div
    // const uploadFile = document.getElementById('uploadFile');
    const file = document.getElementById('file');
    // const opt = document.getElementById('options');
    const lft = document.getElementById("left");
    const rgt = document.getElementById('right');
    file.innerHTML='';
    lft.innerHTML='';
    rgt.innerHTML='';
    file.appendChild(form);
    // opt.appendChild(options);
    lft.appendChild(start);
    rgt.appendChild(end);
    // uploadFile.appendChild(file);
    // uploadFile.appendChild(opt);
    // uploadFile.appendChild(lft);
    // uploadFile.appendChild(rgt);

}

function printFile(event){
    console.log("Printfile function is called");
    var file = document.getElementById('fileInput').files[0];
    // Check for the file extension
    const ext = file.name.split('.').pop()
    if(ext!="pdf"){
        alert("Upload only pdf files")
        return;
    }

    // Validate the page ranges
    // let valid = validateRange()

    var formData = new FormData();
    formData.append('file', file);
    formData.append('printOption', printOption);
    url = "http://127.0.0.1:8008/"+id;
    fetch(url, {
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      .then(result => {
        if(result=="True"){
            alert("Printed the file");
        }
        else{
            alert("Error printing the file");
        }
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });

}