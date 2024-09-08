
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

export const dashboardData = {
    users: [
        {
            name: "John Doe",
            avatar: "https://www.w3schools.com/howto/img_avatar2.png",
            _id: "1",
            username:"John doe",
            friends: 20,
            groups: 5,
        },
        {
            name: "Aman Shukla",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            _id: "2",
            username:"Aman Shukla",
            friends: 15,
            groups: 3,
        }
    ],
    chats: [
    {
      name: "LabadBass Group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "John Doe",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      name: "L*Da Luston Group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "2",
      groupChat: true,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar2.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "John Boi",
        avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      },
    },
  ],
  messages: [
    {
      attachments: [],
      content: "L*uda ka Message hai",
      _id: "sfnsdjkfsdnfkjsbnd",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Chaman ",
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2024-02-12T10:41:30.630Z",
    },

    {
      attachments: [
        {
          public_id: "asdsad 2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "",
      _id: "sfnsdjkfsdnfkdddjsbnd",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Chaman  2",
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2024-02-12T10:41:30.630Z",
    },
  ],
}