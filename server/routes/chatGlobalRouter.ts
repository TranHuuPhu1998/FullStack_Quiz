import express from 'express'
import chatGlobalCtrl from '../controllers/chatGlobalCtrl'
import auth from '../middleware/auth'

const router = express.Router()

router.get('/chat-globals',auth, chatGlobalCtrl.getChatGlobals)

export default router;