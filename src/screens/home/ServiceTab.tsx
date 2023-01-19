import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { ServiceTabProps } from "./ServiceTabProps";
import styles from "./styles";


const ServiceTab: FC<ServiceTabProps> = Props => {
    const { iconName, Heading, onPressFunction } = Props
    return (
        <TouchableOpacity style={styles.tab} onPress={onPressFunction}>
            <SvgXml
                xml={iconName}
                width={32}
                height={32}
                style={{ alignSelf: "center", marginVertical: "5%" }}
            />
            <Text style={styles.tabText}>{Heading}</Text>
        </TouchableOpacity>
    )
}

export default ServiceTab