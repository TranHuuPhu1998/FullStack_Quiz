import React, { useEffect, useRef, useState } from 'react';
import { getListChat } from '@App/app/actions/chat-global';
import { useDispatch, useSelector } from 'react-redux'
import { getOneUser } from '@App/app/actions/user';
import UserLayout from '@App/layout/UserLayout';
import io from 'socket.io-client';
import './chat.scoped.scss';

const chatPage = () => {
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState('');
  const [id, setId] = useState();
  const user = useSelector((state) => state.profileReducers)
  const chats = useSelector((state) => state.chatGlobalReducers)
  console.log("🚀 ~ file: index.js ~ line 15 ~ chatPage ~ chats", chats.data)

  const dispatch = useDispatch();

  const socketRef = useRef();
  const messageListRef = useRef();

  useEffect(() => {
    dispatch(getOneUser())
    dispatch(getListChat())
  }, [])

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:5000');
    // get data from server
    socketRef.current.on('getId', (data) => {
      setId(data);
    });

    // mỗi khi có tin nhắn thì mess sẽ được render thêm
    socketRef.current.on('sendDataServer', (dataGot) => {
      setMess((oldMsgs) => [...oldMsgs, dataGot.data]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = (e) => {
    if (message !== null) {
      const msg = {
        content: message.trim(),
        id: id,
        time: new Date(),
        user: user[0]?.name,
        userId: user[0]?._id,
      };
      // send message to server
      socketRef.current.emit('sendDataClient', msg);

      setMessage('');
    }
  };

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      sendMessage();
    }
  };

  const renderChatRealtime = (mess) => {
    return mess?.map((m, index) => (
      <div key={index} className={`${m.userId === user[0]?._id ? 'your-message' : 'other-people'} chat-item`}>
        <div className='user-chat'>
          {m.user}
        </div>
        <div>
          <small>{m.time}</small>
          <p>{m.content}</p>
        </div>
      </div>
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  }

  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight + 50;
    }
  }, [mess, chats?.data]);

  return (
    <UserLayout>
      <div className='card'>
        <h1 className='p-2'>Chat form</h1>
        <div className='render-chat' ref={messageListRef} >
          {renderChatRealtime(chats?.data)}
          {renderChatRealtime(mess)}
        </div>
        <div>
          <div className='d-flex'>
            <form className='d-flex w-100' onSubmit={handleSubmit}>
              <textarea
                className='form-control'
                value={message}
                onKeyDown={onEnterPress}
                onChange={handleChange}
                placeholder='Nhập tin nhắn ...'
              />
              <button type='submit' className='btn w-100 mt-0 mb-0'>Send</button>
            </form>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default chatPage;
