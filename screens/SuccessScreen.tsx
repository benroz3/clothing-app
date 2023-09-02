import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { RootState } from "../utils/types";

// Randomizing a success image every render
const success1 = require("../assets/img/success1.webp");
const success2 = require("../assets/img/success2.webp");
const success3 = require("../assets/img/success3.png");
const success4 = require("../assets/img/success4.png");
const successImages = [success1, success2, success3, success4];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * successImages.length);
  return successImages[randomIndex];
};

const SuccessScreen: React.FC<{
  navigation: StackNavigationProp<any, any>;
}> = ({ navigation }) => {
  const [randomImage, setRandomImage] = useState(getRandomImage());

  useEffect(() => {
    setRandomImage(getRandomImage());
  }, []);

  // Getting the last set object from the sets array state
  const setsCounter = useSelector(
    (state: RootState) => state.sets.setsArray
  ).length;

  const { shirt, pants, shoes } = useSelector(
    (state: RootState) => state.sets.setsArray
  )[setsCounter - 1];
  const clothes = [shirt, pants, shoes];

  // Navigates user back to home screen
  const backPressHandler = () => {
    navigation.navigate("home");
  };

  return (
    <>
      <Navbar title={"Success"} />
      <View style={styles.container}>
        <Image source={randomImage} style={styles.img} />
        <View style={styles.clothesContainer}>
          <Text style={styles.text}>You Chose:</Text>
          <View style={styles.clothes}>
            {clothes.map((item) => (
              <View key={item.id} style={styles.clothesItem}>
                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>Name: </Text>
                  <Text style={styles.text}>{item.name}</Text>
                </View>
                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>Brand: </Text>
                  <Text style={styles.text}>{item.brand}</Text>
                </View>
                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>Color: </Text>
                  <Text style={styles.text}>{item.colors}</Text>
                </View>
                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>Size: </Text>
                  <Text style={styles.text}>{item.sizes}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <Pressable onPress={backPressHandler} style={styles.button}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },
  clothesContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clothes: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  clothesItem: {
    borderColor: "black",
    elevation: 5,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "lightgray",
  },
  img: {
    marginTop: 20,
    width: "100%",
    height: 300,
    objectFit: "contain",
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    color: "gray",
    fontSize: 16,
  },
  text: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "darkblue",
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

export default SuccessScreen;
