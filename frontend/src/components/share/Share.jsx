import React, { useState, useContext, useRef } from 'react';
import './share.css';
import { PermMedia, Label, Room, EmojiEmotions } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import ScreenShareOutlinedIcon from '@material-ui/icons/ScreenShareOutlined';
import CancelIcon from '@material-ui/icons/Cancel';
import { AuthContext } from '../context/AuthContext';
import Axios from 'axios';

export default function Share() {

  const { user } = useContext(AuthContext);
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const description = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      description: description.current.value
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append('name', fileName);
      data.append('file', file);
      newPost.img = fileName;

      try {
        await Axios.post('/upload', data);
      } catch (err) {
        console.log(err)
      }
    }

    try {
      await Axios.post('/posts', newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='share'>
      <div className='shareWrapper'>

        <div className='shareTop'>
          <Link to={`profile/${user.username}`}>
            <img 
              className='shareProfileImg' 
              src={
                user.profilePicture 
                  ? PUBLIC_FOLDER + user.profilePicture 
                  : PUBLIC_FOLDER + 'person/noAvatar.png'
              } 
              alt='' 
            />
          </Link>
          <input 
            placeholder={"What's on your mind, "  + user.username + '?'} 
            className='shareInput' 
            ref={description} 
          />
        </div>

        <hr className='shareHr' />

        {file && (
          <div className='shareImgContainer'>
            <img className='shareImg' src={URL.createObjectURL(file)} alt='' />
            <CancelIcon className='shareCancelImg' onClick={() => setFile(null)}/>
          </div>
        )}

        <form className='shareBottom' onSubmit={submitHandler}>
          <div className='shareOptions'>

            <label htmlFor='file' className='shareOption'>
              <PermMedia htmlColor='tomato' className='shareIcon' />
              <span className='shareOptionText'>Photo/Video</span>
              <input 
                style={{display:'none'}}
                type='file' 
                id='file' 
                accept='.png, .jpeg, .jpg' 
                onChange={ (e) => setFile(e.target.files[0]) } 
              />
            </label>

            <div className='shareOption'>
              <Label htmlColor='green' className='shareIcon' />
              <span className='shareOptionText'>Tag</span>
            </div>

            <div className='shareOption'>
              <Room htmlColor='red' className='shareIcon' />
              <span className='shareOptionText'>Location</span>
            </div>

            <div className='shareOption'>
              <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
              <span className='shareOptionText'>Feeling/Activity</span>
            </div>

            <button className='shareOption' type='submit' style={{border: 'none'}}>
              <ScreenShareOutlinedIcon htmlColor='gray' className='shareIcon' />
              <span className='shareOptionText'>Share</span> 
            </button>

          </div>
          
        </form>

      </div>
    </div>
  );
}
