import { Box, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { lightMatBlack } from '../../constants/color'
import { Link } from '../styles/StyledComponents'
import AvatarCard from './AvatarCard'


const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat,
}) => {
    return (
        <Link
            sx={{
                padding: "0",
            }}
            to={`/chat/${_id}`}
            onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem",
                    backgroundColor: sameSender ? lightMatBlack : "unset",
                    color: sameSender ? "white" : "unset",
                    position: "relative",
                    borderBottom: "1px solid rgba(128, 128, 128, 0.3)",
                    transition: "background-Color 0.5s"

                }}>
                <AvatarCard avatar={avatar} />
                <Stack>
                    <Typography>{name}</Typography>
                    {
                        newMessageAlert && (
                            <Typography>{newMessageAlert.count} New Message
                            </Typography>
                        )
                    }

                </Stack>

                {
                    isOnline && <Box sx={
                        {
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: "green",
                            position: "absolute",
                            top: "50%",
                            right: "1rem",
                            tranform: "translateY(-50%)"
                        }
                    } />
                }

            </div>
        </Link>
    )
}

export default memo(ChatItem);