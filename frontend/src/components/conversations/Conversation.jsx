import React, {useState, useEffect} from 'react';
import './conversation.css';
import Axios from 'axios';

export default function Conversation({ conversation, currentUser }) {

  const [user, setUser] = useState({});
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find(m => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await Axios.get('/users?userId=' + friendId);
        setUser(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getUser()
  }, [conversation, currentUser]);

  return (
    <div className='conversation'>
      <img 
        className='conversationImg' 
        src={ 
          user.profilePicture 
            ? PUBLIC_FOLDER+user.profilePicture 
            : PUBLIC_FOLDER + 'person/noAvatar.png' 
        } 
        alt='' 
      />
      <span className='conversationName'>{user.username}</span>
    </div>
  )
}
