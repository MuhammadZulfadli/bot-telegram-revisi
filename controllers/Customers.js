const express = require('express')
const router = express.Router()
const { customer } = require('../models/index')

exports.getAllCustomer = async (req,res)=>{
    try {
        const customers = await customer.findAll()
        res.status(200).json({
            message: 'success retrieve data',
			status: true,
			data: customers
        })
    } catch (error) {
        res.status(500).json({
			status: false,
			message: error
		});
    }
}

exports.addCustomer = async (req, res) => {
	const data = req.body.data;
	const newCustomer = data.attributes;

	try {
		await customer.create(newCustomer);
		res.status(200).json({
			message: 'success add new customer',
			status: true
		});
	} catch (error) {
		res.status(500).json({
			status: false,
			message: error
		});
	}
};

exports.updateCustomer = async (req, res) => {
	const customerId = req.params.id;
	const dataCustomer = req.body.data.attributes;
	try {
		const cekCustomer = await customer.findOne({ where: { id: customerId } });
		if (cekCustomer) {
			await customer.update(dataCustomer, { where: { id: customerId } });
			res.status(201).json({
				message: 'success edit customer',
				status: true
			});
		} else {
			res.status(400).json({
				message: 'Invalid customer id',
				status: false
			});
		}
	} catch (error) {
		res.status(500).json({
			status: false,
			message: error
		});
	}
};

exports.deleteCustomer = async (req, res) => {
	const customerId = req.params.id;
	try {
		const cekCustomer = await customer.findOne({ where: { id: customerId } });
		if (cekCustomer) {
			await customer.destroy({ where: { id: customerId } });
			res.status(201).json({
				message: 'success delete customer',
				status: true
			});
		} else {
			res.status(400).json({
				message: 'Invalid customer ',
				status: false
			});
		}
	} catch (error) {
		res.status(500).json({
			status: false,
			message: error
		});
	}
};

exports.getCustomerById = async (req, res) => {
	const customerId = req.params.id;
	try {
		const dataCustomer = await customer.findOne({ where: { id: customerId } });

		if (dataCustomer) {
			res.status(200).json({
				message: 'success retrieve data',
				status: true,
				data: dataCustomer
			});
		} else {
			res.status(404).json({
				message: 'Customer not found',
				status: false
			});
		}
	} catch (error) {
		res.status(500).json({
			status: false,
			message: error
		});
	}
};