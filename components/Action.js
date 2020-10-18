import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const Action = (props) => {
  return (
    <TouchableOpacity style={styles.action} onPress={props.handlePress}>
      <FontAwesome5 style={{ color: "#fff" }} name={props.icon} size={28} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  action: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
  },
});

export default Action;
