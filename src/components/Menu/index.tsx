import React from "react"
import { ItemGroup, MenuProps as RcMenuProps, MenuRef } from 'rc-menu';


import "./index.less"

interface ItemType {
    path: string,
    icon?: React.ReactNode;
    label?: React.ReactNode;
    suffix?: React.ReactNode;
    children?: ItemType[];
}
export interface IMenuProps extends Omit<RcMenuProps, 'items'> {
    items: ItemType[];
    cancelFixed: (path: string) => void
}

const Menu: React.FC<IMenuProps> = (props) => {

    const { className, items, cancelFixed } = props

    const MeumRender = (elementUI: ItemType[]) => {
        return (
            <div className={`menu ${className}`}>
                {
                    elementUI.map(({ path, icon, label, suffix, children = [] }) => {
                        return (
                            <div key={path} className="menuItem"
                                onClick={(e) => {
                                    e.stopPropagation()
                                }}>
                                <div>{icon}</div>
                                <div className="title">{label}</div>
                                <div className="suffix" onClick={(e) => {
                                    cancelFixed(path)
                                    e.stopPropagation()
                                }}>{suffix}</div>
                                {MeumRender(children as ItemType[])}
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div>
            {MeumRender(items)}
        </div >
    )
}




export default Menu