import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../theme/theme';

const OrderScreen = (props) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchOrders();
    });
    return unsubscribe;
  }, [props.navigation]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`https://65d02e84ab7beba3d5e2daa0.mockapi.io/orders`);
      const data = await response.json();
      setOrders(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', }}>
        <TouchableOpacity style={{ justifyContent: 'center', marginBottom: 10 }} onPress={() => props.navigation.navigate('Menu')}>
          <Icon1 style={{ alignItems: 'center' }} name='menu' color={COLORS.primaryOrangeHex} size={25} />
        </TouchableOpacity>
        <Text style={{ color: 'black', fontSize: 20, marginLeft: 10, fontWeight: 'bold' }}>Lịch sử mua hàng</Text>
      </View>
      {isLoading ? (
        <Text>Đang tải danh sách đơn hàng...</Text>
      ) : orders.length > 0 ? (
        <FlatList
  data={orders}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderInfo}>Đơn hàng #{item.id}</Text>
      <Text style={styles.orderInfo}>Tổng tiền: {item.totalPrice}đ</Text>
      {item.cart && item.cart.length > 0 ? (
        <View>
          <Text style={styles.orderInfo}>Danh sách sản phẩm:</Text>
          <FlatList
            data={item.cart}
            keyExtractor={(product) => product.id.toString()}
            renderItem={({ product }) => (
              <View style={styles.productItem}>
                {product && product.name && (
                  <>
                    <Text>{product.name}</Text>
                    <Text>Số lượng: {product.quantity}</Text>
                    <Text>Giá: {product.price}đ</Text>
                  </>
                )}
              </View>
            )}
          />
        </View>
      ) : (
        <Text style={styles.orderInfo}>Không có sản phẩm trong đơn hàng này.</Text>
      )}
    </View>
  )}
/>

      ) : (
        <Text>Không có đơn hàng nào.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom:80
  },
  orderItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  orderInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  productItem: {
    marginLeft: 20,
    marginTop: 10,
  },
});

export default OrderScreen;
