import { makeAutoObservable, observable, action } from "mobx";

export interface IUserInfoMobx {
    userInfo: IState
}

interface IState {
    email?: string,
    nickName?: string
}
class userInfoMobx {
    userInfo: IState = {}
    constructor() {
        makeAutoObservable(this)

    }
    getUserInfo(obj: IState) {
        this.userInfo = obj
    }

}

export default userInfoMobx