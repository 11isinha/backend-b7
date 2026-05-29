import express from 'express'
import { supabase } from '../supabaseClient.js'

const router = express.Router()

// criar pedido
router.post('/', async (req, res) => {
  const { user_id, items, total } = req.body

  // cria pedido
  const { data: order, error } = await supabase
    .from('orders')
    .insert([{ user_id, total }])
    .select()
    .single()

  if (error) return res.status(400).json(error)

  // cria itens do pedido
  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.id,
    quantity: item.quantity,
    price: item.price
  }))

  await supabase.from('order_items').insert(orderItems)

  res.json(order)
})

export default router