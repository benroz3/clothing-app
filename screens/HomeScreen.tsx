import { useEffect } from "react";
import {
  BackHandler,
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-simple-toast";
import Navbar from "../components/Navbar";
import { RootState } from "../utils/types";
import { addSet } from "../redux/slices/setsSlice";

const HomeScreen: React.FC<{
  navigation: StackNavigationProp<any, any>;
}> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  // Preventing the user from returning to the loading screen
  const handleBackButton = () => {
    if (isFocused) {
      BackHandler.exitApp();
      return true;
    }
    return false;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );
    return () => {
      backHandler.remove();
    };
  }, [isFocused]);

  // Number of sets the user has
  const setsCounter = useSelector(
    (state: RootState) => state.sets.setsArray
  ).length;

  // Number of current chosen items
  const status = useSelector((state: RootState) => state.sets.status);

  // The chosen clothes
  const currentShirt = useSelector(
    (state: RootState) => state.sets.currentShirt
  );
  const currentPants = useSelector(
    (state: RootState) => state.sets.currentPants
  );
  const currentShoes = useSelector(
    (state: RootState) => state.sets.currentShoes
  );

  // Adding a set
  const successHandler = () => {
    if (currentShirt && currentPants && currentShoes)
      dispatch(
        addSet({
          shirt: currentShirt,
          pants: currentPants,
          shoes: currentShoes,
        })
      );

    Toast.show("Successfully created a set!", Toast.SHORT);
    navigation.navigate("success");
  };

  return (
    <>
      <Navbar title={"Home"} />
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.text}>Completed Sets: {setsCounter}</Text>
          <Text style={styles.text}>Current Set Status: {status}/3</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.buttonContainer}>
            <Button
              title="Choose Shirt"
              color={"gray"}
              onPress={() => navigation.navigate("shirts")}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Choose Pants"
              color={"gray"}
              onPress={() => navigation.navigate("pants")}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Choose Shoes"
              color={"gray"}
              onPress={() => navigation.navigate("shoes")}
            />
          </View>
        </View>
        {status === 3 && (
          <Pressable onPress={successHandler} style={styles.button}>
            <Text style={styles.buttonText}>Success!</Text>
          </Pressable>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    margin: 20,
    borderColor: "black",
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "lightgray",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonContainer:{
    margin:10
  },
  text: {
    fontSize: 20,
  },
  button: {
    backgroundColor: "darkgreen",
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

export default HomeScreen;
