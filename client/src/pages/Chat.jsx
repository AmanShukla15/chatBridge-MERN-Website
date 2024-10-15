import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { IconButton, Skeleton, Stack } from '@mui/material';
import { Fragment, useCallback, useRef, useState } from 'react';
import FileMenu from '../components/dialogs/FileMenu';
import AppLayout from '../components/layout/AppLayout';
import MessageComponent from '../components/shared/MessageComponent';
import { InputBox } from '../components/styles/StyledComponents';
import { grayColor, lightBlack, matBlack } from '../constants/color';
import { sampleMessage } from '../constants/sampleData';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSocket } from '../socket';
import { NEW_MESSAGE } from '../constants/events';
import { useErrors, useSocketEvents } from '../hooks/hook';
import { useInfiniteScrollTop } from '6pp';
import { setIsFileMenu } from '../redux/reducers/misc';


const Chat = ({ chatId, user }) => {
  const socket = getSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];


  const members = chatDetails?.data?.chat?.members;


  const messageOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emitting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });

    setMessage("");
  };

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const eventHandler = {
    // [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    // [START_TYPING]: startTypingListener,
    // [STOP_TYPING]: stopTypingListener,
  };


  useSocketEvents(socket, eventHandler);

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? (
    <Skeleton />
  ) :
    (
      <Fragment>
        <Stack
          ref={containerRef}
          boxSizing={"border-box"}
          padding={"1rem"}
          spacing={"1rem"}
          bgcolor={"rgba(128,128,128,0.2)"}
          height={"90%"}
          sx={{
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          {
            allMessages.map((i) => (
              <MessageComponent key={i._id} message={i} user={user} />
            ))
          }
        </Stack>

        <form
          style={{
            height: "10%"
          }}
          onSubmit={submitHandler}
        >
          <Stack
            direction={"row"}
            height={"100%"}
            padding={"1rem"}
            position={"relative"}
            alignItems={"center"}
          >
            <IconButton
              sx={{
                position: "absolute",
                left: "1.5rem",
                rotate: "30deg",
              }}
              onClick={handleFileOpen}
            >
              <AttachFileIcon />
            </IconButton>

            <InputBox
              placeholder='Message'
              value={message}
              onChange={messageOnChange}
            />

            <IconButton
              type="submit"
              sx={{
                color: matBlack,
                marginLeft: "1rem",
                padding: "0.5rem",
                "&:hover": {
                  bgcolor: matBlack,
                  color: "white"
                }
              }}
            >
              <SendIcon />
            </IconButton>
          </Stack>
        </form>

        <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
      </Fragment>
    );
}

export default AppLayout()(Chat);