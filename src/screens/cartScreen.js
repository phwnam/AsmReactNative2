import React, { useState, useEffect } from 'react';
import { SafeAreaView, Alert, View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, ToastAndroid } from 'react-native';
import { COLORS } from '../theme/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import apiUrl from '../database/api';

const ProductScreen = (props) => {

  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const getListCart = async () => {

    try {
      const response = await fetch(`${apiUrl}/carts`);
      const json = await response.json();
      setCart(json);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getListCart();
    });
    return unsubscribe;
  }, [props.navigation]);

  const deleteItem = async (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);

    try {
      await fetch(`${apiUrl}/carts/${itemId}`, {
        method: 'DELETE',
      });
      console.log('Cart item deleted successfully');
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };



  const handleDeleteItem = (itemId) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xoá?",
      [
        {
          text: "Huỷ",
          onPress: () => console.log("Huỷ"),
          style: "cancel"
        },
        {
          text: "Xoá",
          onPress: () => {
            deleteItem(itemId); // Truyền ID của sản phẩm vào hàm xoá
          }
        }
      ]
    );
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
        const response = await fetch(`${apiUrl}/carts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...cart.find(item => item.id === id),
                quantity: newQuantity
            })
        });

        if (response.ok) {
            console.log('Số lượng đã được cập nhật thành công');

            // Cập nhật lại giỏ hàng trên màn hình sau khi cập nhật thành công
            const updatedCart = cart.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            setCart(updatedCart);
        } else {
            console.error('Lỗi khi cập nhật số lượng:', response.statusText);
            // Xử lý lỗi nếu có
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật số lượng:', error);
        // Xử lý lỗi nếu có
    }
};


  const handlePayment = async () => {
    if (cart.length === 0) {
      ToastAndroid.show('Giỏ hàng của bạn đang trống!', ToastAndroid.SHORT);
      return;
    }

    try {
      const totalPrice = calculateTotalPrice(cart);

      const products = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const response = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products, totalPrice }),
      });

      const data = await response.json();
      console.log('Order created successfully:', data);

      setPaymentSuccess(true);
      setCart([]);
      ToastAndroid.show('Thanh toán thành công!', ToastAndroid.SHORT);

      // Sau khi thanh toán thành công, cập nhật giỏ hàng trên server

      const response1 = await fetch(`${apiUrl}/carts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([]),
      });

      const data1 = await response1.json();
      console.log('Cart cleared on server successfully');
    } catch (error) {
      console.error('Error creating order:', error);
      ToastAndroid.show('Đã xảy ra lỗi khi thanh toán!', ToastAndroid.SHORT);
    }
  };



  return (
    <SafeAreaView style={{ flex: 1, margin: 10 }}>
      <View style={{ flexDirection: 'row', }}>
        <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => props.navigation.navigate('Menu')}>
          <Icon1 style={{}} name='menu' color={COLORS.primaryOrangeHex} size={25} />
        </TouchableOpacity>
        <Text style={{ color: 'black', fontSize: 20, padding: 10, textAlign: 'center', fontWeight: 'bold' }}>Giỏ hàng</Text>
      </View>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                updateQuantity={updateQuantity}
                handleDeleteItem={handleDeleteItem}
              />
            )}
          />
        )}
      </View>
      <View style={styles.footer}>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>Tổng tiền: {calculateTotalPrice(cart)}đ</Text>
          <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
            <Text style={styles.paymentButtonText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const CartItem = ({ item, updateQuantity, handleDeleteItem }) => {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDelete = () => {
    handleDeleteItem(item.id); // Sử dụng handleDeleteItem thay vì handleDelete
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <View style={styles.info}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}đ</Text>
        <Text>Đơn vị: {item.dvi}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={handleDecrease}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={handleIncrease}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Icon style={{ alignItems: 'center' }}
            name="trash-o"
            size={30}
            color={COLORS.primaryOrangeHex}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'column',
  },
  container: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 15,
    borderRadius: 5,
  },
  info: {
    width: '100%',
    padding: 10,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#4EC581',
    textAlign: 'left',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.primaryOrangeHex,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 20,
    color: 'black',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    paddingHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primaryOrangeHex,
    marginBottom: 80
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPriceText: {
    color: 'black',
    fontWeight: 'bold',
  },
  paymentButton: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,

  },
  paymentButtonText: {
    color: 'black',
  },
  paymentSuccess: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  paymentSuccessText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    marginLeft: 240,
    marginTop: 50
  }
});

export default ProductScreen;
