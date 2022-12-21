import { ModalPresentationIOS } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import React, { FC } from 'react';
import { View, TextInput, ImageBackground, Text, TouchableOpacity } from 'react-native';
import Images from '../../assets/Images';
import PrimaryButton from '../PrimaryButton';
import Modal from 'react-native-modal'

import styles from './styles';
import Tab from './Tab';
import { WelcomeProps } from './WelcomeProps';

const WelcomePopup: FC<WelcomeProps> = props => {

    const { isModalVisible } = props
    return (
        <View style={styles.Container}>
            <Modal isVisible={isModalVisible} style={styles.ModalContent}>
                <ImageBackground source={Images.Rectangle} style={styles.Image} resizeMode='cover' imageStyle={{ borderRadius: 20 }}>
                    <Text style={styles.HeaderText}>Welcome to Pandoras Vault!</Text>
                    <Text style={styles.Text}>You may upgrade your registration now to avail of the various features of the app </Text>
                    <View style={styles.MiddleContainer}>
                        <Tab Heading="Step 1"
                            Content="Valid ID Capture" />
                        <Tab Heading="Step2"
                            Content="Selfie Capture" />
                        <Tab Heading="Step 3"
                            Content="Additional Information" />
                    </View>
                    <View style={styles.LowerContainer}>
                        <TouchableOpacity onPress={() => { }}>
                            <View style={styles.ButtonOne}>
                                <Text style={styles.ButtonText}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }}>
                            <View style={styles.ButtonTwo}>
                                <Text style={styles.ButtonText}>Next</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </Modal>
        </View>
    )
}

export default WelcomePopup