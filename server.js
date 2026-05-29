import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('API rodando 🚀')
})

app.use('/auth', authRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)



// 👇 IMPORTANTE PRA VERCEL
export default app

// 👇 só roda local
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
  })
}
