import { makeAutoObservable } from "mobx"
class TableDataMobx<T>{
    tableData = [{
        key: '1',
        productName: '测试产品',
        identifying: "TSCP",
        address: '西湖区湖底公园1号',
        iscollect: 0
    }]

    constructor() {
        makeAutoObservable(this)
    }
}

export default TableDataMobx