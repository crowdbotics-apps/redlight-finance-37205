import { ModalPresentationIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import React, { FC } from 'react';
import { View, TextInput, ImageBackground, Text, TouchableOpacity } from 'react-native';
import Images from '../../assets/Images';
import PrimaryButton from '../PrimaryButton';
import Modal from 'react-native-modal'

import styles from './styles';
import Tab from './Tab';
import { WelcomeProps } from './WelcomeProps';
import { Strings } from '../../util/Strings';

const WelcomePopup: FC<WelcomeProps> = props => {

    const { isModalVisible } = props
    return (
        <View style={styles.Container}>
            <Modal isVisible={isModalVisible} style={styles.ModalContent}>
                <ImageBackground source={Images.Rectangle} style={styles.Image} resizeMode='cover' imageStyle={{ borderRadius: 20 }}>
                    <Text style={styles.HeaderText}>{Strings.WELCOME_TO_PANDORAS_VAULT}</Text>
                    <Text style={styles.Text}>{Strings.YOU_MAY_UPGRADE_YOUR_REGISTRATION} </Text>
                    <View style={styles.MiddleContainer}>
                        <Tab Heading={Strings.STEP_1}
                            Content={Strings.VALID_ID_CAPTURE} />
                        <Tab Heading={Strings.STEP_2}
                            Content={Strings.SELFIE_CAPTURE} />
                        <Tab Heading={Strings.STEP_3}
                            Content={Strings.ADDITIONAL_INFO} />
                    </View>
                    <View style={styles.LowerContainer}>
                        <TouchableOpacity onPress={() => { }}>
                            <View style={styles.ButtonOne}>
                                <Text style={styles.ButtonText}>{Strings.CANCEL}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }}>
                            <View style={styles.ButtonTwo}>
                                <Text style={styles.ButtonText}>{Strings.NEXT}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </Modal>
        </View>
    )
}

export default WelcomePopup