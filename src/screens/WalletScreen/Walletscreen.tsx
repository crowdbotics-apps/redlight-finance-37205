import { useNavigation } from "@react-navigation/native";
import { set } from "immer/dist/internal";
import React, { FC, useEffect, useRef, useState } from "react";
import { Alert, Animated, FlatList, ImageBackground, Platform, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import Icons from "../../assets/Icons";
import Images from "../../assets/Images";
import Popup from "../../components/Popup";
import PrimaryButton from "../../components/PrimaryButton";
import WalletCard from "../../components/WalletCard";
import { deleteWallet, getAllFIATWallets } from "../../services/auth";
import { Strings } from "../../util/Strings";
import styles from "./styles";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Colors } from "../../theme/Colors";
import CustomHeader from "../../components/CustomHeader";
import LeftArrow from "../../assets/Icons/LeftArrow";

const WalletScreen = () => {
    const [data, setData] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const navigation = useNavigation()
    const [isPopupVisible, setIsPopupVisible] = useState(false)
    const renderItem = ({ item, index, refresh }: any) => (
        <WalletCard item={item} index={index} refresh={getAllWallets} />
    );
    const goBackIconHandler = () => {
        navigation.goBack()
    }
    const editButtonHandler = () => {
        navigation.navigate("EditSubWalletScreen", data[currentIndex])
    }
    const deleteButtonHandler = () => {
        setIsPopupVisible(true)
    }
    const addSubWalletButtonHandler = () => {
        navigation.navigate("AddSubWalletScreen", { screen: "Walletscreen", refresh : getAllWallets })
    }
    const deletePopUpButtonHandler = () => {
        deleteWallet(data[currentIndex].id).then((response) => {
            setIsPopupVisible(false)
        }).catch(error => {
            console.log(error.response)
        })
    }
    useEffect(() => {
        getAllWallets()
    }, []);
    const getAllWallets = () => {
        getAllFIATWallets().then((response) => {
            setData(response.data)
        }).catch(error => {
            console.log(error.response)
        })
    }
    return (
        <View>
            <ImageBackground source={Images.Background} resizeMode='cover' style={styles.Image}>
                <CustomHeader
                    name={Strings.MY_WALLET}
                    isIconVisible={true}
                    Icon={<LeftArrow />}
                    headerStyle={{ marginTop: Platform.OS === 'ios' ? '12%' : 25 }}
                    onPress={goBackIconHandler}
                />
                <View style={styles.Container}>
                    <View style={{ width: "100%", height: "40%", marginTop: "4%" }}>
                        <Carousel data={data} renderItem={renderItem} itemWidth={370} itemHeight={100} sliderWidth={375} containerCustomStyle={{ height: 0, alignSelf: "center" }} layout={'default'}
                            onSnapToItem={(index) => setCurrentIndex(index)} />
                        <Pagination
                            dotsLength={data.length}
                            activeDotIndex={currentIndex}
                            containerStyle={{ marginTop: 0, height: 0, width: 0, alignSelf: "center", paddingVertical: "4%" }}
                            dotStyle={{
                                width: 8,
                                height: 8,
                                borderRadius: 5,
                                marginHorizontal: 0,
                                backgroundColor: Colors.RedBaron
                            }}
                            inactiveDotStyle={{
                                backgroundColor: Colors.Gray78
                            }}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={editButtonHandler}>
                            <View style={styles.button}>
                                <SvgXml
                                    xml={Icons.Pencil}
                                    width={30}
                                    height={30}
                                />
                                <Text style={styles.buttonText}> Edit</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={deleteButtonHandler}>
                            <View style={styles.button}>
                                <SvgXml
                                    xml={Icons.Trash}
                                    width={30}
                                    height={30}
                                />
                                <Text style={styles.buttonText}> Delete</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <PrimaryButton
                        isLoading={false}
                        text="Add Sub Wallet"
                        onPress={addSubWalletButtonHandler}
                        style={{ paddingHorizontal: "7%", marginTop: "10%" }}
                        btnStyle={undefined}
                        disabled={undefined}
                    />
                    {isPopupVisible && (<Popup
                        isCustomInputVisible={false}
                        isPopupVisible={isPopupVisible}
                        Heading={Strings.DELETE_WALLET}
                        buttonLabel="Delete Wallet"
                        onPressFunction={deletePopUpButtonHandler}
                        setIsPopupVisible={setIsPopupVisible} />)}
                </View>
            </ImageBackground>
        </View>
    )
}

export default WalletScreen