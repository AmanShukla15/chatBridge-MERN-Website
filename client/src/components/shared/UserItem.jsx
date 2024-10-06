import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material';
import React from 'react';
import { transformImage } from '../../lib/features';

const UserItem = ({ user, handler, handlerIsLoading, isAdded=false, styling={},}) => {

    const { name, _id, avatar } = user;

    return (
        <ListItem>
            <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={"1rem"}
                width={"100%"}
                {...styling}
            >
                <Avatar src={transformImage(avatar)}/>

                <Typography
                    variant="body1"
                    sx={{
                        flexGlow: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                    }}
                >
                    {name}
                </Typography>

                <IconButton
                    sx={{
                        bgcolor: isAdded ? "error.main" : "primary.main",
                        "&:hover": {
                            bgcolor: isAdded ? "error.dark" : "primary.dark",
                        }
                    }}
                    onClick={() => handler(_id)}
                    disable={handlerIsLoading}
                >
                    {
                        isAdded ? <RemoveIcon /> : <AddIcon />
                    }

                </IconButton>
            </Stack>

        </ListItem>
    )
}

export default UserItem