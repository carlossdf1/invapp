const exportData =  function() {

    this.exportTableToExcel = (tableID, filename = '') => {
      let downloadLink;
      const dataType = 'application/vnd.ms-excel';
      const tableSelect = document.getElementById(tableID);
      const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

      filename = filename ? filename + '.xls' : 'excel_data.xls';
      downloadLink = document.createElement("a");
      document.body.appendChild(document.createElement("a"));
      
      if(navigator.msSaveOrOpenBlob){
        const blob = new Blob(['ufeff', tableHTML], { type: dataType });
        navigator.msSaveOrOpenBlob( blob, filename);
      } else {
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
        downloadLink.download = filename;
        downloadLink.click();
      }
    }
    
    this.exportTableToPDF = (tableID,  filename = 'registrosEnPdf', typePage = 'a4' ) => {
      const doc = new jsPDF('p', 'mm', `${typePage}`); // A4 page in portrait mode
      doc.autoTable({
         html: document.getElementById(tableID),
         startY: 20,
         theme: 'grid', // Optional, uses grid theme if not defined
         styles: {
           fontSize: 9,
           overflow: 'linebreak',
           columnWidth: 'wrap'
         },
         headerStyles: {
           fillColor: [231, 76, 60],
           fontSize: 12
         },
         bodyStyles: {
           fillColor: [255, 255, 255],
           strokeColor: [0, 0, 0],
           fontSize: 10
         },
         alternateRowStyles: {
           fillColor: [245, 245, 245]
         }
      });
     
      doc.save(`${filename}.pdf`); // Save the PDF with a filename
    }
}

const E = new exportData();