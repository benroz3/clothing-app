import React, { useState, useEffect } from "react";
import { ParamListBase, useNavigation  } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Easing,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Sidebar: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose,
}) => {
  const [animatedValue] = useState(new Animated.Value(-300));
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  // Closing the sidebar
  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
    onClose();
  };

  // Handling the animations
  useEffect(() => {
    if (visible) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -300,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <Animated.View
            style={[
              styles.sidebar,
              { transform: [{ translateX: animatedValue }] },
            ]}
          >
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="close-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen("home")}>
              <Text style={styles.sidebarText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen("shirts")}>
              <Text style={styles.sidebarText}>Shirts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen("pants")}>
              <Text style={styles.sidebarText}>Pants</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem} onPress={() => navigateToScreen("shoes")}>
              <Text style={styles.sidebarText}>Shoes</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sidebar: {
    backgroundColor: "#333",
    width: "70%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 1,
    paddingTop: 20,
  },
  closeButton: {
    padding: 10,
    alignItems: "flex-end",
  },
  sidebarItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  sidebarText: {
    color: "white",
    fontSize: 25,
  },
});

export default Sidebar;
