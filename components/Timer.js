import * as React from "react";
import { StyleSheet, View } from "react-native";

export default function Timer(props) {
  const [width, setWidth] = React.useState(props.width);
  const [color, setColor] = React.useState("green");
  const timerId = React.useRef(1);

  React.useEffect(() => {
    if (props.trigger) {
      timerId.current = setInterval(() => {
        props.onTick();
      }, 1000);
    }
  }, [props.trigger]);

  React.useEffect(() => {
    setWidth((props.time / props.initialTime) * props.width);

    if (props.time / props.initialTime >= 0.5) {
      setColor("green");
    } else if (props.time / props.initialTime >= 0.3) {
      setColor("orange");
    } else {
      setColor("red");
    }

    if (props.time <= 0) {
      clearInterval(timerId.current);
      props.onEndInterval();
    }
  }, [props.time]);

  return (
    <View style={[styles.container, { width: props.width + 1 }, props.style]}>
      <View style={[styles.index, { width, backgroundColor: color }]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 10,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 5,
  },
  index: {
    height: 8,
    backgroundColor: "pink",
    borderRadius: 5,
  },
});
