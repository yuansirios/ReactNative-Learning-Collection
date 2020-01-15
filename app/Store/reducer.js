
/**
 * 响应用户行为，返回改变后的状态，并发送到 store
 */
import { combineReducers } from 'redux'
import { reducer as reduxTest } from '../Pages/ReduxTest/Store/index'

// 分模块创建reducer
export default combineReducers ({
  reduxTest: reduxTest
})