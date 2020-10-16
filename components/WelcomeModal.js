import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from "react-native";
import Constants from "expo-constants";

export default function WelcomeModal(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => props.setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.headerText}>Rock - Paper - Scissors</Text>
          <View style={styles.modalBodyContainer}>
            <TextInput
              style={styles.name}
              placeholder={"Your name?"}
              value={props.name}
              onChangeText={(text) => props.onChangeText(text)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={props.onButtonPress}>
            <Text style={styles.buttonLabel}>Let's play</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFEA00",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  headerText: {
    color: "blue",
    fontSize: 36,
    fontWeight: "bold",
    width: 250,
    textAlign: "center",
  },
  modalBodyContainer: {
    backgroundColor: "green",
    width: 250,
    height: 350,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 32,
    width: 200,
    textAlign: "center",
    color: "#fff",
  },
  score: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: "red",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});
