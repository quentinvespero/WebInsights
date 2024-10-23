import { FC } from "react"
import { SettingItemInterface } from "../../interfaces/appContentInterfaces"
import SettingItemValue from "./SettingItemValue"

interface SettingItemProps {
    settingItem:SettingItemInterface
}

const SettingItem:FC<SettingItemProps> = ({settingItem}) => {
    return (
        <div className="settingItem">
            <h4>{settingItem.text}</h4>
            
            <div className="settingItemValues">
                {settingItem.values.map((settingItemValue, index) => (
                    <SettingItemValue key={index} settingItemValue={settingItemValue} parentSettingItemId={settingItem.id}/>
                ))}
            </div>
        </div>
    )
}

export default SettingItem