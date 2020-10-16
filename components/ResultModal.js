import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Constants from "expo-constants";

export default function ResultModal(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => props.setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.headerText}>Your Score</Text>
          <View style={styles.modalBodyContainer}>
            <Text style={styles.score}>Win: {props.playerScore}</Text>
            <Text style={styles.score}>Lose: {props.computerScore}</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.onReset()}
          >
            <Text style={styles.buttonLabel}>Play again</Text>
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
    justifyContent: "space-around",
  },
  headerText: {
    color: "blue",
    fontSize: 36,
    fontWeight: "bold",
  },
  modalBodyContainer: {
    backgroundColor: "green",
    width: 250,
    height: 350,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
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
