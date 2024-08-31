
export const sampleChats = [
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Aman 1",
        _id: "1",
        groupChat: false,
        members: ["1", "2"],
    },
    {
        avatar: [
            "https://www.w3schools.com/howto/img_avatar2.png",
        ],
        name: "Aman 2",
        _id: "2",
        groupChat: true,
        members: ["1", "2"],
    },
]
export const sampleUsers = [
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Aman 1",
        _id: "1",
    },
    {
        avatar: [
            "https://www.w3schools.com/howto/img_avatar2.png",
        ],
        name: "Aman 2",
        _id: "2",
    },
]
export const sampleNotifications = [
    {
        sender: {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "Aman 1",
        },
        _id: "1",
    },
    {
        sender: {
            avatar: [
                "https://www.w3schools.com/howto/img_avatar2.png",
            ],
            name: "Aman 2",
        },
        _id: "2",
    },
]

export const sampleMessage = [
    {
        attachments:[
            {
                public_id: "assad",
                url: "https://www.w3schools.com/howto/img_avatar2.png",
            },
        ],
        content: "Hii Everyone this is dummy message",
        _id: "adflkjafjfal",
        sender:{
            _id:"user._id",
            name: "aman",
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z",
    },
    {
        attachments:[
            {
                public_id: "assad",
                url: "https://www.w3schools.com/howto/img_avatar2.png",
            },
        ],
        content: "Hello",
        _id: "aldfajl",
        sender:{
            _id:"aljf",
            name: "aman",
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z",
    },
];