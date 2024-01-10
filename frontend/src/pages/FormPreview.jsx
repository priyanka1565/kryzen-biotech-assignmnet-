import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';

const FormPreview = () => {
  const [formData, setFormData] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/forms");
        setFormData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching form data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleDownloadPDF = (index) => {
    try {
      const form = formData[index];
      const pdf = new jsPDF();

      pdf.text(`Name: ${form.name}`, 20, 20);
      pdf.text(`Age: ${form.age}`, 20, 30);
      pdf.text(`Address: ${form.address}`, 20, 40);

      const imgData = form.photo; // Assuming form.photo is a base64-encoded image
      pdf.addImage(imgData, 'JPEG', 20, 50, 80, 80);

      pdf.save(`form-preview-${form.name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>Form Preview</h1>
      {formData.map((form, index) => (
        <div key={index} className='mb-8 p-4 border border-gray-300 rounded'>
          <p className='mb-2'>
            <span className='font-bold'>Name:</span> {form.name}
          </p>
          <p className='mb-2'>
            <span className='font-bold'>Age:</span> {form.age}
          </p>
          <p className='mb-2'>
            <span className='font-bold'>Address:</span> {form.address}
          </p>
          <img src={form.photo} alt='User' className='max-w-full h-32 object-cover mb-4' />
          <button
            onClick={() => handleDownloadPDF(index)}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none'
          >
            Download PDF
          </button>
        </div>
      ))}
      <Link to='/'>Go Back to Form</Link>
    </div>
  );
};

export default FormPreview;
