import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { EvaluationDisplayItem } from "@/features/commune-evaluation/schema";

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 10,
    color: "#0f172a",
    fontFamily: "Siemreap",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 14,
    color: "#475569",
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: "bold",
    padding: 6,
    backgroundColor: "#1e40af",
    color: "#ffffff",
    marginTop: 8,
    marginBottom: 4,
  },
  subsectionHeading: {
    fontSize: 10,
    fontWeight: "bold",
    padding: "4 6",
    backgroundColor: "#e8f0fe",
    color: "#1e3a5f",
    borderBottomWidth: 1,
    borderColor: "#cbd5e1",
  },
  table: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#cbd5e1",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#cbd5e1",
    minHeight: 24,
  },
  labelCell: {
    width: "50%",
    padding: 6,
    backgroundColor: "#f8fafc",
    borderRightWidth: 1,
    borderColor: "#cbd5e1",
  },
  valueCell: {
    width: "50%",
    padding: 6,
    borderRightWidth: 1,
    borderColor: "#cbd5e1",
  },
  labelText: {
    fontSize: 9,
    color: "#334155",
  },
  valueText: {
    fontSize: 9,
    color: "#0f172a",
  },
});

interface EvaluationPdfDocumentProps {
  title: string;
  subtitle: string;
  rows: EvaluationDisplayItem[];
}

export function EvaluationPdfDocument({ title, subtitle, rows }: EvaluationPdfDocumentProps) {
  return (
    <Document title={title} language="km">
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {rows.map((item, index) => {
          if (item.type === "section") {
            return (
              <Text key={index} style={styles.sectionHeading}>
                {item.label}
              </Text>
            );
          }
          if (item.type === "subsection") {
            return (
              <Text key={index} style={styles.subsectionHeading}>
                {item.label}
              </Text>
            );
          }
          return (
            <View key={index} style={styles.row} wrap={false}>
              <View style={styles.labelCell}>
                <Text style={styles.labelText}>{item.label}</Text>
              </View>
              <View style={styles.valueCell}>
                <Text style={styles.valueText}>{item.value}</Text>
              </View>
            </View>
          );
        })}
      </Page>
    </Document>
  );
}
