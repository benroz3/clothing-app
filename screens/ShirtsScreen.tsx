import { useState } from "react";
import { ScrollView, TextInput, View, StyleSheet, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ClothingItem from "../components/ClothingItem";
import { RootState } from "../utils/types";

const ShirtsScreen: React.FC<{
  navigation: StackNavigationProp<any, any>;
}> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering the data to shirts only
  const clothes = useSelector(
    (state: RootState) => state.clothes.clothes
  ).results;
  const shirts = clothes.filter((item) => item.type === "shirt");

  // Filtering the shirts with search input
  const filteredShirts = shirts.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.type === "shirt" &&
      (item.name.toLowerCase().includes(query) ||
        item.colors.some((color) => color.toLowerCase().includes(query)) ||
        item.brand.toLowerCase().includes(query) ||
        item.sizes.some((size) => size.toString().includes(query)))
    );
  });

  // Sorting the shirts alphabetically
  const sortedShirts = filteredShirts
    .slice()
    .sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    );

  return (
    <>
      <Navbar title={"Shirts"} />
      <View>
        <TextInput
          style={styles.input}
          placeholder="Search by name, color, brand, or size"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <Text>Showing {sortedShirts.length} items.</Text>
        <ScrollView>
          {sortedShirts.map((shirt) => (
            <ClothingItem key={shirt.id} item={shirt} navigation={navigation} />
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

export default ShirtsScreen;
