import React, { useEffect, useState, useContext } from 'react';
import './rightbar.css';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import HouseIcon from '@material-ui/icons/House';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { AuthContext } from '../context/AuthContext';
// import { Add } from '@material-ui/icons';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

export default function Rightbar({ user }) {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext)
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));
  

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await Axios.get('/users/friends/' + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err)
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await Axios.put(`/users/${user._id}/unfollow`, {userId: currentUser._id});
        dispatch({ type: 'UNFOLLOW', payload: user._id })
      } else {
        await Axios.put(`/users/${user._id}/follow`, {userId: currentUser._id});
        dispatch({ type: 'FOLLOW', payload: user._id })
      }      
    } catch (err) {
      console.log(err)
    }
    setFollowed(!followed)
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className='birthdayContainer'>
          <img className='birthdayImg' src={`${PUBLIC_FOLDER}gift.png`} alt='' />
          <span className='birthdayText'>
            <b>May-ree Edem</b> and <b>5 other friends</b> have birthday today.
          </span>
        </div>
        

        <img className='rightbarAd' src={`${PUBLIC_FOLDER}ad.png`} alt='' />
        <h4 className='rightbarTitle'>Online Friends</h4>

        <ul className='rightbarFriendList'>

          { Users.map(u => (
            <Online key={u.id} user={u} />
          )) }

        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
      {user.username !== currentUser.username && (
        <button className='rightbarFollowButton' onClick={handleClick}>
          {followed ? <b style={{'padding':'5px'}}>Unfollow</b> : <b style={{'padding':'5px'}}>Follow</b>}
          {
            followed 
              ? <PersonAddDisabledIcon />
              : <PersonAddIcon />
          }
        </button>
      )}
        <h4 className='rightbarTitle'>Intro</h4>
        <div className='rightbarInfo'>

          <div className='rightbarInfoItem'>
            <WorkIcon className='rightbarIcon' />
            <span className='rightbarInfoValue'>Work at {user.work || 'Self employed'}</span>
          </div>

          <div className='rightbarInfoItem'>
            <SchoolIcon className='rightbarIcon' />
            <span className='rightbarInfoValue'>Studied at {user.school || 'No schools to show'} </span>
          </div>

          <div className='rightbarInfoItem'>
            <HouseIcon className='rightbarIcon' />
            <span className='rightbarInfoValue'>Lives in <b><Link to='https://www.akwaibomstate.gov.ng' style={{textDecoration: 'none', color: 'black'}}>{user.city}</Link></b></span>
          </div>

          <div className='rightbarInfoItem'>
            <LocationOnIcon className='rightbarIcon' />
            <span className='rightbarInfoValue'>From <b><Link to='https://www.akwaibomstate.gov.ng' style={{textDecoration: 'none', color: 'black'}}>{user.from}</Link></b></span>
          </div>
          
          <div className='rightbarInfoItem'>
            <FavoriteIcon className='rightbarIcon' />
            <span className='rightbarInfoValue'>{user.relationship === 1 ? 'Single' : user.relationship === 2 ? 'Married' : user.relationship === 3 ? 'Engaged' : "It's complicated"}</span>
          </div>

          <div className='rightbarInfoItem'>
            <WatchLaterIcon className='rightbarIcon' />
            <span className='rightbarInfoValue'>Joined September 2013</span>
          </div>

        </div>

        <h4 className='rightbarTitle'><b>Friends</b></h4>
        <div className='rightbarFollowings'>
          {friends.map((friend) => (
            <Link
              to={'/profile/' + friend.username}
              style={{ textDecoration: 'none' }}
            >
              <div className='rightbarFollowing'>
                <img 
                  className='rightbarFollowingImg' 
                  src={
                    friend.profilePicture 
                      ? PUBLIC_FOLDER + friend.profilePicture 
                      : PUBLIC_FOLDER + 'person/noAvatar.png'
                  } 
                  alt='' 
                />
                <span className='rightbarFollowingName'><b>{friend.username}</b></span>
              </div>
            </Link>
          ))}

        </div>
      </>
    )
  }

  return (
    <div className='rightbar'>

      <div className='rightbarWrapper'>
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
