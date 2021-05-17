import React from 'react';
import './chatOnline.css';

export default function ChatOnline() {
  return (
    <div className='chatOnline'>
      <div className='chatOnlineFriend'>
        <div className='chatOnlineImgContainer'>
          <img className='chatOnlineImg' src='https://scontent.flos1-1.fna.fbcdn.net/v/t1.6435-9/70350561_1375281302646530_2123589319003209728_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=8bfeb9&_nc_eui2=AeF8vBwTyBkyheM3Kc7xuBQ1KSdxofnc4ygpJ3Gh-dzjKMqrYA6Tyzs_KtwINqtDqQ46RQ95o_kEnDrZ8Nq1rYTp&_nc_ohc=uCySNbI9OywAX9-4FAg&_nc_ht=scontent.flos1-1.fna&oh=c6fb15053fca68b03db940c625a8cae5&oe=60C9A6C9' alt='' />
          <div className='chatOnlineBadge'></div>
        </div>
        <span className='chatOnlineName'>Uduakobong</span>
      </div>
    </div>
  )
}
