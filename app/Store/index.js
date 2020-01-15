
// 统一入口，提供唯一store

import { createStore } from 'redux'
import reducer from './reducer'

export default createStore(reducer)