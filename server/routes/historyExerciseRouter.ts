import express from 'express'
import historyExerciseCtrl from '../controllers/historyExerciseCtrl'
import auth from '../middleware/auth'

const router = express.Router()

router.post('/history',auth, historyExerciseCtrl.createExercise)
router.get('/histories',historyExerciseCtrl.getHistoryExercises)

export default router;