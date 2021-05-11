import React, { useContext } from 'react';
import './topbar.css';
import { Search, Person, Chat, Notifications } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import HomeIcon from '@material-ui/icons/Home';
import TimelineIcon from '@material-ui/icons/Timeline';

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className='topbarContainer'>

      <div className='topbarLeft'>
        <Link to='/' style={{textDecoration: 'none'}}>
          <span className='logo'>Blooom</span>
        </Link>
      </div>

      <div className='topbarCenter'>
        <div className='searchbar'>
          <Search className='searchIcon' />
          <input placeholder='Search Blooom' className='searchInput' />
        </div>
      </div>

      <div className='topbarRight'>

        <div className='topbarLinks'>

          <Link to={`/profile/${user.username}`} style={{color: 'white'}}>
            <span className='topbarLink'><HomeIcon /></span>
          </Link>          
          <span className='topbarLink'><TimelineIcon /></span>
        </div>

        <div className='topbarIcons'>

          <div className='topbarIconItem'>
            <Person />
            <span className='topbarIconBadge'>1</span>
          </div>

          <div className='topbarIconItem'>
            <Chat />
            <span className='topbarIconBadge'>1</span>
          </div>

          <div className='topbarIconItem'>
            <Notifications />
            <span className='topbarIconBadge'>2</span>
          </div>

        </div>

        <Link to={`/profile/${user.username}`}>
          <img src={
            user.profilePicture 
              ? PUBLIC_FOLDER + user.profilePicture 
              : PUBLIC_FOLDER + 'person/noAvatar.png'
            } 
            alt='' 
            className='topbarImg' 
          />
        </Link>

      </div>

    </div>
  )
}
