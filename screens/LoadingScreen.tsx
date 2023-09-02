import { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootState } from "../utils/types";

const LoadingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const isFetching = useSelector(
    (state: RootState) => state.clothes.isFetching
  );

  // Showing the loading screen until fetching the data is completed
  useEffect(() => {
    if (!isFetching) navigation.navigate("home");
  }, [isFetching, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clother</Text>
      <Image source={require("../assets/img/logo.webp")} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default LoadingScreen;
