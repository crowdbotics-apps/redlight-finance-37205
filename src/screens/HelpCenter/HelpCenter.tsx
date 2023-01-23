import React,{FC,useRef} from 'react'
import {
    View,
    Text,
    ImageBackground,
    Platform,
    StatusBar} from 'react-native'
import { SvgXml } from 'react-native-svg'
import CustomHeader from '../../components/CustomHeader'
import { useNavigation } from '@react-navigation/native'
import Images from '../../assets/Images'
import { Strings } from '../../util/Strings'
import Icons from '../../assets/Icons'
import styles from './styles'

const HelpCenter = () =>{
    const navigation = useNavigation()
    return  (
        <View style={{marginTop : -10}}>
        <ImageBackground source={Images.Background} resizeMode="cover" style={styles.image}>
            <StatusBar barStyle='light-content'/>
            <CustomHeader 
                name={Strings.HELP_CENTER}
                Icon = {<Icons.LeftArrow/>}
                isIconVisible={true} 
                headerStyle = {{marginTop : Platform.OS === 'ios' ? '12%' : 25}}
                onPress={()=>navigation.goBack()}
            />
            <View style={styles.mainContainer}>
                <View style={styles.containerView}>
                    <Text style={styles.headerText}>
                        Fermentum nunc cras sit eu. Mi bibendum felis odio sed orci interdum.
                         Et cursus varius tortor eget. Ornare pellentesque tortor fermentum 
                         neque nibh orci interdum pellentesque.
                    </Text>
                </View>
                <View style={styles.containerView}>
                    <Text style={styles.text}>{Strings.CONTACT_US_AT}</Text>
                    <View style={styles.row}>
                        <SvgXml
                            xml={Icons.CallIcon}
                            width={20}
                            height={20}
                        />
                        <Text style={styles.rowText}>(208) 555-0112</Text>
                    </View>
                    <View style={styles.row}>
                        <Icons.Envelope/>
                        <Text style={styles.rowText}>emailaddressgoeshere</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
        </View>
    )
}

export default HelpCenter