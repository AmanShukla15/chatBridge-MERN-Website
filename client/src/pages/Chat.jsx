import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';
import { Fragment, useRef } from 'react';
import FileMenu from '../components/dialogs/FileMenu';
import AppLayout from '../components/layout/AppLayout';
import MessageComponent from '../components/shared/MessageComponent';
import { InputBox } from '../components/styles/StyledComponents';
import { grayColor, lightBlack, matBlack } from '../constants/color';
import { sampleMessage } from '../constants/sampleData';


const user = {
  _id: "aljf",
  name: "Aman2"
}

const Chat = () => {

  const containerRef = useRef(null);

  return (
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
  )
}

export default AppLayout()(Chat);