import userInfoMobx, { IUserInfoMobx } from "./userInfoMobx";
import userLoading from "./loadingMobx";
import tableDataMobx from "./TableDataMobx";
import ProductMobx from "./productMobx";
interface IStore {
    test: number
}
const store = {
    userInfo: new userInfoMobx(),
    userLoading: new userLoading(),
    tableDataMobx: new tableDataMobx(),
    ProductMobx: new ProductMobx()
}
export default store

export { IUserInfoMobx }