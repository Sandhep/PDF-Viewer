import React, { useState, useEffect } from "react";
import {StyleSheet, usePDF } from "@react-pdf/renderer";
import InvoiceDocument from "./InvoiceDocument";
import numberToWords from 'number-to-words';

const jsonString = `{
    "party": {
        "gstin": "09AMYPK1749C1ZO",
        "legal_name": "NEERAJ  KUMAR",
        "trade_name": "M/S NEERAJ INDUSTRIES",
        "principal_address": {
            "address1": "PRATAP GANJ",
            "address2": "Kanpur Nagar",
            "pincode": "208022",
            "city": "Kanpur",
            "state": "UP",
            "country": "IN"
        },
        "shipping_address": {
            "address1": "E 83/A, Panki Site 5",
            "address2": "Kanpur Nagar",
            "pincode": "208022",
            "city": "Kanpur",
            "state": "UP",
            "country": "IN"
        }
    },
    "quantities": [801.0],  
    "hsn_details": [
        {
            "hsn_code": 7801,
            "product_info": "UNWROUGHT LEAD",
            "cgst": "9",
            "sgst": "9",
            "unit": "Kgs"
        }
    ],
    "rates": [172]
}`;

const sampleInvoice =  JSON.parse(jsonString);

let overallTotalTax = 0;
let overallTotalTaxableAmount = 0;
let overallTotalAmount = 0;

sampleInvoice.hsn_details.forEach((item, index) => {
    const quantity = sampleInvoice.quantities[index]; 
    const unitPrice = sampleInvoice.rates[index]; 
    const cgstRate = parseFloat(item.cgst); 
    const sgstRate = parseFloat(item.sgst); 

    const taxRate = cgstRate + sgstRate;

    const taxableAmount = unitPrice * quantity;

    const taxPerUnit = (unitPrice * taxRate) / 100;

    const totalTax = taxPerUnit * quantity;
    
    const totalAmount = taxableAmount + totalTax;

    item.taxableAmount = taxableAmount.toFixed(2);
    item.totalTax = totalTax.toFixed(2);
    item.totalAmount = totalAmount.toFixed(2);

    overallTotalTaxableAmount += taxableAmount;
    overallTotalTax += totalTax;
    overallTotalAmount += totalAmount;
});

sampleInvoice.totalTaxableAmount = overallTotalTaxableAmount.toFixed(2);
sampleInvoice.totalTax = overallTotalTax.toFixed(2);
sampleInvoice.totalAmount = overallTotalAmount.toFixed(2);

const convertAmountToWords = (amount) => {
  return numberToWords.toWords(amount).replace(/\b\w/g, (char) => char.toUpperCase()) + " Rupees Only";
};

sampleInvoice.totalAmountInWords = convertAmountToWords(Math.floor(overallTotalAmount));

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 20,
  },
  section: {
    marginBottom: 10,
    padding: 10,
    borderBottom: "1px solid #000",
  },
});

const containerStyle = {
  display: "flex",
  width: "100vw",
  height: "100vh",
  backgroundColor: "#eaeaea",
  fontFamily: "'Arial', sans-serif",
};

const paneStyle = {
  flex: 1,
  padding: "15px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  backgroundColor: "#ffffff",
  fontFamily: "'Arial', sans-serif",
};

const textareaStyle = {
  width: "100%",
  height: "300px",
  padding: "10px",
  fontSize: "16px",
  border: "1px solid #aaa",
  borderRadius: "4px",
  fontFamily: "'Arial', sans-serif",
  resize: "none",
};

const buttonStyle = {
  marginTop: "10px",
  marginRight: "10px",
  padding: "10px 15px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontFamily: "'Arial', sans-serif",
};


const PDFEditor = () => {
  const [text, setText] = useState(JSON.stringify(sampleInvoice, null, 2));
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

 
  const [instance, updateInstance] = usePDF({ document: <InvoiceDocument invoice={sampleInvoice}/> });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    try {
      const updatedInvoice = JSON.parse(text);
      Object.assign(sampleInvoice, updatedInvoice);
      updateInstance(<InvoiceDocument invoice={sampleInvoice}/>);
      setIsEditing(false);
      setError("");
    } catch (error) {
      setError("Invalid JSON format. Please check your input.");
    }
  };

  return (
    <div style={containerStyle}>
      {/* Left Pane - PDF Preview */}
      <div style={{ ...paneStyle, borderRight: "2px solid #ddd"}}>
        <h3>PDF Preview</h3>
        {instance.url ? (
          <iframe title="pdf-viewer" src={instance.url} width="100%" height="90%" />
        ) : (
          <p>Loading PDF...</p>
        )}
      </div>

      {/* Right Pane - Editor */}
      <div style={paneStyle}>
        <h3>Edit Bill Document</h3>
        {instance.url && (
          <a href={instance.url} download="document.pdf">
            <button style={buttonStyle}>Download PDF</button>
          </a>
        )}
        <button style={buttonStyle} onClick={handleEditClick}>Edit</button>

        {isEditing && (
          <div style={{ marginTop: "10px" }}>
            <textarea
              style={textareaStyle}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter valid JSON here..."
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button style={buttonStyle} onClick={handleSave}>Save</button>
            <button style={buttonStyle} onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFEditor;
