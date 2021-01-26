import '../App.css'
import React from 'react'
// firebase-ის
import firebase from 'firebase'
// materialui-ის მოდულები
import Button from '@material-ui/core/Button';
import FacebookIcon from '@material-ui/icons/Facebook';
import Github from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';
import { FcGoogle } from 'react-icons/fc'
// სტაილი
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    Github: {
        border: '1px solid',
        borderColor: '#3D3D3D',
        margin: theme.spacing(1),
    },
  }));

  var provider1 = new firebase.auth.FacebookAuthProvider();
  var provider2 = new firebase.auth.GithubAuthProvider();
  var provider3 = new firebase.auth.GoogleAuthProvider();

  function googleSignIn() {
    firebase
    .auth()
    .signInWithPopup(provider3)
    .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
    })
    .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
    });
}

  function facebookSignIn() {
    firebase
    .auth()
    .signInWithPopup(provider1)
    .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
    })
    .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
    });
}

function githubSignIn() {
    firebase
    .auth()
    .signInWithPopup(provider2)
    .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
    })
    .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
    });
}

export default function Login() {
    const classes = useStyles();

    


    return (
        <div>
            <div className='banner' ></div>
            <h1>გაიარეთ ავტორიზაცია</h1>
            <div className='loginForm' >
               
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<FacebookIcon />}
                    onClick={() => facebookSignIn()}
                >
                    გააგრძელეთ Facebook-ით
                </Button>
                <Button
                    className={classes.Github}
                    endIcon={<Github />}
                    onClick={() => githubSignIn()}
                >
                    გააგრძელეთ GitHub-ით
                </Button>
                <Button
                    className={classes.Github}
                    endIcon={<FcGoogle />}
                    onClick={() => googleSignIn()}
                >
                    გააგრძელეთ Google-ით
                </Button>
            </div>
        </div>
    )
}
