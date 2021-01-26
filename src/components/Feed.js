import React,{useState,useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar'
import './Feed.css'
import firebase from 'firebase'
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Modal from 'react-modal'
import Com from './Com';

function Feed({ id, username, description, imageUrl }) {

    const [posts, setPosts] = useState([])
    const [comment, setComment] = useState([])
    const [com, setCom] = useState('')
    const nuser = firebase.auth().currentUser.displayName
    const [check, setCheck] = useState(false)
    
    useEffect(() => {
        firebase.firestore().collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })))
        })
        
        
        console.log(posts.comments)
    }, [])


    function addComments() {
        firebase.firestore().collection("posts").doc(id).update({
            comments: [
                {
                    usernamen: nuser,
                    commentar: com
                }
            ]
          }).then(function() {
            console.log("post updated");
          });
          
    }

    function openModal(){
        setCheck(true)
    }

    function closeModal(){
        setCheck(false)
    }

    

    return (
        <Fade in={true} >
            <div className='post__' >
            <div className='pno' >
                <Avatar
                    className='post__avatar small'
                    alt={username}
                    src={imageUrl}
                        />
                <h5 className='post__username' >{username}</h5>
                </div>
                <h5 className='post__text' ><b>{username}: </b>{description}</h5>
                
             
                <hr></hr>
                <center><TextField className='ool' onChange={e => setCom(e.target.value)} id="standard-basic" label="Comment" /></center>
                <IconButton aria-label="delete" onClick={() => addComments()}>
                    <SendIcon />
                </IconButton>
            </div>
        </Fade>
    )
}

export default Feed