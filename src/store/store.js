import {configureStore} from '@reduxjs/toolkit'
import app_reducer from '../reducers/app_slice'

const store = configureStore({
    reducer: {
        app: app_reducer
    }
})

export default store