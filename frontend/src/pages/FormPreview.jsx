
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import axios from 'axios';

const FormPreview = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/forms');
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching form data:', error.message);
    }
  };

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Form Preview</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Age</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((form, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{form.name}</td>
                <td className="py-2 px-4 border-b">{form.age}</td>
                <td className="py-2 px-4 border-b">{form.address}</td>
                <td className="py-2 px-4 border-b">
                  <img src={form.photo} alt="User" className="max-w-full h-16 object-cover" />
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDownloadPDF(index)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/">Go Back to Form</Link>
    </div>
  );
};

export default FormPreview;
