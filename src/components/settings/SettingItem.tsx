import { FC } from "react"
import { SettingItemInterface } from "../../interfaces/appContentInterfaces"
import SettingItemValue from "./SettingItemValue"

// storing the setting in the chrome storage
// const saveToChromeStorage = (settingId: string, settingValue: string|number) => {
//     if (chrome) {
//         chrome.storage.sync.set({ [settingId]: settingValue }, () => {
//             console.log(`${settingId} saved:`, settingValue)
//         })
//     }
//     else console.warn('Chrome not found in current environment')
// }

interface SettingItemProps {
    // saveToChromeStorage:() => void
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