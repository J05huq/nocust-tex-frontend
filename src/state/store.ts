import { createStore, applyMiddleware } from 'redux'
import rootReducer from './index'
import thunkMiddleware from 'redux-thunk'

const devtools: any = window['devToolsExtension'] ? window['devToolsExtension']() : (f: any) => f

// TODO Fix it, use devtools for development only
const middleware =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunkMiddleware)
    : applyMiddleware(thunkMiddleware)

export default middleware(devtools(createStore))(rootReducer)
