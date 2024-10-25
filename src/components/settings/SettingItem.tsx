import { FC } from "react"
import { SettingItemInterface } from "../../interfaces/appContentInterfaces"
import SettingItemValue from "./SettingItemValue"
import { ApiContextProvider } from "../context/ApiContextProvider"

interface SettingItemProps {
    settingItem:SettingItemInterface
}

const SettingItem:FC<SettingItemProps> = ({settingItem}) => {
    return (
        <div className="settingItem">
            <h4>{settingItem.text}</h4>
            
            <div className="settingItemValues">
                {settingItem.values.map((settingItemValue, index) => (
                    <ApiContextProvider key={index}>
                        <SettingItemValue settingItemValue={settingItemValue} parentSettingItemId={settingItem.id}/>
                    </ApiContextProvider>
                ))}
            </div>
        </div>
    )
}

export default SettingItem