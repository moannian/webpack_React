import { remove } from "lodash"
import React, { ReactEventHandler, ReactNode, useEffect, useRef, useState } from "react"
import "./grid.less"

interface IElementLocation {
    left: number,
    top: number,
    grade: number | string,
    index: number
}

interface ILocation {
    top: number,
    left: number,
    _index: number,
    width: number,
    grade: string
}
const Grid = () => {
    const [elementLocation, setElementLocation] = useState<ILocation[]>()
    const [fristClick, setFristClick] = useState<ILocation>()
    const [removeAreaArr, setRemoveAreaArr] = useState<ILocation[]>()
    const ref = useRef()

    //给元素定位
    useEffect(() => {
        let element: HTMLElement = ref.current as any

        if (element) {
            let children: HTMLElement[] = element.children as any
            children = Array.from(children)
            let TDA: { grade: any, _index: number }[][] = [];//twoDimensionalArray
            let warpper: { grade: any, _index: number }[] = [];
            let locationArr: ILocation[] = []
            children.forEach((item, index) => {
                if (item.getAttribute("data-grade")) {
                    let sum: any = 0

                    let obj = {
                        grade: item.getAttribute("data-grade") as any,
                        _index: index
                    }
                    warpper.push(obj);
                    warpper.forEach(warpperItem => {
                        sum = warpperItem.grade * 1 + sum
                    })

                    if (sum == 9 || sum == 8 || sum == 10) {
                        TDA.push(warpper)
                        warpper = []
                        sum = 0
                    }
                    if (sum == 11) {
                        TDA.push(warpper.splice(0, 2))

                        sum = 0
                    }
                }
            })
            if (warpper.length) {
                TDA.push(warpper)
                warpper = []
            }

            TDA.forEach((oneItem, index) => {
                oneItem.forEach((twoItem, twoIndex) => {
                    let obj: Partial<ILocation> = {}
                    obj._index = twoItem._index
                    obj.grade = twoItem.grade
                    if (twoItem.grade == "3") {
                        obj.width = element?.offsetWidth * 0.26
                    } else {
                        obj.width = element?.offsetWidth * 0.41
                    }
                    if (index == 0) {
                        obj.top = 0
                    } else {
                        obj.top = index * 310
                    }
                    if (twoIndex == 0) {
                        obj.left = 0
                    } else if (twoIndex != 0 && oneItem.some(item => item.grade == "5")) {
                        obj.left = element?.offsetWidth * 0.41 + 10
                    } else {
                        obj.left = twoIndex * obj.width + (10 * twoIndex)
                    }

                    locationArr.push(obj as any)
                })

            })
            setElementLocation(locationArr)
        }
    }, [])

    //给每个元素固定位置
    useEffect(() => {
        console.log(elementLocation, "更新了")
        let element: HTMLElement = ref.current as any
        let children: HTMLElement[] = element.children as any
        if (elementLocation?.length) {
            elementLocation.forEach(item => {
                let index = elementLocation.findIndex(element => element._index === item._index)
                children[index].style.width = item.width + 'px';
                children[index].style.left = item.left + 'px';
                children[index].style.top = item.top + 'px';
            })
        }
    }, [elementLocation])

    //做交换逻辑的处理
    useEffect(() => {
        let element: HTMLElement = ref.current as any
        let children: HTMLElement[] = element.children as any
        if (removeAreaArr?.length) {
            let currentArearTwo = removeAreaArr[removeAreaArr?.length - 1]
            console.log(elementLocation, removeAreaArr, fristClick, 'currentArearTwo')
            if (fristClick?.grade == currentArearTwo.grade) {
                let location = elementLocation as any;
                let removeIndex = location.findIndex((element: any) => element._index === currentArearTwo._index)
                let clickIndex = location.findIndex((element: any) => element._index === fristClick._index)
                location.splice(removeIndex, 1, fristClick)
                location.splice(clickIndex, 1, currentArearTwo)
                // let fristClickLeft = fristClick.left
                // let fristClickTop = fristClick.top
                // let fristClickIndex = fristClick._index

                // location[fristClick._index].left = currentArearTwo.left
                // location[fristClick._index].top = currentArearTwo.top;
                // location[fristClick._index]._index = currentArearTwo._index;

                // location[currentArearTwo._index].left = fristClickLeft
                // location[currentArearTwo._index].top = fristClickTop
                // location[currentArearTwo._index]._index = fristClickIndex ? 1 : 0

                // console.log(fristClickIndex, removeAreaArr, '移动的位置');
                setElementLocation([...location])
                // console.log(children, "第一次点击的位置")
            }

        }

    }, [removeAreaArr])

    // useEffect(() => {
    //     console.log(elementLocation, fristClick, '测试');

    // }, [fristClick])
    const onMouseDown = (event: React.MouseEvent) => {

        let box: HTMLElement = document.querySelector(".box") as HTMLElement
        let gridBox: HTMLElement = document.querySelector(".ant-layout-content") as HTMLElement

        let element: HTMLElement = event.target as HTMLElement //获取所点击的对象
        let elementWidth = element.offsetWidth;//获取所点击对象的宽度
        let elementTop = element.offsetHeight;//获取所点击对象的高度
        let elementOffsetLeft = element.offsetLeft//获取所点击对象的外边距
        let elementOffsetTop = element.offsetTop//获取所点击对象的外边距
        let gridBoxOffsetLeft = gridBox.offsetLeft //获取容器距离窗口的外边距(左)
        let gridBoxOffsetTop = gridBox.offsetTop //获取容器距离窗口的外边距(上)
        let maxLeft = gridBox.offsetWidth - elementWidth - 21//获取容器距离窗口的外边距(左)
        let maxTop = gridBox.offsetHeight - elementTop - 21//获取容器距离窗口的外边距(左)
        let mouseLeft = event.clientX - elementOffsetLeft - gridBoxOffsetLeft;//
        let mouseTop = event.clientY - elementOffsetTop - gridBoxOffsetTop;//
        box.style.display = "block"
        box.style.width = elementWidth + "px"
        box.style.left = elementOffsetLeft + "px"

        //记录第一次点击的对象
        let clickFristAreaLeft = event.clientX - gridBoxOffsetLeft;
        let clickFristAreaTop = event.clientY - gridBoxOffsetTop;
        let clickFristAreaArr = elementLocation?.filter(item => item.left <= clickFristAreaLeft && item.top <= clickFristAreaTop && item.grade != null) || []
        let clickFristArea = clickFristAreaArr[clickFristAreaArr?.length - 1]
        setFristClick(clickFristArea)
        //最后放下的区域
        let currentArearArr: any = null
        // let s = element.childNodes[0].cloneNode(true)
        // box.appendChild(s)




        gridBox.onmousemove = (e) => {
            let currentAreaLeft = e.clientX - gridBoxOffsetLeft;
            let currentAreaTop = e.clientY - gridBoxOffsetTop;
            //获取当前停留着的区域
            currentArearArr = elementLocation?.filter(item => item.left <= currentAreaLeft && item.top <= currentAreaTop && item.grade != null) || []


            // console.log(elementLocation, "测试位置")

            //设置盒子游走的边界
            box.style.left = e.clientX - gridBoxOffsetLeft - mouseLeft + 'px'
            box.style.top = e.clientY - gridBoxOffsetTop - mouseTop + 'px'
            if (box.offsetLeft < 0) {
                box.style.left = 0 + "px"
            } else if (box.offsetLeft >= maxLeft) {
                box.style.left = maxLeft + "px"
            }
            if (box.offsetTop <= 0) {
                box.style.top = 0 + "px"
            } else if (box.offsetTop >= maxTop) {
                box.style.top = maxTop + "px"
            }

        }

        document.onmouseup = () => {
            gridBox.onmousemove = null//移除鼠标移动事件
            clickFristArea = null as any
            setRemoveAreaArr(currentArearArr)
            box.style.display = "none"
        }


    }

    return (
        <div className="gridBox" onMouseDown={onMouseDown} ref={ref as any}>
            <div id="element" data-grade="3">1</div>
            <div id="element" data-grade="3">2</div>
            <div id="element" data-grade="3">3</div>
            {/* <div id="element" data-grade="5">3</div>
            <div id="element" data-grade="3">2</div>
            <div id="element" data-grade="5">2</div>
            <div id="element" data-grade="5">2</div>
            <div id="element" data-grade="3">2</div> */}

            <div className="box"></div>
        </div>
    )
}

export default React.memo(Grid)