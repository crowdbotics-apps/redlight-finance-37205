import React, { FC, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DeleteModalProps } from "./DeleteModalProps";
import Modal from 'react-native-modal';
import styles from './styles';
import Icons from "../../assets/Icons";
import PrimaryButton from "../PrimaryButton";
import CustomInput from "../CustomInput";

const DeleteModal: FC<DeleteModalProps> = props => {
    const closeModal = () => {
        props.setIsPopupVisible(false);
    }
    const setPasswordValue = (password: string) => {
        props.setPassword(password)
        console.log(password)
    }
    return (
        <Modal isVisible={props.isPopupVisible} style={styles.ModalContent} >
            <View style={styles.Container}>
                <TouchableOpacity onPress={closeModal} style={styles.Icon}>
                    <Icons.Cross />
                </TouchableOpacity>
                <Text style={styles.Heading}>{props.Heading}</Text>
                <Text style={styles.InputText}>Enter Password</Text>
                <CustomInput
                    placeholder="Enter Password"
                    value={props.password}
                    onChangeText={props.setPassword}
                    isRightIconVisible={true}
                    isleftIconVisible={true}
                    leftIcon={<Icons.LockIcon />}
                    containerStyle={styles.btnStyle}
                />
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

export default DeleteModal