import React, { useState } from 'react';

const PDFUpload = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPath, setPdfPath] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleUpload = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmitUpload = async (e) => {
    e.preventDefault();
    if (!pdfFile) {
      alert("Please upload a PDF.");
      return;
    }

    // Upload the PDF file
    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      const uploadResponse = await fetch('http://127.0.0.1:5000/upload-pdf', {
        method: 'POST',
        body: formData
      });

      const uploadData = await uploadResponse.json();

      if (uploadResponse.ok && uploadData.pdf_path) {
        // Store the PDF path for future questions
        setPdfPath(uploadData.pdf_path);
        alert("Your PDF has been uploaded successfully.");
      } else {
        alert(uploadData.error || 'Error uploading PDF');
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert('An error occurred during the upload. Check console for details.');
    }
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (!pdfPath || !question) {
      alert("Please upload a PDF and enter a question.");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/pdf-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pdf_path: pdfPath,
          question: question
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Display the answer; make sure to access the correct key
        setAnswer(data.text); // Update this line to access 'text'
      } else {
        alert(data.error || 'Error querying PDF');
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      alert('An error occurred during the question submission. Check console for details.');
    }
  };

  return (
    <div>
      <h2>PDF Query</h2>
      <input type="file" accept=".pdf" onChange={handleUpload} />
      <button onClick={handleSubmitUpload}>Upload PDF</button>
      <form onSubmit={handleSubmitQuestion}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about the PDF..."
        />
        <button type="submit">Ask</button>
      </form>
      {answer && (
        <div>
          <h4>Answer:</h4>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default PDFUpload;
