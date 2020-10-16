import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { action, getRandomAction, getResult, resultObject } from "./Util";
import StyledImage from "./components/StyledImage";
import ReverseImage from "./components/ReverseImage";
import Timer from "./components/Timer";
import ResultModal from "./components/ResultModal";
import WelcomeModal from "./components/WelcomeModal";

const initialTime = 15;

export default function App() {
  const [result, setResult] = React.useState(resultObject.DRAW);
  const [player, setPlayer] = React.useState(action.ROCK);
  const [playerScore, setPlayerScore] = React.useState(0);
  const [computer, setComputer] = React.useState(action.ROCK);
  const [computerScore, setComputerScore] = React.useState(0);
  const [playerName, setPlayerName] = React.useState("player");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [wmodalVisible, setWModalVisible] = React.useState(true);
  const [time, setTime] = React.useState(initialTime);
  const [trigger, setTrigger] = React.useState(false);

  const handleSelectAction = (action) => {
    const randomAction = getRandomAction();
    setComputer(randomAction);
    setPlayer(action);
    calculateResult(action, randomAction);
  };

  const calculateResult = (playerAction, computerAction) => {
    let result = getResult(playerAction, computerAction);
    setResult(result);
    setPlayerScore(result === resultObject.WIN ? playerScore + 1 : playerScore);
    setComputerScore(
      result === resultObject.LOSE ? computerScore + 1 : computerScore
    );
  };

  const reset = () => {
    setModalVisible(false);
    setTime(initialTime);
    setPlayerScore(0);
    setComputerScore(0);
    setTrigger(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.top}>
        <Text style={[styles.resultText, { color: result.color }]}>
          {result.text}
        </Text>
      </View>
      <View style={styles.middle}>
        <View style={styles.scores}>
          <Text style={styles.score}>{playerScore}</Text>
          <Text style={styles.score}> : </Text>
          <Text style={styles.score}>{computerScore}</Text>
        </View>
        <View style={styles.hands}>
          <Hand
            name={playerName}
            image={<ReverseImage source={player.image} />}
          />
          <Hand
            name={"Computer"}
            image={<StyledImage source={computer.image} />}
          />
        </View>

        <Timer
          initialTime={initialTime}
          time={time}
          onTick={() => setTime((time) => time - 1)}
          onEndInterval={() => {
            setModalVisible(true);
            setTrigger(false);
          }}
          trigger={trigger}
          width={250}
        />
      </View>
      <View style={styles.bottom}>
        <View style={styles.actions}>
          <Action
            icon={action.ROCK.icon}
            onPress={() => handleSelectAction(action.ROCK)}
          />
          <Action
            icon={action.PAPER.icon}
            onPress={() => handleSelectAction(action.PAPER)}
          />
          <Action
            icon={action.SCISSORS.icon}
            onPress={() => handleSelectAction(action.SCISSORS)}
          />
        </View>

        <WelcomeModal
          modalVisible={wmodalVisible}
          onChangeText={(text) => setPlayerName(text)}
          onButtonPress={() => {
            setWModalVisible(false);
            setTrigger(true);
          }}
        />
        <ResultModal
          playerScore={playerScore}
          computerScore={computerScore}
          modalVisible={modalVisible}
          onReset={reset}
        />
      </View>
    </SafeAreaView>
  );
}

function Hand({ image, name }) {
  return (
    <View style={styles.hand}>
      {image}
      <Text>{name}</Text>
    </View>
  );
}

function Action({ icon, onPress }) {
  return (
    <TouchableOpacity style={styles.action} onPress={onPress}>
      <FontAwesome5 style={{ color: "#fff" }} name={icon} size={28} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FFEA00",
  },
  top: {
    flex: 1 / 4,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  resultText: {
    fontSize: 42,
    fontWeight: "bold",
  },
  middle: {
    flex: 2 / 4,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  scores: {
    flexDirection: "row",
  },
  score: {
    color: "blue",
    fontSize: 36,
    fontWeight: "bold",
  },
  hands: {
    flexDirection: "row",
  },
  hand: {
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  bottom: {
    flex: 1 / 4,
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
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
