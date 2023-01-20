import React,{FC} from 'react'
import {View,Text,StyleSheet,Button} from 'react-native'
import Modal from "react-native-modal";
import PrimaryButton from '../PrimaryButton';
import { Strings } from '../../util/Strings';
import styles from './styles';

type ErrorModalProps = {
    isModalVisible : boolean | undefined,
    onToggleModal : Function,
    successText : string
}

const SuccessModal : FC<ErrorModalProps> = props =>{
    const {isModalVisible,onToggleModal,successText} = props
    
    const hideModal = () =>{
        onToggleModal()
    }
    return(
        <Modal isVisible={isModalVisible}>
            <View style={styles.modal}>
                <Text style={styles.header}>{Strings.SUCCESS}</Text>
                <Text style={styles.mainText}>{successText}</Text>
                <PrimaryButton
                    // isLoading={isLoading}
                    // disabled = {!isCheckboxChecked}
                    text = {Strings.OK}
                    onPress = {hideModal}
                    style={{ width : '90%',marginVertical : 20,alignSelf : 'center'}}
                    btnStyle = {{}}
                />
            </View>      
        </Modal>
    )
}

export default SuccessModal




