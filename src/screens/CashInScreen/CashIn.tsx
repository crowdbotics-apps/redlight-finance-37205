import React,{FC} from 'react'
import {View,Text,ImageBackground, TouchableOpacity,FlatList} from 'react-native'
import CashComponent from '../../components/CashComponent'
import Images from '../../assets/Images'
import styles from './styles'

const DATA = [1,2,3,4,5,6]

const CashIn : FC = () =>{
    return (
        <View style={{marginTop : -10}}>
            <ImageBackground source={Images.Background} resizeMode="cover" style={styles.image}>
                <View style={styles.mainContainer}>
                    <View style={styles.section}>
                        <View style={styles.sectionHeading}>
                            <Text style={styles.sectionHeadingText}>Online Banking</Text>
                            <TouchableOpacity>
                                <Text style={styles.sectionheadingBtnText}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.sectionSubheading}>Make your transactions quick and easy.</Text>
                        <FlatList
                            data = {DATA}
                            renderItem = {(item)=><CashComponent/>}
                            showsHorizontalScrollIndicator = {false}
                            horizontal = {true}
                            style = {styles.list}
                            bounces = {false}
                        />
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionHeading}>
                            <Text style={styles.sectionHeadingText}>E-wallets</Text>
                            <TouchableOpacity>
                                <Text style={styles.sectionheadingBtnText}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.sectionSubheading}>Virtual is the new normal.</Text>
                        <FlatList
                            data = {DATA}
                            renderItem = {(item)=><CashComponent/>}
                            showsHorizontalScrollIndicator = {false}
                            horizontal = {true}
                            style = {styles.list}
                            bounces = {false}
                        />
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionHeading}>
                            <Text style={styles.sectionHeadingText}>Over the Counter</Text>
                            <TouchableOpacity>
                                <Text style={styles.sectionheadingBtnText}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.sectionSubheading}>Cash in with ease.</Text>
                        <FlatList
                            data = {DATA}
                            renderItem = {(item)=><CashComponent/>}
                            showsHorizontalScrollIndicator = {false}
                            horizontal = {true}
                            style = {styles.list}
                            bounces = {false}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default CashIn