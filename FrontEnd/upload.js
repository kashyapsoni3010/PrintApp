function upload(event){
    console.log("Sending file")
    event.preventDefault();
    var fileInput = document.getElementById('uploadFile');
    var file = fileInput.files[0];
    // alert(file.name)
    const ext = file.name.split('.').pop()
    if(ext!="pdf"){
        alert("Upload only pdf files")
        return;
    }
    var formData = new FormData();
    formData.append('file', file);
    fetch('http://127.0.0.1:8080/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      .then(data => {
        if(response=="True"){
            console.log('File uploaded successfully:', data);
        }
        else{
            console.log('Error uploading file:', data);
        }
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
}