import React from 'react'
import {View,Text,StyleSheet} from 'react-native'

const TokenRow = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imgView}/>
        </View>
    )
}

export default TokenRow

const styles = StyleSheet.create({
    container : {
        flexDirection : "row",
        
    },
    imgView : {

    }
})