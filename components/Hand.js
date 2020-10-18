import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Hand = ({ image, name }) => {
  return (
    <View style={styles.hand}>
      {image}
      <Text>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  hand: {
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
});

export default Hand;
