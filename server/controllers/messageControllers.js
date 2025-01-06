import cloudinary from '../lib/cloudinary.js';
import Message from '../models/messageModel.js';
import User from '../models/userModel.js'
export const getUsers = async(req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id : {$ne :loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsers:",error.message);
        res.status(500).json({error:"Internal server error"})
    }
}

export const getMessages = async(req,res)=>{
    try {
        const {id:userToChatid} = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderId : myId , receiverId: userToChatid},
                {senderId:userToChatid,receiverId:myId},
            ],
           
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller : ",error.message);
        res.status(500).json({error : "Internal server error"})
        
    }
}

export const sendMessages = async(req,res)=> {
    try {
        const {text ,image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl ;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save();

        //todo: realtime functionality goes here => socket.io
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller:",error.message);
        res.status(500).json({error : "Internal server error"})
        
        
    }
}