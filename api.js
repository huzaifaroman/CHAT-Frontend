// api.js: Handles API requests to Flask backend
const API_URL = 'http://localhost:5000';

export async function sendMessage(message) {
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
  const data = await response.json();
  return data.response;
}

export async function sendPDFQuery(question, pdfPath) {
  const response = await fetch(`${API_URL}/pdf-query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question, pdf_path: pdfPath }),
  });
  const data = await response.json();
  return data.answer;
}
