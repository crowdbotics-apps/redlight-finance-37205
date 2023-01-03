import React, { FC, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { PopupProps } from "./PopupProps";
import styles from "./styles";
import Modal from 'react-native-modal'
import Icons from "../../assets/Icons";
import PrimaryButton from "../PrimaryButton";
import CustomInput from "../CustomInput";

const Popup: FC<PopupProps> = props => {

    const closeModal = () => {
        props.setIsPopupVisible(false);
    }
    return (
        <Modal isVisible={props.isPopupVisible} style={styles.ModalContent} >
            <View style={styles.Container}>
                <TouchableOpacity onPress={closeModal} style={styles.Icon}>
                    <Icons.Cross />
                </TouchableOpacity>
                <Text style={styles.Heading}>{props.Heading}</Text>
                <PrimaryButton
                    isLoading={false}
                    text={props.buttonLabel}
                    onPress={props.onPressFunction}
                />
                <TouchableOpacity onPress={closeModal}>
                    <Text style={styles.Text}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default Popup