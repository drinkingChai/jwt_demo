import { createStore, applyMiddleware } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

// ACTION NAMES
const SET_CURRENT_USER = 'SET_CURRENT_USER'

export const setCurrentUser = user => ({ type: SET_CURRENT_USER, user })

// ACTION CREATORS
export const signIn = authInfo => dispatch =>
  axios.post('/api/auth', authInfo)
    .then(res => {
      const token = res.data
      localStorage['jwtDemo'] = token

      return dispatch(loadUserData(token))
    })

export const loadUserData = token => dispatch => {
  // axios global
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else delete axios.defaults.headers.common['Authorization']

  dispatch(setCurrentUser(jwt.decode(token).user))
}

export const signOut = () => dispatch => {
  delete axios.defaults.headers.common['Authorization']
  delete localStorage['jwtDemo']
  dispatch(setCurrentUser())
}

export const getData = () => dispatch =>
  axios.get('/api/data')
    .then(res => console.log(res.data))

const initialState = {
  isAuthenticated: false,
  user: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.user),
        user: action.user || initialState.user
      }
    default:
      return state
  }
}

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware))