import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"

import App from "./App";

import './index.css'

// dev tools to remove before build!
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
    rootReducer, composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector("#root"));
