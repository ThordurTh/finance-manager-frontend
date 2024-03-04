import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Text, View } from "react-native";
import { RootState } from "../store/store";
import { decrement, increment } from "../store/counterSlice";

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Text>{count}</Text>
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
    </View>
  );
}
