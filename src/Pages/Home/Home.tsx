import { Document, Page, PDFViewer, StyleSheet } from '@react-pdf/renderer';
import Nametag from './Nametag';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
});

export default function HomePage() {
  return (
    <div>
      <PDFViewer>
        <Document>
          <Page size="A4" style={styles.page}>
            <Nametag />
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
}
