import React, { FC } from "react"
import { Text, View } from "react-native"
import styles from "./styles"
import { TransactionTabProps } from "./TransactiontabProps"

const TransactionTab: FC<TransactionTabProps> = Props => {
    return (
        <View>
            <View style={styles.transactionHistoryTab}>
                <Text style={styles.thirdeContainerTab}>{Props.typeOfPayment}</Text>
                <Text style={styles.transactionHistoryTabContent}>{Props.Timing}</Text>
            </View>
            <View style={styles.transactionHistoryTab}>
                <Text style={styles.thirdContainerTabText}>{Props.paymentMethod}</Text>
                <Text style={styles.thirdContainerTabTextPrice}>{Props.cost}</Text>
            </View>
        </View>
    )
}
export default TransactionTab