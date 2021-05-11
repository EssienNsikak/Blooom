import React, { useState, useEffect, useContext } from 'react';
import './post.css';
import { MoreVert } from '@material-ui/icons';
import Axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Post({post}) {
  
  const [ like, setLike ]  = useState(post.likes.length);
  const [ isLiked, setIsLiked ]  = useState(false);
  const [ user, setUser ] = useState({});
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user:currentUser} = useContext(AuthContext)

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await Axios.get(`/users?userId=${post.userId}`);
      setUser(res.data)
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      Axios.put('/posts/'+post._id+'/like', { userId:currentUser._id });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }

  return (
    <div className='post'>
      <div className='postWrapper'>

        <div className='postTop'>

          <div className='postTopLeft'>
            <Link to={`profile/${user.username}`}>
              <img 
                className='postProfileImg'
                src={user.profilePicture ? PUBLIC_FOLDER+user.profilePicture : PUBLIC_FOLDER+'person/noAvatar.png'}
                alt=''
              />            
            </Link>
            <span className='postUsername'>
              {user.username} 
            </span>
            <span className='postDate'>{format(post.createdAt)}</span>
          </div>

          <div className='postTopRight'>
            <MoreVert />
          </div>
          
        </div>

        <div className='postCenter'>
          <span className='postText'>{post?.description}</span>
          <img className='postImg' src={PUBLIC_FOLDER+post.img} alt='' />
        </div>

        <div className='postBottom'>

          <div className='postBottomLeft'>
            <img className='likeIcon' src={`${PUBLIC_FOLDER}like.png`} onClick={ likeHandler } alt='' />
            <img className='likeIcon' src={`${PUBLIC_FOLDER}heart.png`} onClick={ likeHandler } alt='' />
            <span className='postLikeCounter'>{like}</span>
          </div>
          
          <div className='postBottomLeft'>
            <span className='postCommentText'>{post.comment} Comments</span>
          </div>        

        </div>

      </div>
    </div>
  )
}

