import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const CheckoutItem = ({ name, price, monthlyPrice, quantity, image, onQuantityChange }) => {
  
  // Function to handle quantity change (increment or decrement)
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 0) { 
      onQuantityChange(name, newQuantity); 
    }
  };

  return (
    <View style={styles.itemContainer}>
      <Image source={image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemPrice}>${price}</Text>
        <View style={styles.row}>
          <Text>
            <Text style={styles.itemMonthlyPrice}>${monthlyPrice}</Text>
            <Text style={styles.perMonth}> /mo</Text>
          </Text>
          
          {/* Quantity Controls */}
          <View style={styles.quantityContainer}>
            {/* Decrease Quantity Button */}
            <TouchableOpacity
              style={[styles.quantityButton, { backgroundColor: "#ffff" }]}
              onPress={() => handleQuantityChange(quantity - 1)} // Decrease quantity
            >
              <Text style={styles.quantityButtonTextB}>-</Text>
            </TouchableOpacity>
            
            {/* Current Quantity Display */}
            <Text style={styles.quantityText}>{quantity}</Text>
            
            {/* Increase Quantity Button */}
            <TouchableOpacity
              style={[styles.quantityButton, { backgroundColor: "#16085b" }]}
              onPress={() => handleQuantityChange(quantity + 1)} // Increase quantity
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
// *******************************STYLING*******************************
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 16,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 6,
    marginBottom: 0,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
  },
  details: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    marginBottom: 1,
    color: "#16082f",
  },
  itemPrice: {
    fontSize: 15,
    color: "#16082f",
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemMonthlyPrice: {
    fontSize: 18,
    color: "#16085b",
    fontWeight: "bold",
  },
  perMonth:{
fontSize: 15,
    color: "#666",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop:1,
    paddingButtom:3,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  quantityButtonTextB:{
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CheckoutItem;
