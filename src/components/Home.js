import React, {
    useEffect,
    useState
} from 'react'
import '../App.css'
import { user } from '../redux/reducers/user'
import firebase from 'firebase'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Loading from './Loading'
import Feed from './Feed'


const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
      },
}));

export default function Home() {

    const classes = useStyles();

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loaded, setLoaded] = useState(false)
    const [home, setHome] = useState(false)
    const [text, setText] = useState('')
    const photop = firebase.auth().currentUser.photoURL
    const displayNick = firebase.auth().currentUser.displayName
    const email = firebase.auth().currentUser.email

    const logout = () => firebase.auth().signOut().then(() => {
                        // Sign-out successful.
                    }).catch((error) => {
                        // An error happened.
                    });

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

  useEffect(() => {
    setLoaded(true)
    setHome(true)
  }, [])

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser)
                setUser(authUser)
            } else {
                setUser(null)
            }
        })

        return () => {
            unsubscribe();
        }
    }, [user])

    function postp(){
        firebase.firestore().collection("posts")
                    .doc()
                    .set({
                        text: text,
                        displayNick: displayNick,
                        photop: photop,
                        comments: []
                    })
                    .then(function() {
                        console.log("Document successfully written!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
        console.log(text)
    }

    useEffect(() => {
        firebase.firestore().collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })))
        })
        
        console.log(posts)
    }, [])

    if(!loaded){
        return(
          <Loading />
        )
      }
    if(home){
        return(
            <div>
                <div className='header' >
               
                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            Open Menu
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </Menu>
             
                        <center>
                        <TextField
                        id="standard-multiline-static"
                        label="Post"
                        multiline
                        onChange={e => setText(e.target.value)}    
                        />
                        <br>
                        </br>
                        <br>
                        </br>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={() => postp()}
                        >
                            post
                        </Button>
                        </center>
                </div>
            <div className='bb' >
                <div className='profile' >
                    <Avatar src={photop} className={classes.large} />
                    <h1>
                        {displayNick}
                    </h1>
                    <h4 className='cll'>
                        {email}
                    </h4>

                    
                </div>
                <div className='feed' >
                        {
                                posts.map(({id, post}) => (
                                    <Feed key={id} id={id} username={post.displayNick} description={post.text} imageUrl={post.photop} />
                                ))
                        }
                </div>
            </div>
        </div>
        )}  

}
