import Header from './Header';
import Title from '../shared/Title';
import { Drawer, Grid, Skeleton } from '@mui/material';
import ChatList from '../specific/ChatList';
import { sampleChats } from '../../constants/sampleData';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../specific/Profile';
import { lightMatBlack } from '../../constants/color';
import { useDispatch, useSelector } from 'react-redux';
import { useMyChatsQuery } from '../../redux/api/api';
import { useState } from 'react';
import { setIsMobile } from '../../redux/reducers/misc';
import { useErrors } from '../../hooks/hook';
import { getSocket } from '../../socket';

const AppLayout = () => (WrappedComponent) => {

    return (props) => {
        const params = useParams();
        const navigate = useNavigate();
        const dispatch = useDispatch();

        const chatId = params.chatId;
        const socket = getSocket();

        const [onlineUsers, setOnlineUsers] = useState([]);

        const { isMobile } = useSelector((state) => state.misc);

        const { user } = useSelector((state) => state.auth);
        // const { newMessagesAlert } = useSelector((state) => state.chat);

        const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

        useErrors([{ isError, error }]);

        const handleDeleteChat = (e, _id, groupChat) => {
            e.preventDefault();
            console.log("HandleDeleteChat");
        }

        const handleMobileClose = () => dispatch(setIsMobile(false))


        return (
            <>
                <Title />
                <Header />

                {isLoading ? (
                    <Skeleton />
                ) : (
                    <Drawer open={isMobile} onClose={handleMobileClose}>
                        <ChatList
                            w="70vw"
                            chats={data?.chats}
                            chatId={chatId}
                            handleDeleteChat={handleDeleteChat}
                        />
                    </Drawer>
                )}

                <Grid container height={"calc(100vh - 4rem)"} >
                    <Grid
                        item
                        sm={4}
                        md={3}
                        sx={{
                            display: {
                                xs: "none", sm: "block"
                            },
                        }}
                        height={"100%"}
                    >
                        {isLoading ? (
                            <Skeleton />
                        ) : (
                            <ChatList
                                chats={data?.chats}
                                chatId={chatId}
                                handleDeleteChat={handleDeleteChat}
                            />
                        )}
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        lg={6}
                        height={"100%"}
                    >
                        <WrappedComponent {...props} chatId={chatId} user={user} />
                    </Grid>

                    <Grid
                        item
                        md={4}
                        lg={3}
                        sx={{
                            display: {
                                xs: "none", md: "block"
                            },
                            padding: "2rem",
                            bgcolor: lightMatBlack,
                        }}
                        height={"100%"}
                    >
                        <Profile user={user} />
                    </Grid>
                </Grid>
            </>
        );
    };
};

export default AppLayout;
