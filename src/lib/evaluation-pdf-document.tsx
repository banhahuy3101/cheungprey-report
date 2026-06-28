function Ol({ items }: { items: string[] }) {
  return (
    <View style={styles.ol}>
      {items.map((item, i) => (
        <Text key={i} style={styles.li}>- {item}</Text>
      ))}
    </View>
  );
}

function Chk({ v, a }: { v: unknown; a: string }) {
  return <Text>{cb(v, a)}</Text>;
}

function TableRow({ num, desc, val, isHdr }: { num: string; desc: string; val?: string; isHdr?: boolean }) {
  i