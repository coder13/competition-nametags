import { StyleSheet, Text, View } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default function Nametag() {
  return (
    <View style={styles.section}>
      <Text>Section #1</Text>
    </View>
  );
}
