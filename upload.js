const fileinput = document.getElementById('upfile');
            const template = document.getElementById("idtemplate");
            const qrcont = document.getElementById("qr");
            const printbt = document.getElementById("print");
            const maintemp = document.getElementById("maintemplate");
            function generateids(){
                printbt.style.display = "block";
                if(fileinput.files.length === 0){
                    console.log("upload file first");
                    return;
                }
                const file = fileinput.files[0];
                const reader = new FileReader();
                reader.onload = function(e){
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data,{type:'array'});
                    const firstsheet = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstsheet];
                    const jsonarray = XLSX.utils.sheet_to_json(worksheet);
                    jsonarray.forEach(element => {
                        const cardtemp = document.createElement("div");
                        cardtemp.className = "idtemplate";
                        cardtemp.id = `idtemplate-${element.ID}`;
                        const qrdata = `${element.ID}-${element.Name}-${element.Department}`;
                        const cardcont =`<h2>Company ID card- Boutiqaat</h2>
                                         <div class="empdata">
                                         <img class="bgimage" src="backgroundimage.jpeg" />
                                         <div class="textgroup">
                                         <div class="empdatacolumn">
                                         <label>Employee Name </label>
                                         <label class="empname">${element.Name}</label>
                                         </div>
                                         <div class="empdatacolumn">
                                         <label>Employee ID </label>
                                         <label class="empid">${element.ID}</label>
                                         </div>
                                         <div class="empdatacolumn">
                                         <label>Designation </label>
                                         <label class="empdesignation">${element.Designation}</label>
                                         </div>
                                         <div class="empdatacolumn">
                                         <label>Department </label>
                                         <label class="department">${element.Department}</label>
                                         </div>
                                         </div>
                                         <div class="qrcontainer">
                                           <div class="qr" id="qr-${element.ID}"></div>
                                         </div>
                                         </div> `;
                        cardtemp.insertAdjacentHTML("beforeend",cardcont);
                        maintemp.appendChild(cardtemp);
                        const qrelement = document.getElementById(`qr-${element.ID}`);
                        new QRCode(qrelement,{
                                    text: qrdata,
                                    width: 110,
                                    height: 100,
                                    colorDark: "#000000",
                                    colorLight: "#ffffff",    
                                    correctLevel: QRCode.CorrectLevel.H,
                                    });
                });
            };
                reader.readAsArrayBuffer(file);  
        }
 function reset(){
        maintemp.style.display = "none";
        printbt.style.display = "none";
        fileinput.value = "";
      }