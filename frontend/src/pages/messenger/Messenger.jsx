import React from 'react';
import Topbar from '../../components/topbar/Topbar';
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import SendIcon from '@material-ui/icons/Send';
import './messenger.css';
import ChatOnline from '../../components/chatOnline/ChatOnline';

export default function Messenger() {
  return (
    <>
      <Topbar />

      <div className='messenger'>

        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <input placeholder='Search for friends' className='chatMenuInput' />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>

        <div className='chatBox'>
          <div className='chatBoxWrapper'>

            <div className='chatBoxTop'>
              <Message />
              <Message own={true} />
              <Message />
              <Message own={true} />
              <Message />
              <Message own={true} />
              <Message />
              <Message own={true} />
              <Message />
              <Message own={true} />
              <Message />
              <Message own={true} />
              <Message />
            </div>

            <div className='chatBoxBottom'>
              <textarea className='chatMessageInput' placeholder='Aa'></textarea>
              <button className='chatSubmitButton'><SendIcon /></button>
            </div>

          </div>
        </div>

        <div className='chatOnline'>
          <div className='chatOnlineWrapper'>
            <ChatOnline />
          </div>
        </div>

      </div>
    </>
  )
}
