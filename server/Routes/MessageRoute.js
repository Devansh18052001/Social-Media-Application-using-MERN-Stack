import express from "express";
import { addMessage, getMessages } from "../Controllers/MessageController.js";

const router = express.Router();
// Creating route to createMessage from controller
router.post('/',addMessage);
router.get('/:chatId',getMessages);
export default router;