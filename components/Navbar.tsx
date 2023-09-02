import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Sidebar from "./Sidebar";

const Navbar: React.FC<{ title: string }> = ({ title }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const onClose = () => {
    setShowSidebar(false);
  };

  return (
    <View style={styles.navbar}>
      <Pressable style={styles.icon} onPress={() => setShowSidebar(true)}>
        <Icon name="menu-outline" size={50} color="white" />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      {showSidebar && <Sidebar visible={showSidebar} onClose={onClose} />}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    marginTop: 45,
    width: "100%",
    backgroundColor: "#000000",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    flex: 3,
    marginRight: 16,
  },
  title: {
    flex: 6,
    color: "white",
    fontSize: 40,
  },
});

export default Navbar;
