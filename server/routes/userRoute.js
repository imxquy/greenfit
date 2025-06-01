import express from 'express'
import {
  register,
  login,
  logout,
  isAuth,
  forgotPassword,
  verifyResetToken,
  resetPassword
} from '../controller/userController.js'

import authUser from '../middlewares/authUser.js'

const userRouter = express.Router()

// Public routes
userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/forgot-password', forgotPassword)
userRouter.get('/verify-reset-token/:token', verifyResetToken)
userRouter.post('/reset-password', resetPassword)

// Protected routes
userRouter.get('/is-auth', authUser, isAuth)
userRouter.get('/logout', authUser, logout)

export default userRouter
