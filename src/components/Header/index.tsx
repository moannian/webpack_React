import React, { ReactNode, FC } from "react";
import classnames from 'classnames';
import "./index.less"

interface Iprops {
    rightElement?: ReactNode,
    title: string
}
const Header: FC<Iprops> = (props) => {
    const { rightElement, title } = props
    const classNames = classnames({ "baseStyle": true })
    return (
        <div className={classNames}>
            <div className="title">{title}</div>
            <div className="element">{rightElement}</div>
        </div>
    )
}

export default Header;