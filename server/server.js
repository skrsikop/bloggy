import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'
import adminRouter from './routes/adminRoutes.js'
import blogRouter from './routes/blogRoutes.js'

const app = express()

// middlewares 
app.use(cors());
app.use(express.json())

// database 
await connectDB()

// routes 
const PORT = process.env.PORT || 3000
app.use('/api/admin', adminRouter)
app.use('/api/blog', blogRouter)

app.get('/', (req, res) => res.send('Hello from server'))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

export default app;