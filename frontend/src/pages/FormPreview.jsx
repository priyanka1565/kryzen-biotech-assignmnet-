// FormPreview.jsx

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import axios from 'axios';
import 'jspdf-autotable';
const FormPreview = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData([JSON.parse(storedData)]);
    } else {
      // Fetch data from the server if not available in local storage
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/forms');
      setFormData(response.data);
      console.log(response.data);
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

      const imgData ="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeautiful%2F&psig=AOvVaw3pL2MNuZc60TqH3n1ym0Ky&ust=1704966691869000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCMje7f7F0oMDFQAAAAAdAAAAABAE // Assuming form.photo is a base64-encoded image"
      pdf.addImage(imgData, 'JPEG', 20, 50, 80, 80);

      pdf.save(`form-preview-${form.name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Form Preview</h1>
      {formData.map((form, index) => (
        <div key={index} className="mb-8 p-4 border border-gray-300 rounded overflow-x-auto">
          <table className="w-full table-auto mb-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Field</th>
                <th className="border px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-bold">Name:</td>
                <td className="border px-4 py-2">{form.name}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Age:</td>
                <td className="border px-4 py-2">{form.age}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Address:</td>
                <td className="border px-4 py-2">{form.address}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2 font-bold">Photo:</td>
                <td className="border px-4 py-2">
                  <img src={form.imgData} alt="User" className="max-w-full h-32 object-cover" />
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>

          <button
            onClick={() => handleDownloadPDF(index)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          >
            Download PDF
          </button>
        </div>
      ))}
      <Link to="/">Go Back to Form</Link>
    </div>
  );
};

export default FormPreview;
