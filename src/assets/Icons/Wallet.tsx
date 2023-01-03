import React, { FC } from 'react'
import Svg, { Path } from "react-native-svg"

const Wallet: FC = () => {
    return (
        <Svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M1 3V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H23C23.2652 21 23.5196 20.8946 23.7071 20.7071C23.8946 20.5196 24 20.2652 24 20V6C24 5.73478 23.8946 5.48043 23.7071 5.29289C23.5196 5.10536 23.2652 5 23 5H3C2.46957 5 1.96086 4.78929 1.58579 4.41421C1.21071 4.03914 1 3.53043 1 3ZM1 3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    )
}

export default Wallet