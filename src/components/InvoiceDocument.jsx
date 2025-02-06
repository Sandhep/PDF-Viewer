import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import { Table, TD, TR } from "@ag-media/react-pdf-table";

const styles = StyleSheet.create({
  page: { 
    padding: 30,
    fontSize: 10 
  },
  invoiceType: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom:'5px',
    flexDirection:"row",
    justifyContent:'space-between',
    width:'100%'
  },
  invoiceAddress: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom:'8px',
    flexDirection:"row",
    width:'100%'
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom:'8px',
    flexDirection:"row",
    width:'100%'
  },
  invoiceData:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'130%'
  },
  invoiceDataBox:{
    marginTop:'5px'
  },
  companyDataBox:{
    marginBottom:'5px'
  },
  companydetails:{
    marginBottom:'10px',
    marginTop:'5px'
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
    textAlign: "left",
    alignItems:'baseline',
    borderBottom: 1,
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
    borderBottom: 1,
  },
  paymentdetails:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%'
  },
  footerRightend:{
    flexDirection:'row',
    justifyContent:'flex-end',
    width:'100%'
  },
  terms:{
   marginBottom:"20px"
  },
  signature: {
    marginBottom:"30px"
  },
  tabledata:{
    fontSize: 10, 
    textAlign: "justify", 
    margin: 5, 
    flexWrap: "wrap" 
  },
  company: {
    padding: 4,
    fontSize: 10,
    textAlign: "center",
    justifyContent:"center",
  },
});

