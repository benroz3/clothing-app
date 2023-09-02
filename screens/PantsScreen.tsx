import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ClothingItem from "../components/ClothingItem";
import { RootState } from "../utils/types";

const PantsScreen: React.FC<{
  navigation: StackNavigationProp<any, any>;
}> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering the data to pants only
  const clothes = useSelector(
    (state: RootState) => state.clothes.clothes
  ).results;
  const pants = clothes.filter((item) => item.type === "pants");

  // Filtering the pants with search input
  const filteredPants = pants.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.type === "pants" &&
      (item.name.toLowerCase().includes(query) ||
        item.colors.some((color) => color.toLowerCase().includes(query)) ||
        item.brand.toLowerCase().includes(query) ||
        item.sizes.some((size) => size.toString().includes(query)))
    );
  });

  // Sorting the pants alphabetically
  const sortedPants = filteredPants.slice().sort((a, b) => {
    return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  });

  return (
    <>
      <Navbar title={"Pants"} />
      <View>
        <TextInput
          style={styles.input}
          placeholder="Search by name, color, brand, or size"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <Text>Showing {sortedPants.length} items.</Text>
        <ScrollView>
          {sortedPants.map((singlePants) => (
            <ClothingItem
              key={singlePants.id}
              item={singlePants}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    fontSize: 20,
    margin: 5,
  },
});

export default PantsScreen;
