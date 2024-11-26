// rafce = ket react fomat
import React from "react";

// PDF
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// react-pdf-table
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

// Font
import fontDev from './THSarabunNew.ttf';

// moment
import moment from "moment/min/moment-with-locales";

// Register font
Font.register({ family: "parnwad", src: fontDev });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "parnwad",
    textAlign: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  tableHeader: {
    textAlign: "center",
  },
  quantity: {
    textAlign: 'right',
  }, 
});

const Invoice = ({ order }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>ปานวาด นักพัฒนา</Text>
          <Text>{moment(Date.now()).locale("th").format("LL")}</Text>

          <Table>
            <TableHeader>
              <TableCell style={styles.tableHeader}>รายการสินค้า</TableCell>
              <TableCell style={styles.tableHeader}>ราคาสินค้า</TableCell>
              <TableCell style={styles.tableHeader}>จำนวนสินค้า</TableCell>
            </TableHeader>
          </Table>
          <Table data={order.products}>
            <TableBody>
              <DataTableCell getContent={(x) => x.product.title} />
              <DataTableCell style={styles.quantity} getContent={(x) => x.price} />
              <DataTableCell style={styles.quantity} getContent={(x) => x.count} />
            </TableBody>
          </Table>
          <Text style={styles.quantity}>
            ราคารวมสุทธิ : {order.cartTotal}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
