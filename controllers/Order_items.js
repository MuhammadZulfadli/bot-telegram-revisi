const express = require('express')
const router = express.Router()

const { order,order_item,customer,driver,product } = require('../models/index');


exports.getOrderDetailById = async (req,res)=>{
    const orderId = req.params.id
    try {
        const orderData = await order.findOne({
            where: {id:orderId},
            attributes: ['id','status','customer.full_name'],
            include: [{
                model: customer,
                attributes: []
               },
               {
                model: driver,
                attributes: ['full_name']
               }
            ],
            raw: true
        })

        const orderDetail = await order_item.findAll({
            where:{order_id:orderData.id},
            include:[
                {
                    model:product,
                    attributes: []
                }
            ],
            raw: true,
            attributes: ['product.name','quantity']
        })
        
        const fullData = {
            ...orderData,
            order_detail: orderDetail
        }

        res.json({
            message: 'success retrieve data',
			status: true,
			data: fullData
        })

    } catch (error) {
        res.status(500).json({
			status: false,
			message: error
        })
    }
}