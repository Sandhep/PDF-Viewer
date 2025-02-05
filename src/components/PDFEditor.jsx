import React, { useState, useEffect } from "react";
import { Page, Text, View, Document, StyleSheet, usePDF } from "@react-pdf/renderer";

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

// PDF Document Component
const MyDocument = ({ content }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Billing PDF</Text>
        <Text>{content}</Text>
      </View>
    </Page>
  </Document>
);

// Main Component
const PDFEditor = () => {
  const [text, setText] = useState("Enter text here...");

  // Generate PDF using usePDF hook
  const [instance, updateInstance] = usePDF({ document: <MyDocument content={text} /> });

  // Update PDF when text changes
  useEffect(() => {
    updateInstance(<MyDocument content={text} />);
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
