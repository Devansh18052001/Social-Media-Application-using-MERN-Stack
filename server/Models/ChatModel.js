import mongoose from "mongoose";
// This is modal for chatting feature 
const ChatSchema = mongoose.Schema(
    {
        members: {
            type: Array,
        },
    },
    {
    timestamps: true,
    }
);

const ChatModel = mongoose.model("Chat", ChatSchema);
export default ChatModel;