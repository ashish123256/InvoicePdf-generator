export const generatePDF = async (htmlContent?: string) => {
    try {
      const response = await fetch(`https://invoicepdf-generator.onrender.com/api/invoices/generate-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ htmlContent }), 
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }
  
  
      const pdfBlob = await response.blob();
  
  
      const url = window.URL.createObjectURL(pdfBlob);
  
     
      const link = document.createElement('a');
      link.href = url;
      link.download = 'invoice.pdf'; 
  
      document.body.appendChild(link);
      link.click();
  
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
