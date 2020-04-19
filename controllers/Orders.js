const express = require('express')
const router = express.Router()

const { order,order_item,customer,driver,product } = require('../models/index');

exports.getAllOrder = async (req,res)=>{
    try {
        const orders = await order.findAll({
            attributes: ['id','user_id','status','driver_id'],
            include: [{
                model: order_item,
                attributes: ['product_id','quantity']
               }]
        })
        res.json({
            message: 'success retrieve data',
			status: true,
			data: orders
        })
    } catch (error) {
        res.status(500).json({
			status: false,
			message: error
		});
    }
}

exports.addOrder = async (req,res) =>{
    try {
        const dataOrder = {
            "user_id": req.body.data.attributes.user_id,
            "driver_id": req.body.data.attributes.driver_id
        }
        const simpanOrder = await order.create(dataOrder)
        const idOrder = simpanOrder.id
        
        const detailOrder = req.body.data.attributes.order_detail
        for (let i = 0; i < detailOrder.length; i++) {
            detailOrder[i].order_id = idOrder
        }

        await order_item.bulkCreate(detailOrder)
        res.status(200).json({
			message: 'success add new order',
			status: true
		});
    } catch (error) {
         res.status(500).json({
			status: false,
			message: error
        })
    }
}

exports.updateOrder = async (req,res) =>{
    const orderId = req.params.id
    const dataOrder = req.body.data.attributes
    try {
        const cekOrder = await order.findOne({where: {id: orderId}})
        if(cekOrder){
            await order.update(dataOrder, {where: {id: orderId}})
            res.status(201).json({
				message: 'success edit order',
				status: true
			});
        }else{
            res.status(400).json({
				message: 'Invalid order id',
				status: false
			});
        }
    } catch (error) {
        res.status(500).json({
			status: false,
			message: error
        })
    }
}

exports.deleteOrder = async (req,res) =>{
    const orderId = req.params.id

    try {
        const cekOrder = await order.findOne({where: {id: orderId}})
        if(cekOrder){
            await order.destroy({where: {id: orderId}})
            await order_item.destroy({where: {order_id: orderId}})
            res.status(201).json({
				message: 'success delete order',
				status: true
			});
        }else{
            res.status(400).json({
				message: 'Invalid order id',
				status: false
			});
        }
    } catch (error) {
        res.status(500).json({
			status: false,
			message: error
        })
    }
}

exports.getOrderById = async (req,res)=>{
    const orderId = req.params.id
    try {
        const orderData = await order.findOne({
            attributes: ['id','user_id','status','driver_id'],
            include: [{
                model: order_item,
                attributes: ['product_id','quantity']
               }]
        })

        res.json({
            message: 'success retrieve data',
			status: true,
			data: orderData
        })

    } catch (error) {
        res.status(500).json({
			status: false,
			message: error
        })
    }
}