import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, SafeAreaView, ScrollView,ToastAndroid, Image, TextInput, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../theme/theme';
import apiUrl from '../database/api';


const SeenProduct = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [randomList, setrandomList] = useState([]);
    const [dssp, setDssp] = useState([]);


    const [idProd, setidProd] = useState('');
    const [imgProd, setimgProd] = useState('')
    const [nameProd, setnameProd] = useState('');
    const [dviProd, setdviProd] = useState('');
    const [priceProd, setpriceProd] = useState('');
    const [reviewProd, setreviewProd] = useState('');
    const [description, setdescription] = useState('');
    const [quantity, setquantity] = useState('');
    const [favor, setfavor] = useState('')
    const [modalVisible, setmodalVisible] = useState(false);

    const getListSp = async () => {
        try {
            const response = await fetch(`${apiUrl}/products`);//load dlieu
            const json = await response.json(); //chuyển dlieu -> json
            setrandomList(json.filter(item => item.id % 2 == 0));
            // setDssp(json);//đổ dl
        } catch (error) {
            console.error(error);
        } finally {
            //kết thúc load dl
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            //cập nhật gd ở đây
            getListSp();
        });
        return unsubscribe;
    }, [props.navigation]);

    const dataState = (item) => {
        //gán dữ liệu cho state
        setidProd(item.id);
        setimgProd(item.image);
        setnameProd(item.name);
        setdviProd(item.dvi);
        setreviewProd(item.review);
        setpriceProd(item.price);
        setfavor(item.favor);
        setdescription(item.description);
    };

    const addToFavor = async () => {

        const updatedProduct = {
            ...dssp.find(item => item.id === idProd), // lấy thông tin sản phẩm hiện tại
            favourite: true // cập nhật thuộc tính favourite
        };
        fetch(`${apiUrl}/products/${idProd}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updatedProduct)
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
            const response = await fetch(`${apiUrl}/carts`);
            const cartItems = await response.json();

            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
            const existingItem = cartItems.find(cartItem => cartItem.idProd === item.idProd);

            if (existingItem) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng
                existingItem.quantity++;
                // Update số lượng trên server
                await fetch(`${apiUrl}/carts/${existingItem.id}`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(existingItem),
                });
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm một mục mới
                await fetch(`${apiUrl}/carts`, {
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



    return (
        <ImageBackground source={require('../img/background.png')}>
            <View style={{ flexDirection: 'row', padding:16 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Home1')}>
                    <Icon style={{ alignItems: 'center' }}
                        name="angle-left"
                        size={30}
                        color={COLORS.primaryOrangeHex}
                    />
                </TouchableOpacity>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 20, marginBottom: 10, textAlign: 'center', color: 'black' }}>Sản phẩm đã xem</Text>
            </View>
            <View style={{alignItems:'center', marginBottom:150 }}>
                <FlatList 
                    data={randomList}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.productView} onPress={() => {
                            //gán dữ liệu cho state
                            dataState(item);
                            setmodalVisible(true);
                        }}>
                            <View style={{ height: 195, }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                    <Image source={{ uri: item.image }} style={styles.image} />
                                </View>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.productNum}>Giá cũ: {item.dvi}</Text>
                                <Text style={styles.productPrice}>{item.price}đ</Text>
                            </View>
                            <TouchableOpacity
                                style={{ marginTop: 10, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FACF23', borderRadius: 5, }}
                                onPress={() => {
                                    dataState(item);
                                    setmodalVisible(true)
                                }}>
                                <Text style={{ color: 'black' }}>Thêm</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            </View>
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
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => setmodalVisible(false)}>
                                    <Icon style={{ alignItems: 'center' }}
                                        name="angle-left"
                                        size={30}
                                        color={COLORS.primaryOrangeHex}

                                    />
                                </TouchableOpacity>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginLeft: 20, marginBottom: 10, textAlign: 'center', color: 'black' }}>Chi tiết sản phẩm</Text>
                            </View>
                            <View style={{ flex: 1.5, alignItems: 'center', backgroundColor: 'white', padding: 10 }}>
                                <Image source={{ uri: imgProd }} style={{ width: 300, height: 300, }} />
                            </View>

                            <View style={{ flex: 3, marginTop: 20, }}>
                                <View style={{ backgroundColor: '#EFEDED', padding: 10, borderRadius: 5, }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>{nameProd}</Text>
                                    <View>
                                        <Icon style={{ alignItems: 'center', }}
                                            name="star"
                                            size={15}
                                            color={COLORS.primaryOrangeHex}
                                        ><Text> {reviewProd}</Text></Icon>
                                    </View>
                                    <Text style={{ marginTop: 5, textDecorationLine: 'line-through' }}>Giá gốc: {dviProd}</Text>
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
                            <View style={{ backgroundColor: '#EFEDED', padding: 10, borderRadius: 10, marginTop: 10 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Bình luận</Text>
                                <TextInput placeholder='Thêm nhận xét của bạn tại đây' style={{ borderWidth: 0.5, borderRadius: 10, padding: 10 }}></TextInput>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>


            </Modal>
        </ImageBackground>
    )
}

export default SeenProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,

    },
    productView: {
        width: 170,
        height: 260,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        paddingBottom: 10,
        position: 'relative',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        elevation: 2,
    },
    image: {
        width: 120,
        height: 120,
        margin: 2,
    },
    productName: {
        fontWeight: 'bold',
    },
    productNum: {
        color: '#a7a7a7',
        textDecorationLine: 'line-through'
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
})