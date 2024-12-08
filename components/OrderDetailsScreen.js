import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OrderDetailsScreen = ({ route }) => {
  // Extract orderData from route.params
  const { orderData } = route.params || {}; 

  // Check if orderData is valid
  if (!orderData) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No order data found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Details</Text>
      <View style={styles.detailsContainer}>
        {orderData.items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
            <Text style={styles.itemPrice}>Price: ${item.price * item.quantity}</Text>
          </View>
        ))}
        <View style={styles.totalContainer}>
          <Text style={styles.total}>Total Amount: ${orderData.totalAmount}</Text>
        </View>
      </View>
    </View>
  );
};
// *******************************STYLING*******************************
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#F0F0F0",
    
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#16085b",
  },
  detailsContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2, 
    borderColor: '#BEBEBEBE', // Border color
  },
  item: {
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemQuantity: {
    fontSize: 16,
    color: "#666",
  },
  itemPrice: {
    fontSize: 16,
    color: "#16085b",
  },
  totalContainer: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#16085b",
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
});

export default OrderDetailsScreen;
