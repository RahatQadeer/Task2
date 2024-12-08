import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const RentButton = ({ onPress, navigation }) => {
  const handlePress = () => {
    onPress();
    navigation.navigate('OrderDetails');
  };

  return (
    <TouchableOpacity style={styles.rentButton} onPress={handlePress}>
      <Text style={styles.rentButtonText}>Rent</Text>
    </TouchableOpacity>
  );
};
// *******************************STYLING*******************************
const styles = StyleSheet.create({
  rentButton: {
    backgroundColor: "#16085b",
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: "center",
    marginVertical: 16,
    top: 30,
  },
  rentButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RentButton;
