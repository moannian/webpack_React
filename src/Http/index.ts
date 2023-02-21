import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
// import history from '../browserHistory';
import toast from '../shared/utils/toast';
import { objectToQueryString } from '../shared/utils/url';
import { getStoredAuthToken, removeStoredAuthToken } from '../shared/utils/authToken';
import { message } from "antd"
import store from "../mobx/store"

const request = (config: AxiosRequestConfig) => {
    const instance = axios.create({
        baseURL: "http://localhost:9000",
        timeout: 5000,
        method: 'get',

    })
    instance.interceptors.request.use((request) => {
        store.userLoading.changeState(true)
        return request
    })
    instance.interceptors.response.use((response) => {
        store.userLoading.changeState(false)
        if (response.data.code == 400 || response.data.errorCode) {
            message.error(response.data.message)
        }
        return response.data
    })
    return instance(config)
}


export default request

