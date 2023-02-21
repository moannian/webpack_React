import React, { useState } from "react";
import { Input } from "antd"
type InputProps = React.ComponentProps<typeof Input>
interface Iprops extends InputProps {
    emailContent: string,

}
export const EmailInput: React.FC<Iprops> = (props) => {

    const { emailContent, ...reset } = props
    const suffixList = ["@qq.com", "@163.com"];

    return (
        <>
            <Input list='a'{...reset} />
            <datalist id='a'>
                {suffixList.map((item, index) => {
                    return (
                        <option value={emailContent + item} key={index}>{emailContent + item}</option>
                    )
                })}
            </datalist>
        </>
    )
}


