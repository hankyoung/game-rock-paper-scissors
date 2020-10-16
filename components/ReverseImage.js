import * as React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function ReverseImage({ source }) {
  return (
    <View style={styles.container}>
      <Image source={source} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFEA00",
    width: 120,
    height: 120,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
    transform: [{ rotateY: "180deg" }],
  },
});
