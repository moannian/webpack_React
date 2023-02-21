import { makeAutoObservable, observable, action } from "mobx";

class useLoading {
    loadingState: boolean = false
    constructor() {
        makeAutoObservable(this)
    }

    changeState(state: boolean) {
        this.loadingState = state
    }
}

export default useLoading