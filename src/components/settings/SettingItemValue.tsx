import { FC } from 'react'
import { ButtonType1 } from '../../style/styledComponents'
import { SettingItemInterface } from '../../interfaces/appContentInterfaces'

interface SettingItemValueProps{
    settingItemValue:string|number
}

const SettingItemValue:FC<SettingItemValueProps> = ({settingItemValue}) => {
    return (
        <ButtonType1
            className={`settingItemValue ${settingItemValue === language ? 'settingItemValue-selected' : ''}`}
            // key={index} 
            onClick={() => onClickActions(settingItem.id, settingItemValue)}
        >
            {settingItemValue}
        </ButtonType1>
    )
}

export default SettingItemValue