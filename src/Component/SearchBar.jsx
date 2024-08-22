import React, { useState, useEffect } from "react";
import { TextInput, View, Keyboard } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
const SearchBar = ({ onFocus, onSearch, fetchWeatherData }) => {
  const [textInputActive, setTextInputActive] = useState(false);
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setTextInputActive(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setTextInputActive(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.InputText}>
      <TextInput
        placeholder="Enter the City Name"
        placeholderTextColor={"white"}
        style={{
          fontSize: 19,
          color: "white",
        }}
        onFocus={() => {
          setTextInputActive(true);
          onFocus && onFocus();
        }}
        onBlur={() => {
          setTextInputActive(false);
        }}
        onChangeText={(text) => setCityName(text)}
        onSubmitEditing={() => {
          onSearch && onSearch(cityName);
        }}
      />
      <AntDesign name="search1" size={26} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  InputText: {
    backgroundColor: "blue",
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 20,
    marginTop: "10%",
    padding: 10,
    width: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default SearchBar;
