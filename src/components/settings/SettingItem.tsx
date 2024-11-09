import { FC } from "react"
import { SettingItemInterface } from "../../interfaces/appContentInterfaces"
import SettingItemValue from "./SettingItemValue"
import { SettingV2ItemInterface } from "../context/AppContentContextProvider"

interface SettingItemProps {
    settingItem:SettingItemInterface
    settingV2Item:SettingV2ItemInterface
}

const SettingItem:FC<SettingItemProps> = ({settingItem, settingV2Item}) => {
    return (
        <div className="settingItem">
            <h4>{settingItem.text}</h4>
            <h4>{settingV2Item.text}</h4>
            
            <div className="settingItemValues">
                {settingItem.values.map((settingItemValue, index) => (
                    <SettingItemValue key={index} settingItemValue={settingItemValue} parentSettingItemId={settingItem.id}/>
                ))}
                <p>settingV2</p>
                {settingV2Item.values.map((settingV2ItemValue, index) => (
                    <SettingItemValue key={index} settingV2ItemValue={settingV2ItemValue}/>
                ))}
            </div>
        </div>
    )
}

export default SettingItem