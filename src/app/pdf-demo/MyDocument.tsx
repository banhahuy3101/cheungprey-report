import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, pdf } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    backgroundColor: '#ffffff',
    borderRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    color: '#333',
    lineHeight: 1.5,
  },
});

// Create Document Component
export const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Hello from react-pdf!</Text>
        <Text style={styles.subtitle}>Section #1</Text>
        <Text style={styles.text}>
          This is a simple PDF document created using react-pdf.
        </Text>
        <Text style={styles.text}>
          react-pdf allows you to create PDFs using React components.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Section #2</Text>
        <Text style={styles.text}>
          You can style elements using Flexbox and CSS properties.
        </Text>
        <Text style={styles.text}>
          It works on both the client and server side!
        </Text>
      </View>
    </Page>
  </Document>
);

// Alternative: Download component for client-side
export const DownloadLink = () => (
  <PDFDownloadLink document={<MyDocument />} fileName="example.pdf">
    {({ loading }) =>
      loading ? 'Preparing document...' : 'Download PDF'
    }
  </PDFDownloadLink>
);

// Alternative: Generate PDF blob
export const generatePDF = async () => {
  const blob = await pdf(<MyDocument />).toBlob();
  return blob;
};
