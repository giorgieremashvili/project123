import React, {
  useEffect,
  useState
} from 'react'

// კომპონენტები

import NT from './components/404.js'
import Login from './components/Login'
import Home from './components/Home'
import Loading from './components/Loading'
import SignUp from './components/SignUp'

// ბიბლიოთეკები

import './App.css';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { Provider } from 'react-redux'
import rootReducer from './redux/reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
const store = createStore(rootReducer, applyMiddleware(thunk))

// firebase-ის API გასაღები

const firebaseConfig = {
  apiKey: "AIzaSyB0OFzDfr350FyP00t9k9YBTWuzdzM5tsc",
  authDomain: "homework-fd11b.firebaseapp.com",
  projectId: "homework-fd11b",
  storageBucket: "homework-fd11b.appspot.com",
  messagingSenderId: "825006857590",
  appId: "1:825006857590:web:82f78949c087648f42ee57",
  measurementId: "G-NRP03HHZ9B"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
export { db, auth, firebaseConfig }

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}


function App() {

  // react-ის hook-ები

  const [loaded, setLoaded] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        setLoaded(true)
        setLoggedIn(false)
      }else {
        setLoaded(true)
        setLoggedIn(true)
      }
    })
  }, [])

  if(!loaded){
    return(
      <Loading />
    )
  }
  if(!loggedIn){
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route component={NT} />
        </Switch>
      </Router>

    );
  }
  if(loggedIn){
  return(
    <Provider store={store} >
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route component={NT} />
        </Switch>
      </Router>
    </Provider>
  )}
}

export default App;
