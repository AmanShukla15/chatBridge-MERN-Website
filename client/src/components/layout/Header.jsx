import { Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Menu as MenuIcon, Notifications as NotificationIcon, Search as SearchIcon, Brightness7 as Brightness7Icon, Brightness4 as Brightness4Icon } from '@mui/icons-material'
import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import { lazy, Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { lightBlack, matBlack } from '../../constants/color'
import { userNotExists } from '../../redux/reducers/auth'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { server } from '../../constants/config'
import { setIsDarkMode, setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from '../../redux/reducers/misc'
import { resetNotificationCount } from '../../redux/reducers/chat'

const SearchDialog = lazy(() => import("../specific/Search"))
const NotificationDialog = lazy(() => import("../specific/Notifications"))
const NewGroupDialog = lazy(() => import("../specific/NewGroup"))

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isSearch, isNotification, isNewGroup } = useSelector(
        (state) => state.misc
    );

    const { notificationCount } = useSelector((state) => state.chat);

    const { isDarkMode } = useSelector((state) => state.misc);

    const navigateToGroup = () => navigate("/groups")


    const handleMobile = () => dispatch(setIsMobile(true))
    const openSearch = () => dispatch(setIsSearch(true));
    const openNewGroup = () => dispatch(setIsNewGroup(true));
    const openNotification = () => {
        dispatch(setIsNotification(true));
        dispatch(resetNotificationCount());
    }
    const toggleMode = () => dispatch(setIsDarkMode(!isDarkMode));


    const logoutHandler = async () => {
        try {
            const { data } = await axios.get(`${server}/api/v1/user/logout`, {
                withCredentials: true,
            });
            dispatch(userNotExists());
            toast.success(data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <>
            <Box
                sx={{
                    flexGrow: 1
                }}
                height={"4rem"}
            >
                <AppBar
                    position="static"
                    sx={{
                        bgcolor: matBlack,
                    }}
                >
                    <Toolbar>
                        <Typography
                            variant="h6"
                            sx={{
                                display: {
                                    xs: "none",
                                    sm: "block"
                                },
                            }}
                        >
                            Chat-Bridge
                        </Typography>
                        <Box
                            sx={{
                                display: {
                                    xs: "block",
                                    sm: "none"
                                },
                            }}
                        >
                            <IconButton
                                color="inherit"
                                onClick={handleMobile}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 1,
                            }}
                        />
                        <Box>
                            <IconBtn
                                title={isDarkMode ? "light" : "dark"}
                                icon={isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                                onClick={toggleMode}
                            />
                            <IconBtn
                                title={"Search"}
                                icon={<SearchIcon />}
                                onClick={openSearch}
                            />
                            <IconBtn
                                title={"New Group"}
                                icon={<AddIcon />}
                                onClick={openNewGroup}
                            />
                            <IconBtn
                                title={"Manage Groups"}
                                icon={<GroupIcon />}
                                onClick={navigateToGroup}
                            />
                            <IconBtn
                                title={"Notifications"}
                                icon={<NotificationIcon />}
                                onClick={openNotification}
                                value={notificationCount}
                            />
                            <IconBtn
                                title={"Logout"}
                                icon={<LogoutIcon />}
                                onClick={logoutHandler}
                            />
                        </Box>
                    </Toolbar>
                </AppBar>

            </Box>
            {
                isSearch && (
                    <Suspense
                        fallback={<Backdrop open />}
                    >
                        <SearchDialog />
                    </Suspense>
                )
            }
            {
                isNotification && (
                    <Suspense
                        fallback={<Backdrop open />}
                    >
                        <NotificationDialog />
                    </Suspense>
                )
            }
            {
                isNewGroup && (
                    <Suspense
                        fallback={<Backdrop open />}
                    >
                        <NewGroupDialog />
                    </Suspense>
                )
            }
        </>
    )
}

const IconBtn = ({ title, icon, onClick, value }) => {

    return (
        <Tooltip title={title}>
            <IconButton color="inherit" size="large" onClick={onClick}>
                {value ? (
                    <Badge badgeContent={value} color="error">
                        {icon}
                    </Badge>
                ) : (
                    icon
                )}
            </IconButton>
        </Tooltip>
    );
};

export default Header