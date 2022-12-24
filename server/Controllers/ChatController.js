import ChatModel from '../Models/ChatModel.js';

export const createChat = async(req,res) => {
    // Creaating new instance of chat(of ChatModel)
    const newChat = new ChatModel(
        // in instance giving member from body of request
        {
            members: [req.body.senderId, req.body.receiverId],
        }
    );
    try {
        const result = await newChat.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const userChats = async(req, res) => {
    try {
        // To find chats(multiple/array of chat) of any user by using userId(from route get parameter)
        const chat = await ChatModel.find({members: {$in: [req.params.userId]}});
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const findChat = async(req, res) => {
    try {
        // To find chat of specific user by using userId(from route get parameter)
        const chat = await ChatModel.findOne({members: {$all: [req.params.firstId,req.params.secondId]}});
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
};
