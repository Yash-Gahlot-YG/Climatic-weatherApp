import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
} from "react-native";
import SearchBar from "./src/Component/SearchBar";
import CityNotFound from "./src/CityNotFound";

export default function App() {
  const [infoData, setInfoData] = useState(null);
  const [textInputActive, setTextInputActive] = useState(false);
  const [cityName, setCityName] = useState("Bikaner");
  const image =
    "https://i.pinimg.com/474x/9b/eb/ea/9bebea303356ea0f56514c9f9ece76e8.jpg";

  const fetchWeatherData = async (City) => {
    if (!cityName.trim()) {
      console.log("City name is empty or contains only whitespace.");
      setInfoData(null);
      return;
    }
    const URL = `https://api.weatherapi.com/v1/current.json?q=${cityName}&units=metric&key=87f35f482d4f4e02a8b144942243004&q=India`;
    try {
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data);
      setInfoData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [cityName]);

  const handleTextInputFocus = () => {
    setTextInputActive(true);
  };

  const handleSearch = (cityName) => {
    if (!cityName.trim()) {
      setCityName(cityName);
      setInfoData(null);
      setTextInputActive(false);
      return;
    }
    fetchWeatherData(cityName);
    setCityName(cityName);
    setTextInputActive(false);
  };

  if (!cityName.trim()) {
    return (
      <CityNotFound
        fetchWeatherData={fetchWeatherData}
        handleTextInputFocus={handleTextInputFocus}
        handleSearch={handleSearch}
      />
    );
  }

  if (infoData && infoData.location.name === "La India (La India Calosa)") {
    return (
      <CityNotFound
        fetchWeatherData={fetchWeatherData}
        handleTextInputFocus={handleTextInputFocus}
        handleSearch={handleSearch}
      />
    );
  }

  return (
    <ImageBackground source={{ uri: image }} style={styles.imageBackground}>
      <SafeAreaView style={styles.container}>
        <SearchBar
          onFocus={handleTextInputFocus}
          onSearch={handleSearch}
          fetchWeatherData={fetchWeatherData}
        />

        {!textInputActive && infoData && (
          <View style={styles.background}>
            <Text style={styles.infoLocation}>{infoData.location.name}</Text>
            <Text style={styles.nowtex}>Now</Text>

            <View style={styles.rowContainer}>
              <Text style={styles.infoTemerature}>
                {infoData.current.temp_c}°
              </Text>
              <Image
                style={styles.image}
                source={require("./assets/sun1.png")}
              />
              <View>
                <Text style={styles.infoCondition}>
                  {infoData.current.condition.text}
                </Text>
                <Text style={styles.RContainer}>
                  Precip: {infoData.current.precip_in}%
                </Text>
                <Text style={styles.RContainer}>
                  Winds: {infoData.current.wind_kph} km/h
                </Text>
                <Text style={styles.RContainer}>
                  Humidity: {infoData.current.humidity}
                </Text>
              </View>
            </View>

            <Text style={styles.feltext}>
              Feels like {infoData.current.temp_c}°C
            </Text>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    height: 700,
    top: 10,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
  },
  background: {
    flex: 1,
    marginVertical: "50%",
    marginHorizontal: "-3%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  infoLocation: {
    color: "white",
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "700",
    marginTop: -60,
  },
  nowtex: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    alignSelf: "baseline",
    paddingLeft: 11,
  },
  image: {
    width: 130,
    height: 130,
    marginBottom: 22,
    marginLeft: -35,
  },
  infoTemerature: {
    color: "white",
    marginBottom: 10,
    paddingLeft: 11,
    fontSize: 40,
    fontWeight: "700",
    marginTop: -10,
  },
  infoCondition: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 10,
  },
  RContainer: {
    color: "white",
    fontWeight: "700",
    marginLeft: 10,
  },
  feltext: {
    alignSelf: "baseline",
    marginTop: -30,
    paddingLeft: 11,
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "baseline",
  },
});
