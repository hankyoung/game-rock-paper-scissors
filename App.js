import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import { getRandomAction, getResult, resultObject } from "./Utils/Util";
import Timer from "./components/Timer";
import ResultModal from "./components/ResultModal";
import WelcomeModal from "./components/WelcomeModal";
import Hand from "./components/Hand";
import Action from "./components/Action";
import ActionType from "./Utils/ActionType";
import Result from "./Utils/Result";

const initialTime = 60;

export default function App() {
  const [result, setResult] = React.useState(Result.DRAW);
  const [player, setPlayer] = React.useState(ActionType.ROCK);
  const [computer, setComputer] = React.useState(ActionType.ROCK);
  const [playerScore, setPlayerScore] = React.useState(0);
  const [computerScore, setComputerScore] = React.useState(0);
  const [playerName, setPlayerName] = React.useState("Player");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [wmodalVisible, setWModalVisible] = React.useState(true);
  const [time, setTime] = React.useState(initialTime);
  const [trigger, setTrigger] = React.useState(false);

  const handleSelectAction = (actionType) => {
    const randomAction = getRandomAction();
    setComputer(randomAction);
    setPlayer(actionType);
    calculateResult(actionType, randomAction);
  };

  const calculateResult = (playerAction, computerAction) => {
    let result = getResult(playerAction, computerAction);
    setResult(result);
    setPlayerScore(result === Result.WIN ? playerScore + 1 : playerScore);
    setComputerScore(
      result === Result.LOSE ? computerScore + 1 : computerScore
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
      <View style={styles.topSection}>
        <Text style={[styles.resultText, { color: result.color }]}>
          {result.text}
        </Text>
      </View>

      <View style={styles.middleSection}>
        <View style={styles.scores}>
          <Text style={styles.score}>{playerScore}</Text>
          <Text style={styles.score}> : </Text>
          <Text style={styles.score}>{computerScore}</Text>
        </View>
        <View style={styles.hands}>
          <Hand
            name={playerName}
            image={<Image style={styles.image} source={player.image} />}
          />
          <Hand
            name={"Computer"}
            image={
              <Image
                style={[styles.image, styles.reverseImage]}
                source={computer.image}
              />
            }
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

      <View style={styles.bottomSection}>
        <View style={styles.actions}>
          <Action
            icon={ActionType.ROCK.icon}
            handlePress={() => handleSelectAction(ActionType.ROCK)}
          />
          <Action
            icon={ActionType.PAPER.icon}
            handlePress={() => handleSelectAction(ActionType.PAPER)}
          />
          <Action
            icon={ActionType.SCISSORS.icon}
            handlePress={() => handleSelectAction(ActionType.SCISSORS)}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  topSection: {
    flex: 1 / 4,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  resultText: {
    fontSize: 42,
    fontWeight: "bold",
  },
  middleSection: {
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
  image: {
    width: 90,
    height: 90,
    resizeMode: "center",
  },
  reverseImage: {
    transform: [{ rotateY: "180deg" }],
  },
  bottomSection: {
    flex: 1 / 4,
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
