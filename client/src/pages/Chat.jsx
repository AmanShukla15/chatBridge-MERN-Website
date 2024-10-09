import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { IconButton, Skeleton, Stack } from '@mui/material';
import { Fragment, useRef, useState } from 'react';
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

  const members = chatDetails?.data?.chat?.members;

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emitting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };


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
            sampleMessage.map((i) => (
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
            >
              <AttachFileIcon />
            </IconButton>

            <InputBox placeholder='Message' />

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

        <FileMenu />
      </Fragment>
    );
}

export default AppLayout()(Chat);