import authRouter from './authRouter'
import userRouter from './userRouter'
import categoryRouter from './categoryRouter'
import questionRouter from './questionRouter'
import courseRouter from './courseRouter'
import historyRouter from './historyExerciseRouter'
import chatGlobal from './chatGlobalRouter'

const routes = {
    authRouter,
    userRouter,
    categoryRouter,
    questionRouter,
    courseRouter,
    historyRouter,
    chatGlobal
}

export default routes;