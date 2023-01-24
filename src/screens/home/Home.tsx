import React, { FC, useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, ImageBackground, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import Images from '../../assets/Images'
import WalletCard from '../../components/WalletCard'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Colors } from '../../theme/Colors'
import { getAllFIATWallets, transactionHistory } from '../../services/auth'
import { SvgXml } from 'react-native-svg'
import Icons from '../../assets/Icons'
import RadialGradient from 'react-native-radial-gradient';
import TransactionTab from './TransactionTab'
import ServiceTab from './ServiceTab'
import { Strings } from '../../util/Strings'

const Home: FC = ({route}: any) => {
    const [data, setData] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const navigation = useNavigation()
    const renderItem = ({ item, index, }: any) => (
        <WalletCard item={item} index={index} screen="Homescreen" refresh = {getWallets} />
    )
        ;
    useEffect(() => {
        getWallets()
    }, []);
    const getWallets = () => {
        getAllFIATWallets().then((response) => {
            response.data.push({ key: 1 })
            setData(response.data)
        }).catch(error => {
            console.log(error.response)
        })
    }
    const cashInTabHandler = () => {
        navigation.navigate('CashInScreen')
    }
    const cashOutTabHandler = () => {
        navigation
            .navigate('CashOutScreen')
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={Images.Rectangle} style={styles.Image} resizeMode="cover">
                <Text style={styles.headerText}>Pandoras Vault</Text>
                <ScrollView>
                    <View style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <View style={{ height: "33%", marginTop: "2%" }}>
                            <Carousel data={data} renderItem={renderItem} itemWidth={370} itemHeight={100} sliderWidth={375} layout={'default'}
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
                                    backgroundColor: Colors.RedBaron,
                                }}
                                inactiveDotStyle={{
                                    backgroundColor: Colors.Gray78
                                }}
                                inactiveDotOpacity={0.4}
                                inactiveDotScale={0.6}
                            />
                        </View>
                        <View>
                            <Text style={styles.contentText}>Services</Text>
                            <View style={styles.servicesContainer}>
                                <ServiceTab
                                    Heading={Strings.CASH_IN}
                                    iconName={Icons.CashInWallet}
                                    onPressFunction={cashInTabHandler}
                                />
                                <ServiceTab
                                    Heading={Strings.SEND_CREDITS}
                                    iconName={Icons.SendCredit}
                                    onPressFunction={() => { }}
                                />
                                <ServiceTab
                                    Heading={Strings.CASH_OUT}
                                    iconName={Icons.CashOutWallet}
                                    onPressFunction={cashOutTabHandler}
                                />
                                <ServiceTab
                                    Heading={Strings.BILL_PAYMENTS}
                                    iconName={Icons.BillVector}
                                    onPressFunction={() => { }}
                                />
                                <ServiceTab
                                    Heading={Strings.S_CREDITS}
                                    iconName={Icons.SCredit}
                                    onPressFunction={() => { }}
                                />
                                <ServiceTab
                                    Heading={Strings.E_LOAD}
                                    iconName={Icons.ELoad}
                                    onPressFunction={() => { }}
                                />
                            </View>
                        </View>
                        <Text style={styles.contentText}>Complete Verification</Text>
                        <RadialGradient

                            gradient={[
                                'rgba(184, 6, 31, 0.4)',
                                'rgba(184, 6, 31, 0.4)',
                            ]}
                            center={[16.57, -22]}
                            radius={200.75}
                            style={{
                                borderRadius: 10,
                                overflow: 'hidden',
                                width: "90%",
                            }}
                        >
                            <Text style={styles.verificationTabText} >Want full access ?</Text>
                            <View style={{ display: "flex", flexDirection: "row" }}>
                                <Text style={styles.verificationTabContent}>You may upgrade your registration now to avail of the various features of the app.</Text>
                                <SvgXml
                                    xml={Icons.Access}
                                    width={70}
                                    height={70}
                                    style={{ marginTop: -20 }}
                                />
                            </View>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Upgrade</Text>
                            </TouchableOpacity>
                        </RadialGradient>
                        <Text style={styles.contentText}>Recent Transactions</Text>
                        <View style={styles.thirdContainer}>
                            <TransactionTab
                                typeOfPayment="Cash In"
                                Timing="12 hours ago"
                                paymentMethod="E Load"
                                cost="20.00" />
                            <TransactionTab
                                typeOfPayment="Cash In"
                                Timing="12 hours ago"
                                paymentMethod="Online Bank"
                                cost="40.00"
                            />
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

export default Home

