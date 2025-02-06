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
    "quantities": [801.0, 500.0],  
    "hsn_details": [
        {
            "hsn_code": 7801,
            "product_info": "UNWROUGHT LEAD",
            "cgst": "9",
            "sgst": "9",
            "unit": "Kgs"
        },
        {
            "hsn_code": 7802,
            "product_info": "REFINED LEAD",
            "cgst": "5",
            "sgst": "5",
            "unit": "Kgs"
        }
    ],
    "rates": [172, 200]
}`;

const sampleInvoice =  JSON.parse(jsonString);

let overallTotalTax = 0;
let overallTotalTaxableAmount = 0;
let overallTotalAmount = 0;

// Iterate over each item to calculate tax and amount
sampleInvoice.hsn_details.forEach((item, index) => {
    const quantity = sampleInvoice.quantities[index]; // Get quantity for this item
    const unitPrice = sampleInvoice.rates[index]; // Get unit price
    const cgstRate = parseFloat(item.cgst); // Convert CGST to number
    const sgstRate = parseFloat(item.sgst); // Convert SGST to number

    // Calculate total tax rate
    const taxRate = cgstRate + sgstRate;

    const taxableAmount = unitPrice * quantity;

    // Calculate tax per unit
    const taxPerUnit = (unitPrice * taxRate) / 100;

    // Calculate total tax for this item
    const totalTax = taxPerUnit * quantity;

    // Calculate total amount for this item (including tax)
    const totalAmount = taxableAmount + totalTax;

    // Store calculated values in the hsn_details object
    item.taxableAmount = taxableAmount.toFixed(2);
    item.totalTax = totalTax.toFixed(2);
    item.totalAmount = totalAmount.toFixed(2);

    // Accumulate overall totals
    overallTotalTaxableAmount += taxableAmount;
    overallTotalTax += totalTax;
    overallTotalAmount += totalAmount;
});

// Store overall totals in the invoice object
sampleInvoice.totalTaxableAmount = overallTotalTaxableAmount.toFixed(2);
sampleInvoice.totalTax = overallTotalTax.toFixed(2);
sampleInvoice.totalAmount = overallTotalAmount.toFixed(2);

const convertAmountToWords = (amount) => {
  return numberToWords.toWords(amount).replace(/\b\w/g, (char) => char.toUpperCase()) + " Rupees Only";
};

sampleInvoice.totalAmountInWords = convertAmountToWords(Math.floor(overallTotalAmount));

// Styles
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
};

const paneStyle = {
  flex: 1,
  padding: "10px",
};

const textareaStyle = {
  width: "100%",
  height: "200px",
  padding: "10px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const buttonStyle = {
  marginTop: "10px",
  padding: "10px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

// Main Component
const PDFEditor = () => {
  const [text, setText] = useState("Enter text here...");

  // Generate PDF using usePDF hook
  const [instance, updateInstance] = usePDF({ document: <InvoiceDocument invoice={sampleInvoice}/> });

  // Update PDF when text changes
  useEffect(() => {
    updateInstance(<InvoiceDocument invoice={sampleInvoice}/>);
  }, [text, updateInstance]);

  return (
    <div style={containerStyle}>
      {/* Left Pane - PDF Preview */}
      <div style={{ ...paneStyle, borderRight: "2px solid #ddd" }}>
        <h3>PDF Preview</h3>
        {instance.url ? (
          <iframe title="pdf-viewer" src={instance.url} width="100%" height="90%" />
        ) : (
          <p>Loading PDF...</p>
        )}
      </div>

      {/* Right Pane - Editor */}
      <div style={paneStyle}>
        <h3>Edit Document</h3>
        <textarea
          style={textareaStyle}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* PDF Download Button */}
        {instance.url && (
          <a href={instance.url} download="document.pdf">
            <button style={buttonStyle}>Download PDF</button>
          </a>
        )}
      </div>
    </div>
  );
};

export default PDFEditor;
