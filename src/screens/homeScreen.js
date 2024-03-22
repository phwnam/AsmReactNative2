import React, { Component, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet, TextInput, ImageBackground, ActivityIndicator, FlatList, Modal, Button, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/theme';


const HomeScreen = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [dssp, setDssp] = useState([]);
    const [meatList, setmeatList] = useState([]);
    const [fishList, setfishList] = useState([]);
    const [vegetaList, setvegetaList] = useState([]);


    //Tạo các state cho hiển thị chi tiết

    const [idProd, setidProd] = useState('');
    const [imgProd, setimgProd] = useState('')
    const [nameProd, setnameProd] = useState('');
    const [dviProd, setdviProd] = useState('');
    const [priceProd, setpriceProd] = useState('');
    const [description, setdescription] = useState('');
    const [quantity, setquantity] = useState('');
    const [favor, setfavor] = useState('')
    const [modalVisible, setmodalVisible] = useState(false);


    const getListSp = async () => {
        let url_api = 'https://65baf1bfb4d53c066553b8a3.mockapi.io/products';

        try {
            const response = await fetch(url_api);//load dlieu
            const json = await response.json(); //chuyển dlieu -> json
            setmeatList(json.filter(item => item.type === 'meat'));
            setfishList(json.filter(item => item.type === 'fish'));
            setvegetaList(json.filter(item => item.type === 'vegetables'));
            setDssp(json);//đổ dl
        } catch (error) {
            console.error(error);
        } finally {
            //kết thúc load dl
            setIsLoading(false);
        }
    }

    const dataState = (item) => {
        //gán dữ liệu cho state
        setidProd(item.id);
        setimgProd(item.image);
        setnameProd(item.name);
        setdviProd(item.dvi);
        setpriceProd(item.price);
        setfavor(item.favor);
        setdescription(item.description);
    };

    const addToFavor = async () => {
        fetch(`https://65baf1bfb4d53c066553b8a3.mockapi.io/products/${idProd}`, {
        // fetch(`http://192.168.0.105:3000/products/${idProd}`, {
            method: 'PUT', // or PATCH
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ favourite: true })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            // handle error
        }).then(task => {
            // Do something with updated task
            console.log('Thành công');
            setfavor(true);
        }).catch(error => {
            // handle error
            console.log(error);
        })
    };

    const addToCart = async () => {
        const item = {
            idProd: idProd,
            image: imgProd,
            name: nameProd,
            price: priceProd,
            dvi: dviProd,
            quantity: 1
        };

        try {
            // Lấy danh sách các mục trong giỏ hàng
            const response = await fetch('https://65baf1bfb4d53c066553b8a3.mockapi.io/carts');
            const cartItems = await response.json();

            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingItem = cartItems.find(cartItem => cartItem.idProd === item.idProd);

            if (existingItem) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng
                existingItem.quantity++;
                // Update số lượng trên server
                await fetch(`https://65baf1bfb4d53c066553b8a3.mockapi.io/carts/${existingItem.id}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(existingItem),
                });
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm một mục mới
                await fetch('https://65baf1bfb4d53c066553b8a3.mockapi.io/carts', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(item),
                });
            }

            console.log('Thêm thành công');
            ToastAndroid.show('Đã thêm vào giỏ hàng', ToastAndroid.SHORT);
        } catch (error) {
            console.log(error);
        }
    };



    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            //cập nhật gd ở đây
            getListSp();
        });
        return unsubscribe;
    }, [props.navigation]);


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Menu')}>
                    <Icon1 style={{ flex: 1, position: 'relative', margin: 10 }} name='menu' color={'#FACF23'} size={25} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    console.log(this.state.text);
                }}>
                    <Icon style={{ flex: 1, position: 'absolute', margin: 10 }} name='search' color={'#FACF23'} size={25} />
                    <TextInput
                        style={styles.input}
                        placeholder="Tìm kiếm..."
                    />
                </TouchableOpacity>
                <ScrollView style={{ marginTop: 10, marginBottom: 10 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Text style={{ marginLeft: 10, marginRight: 15 }}>Tất cả</Text>
                    <Text style={{ marginLeft: 15, marginRight: 15 }}>Rau củ</Text>
                    <Text style={{ marginLeft: 15, marginRight: 15 }}>Thịt</Text>
                    <Text style={{ marginLeft: 15, marginRight: 15 }}>Thuỷ hải sản</Text>
                    <Text style={{ marginLeft: 15, marginRight: 15 }}>Gia vị</Text>

                </ScrollView>

                <Text style={{ margin: 5, fontSize: 20 }}>Thịt</Text>
                {
                    (isLoading) ? (
                        <ActivityIndicator />
                    ) : (
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={meatList}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                return (

                                    <TouchableOpacity style={styles.productView} onPress={() => {
                                        dataState(item);
                                        //gán dữ liệu cho state
                                        setmodalVisible(true);
                                    }}>
                                        <Image source={{ uri: item.image }} style={styles.image} />
                                        <Text style={styles.productName}>{item.name}</Text>
                                        <Text style={styles.productNum}>Đơn vị: {item.dvi}</Text>
                                        <Text style={styles.productPrice}>{item.price}đ</Text>
                                        <TouchableOpacity
                                            style={{ marginTop: 10, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FACF23', borderRadius: 5 }}
                                            onPress={() => {
                                                dataState(item);
                                                setmodalVisible(true)
                                            }}>
                                            <Text style={{ color: 'black' }}>Thêm</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    )
                }

                <Text style={{ margin: 5, fontSize: 20 }}>Thuỷ hải sản</Text>
                {
                    (isLoading) ? (
                        <ActivityIndicator />
                    ) : (
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={fishList}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={styles.productView} onPress={() => {
                                        //gán dữ liệu cho state
                                        dataState(item);
                                        setmodalVisible(true)
                                    }}>
                                        <Image source={{ uri: item.image }} style={styles.image} />
                                        <Text style={styles.productName}>{item.name}</Text>
                                        <Text style={styles.productNum}>Đơn vị: {item.dvi}</Text>
                                        <Text style={styles.productPrice}>{item.price}đ</Text>
                                        <TouchableOpacity
                                            style={{ marginTop: 10, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FACF23', borderRadius: 5 }}
                                            onPress={() => {
                                                dataState(item);
                                                setmodalVisible(true)
                                            }}>
                                            <Text style={{ color: 'black' }}>Thêm</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    )
                }

                <Text style={{ margin: 5, fontSize: 20 }}>Rau củ</Text>
                {
                    (isLoading) ? (
                        <ActivityIndicator />
                    ) : (
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={vegetaList}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={styles.productView} onPress={() => {
                                        //gán dữ liệu cho state
                                        dataState(item);
                                        setmodalVisible(true)
                                    }}>
                                        <Image source={{ uri: item.image }} style={styles.image} />
                                        <Text style={styles.productName}>{item.name}</Text>
                                        <Text style={styles.productNum}>Đơn vị: {item.dvi}</Text>
                                        <Text style={styles.productPrice}>{item.price}đ</Text>
                                        <TouchableOpacity
                                            style={{ marginTop: 10, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FACF23', borderRadius: 5 }}
                                            onPress={() => {
                                                dataState(item);
                                                setmodalVisible(true)
                                            }}>
                                            <Text style={{ color: 'black' }}>Thêm</Text>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    )
                }


            </ScrollView>

            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setmodalVisible(false);
                }}
            >
                <SafeAreaView>
                    <ScrollView>
                        <View style={{ backgroundColor: 'white', flex: 1, width: '100%', padding: 16 }}>
                            <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={() => setmodalVisible(false)}>
                            <Icon style={{alignItems:'center'}} 
                                name="angle-left" 
                                size={30} 
                                color= {COLORS.primaryOrangeHex} 
                                  
                            />
                            </TouchableOpacity>
                            <Text style={{ fontWeight: 'bold', fontSize: 20,marginLeft:20,  marginBottom: 10, textAlign: 'center', color: 'black' }}>Chi tiết sản phẩm</Text>
                            </View>
                            <View style={{ flex: 1.5, alignItems: 'center', backgroundColor: 'white' }}>
                                <Image source={{ uri: imgProd }} style={{ width: '70%', height: 250 }} />
                            </View>

                            <View style={{ flex: 3, marginTop: 20, }}>
                                <View style={{ backgroundColor: '#EFEDED', padding: 10, borderRadius: 5, }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>{nameProd}</Text>
                                    <Text style={{ marginTop: 5 }}>Đơn vị: {dviProd}</Text>
                                    
                                    <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 19, marginTop: 5 }}>{priceProd} $</Text>
                                    <TouchableOpacity style={{ flex: 1, position: 'absolute', marginLeft: 330, marginTop: 15, zIndex: 1 }} onPress={addToFavor}>
                                        <Icon name='heart' size={29} color={favor ? 'red' : '#dddddd'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ padding: 1, marginTop: 10, height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FACF23', borderRadius: 5 }}
                                        onPress={addToCart}><Text style={{ color: 'black' }}>Thêm vào giỏ</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16, marginTop: 15 }}>Thông tin sản phẩm:</Text>
                                <Text style={{ fontSize: 16, marginTop: 15, lineHeight: 24 }}>{description}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>


            </Modal>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    productView: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        paddingBottom: 10,
        position: 'relative',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        height: 220,
        elevation: 2,
    },
    image: {
        width: 120,
        height: 98,
        borderRadius: 24,
    },
    productName: {
        fontWeight: 'bold',
    },
    productNum: {
        color: '#a7a7a7',
    },
    productPrice: {
        fontWeight: 'bold',
        color: '#4EC581',
    },
    star: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    review: {
        color: '#FF9416',
    },
    starImage: {
        width: 20,
        height: 20,
    },
    container: {
        margin: 10,
        marginBottom: 80,
    },
    input: {
        height: 45,
        borderColor: '#FACF23',
        borderWidth: 1,
        borderRadius: 10,
        padding: 15,
        paddingLeft: 45,
        margin: 5,
        backgroundColor: 'white'
    },
});

export default HomeScreen;



