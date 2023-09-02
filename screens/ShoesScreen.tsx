import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ClothingItem from "../components/ClothingItem";
import { RootState } from "../utils/types";

const ShoesScreen: React.FC<{
  navigation: StackNavigationProp<any, any>;
}> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering the data to shoes only
  const clothes = useSelector(
    (state: RootState) => state.clothes.clothes
  ).results;
  const shoes = clothes.filter((item) => item.type === "shoes");

  // Filtering the shoes with search input
  const filteredPants = shoes.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.type === "shoes" &&
      (item.name.toLowerCase().includes(query) ||
        item.colors.some((color) => color.toLowerCase().includes(query)) ||
        item.brand.toLowerCase().includes(query) ||
        item.sizes.some((size) => size.toString().includes(query)))
    );
  });

  // Sorting the shoes alphabetically
  const sortedShoes = filteredPants.slice().sort((a, b) => {
    return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  });

  return (
    <>
      <Navbar title={"Shoes"} />
      <View>
        <TextInput
          style={styles.input}
          placeholder="Search by name, color, brand, or size"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <Text>Showing {sortedShoes.length} items.</Text>
        <ScrollView>
          {sortedShoes.map((singleShoesPair) => (
            <ClothingItem
              key={singleShoesPair.id}
              item={singleShoesPair}
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

export default ShoesScreen;
