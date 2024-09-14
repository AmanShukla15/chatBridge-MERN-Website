import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroupChat, getMyChats, getMyGroups, addMembers, removeMember, leaveGroup } from "../controllers/chat.js";

const app = express.Router();

app.use(isAuthenticated)

app.post ("/new", newGroupChat);

app.get ("/my", getMyChats);

app.get ("/my/groups", getMyGroups);

app.put ("/addmembers", addMembers);

app.put ("/removemember", removeMember);

app.delete("/leave/:id", leaveGroup);

// send attachments

// get messages

// get chat details, rename, details



export default app;