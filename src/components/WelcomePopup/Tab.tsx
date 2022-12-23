import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles';
import { TabProps } from './TabProps';

const Tab: FC<TabProps> = Props => {
    return (
        <View style={styles.TabContainer}>
            <Text style={styles.TabHeader}>{Props.Heading}</Text>
            <Text style={styles.TabContent}>{Props.Content}</Text>
        </View>
    )
}

export default Tab;