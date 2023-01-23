import React,{FC} from 'react'
import {View,Text,StyleSheet,Button} from 'react-native'
import Modal from "react-native-modal";
import PrimaryButton from '../PrimaryButton';
import { Strings } from '../../util/Strings';
import styles from './styles';

type ErrorModalProps = {
    isModalVisible : boolean | undefined,
    onToggleModal : Function,
    errorText : string
}

const ErrorModal : FC<ErrorModalProps> = props =>{
    const {isModalVisible,onToggleModal,errorText} = props
    
    const hideModal = () =>{
        onToggleModal()
    }
    return(
        <Modal isVisible={isModalVisible}>
            <View style={styles.modal}>
                <Text style={styles.header}>{Strings.ERROR}</Text>
                <Text style={styles.mainText}>{errorText}</Text>
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

export default ErrorModal




