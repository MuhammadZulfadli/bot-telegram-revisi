const express = require('express')
const router = express.Router()
const { product } = require('../models/index');

exports.getAllProduct = async (req, res) => {
	try {
		const products = await product.findAll();
		res.status(200).json({
			message: 'success retrieve data',
			status: true,
			data: products
		});
	} catch (error) {
		res.status(500).json({
			status: false,
			message: error
		});
	}
};

exports.addProduct = async (req, res) => {
	const data = req.body.data;
	const newProduct = data.attributes;

	try {
		await product.create(newProduct);
		res.status(200).json({
			message: 'success add new product',
			status: true
		});
	} catch (error) {
		res.status(500).json({
			status: false,
			message: error
		});
	}
};

exports.updateProduct = async (req, res) => {
	const productId = req.params.id;
	const dataProduct = req.body.data.attributes;
	try {
		const cekProduct = await product.findOne({ where: { id: productId } });
		if (cekProduct) {
			await product.update(dataProduct, { where: { id: productId } });
			res.status(201).json({
				message: 'success edit product',
				status: true
			});
		} else {
			res.status(400).json({
				message: 'Invalid product id',
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

exports.deleteProduct = async (req, res) => {
	const productId = req.params.id;
	try {
		const cekProduct = await product.findOne({ where: { id: productId } });
		if (cekProduct) {
			await product.destroy({ where: { id: productId } });
			res.status(201).json({
				message: 'success delete product',
				status: true
			});
		} else {
			res.status(400).json({
				message: 'Invalid product id',
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

exports.getProductById = async (req, res) => {
	const productId = req.params.id;
	try {
		const dataProduct = await product.findOne({ where: { id: productId } });

		if (dataProduct) {
			res.status(200).json({
				message: 'success retrieve data',
				status: true,
				data: dataProduct
			});
		} else {
			res.status(404).json({
				message: 'Product not found',
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