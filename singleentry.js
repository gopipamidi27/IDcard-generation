const empdetails = document.querySelectorAll(".empdetails input");
      const id = document.getElementById("empid");
      const name = document.getElementById("empname");
      const desig = document.getElementById("empdesignation");
      const dept = document.getElementById("department");
      const template = document.getElementById("idtemplate");
      const qrcont = document.getElementById("qr");
      const printbt = document.getElementById("print");
      function generateid() {
        template.style.display = "block";
        printbt.style.display = "block";
        name.innerHTML = empdetails[0].value;
        id.innerHTML = empdetails[1].value;
        desig.innerHTML = empdetails[2].value;
        dept.innerHTML = empdetails[3].value;
        qrcont.innerHTML = "";
        const qrdata = `${empdetails[1].value} - ${empdetails[0].value} - ${empdetails[3].value}`;
        new QRCode(qrcont, {
          text: qrdata,
          width: 110,
          height: 100,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H,
        });
      }
      empdetails.forEach((ele) => {
        ele.addEventListener("focus", () => {
          template.style.display = "none";
          printbt.style.display = "none";
        });
      });