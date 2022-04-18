import { createStore, applyMiddleware, StoreEnhancer, StoreEnhancerStoreCreator, Store } from "redux";
import thunk from "redux-thunk"
import reducer from "./reducers/content"

import { routerMiddleware } from "connected-react-router"
import histiry from '../history'
// 1、创建仓库
// applyMiddleware:中间件配置

let storeEnHancer: StoreEnhancer = applyMiddleware(thunk, routerMiddleware(histiry));
// 将createStore进行一次增强
let storeEnhancerStoreCreator: StoreEnhancerStoreCreator = storeEnHancer(createStore)

let store: Store = storeEnhancerStoreCreator(reducer)

export default store