const redux = require('redux')
const {applyMiddleware} = require('redux')
const logger = require('redux-logger')

const BUY_CAKE = 'BUY_CAKE'
const BUY_ICE_CREAM = 'BUY_ICE_CREAM'

// This is an action => object that has a property type
// Better use the action creators in order to have only one place where the object is created/updated
function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

function buyIceCream() {
    return {
        type: BUY_ICE_CREAM,
        info: 'Buy ice cream'
    }
}

const initialCakeState = {
    numberOfCakes: 10
}

const initialIceCreamState = {
    numberOfIceCreams: 20
}

const cakeReducer = (previousState = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...previousState, // Safer way to update
                numberOfCakes: previousState.numberOfCakes - 1
            }
        default:
            return previousState
    }
}

const iceCreamReducer = (previousState = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICE_CREAM:
            return {
                ...previousState, // Safer way to update
                numberOfIceCreams: previousState.numberOfIceCreams - 1
            }
        default:
            return previousState
    }
}

const reducers = redux.combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})
// Responsibilities of a store
/*
* 1) Save the application state
* 2) Allow access to the state
* 3) State should be updated via the dispatch(action) function
* 4) Register listeners
* 5) Handle the unregistering of the listeners
* */
const store = redux.createStore(reducers)
console.log('Initial state: ', store.getState())

const unsubscribe = store.subscribe(() => {})

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())

unsubscribe()
