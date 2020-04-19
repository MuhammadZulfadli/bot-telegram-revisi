const express = require('express')
const router = express.Router()

const { driver } = require('../models/index');

exports.getAllDriver = async (req, res) => {
	try {
		const drivers = await driver.findAll();
		res.status(200).json({
			message: 'success retrieve data',
			status: true,
			data: drivers
		});
	} catch (error) {
		res.status(500).json({
			status: false,
			message: error
		});
	}
};

exports.addDriver = async (req, res) => {
	const data = req.body.data;
	const newDriver = data.attributes;

	try {
		await driver.create(newDriver);
		res.status(200).json({
			message: 'success add new driver',
			status: true
		});
	} catch (error) {
		res.status(500).json({
			status: false,
			message: error
		});
	}
};

exports.updateDriver = async (req, res) => {
	const driverId = req.params.id;
	const dataDriver = req.body.data.attributes;
	try {
		const cekDriver = await driver.findOne({ where: { id: driverId } });
		if (cekDriver) {
			await driver.update(dataDriver, { where: { id: driverId } });
			res.status(201).json({
				message: 'success edit driver data',
				status: true
			});
		} else {
			res.status(400).json({
				message: 'Invalid driver id',
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

exports.deleteDriver = async (req, res) => {
	const driverId = req.params.id;
	try {
		const cekDriver = await driver.findOne({ where: { id: driverId } });
		if (cekDriver) {
			await driver.destroy({ where: { id: driverId } });
			res.status(201).json({
				message: 'success delete driver',
				status: true
			});
		} else {
			res.status(400).json({
				message: 'Invalid driver id',
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

exports.getDriverById = async (req, res) => {
	const driverId = req.params.id;
	try {
		const dataDriver = await driver.findOne({ where: { id: driverId } });

		if (dataDriver) {
			res.status(200).json({
				message: 'success retrieve data',
				status: true,
				data: dataDriver
			});
		} else {
			res.status(404).json({
				message: 'Driver not found',
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