import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getListChat } from 'app/actions/chat-global';
import { useDispatch, useSelector } from 'react-redux'
import { getOneUser } from 'app/actions/user';
import { PAGE_INFO , PORT } from 'app-constants';
import { io } from 'socket.io-client';
import { RootState } from 'app/reducers';

const UserCharGlobal:React.FC = () => {
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState('');
  const [chatList, setChatList] = useState([]);
  const [id, setId] = useState<string>('');
  const user = useSelector((state:RootState) => state.profileReducers)
  const {data,totalDocs} = useSelector((state:RootState) => state.chatGlobalReducers)
  const [pageInfo, setPageInfo] = useState(PAGE_INFO);
  const [stop, setStop] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);

  const dispatch = useDispatch();

  const btnRef = useRef<any>();
  const socketRef = useRef<any>();
  const messageListRef = useRef<any>();

  useEffect(() => {
    dispatch(getOneUser())
  }, [])

  useEffect(() => {
    dispatch(getListChat(pageInfo))
  }, [pageInfo])

  useEffect(() => {
    if (chatList.length >= totalDocs && firstLoad === true) setStop(true);
    if (data.length > 0) {
      setChatList((prev) => [...prev,...data])
      setFirstLoad(true)
    }
  }, [data])

  const handleLoadMore = useCallback(() => {
    if (stop) return;
    setPageInfo(prev => ({ ...prev, current: prev.current + 1 }))
  }, [stop])

  useEffect(() => {
    const btn = btnRef.current;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && firstLoad === true) {
        handleLoadMore();
      }
    });

    if (btn) observer.observe(btn);
    return () => {
      if (btn) observer.unobserve(btn);
    }
  }, [handleLoadMore, firstLoad])

  useEffect(() => {
    socketRef.current = io(PORT);

    // get data from server
    socketRef.current.on('getId', (data:string) => {
      setId(data);
    });

    // mỗi khi có tin nhắn thì mess sẽ được render thêm
    socketRef.current.on('sendDataServer', (dataGot: { data: any; }) => {
      setMess((oldMsgs) => [...oldMsgs, dataGot.data]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight + 50;
    }
  }, [mess, data]);

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
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

  const onEnterPress = (e: { keyCode: number; shiftKey: boolean; }) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      sendMessage();
    }
  };

  const renderChatRealtime = (mess: any[]) => {
    return mess && mess.map((m: { userId: any; user: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; time: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; content: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal; }, index: React.Key) => (
      <div key={index} className={`${m?.userId === user[0]?._id ? 'your-message' : 'other-people'} chat-item`}>
        <div className='user-chat'>
          {m?.user}
        </div>
        <div>
          <small>{m?.time}</small>
          <p>{m?.content}</p>
        </div>
      </div>
    ));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    sendMessage();
  };

  return (
      <div className='card'>
        <h1 className='p-2'>Chat form</h1>
        <div className='render-chat' ref={messageListRef} >
          {renderChatRealtime(chatList)}
          {renderChatRealtime(mess)}
          <button
            className='loading-chat'
            ref={btnRef}
            style={{ visibility: stop ? 'hidden' : 'visible' }}
            disabled={stop}
            onClick={() => setPageInfo(prev => ({ ...prev, page: prev.current + 1 }))}
          >Loading...</button>
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
  );
};

export default UserCharGlobal;
