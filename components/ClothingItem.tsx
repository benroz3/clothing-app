import { useState } from "react";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import ModalDropdown from "react-native-modal-dropdown";
import { useDispatch } from "react-redux";
import Toast from "react-native-simple-toast";
import {
  setCurrentPants,
  setCurrentShirt,
  setCurrentShoes,
} from "../redux/slices/setsSlice";
import { SingleClothesType } from "../utils/types";

const ClothingItem: React.FC<{
  navigation: StackNavigationProp<any, any>;
  item: SingleClothesType;
}> = ({ navigation, item }) => {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // Updating the state with the chosen clothes
  const handleChoose = () => {
    if (selectedColor !== "" && selectedSize !== "") {
      const chosenClothes = {
        id: item.id,
        type: item.type,
        name: item.name,
        colors: selectedColor,
        sizes: selectedSize,
        brand: item.brand,
      };

      if (item.type === "shirt") dispatch(setCurrentShirt(chosenClothes));
      else if (item.type === "pants") dispatch(setCurrentPants(chosenClothes));
      else if (item.type === "shoes") dispatch(setCurrentShoes(chosenClothes));

      // Success message and navigating the user back home
      Toast.show("Added a clothing item to set!", Toast.SHORT);
      navigation.navigate("home");

      // Error message
    } else Toast.show("Please choose size and/or color!", Toast.SHORT);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {item.type === "shirt" ? ( // Showing a matching image according the type of clothes
          <Image
            source={require(`../assets/img/shirt.png`)}
            style={styles.img}
          />
        ) : item.type === "pants" ? (
          <Image
            source={require(`../assets/img/pants.png`)}
            style={styles.img}
          />
        ) : (
          <Image
            source={require(`../assets/img/shoes.png`)}
            style={styles.img}
          />
        )}
        <View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Name: </Text>
            <Text style={styles.text}>{item.name}</Text>
          </View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Brand: </Text>
            <Text style={styles.text}>{item.brand}</Text>
          </View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Colors: </Text>
            <ModalDropdown
              options={item.colors.map(String)}
              defaultIndex={0}
              defaultValue={item.colors[0]}
              onSelect={(index, value) => setSelectedColor(value.toString())}
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              dropdownStyle={styles.dropdownContainer}
              dropdownTextStyle={styles.dropdownOptionText}
            />
          </View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Sizes: </Text>
            <ModalDropdown
              options={item.sizes.map(String)}
              defaultIndex={0}
              defaultValue={item.sizes[0].toString()}
              onSelect={(index, value) => setSelectedSize(value.toString())}
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              dropdownStyle={styles.dropdownContainer}
              dropdownTextStyle={styles.dropdownOptionText}
            />
          </View>
        </View>
        <Pressable style={styles.buttonContainer}>
          <Button
            title="Choose"
            color={ // Matching the button color to the default value / selected color
              (selectedColor === "" && item.colors[0] === "white") ||
              selectedColor === "white"
                ? "black"
                : selectedColor === ""
                ? item.colors[0]
                : selectedColor
            }
            onPress={handleChoose}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "white",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    flex: 1,
    marginRight: 20,
    width: 50,
    height: 50,
  },
  buttonContainer: {
    flex: 4,
    width: 100,
    alignItems: "flex-end",
  },
  titleWrapper: {
    flex: 4,
    display: "flex",
    flexDirection: "row",
  },
  title: {
    color: "gray",
    fontSize: 24,
  },
  text: {
    fontSize: 24,
  },
  dropdown: {
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
  },
  dropdownContainer: {
    width: 250,
    maxHeight: 100,
    backgroundColor: "lightgray",
    zIndex: 2,
  },
  dropdownText: {
    color: "black",
    fontSize: 24,
  },
  dropdownOptionText: {
    fontSize: 24,
    backgroundColor: "lightgray",
  },
});

export default ClothingItem;
