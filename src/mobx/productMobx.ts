import { makeAutoObservable, observable, action } from "mobx";
import { IProductList } from "../apiBackType/product"
import { getProductList, postProduct, putProduct } from "Http/api";
import { message } from "antd"

class ProductMobx {
    productList: IProductList[] = [];
    collectProduct: IProductList[] = []
    constructor() {
        makeAutoObservable(this)
    }
    async getProductList() {
        let res = await getProductList();
        this.productList = res.data
        this.collectProduct = res.data.filter((item: any) => item.collect == 1)
    }

    addProduct(data: any, callBack?: () => void) {
        postProduct(data).then(res => {
            this.getProductList()
            callBack?.()
            message.success("添加成功")
        })
    }

    updateProduct(data: any, callBack?: () => void) {
        putProduct(data).then(res => {
            this.getProductList()
            callBack?.();
            message.success("修改成功")
        })
    }
}

export default ProductMobx