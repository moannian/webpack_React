import request from "./index"

// 获取产品;
export const getProductList = () => {
    return request({
        url: "/api/get/product",
        method: "get"
    })
}

// 新增产品
export const postProduct = (data: any) => {
    return request({
        url: "/api/create/product",
        method: "post",
        data
    })
}
//修改产品
export const putProduct = (data: any) => {
    return request({
        url: "/api/put/product",
        method: "put",
        data
    })
}