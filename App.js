import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import CheckoutItem from "./components/CheckoutItem";
import RentButton from "./components/Button";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import OrderDetailsScreen from "./components/OrderDetailsScreen";
// ************************** Firebase URL *******************************
const firebaseUrl =
  "https://practical-88024-default-rtdb.firebaseio.com/orders.json";

// ************************* Checkout Screen (App) ************************
const CheckoutScreen = ({ navigation }) => {
  const initialItems = [
    {
      name: "Florence Chair",
      price: 980,
      monthlyPrice: 45,
      quantity: 1,
      image: require("./assets/1pic.png"),
    },
    {
      name: "Hewitt Chair",
      price: 897,
      monthlyPrice: 39,
      quantity: 2,
      image: require("./assets/2pic.png"),
    },
    {
      name: "Harper Swivel Chair",
      price: 800,
      monthlyPrice: 28,
      quantity: 2,
      image: require("./assets/3pic.png"),
    },
  ];
  // State to track items and order status
  const [items, setItems] = useState(initialItems);
  const [orderPlaced, setOrderPlaced] = useState(false);
  // Function to update the quantity of items in the cart
  const updateQuantity = (name, newQuantity) => {
    if (newQuantity >= 0) {
      const updatedItems = items.map((item) =>
        item.name === name ? { ...item, quantity: newQuantity } : item
      );
      setItems(updatedItems);
    }
  };
  // Function to calculate the total monthly price for the cart
  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + item.monthlyPrice * item.quantity,
      0
    );
  };
  // Function to calculate the subtotal including delivery fee
  const calculateSubtotal = () => {
    return calculateTotal() + 199;
  };
  // Function to handle the "Rent" button click, placing an order
  const handleRent = async () => {
    const orderData = {
      items: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.monthlyPrice,
      })),
      totalAmount: calculateSubtotal(),
      orderDate: new Date().toISOString(),
    };

    try {
      const response = await axios.post(firebaseUrl, orderData);
      if (response.status === 200) {
        setItems(initialItems);
        setOrderPlaced(true);
        navigation.navigate("OrderDetails", { orderData });
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an issue with your order. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Checkout header */}
      <View style={styles.header}>
        <TouchableOpacity style={{ position: "absolute", left: 16, top: 23 }}>
          <Ionicons name="arrow-back" size={24} color="#16085b" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Checkout</Text>
      </View>
      {/* List of items in the cart */}
      <View style={styles.itemContainer}>
        {items.map((item) => (
          <CheckoutItem
            key={item.name}
            name={item.name}
            price={item.price}
            monthlyPrice={item.monthlyPrice}
            quantity={item.quantity}
            image={item.image}
            onQuantityChange={updateQuantity}
          />
        ))}
      </View>
      {/* Order summary */}
      <View style={styles.orderSummary}>
        <View style={styles.verticalLine} />
        <Text style={styles.summaryHeader}>Order Summary</Text>

        <Text style={styles.summaryText}>
          Monthly Furniture Total:{" "}
          <Text style={styles.price}>               ${calculateTotal()}/mo</Text>
        </Text>
        <Text style={styles.summaryText}>
          Delivery and Assembly: <Text style={styles.price}>                        $199</Text>
        </Text>
        <Text style={styles.summaryText}>
          Rental Period: <Text style={styles.price}>                              2 months</Text>
        </Text>

        <View style={styles.line} />
        <Text style={styles.subtotal}>Subtotal                              ${calculateSubtotal()}</Text>

        <RentButton onPress={handleRent} navigation={navigation} />
      </View>
    </View>
  );
};

// ******************************* Order Details Screen**********************
const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Checkout">
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderDetails"
          component={OrderDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// ******************************* MAIN APPLICATION******************************
export default function App() {
  return <MainNavigator />;
}
// *******************************STYLING*******************************
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  header: {
    top: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    paddingBottom: 2,
    marginBottom: 2,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#16085b",
    textAlign: "center",
  },
  itemContainer: {
    paddingTop: 28,
    flex: 1,
  },
  orderSummary: {
    padding: 30,
    paddingTop: 10,
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  verticalLine: {
    borderBottomWidth: 5,
    borderRadius: 5,
    borderBottomColor: "#F0F0F0",
    width: "12%",
    alignSelf: "center",
  },
  summaryHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 15,
    color: "#16085b",
  },
  summaryText: {
    fontSize: 15,
    color: "#BEBEBE",
    marginBottom: 15,
  },
  price: {
    fontSize: 16,
    color: "#16085b",
    marginBottom: 15,
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: "#F0F0F0",
    width: "100%",
    marginVertical: 5,
  },
  subtotal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#16085b",
    top: 20,
  },
});
