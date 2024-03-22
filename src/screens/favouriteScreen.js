import React, { useState } from 'react';
import { SafeAreaView, ScrollView, FlatList, View, Text, Image, StyleSheet, ActivityIndicator, Modal, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/theme';



const FavouriteScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dssp, setDssp] = useState([]);

  const getListSp = async () => {
    let url_api = 'https://65baf1bfb4d53c066553b8a3.mockapi.io/products';

    try {
      const response = await fetch(url_api);//load dlieu
      const json = await response.json(); //chuyển dlieu -> json
      setDssp(json.filter(item => item.favourite == true));//đổ dl
    } catch (error) {
      console.error(error);
    } finally {
      //kết thúc load dl
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      //cập nhật gd ở đây
      getListSp();
    });
    return unsubscribe;
  }, [props.navigation]);

  const removeFavor = async (idProd) => {
    fetch(`https://65baf1bfb4d53c066553b8a3.mockapi.io/products/${idProd}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ favourite: false })
    }).then(res => {
      if (res.ok) {
        getListSp(); // Cập nhật danh sách sau khi xoá
      }
    }).catch(error => {
      console.log(error);
    })
  };

  const handleDelete = (idProd) => {
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
            removeFavor(idProd); // Truyền ID của sản phẩm vào hàm xoá
          }
        }
      ]
    );
  };


  return (
    <SafeAreaView style={{ flex: 1,margin:10, paddingBottom: 70 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row',}}>
          <TouchableOpacity style={{justifyContent:'center'}} onPress={() => props.navigation.navigate('Menu')}>
            <Icon1 style={{}} name='menu' color={COLORS.primaryOrangeHex} size={25} />
          </TouchableOpacity>
          <Text style={{ color: 'black', fontSize: 20, padding: 10, fontWeight: 'bold' }}>Yêu thích</Text>
        </View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dssp}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <Image style={styles.image} source={{ uri: item.image }} />
                <View style={styles.info}>
                  <TouchableOpacity style={{ flex: 1, position: 'absolute', marginLeft: 320, }} onPress={() => handleDelete(item.id)}>
                    <Icon color={'red'} name='heart' size={25} />
                  </TouchableOpacity>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text numberOfLines={5} style={styles.productPrice}>{item.description}</Text>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'column', // Sắp xếp sản phẩm theo chiều dọc
  },
  container: {
    width: '100%', // Sản phẩm chiếm toàn bộ chiều rộng
    height: 400,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'column', // Sắp xếp hình ảnh và thông tin theo chiều ngang
    alignItems: 'center',
    marginBottom: 10, // Khoảng cách giữa các sản phẩm
  },
  image: {
    width: '80%',
    alignContent: 'center', // Đặt chiều rộng của hình ảnh
    height: 250,
    borderRadius: 5,
  },
  info: {
    width: '100%', // Đặt chiều rộng của phần thông tin
    padding: 10,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    textAlign: 'left',
  },
  productNum: {
    color: '#a7a7a7',
    textAlign: 'left',
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'left',
  },
});

export default FavouriteScreen;
