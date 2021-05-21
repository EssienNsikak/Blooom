import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './chatOnline.css';

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {

  const [ friends, setFriends ] = useState([]);
  const [ onlineFriends, setOnlineFriends ] = useState([]);
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await Axios.get('/users/friends/' + currentId);
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f)=> onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await Axios.get(`/conversations/find/${currentId}/${user._id}`);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='chatOnline'>
      {onlineFriends.map((online) => (
        <div className='chatOnlineFriend' onClick={() => handleClick(online)}>
          <div className='chatOnlineImgContainer'>
            <img 
              className='chatOnlineImg' 
              src= {
                online?.profilePicture 
                  ? PUBLIC_FOLDER + online.profilePicture 
                  : PUBLIC_FOLDER+'person/noAvatar.png' 
              }
              alt='' 
            />
            <div className='chatOnlineBadge'></div>
          </div>
          <span className='chatOnlineName'>{online.username}</span>
        </div>
      ))}
    </div>
  )
}