const InvoiceDocument = ({ invoice }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        <View style={styles.invoiceTitle}>
          <Text>{invoice.party.trade_name.replace(/^M\/S\s+/i, "")}</Text>
        </View>

        <View style={styles.invoiceAddress}>
          <Text>{invoice.party.principal_address.address1}, </Text>
          <Text>{invoice.party.principal_address.address2}, </Text>
          <Text>{invoice.party.principal_address.city}, </Text>
          <Text>{invoice.party.principal_address.state} - </Text>
          <Text>{invoice.party.principal_address.pincode}</Text>
        </View>

        <View style={styles.invoiceType}>
          <Text>GSTIN : {invoice.party.gstin}</Text>
          <Text>TAX INVOICE</Text>
          <Text>ORIGINAL FOR RECIPENT</Text>
        </View>

        <Table style={styles.table}>
          {/* Company and Customer Details Header */}
          <TR>
            <TD style={[styles.headerCell, styles.companyHeader]} colSpan={4}>
            <View style={styles.companyDataBox} >
                <Text style={styles.companydetails}>
                Customer Detail
                </Text>
                <Text>
                M/S {invoice.party.legal_name}
                </Text>
                <Text>
                Address : {invoice.party.principal_address.address1}, {invoice.party.principal_address.address2}
                </Text>
                <Text>
                GSTIN : {invoice.party.gstin}
                </Text>
                <Text>
                Place of Supply : {invoice.party.principal_address.country} - {invoice.party.principal_address.pincode}
                </Text>
            </View>
            </TD>
            <TD style={[styles.headerCell, styles.invoiceDetails]} colSpan={5}>
            <View style={styles.invoiceDataBox}>
                <View style={styles.invoiceData}>
                    <Text>Invoice No. :</Text>
                    <Text>Invoice Date :</Text>
                </View>
                <View style={styles.invoiceData}>
                    <Text>Chalan  No. :</Text>
                    <Text>Chalan Date :</Text>
                </View>
                <View style={styles.invoiceData}>
                    <Text>P.O.No. :</Text>
                </View>
                <View style={styles.invoiceData}>
                    <Text>Delivery Date :</Text>
                    <Text>Reverse Charge :</Text>
                </View>
                <View style={styles.invoiceData}>
                    <Text>L.R.No. :</Text>
                    <Text>Due Date :</Text>
                </View>
                <View style={styles.invoiceData}>
                    <Text>E-Way No. :</Text>
                </View>
            </View>
            </TD>
          </TR>

          {/* Column Headers */}
          <TR>
            <TD  weighting={0.07} style={styles.tableHeader}>S.No</TD>
            <TD  weighting={0.4} style={styles.tableHeader}>Item Description</TD>
            <TD  weighting={0.2} style={styles.tableHeader}>HSN/SAC Code</TD>
            <TD  weighting={0.08} style={styles.tableHeader}>IGST</TD>
            <TD  weighting={0.1} style={styles.tableHeader}>Qty</TD>
            <TD  weighting={0.06} style={styles.tableHeader}>Unit</TD>
            <TD  weighting={0.1} style={styles.tableHeader}>Price</TD>
            <TD  weighting={0.2} style={styles.tableHeader}>Payable Tax</TD>
            <TD  weighting={0.2} style={styles.tableHeader}>Amount</TD>
          </TR>

          {/* Table Items */}
            {invoice.hsn_details.map((item, index) => (
            <TR key={index} style={{height:'25%'}}>
                <TD weighting={0.07} style={styles.tableCell}>{index + 1}</TD> 
                <TD weighting={0.4} style={styles.tableCell}>{item.product_info}</TD> 
                <TD weighting={0.2} style={styles.tableCell}>{item.hsn_code}</TD>
                <TD weighting={0.08} style={styles.tableCell}>{item.cgst}%</TD>
                <TD weighting={0.1} style={styles.tableCell}>{invoice.quantities[index]}</TD>
                <TD weighting={0.06} style={styles.tableCell}>{item.unit}</TD>
                <TD weighting={0.1} style={styles.tableCell}>{invoice.rates[index]}</TD>
                <TD weighting={0.2} style={styles.tableCell}>{item.totalTax}</TD>
                <TD weighting={0.2} style={styles.tableCell}>{item.taxableAmount}</TD>
            </TR>
            ))}

            <TR>
            <TD style={styles.footerleft} colSpan={4}>TOTAL IN WORDS</TD>
            <TD style={styles.footerRight} colSpan={5}>
              <View style={styles.paymentdetails}>
                <Text>Taxable Amount </Text>
                <Text>{invoice.totalTaxableAmount}</Text>
              </View>
            </TD>
           </TR>
           <TR>
            <TD style={styles.footerleft} colSpan={4}>
            {invoice.totalAmountInWords}
            </TD>
            <TD style={styles.footerRight} colSpan={5}>
            <View style={styles.paymentdetails}>
                <Text>Total Tax </Text>
                <Text>{invoice.totalTax}</Text>
            </View>
            </TD>
           </TR>
           <TR>
            <TD style={styles.footerleft} colSpan={4}>
            </TD>
            <TD style={styles.footerRight} colSpan={5}>
            <View style={styles.paymentdetails}>
                <Text>Total Amount After Tax  </Text>
                <Text> {invoice.totalAmount}</Text>
            </View>
            </TD>
           </TR>
           <TR>
            <TD style={styles.footerleft} colSpan={4}>
            </TD>
            <TD style={styles.footerRight} colSpan={5}>
            <View style={styles.footerRightend}>
                <Text>E. & O.E.</Text>
            </View>
            </TD>
           </TR>
           <TR>
            <TD style={styles.footerleft} colSpan={4}>
            </TD>
            <TD style={styles.footerRight} colSpan={5}>
            <View style={styles.paymentdetails}>
                <Text>GST PAYABLE ON REVERSE CHARGE</Text>
                <Text> N.A.</Text>
            </View>
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
            <Text style={styles.signature}>
                Receiver Signature :
            </Text>
            </TD>
           </TR>
           <TR>
            <TD style={styles.footerleft} colSpan={4}>
            <View style={styles.terms}>
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
            <TD style={styles.company} colSpan={5}>
                <View>
                    <Text>for {invoice.party.trade_name.replace(/^M\/S\s+/i, "")}</Text>
                </View>
            </TD>
           </TR>
        </Table>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;