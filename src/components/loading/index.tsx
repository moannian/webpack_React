import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite"

import useStore from "util/useStore"
import { $mobx, toJS } from "mobx"
let LoadingIng = require("../../assing/img/tree.png")
import "./index.less"
const Loading = () => {
    const { loadingState } = useStore("userLoading")


    const loadingRef = useRef<HTMLElement>();

    useEffect(() => {
        // console.log(userInfo?.userInfo.nickName, loadingState)
        if (loadingState) {
            let loading = loadingRef.current as HTMLElement;
            let angle = 0
            let lxl = 100000
            setInterval(() => {
                if (angle % 100 == 0) {
                    loading.style.transform = 'scale(' + angle + ')'

                } else {

                }

                angle = angle + 1
                loading.style.transform = 'rotate(' + angle + 'deg)'
                loading.style.transition = '0.5s linear'

            }, 5)
        }
    }, [loadingState])

    return (
        <>{loadingState && <div className="mask">
            <div className="loading" ref={loadingRef as any}>
                <img src={LoadingIng} alt="" />
            </div>
        </div>}</>

    )
}

export default observer(Loading)