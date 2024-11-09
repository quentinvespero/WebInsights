import { FC } from "react"
import SettingItemValue from "./SettingItemValue"
import { SettingV2ItemInterface } from "../context/AppContentContextProvider"
import styled from "styled-components"

interface SettingItemProps {
    // settingItem:SettingItemInterface
    settingV2Item:SettingV2ItemInterface
}

const Style = styled.div`
    display:flex;
    flex-direction:column;
    row-gap:.5rem;

    .settingItemValues{
        flex-direction:row;
        display:flex;
        column-gap:.8rem;
    }
`

const SettingItem:FC<SettingItemProps> = ({settingV2Item}) => {
    return (
        <Style className="settingItem">
            {/* <h4>{settingItem.text}</h4> */}
            <h4>{settingV2Item.text}</h4>
            
            <div className="settingItemValues">
                {/* {settingItem.values.map((settingItemValue, index) => (
                    <SettingItemValue key={index} settingItemValue={settingItemValue} parentSettingItemId={settingItem.id}/>
                ))} */}
                {settingV2Item.values.map((settingV2ItemValue, index) => (
                    <SettingItemValue key={index} settingV2ItemValue={settingV2ItemValue} parentSettingItemId={settingV2Item.id}/>
                ))}
            </div>
        </Style>
    )
}

export default SettingItem