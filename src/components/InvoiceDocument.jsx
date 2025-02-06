import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";

const styles = StyleSheet.create({
  page: { 
    padding: 30,
    fontSize: 10 
  },
  invoiceTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    textTransform: "uppercase"
  },
  table: {
    marginBottom: 20,
  },
  headerCell: {
    padding: 4,
    fontSize: 10,
  },
  companyHeader: {
    borderBottom: 1,
    borderRight: 1,
  },
  companyName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2
  },
  invoiceDetails: {
    textAlign: "left",
    borderBottom: 1,
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
    fontSize: 10,
    fontWeight: "bold",
    padding: 6,
    textAlign: "center",
    justifyContent:"center",
    borderBottom: 1,
  },
  tableCell: {
    fontSize: 10,
    padding: 6,
    textAlign: "right",
    borderBottom: 1,
  },
  tableCellLeft: {
    textAlign: "left",
  },
  totalSection: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLeft: {
    width: "60%",
  },
  totalRight: {
    width: "40%",
  },
  totalRow: {
    marginBottom: 3,
  },
  footerleft: {
    padding: 4,
    fontSize: 10,
    borderBottom: 1,
    borderRight: 1,
  },
  footerRight:{
    padding: 4,
    fontSize: 10,
    textAlign: "left",
    borderBottom: 1,
  },
  termsHeader: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  termItem: {
    marginBottom: 2,
  },
  signature: {
    marginTop: 30,
    textAlign: "right",
  },
  tabledata:{
    fontSize: 10, 
    textAlign: "justify", 
    margin: 5, 
    flexWrap: "wrap" 
  },
  company: {
    textAlign: "center",
    justifyContent:"center",
  },
});

const InvoiceDocument = ({ invoice }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.invoiceTitle}>Tax Invoice - Original for Recipient</Text>

        <Table style={styles.table}>
          {/* Company and Customer Details Header */}
          <TR>
            <TD style={[styles.headerCell, styles.companyHeader]} colSpan={4}>
            <View >
                <Text>
                Customer Detail
                </Text>
                <Text>
                M/S Sample Bill Company
                </Text>
                <Text>
                Address S-11
                </Text>
                <Text>
                GSTIN 00DUMYGSTBILL00
                </Text>
                <Text>
                Place of Supply State , IN - 001100
                </Text>
            </View>
            </TD>
            <TD style={[styles.headerCell, styles.invoiceDetails]} colSpan={5}>
            <View >
                <Text>
                Invoice No.               Invoice Date:
                </Text>
                <Text>
                Chalan  No.                Chalan Date:
                </Text>
                <Text>
                P.O.No :
                </Text>
                <Text>
                Delivery Date :            Reverse Charge:
                </Text>
                <Text>
                L.R.No. :                  Due Date:
                </Text>
                <Text>
                E-Way No. :
                </Text>
            </View>
            </TD>
          </TR>

          {/* Column Headers */}
          <TR>
            <TD  weighting={0.07} style={styles.tableHeader}>S.No</TD>
            <TD  weighting={0.4} style={styles.tableHeader}>Item Description</TD>
            <TD  weighting={0.2} style={styles.tableHeader}>
                <View>
                <Text>
                 HSN/SAC Code
                </Text>
                </View>
            </TD>
            <TD  weighting={0.07} style={styles.tableHeader}>IGST</TD>
            <TD  weighting={0.08} style={styles.tableHeader}>Qty</TD>
            <TD  weighting={0.06} style={styles.tableHeader}>Unit</TD>
            <TD  weighting={0.08} style={styles.tableHeader}>Price</TD>
            <TD  weighting={0.2} style={styles.tableHeader}>Tax</TD>
            <TD  weighting={0.2} style={styles.tableHeader}>Amount</TD>
          </TR>

          {/* Table Items */}
            {invoice.items.map((item, index) => (
            <TR key={index}>
                <TD weighting={0.07} style={styles.tableCell}>{index + 1}</TD> {/* Small width for S.No */}
                <TD weighting={0.4} style={[styles.tableCell, styles.tableCellLeft]}>{item.description}</TD> {/* Wider column */}
                <TD weighting={0.2} style={styles.tableCell}>{item.hsnCode}</TD>
                <TD weighting={0.07} style={styles.tableCell}>{item.igst}%</TD>
                <TD weighting={0.08} style={styles.tableCell}>{item.quantity}</TD>
                <TD weighting={0.06} style={styles.tableCell}>{item.unit}</TD>
                <TD weighting={0.08} style={styles.tableCell}>{item.unitPrice}</TD>
                <TD weighting={0.2} style={styles.tableCell}>{item.tax}</TD>
                <TD weighting={0.2} style={styles.tableCell}>{item.amount}</TD>
            </TR>
            ))}

            <TR>
            <TD style={styles.footerleft} colSpan={4}>
             TOTAL IN WORDS
            </TD>
            <TD style={styles.footerRight} colSpan={5}>
            Taxable Amount: {invoice.taxableAmount}
            </TD>
           </TR>
           <TR>
            <TD style={styles.footerleft} colSpan={4}>
            {invoice.totalInWords}
            </TD>
            <TD style={styles.footerRight} colSpan={5}>
            Total Tax: {invoice.totalTax}
            </TD>
           </TR>
           <TR>
            <TD style={styles.footerleft} colSpan={4}>
            </TD>
            <TD style={styles.footerRight} colSpan={5}>
            Total Amount After Tax: {invoice.totalAmount}
            </TD>
           </TR>
           <TR>
            <TD style={styles.footerleft} colSpan={4}>
            </TD>
            <TD style={styles.footerRight} colSpan={5}>
            E. & O.E.
            </TD>
           </TR>
           <TR>
            <TD style={styles.footerleft} colSpan={4}>
            </TD>
            <TD style={styles.footerRight} colSpan={5}>
            GST PAYABLE ON REVERSE CHARGE: N.A.
            </TD>
           </TR>
           <TR>
            <TD style={styles.footerleft} colSpan={4}>
            <View >
                <Text>
                Terms & Conditions
                </Text>
                <Text>
                E. & O.E
                </Text>
            </View>
            </TD>
            <TD style={styles.footerRight} colSpan={5}>
            <Text style={{marginBottom:"30px"}}>
                Receiver Signature:
            </Text>
            </TD>
           </TR>
           <TR>
            <TD style={styles.footerleft} colSpan={4}>
            <View style={{marginBottom:"20px"}}>
                <Text>
                1. Goods once sold will not be taken back.
                </Text>
                <Text>
                2. Interest @18% p.a. will be charged if the payment is not made within the stipulated time.
                </Text>
                <Text>
                3. Subject to State Jurisdiction only
                </Text>
            </View>
            </TD>
            <TD style={[styles.headerCell,styles.company]} colSpan={5}>
                <View>
                    <Text>for Sample Bill Company</Text>
                </View>
            </TD>
           </TR>
        </Table>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;