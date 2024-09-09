import { User } from "../models/user.js";
// import { TryCatch } from "../utils/features";
// import { ErrorHandler } from "../utils/utility";

// sign up and save in cookie
const newUser = async (req, res) => {
    const {name, username, password, bio} = req.body;

    // const file = req.file;

    // if(!file){
    //     return next(new ErrorHandler("Please Upload Avatar"))
    // }
    // const result = await uploadFilesToCloudinary([file]);

    const avatar = {
        // public_id: result[0].public_id,
        // url: result[0].url,
        public_id: "lsaj",
        url: "lkjfadl",
    };

    const user = await User.create({
        name, 
        bio,
        username,
        password,
        avatar,
    })

    // sendToken(res, user, 201, "User created");
    res.send("User created")
}

// Login
const login = (req, res) => {
    res.send("Lelo World");
}

export {
    login,
    newUser
}