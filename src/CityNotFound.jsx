import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import SearchBar from "./Component/SearchBar";

const CityNotFound = ({
  fetchWeatherData,
  handleTextInputFocus,
  handleSearch,
}) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/L_5.png")} style={styles.image} />
      <SearchBar
        fetchWeatherData={fetchWeatherData}
        onFocus={handleTextInputFocus}
        onSearch={handleSearch}
      />
      <Text style={styles.notFoundText}>City not found!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0E1DD",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: -100,
    alignSelf: "center",
  },
  notFoundText: {
    fontWeight: "600",
    padding: 30,
    fontSize: 30,
    color: "red",
  },
});
export default CityNotFound;
