const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config({path: '.env'})


const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TOKEN;
const axios = require("axios");
const API = process.env.URL
const Product = process.env.PRODUK
const bot = new TelegramBot(token, {polling:true})


const indexRouter = require('./routes/index')
const CustomerRouter = require('./routes/Customers')
const ProductsRouter = require('./routes/Products')
const DriversRouter = require('./routes/Drivers')
const OrderRouter = require('./routes/Orders')
const OrderItemRouter = require('./routes/Order_items')
// const port = process.env.SERVER_PORT || 5000;
const app  = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/', indexRouter)
app.use('/api/v1/customer', CustomerRouter)
app.use('/api/v1/product', ProductsRouter)
app.use('/api/v1/driver', DriversRouter)
app.use('/api/v1/order', OrderRouter)
app.use('/api/v1/orderdetail', OrderItemRouter)


let keranjang = [];
let total = 0;

const welcomebot = `Selamat Datang !
Mau Cari Barang Apa?`
const Deksripsi = '/description'
const Checkcart = '/keranjang'
const Bantuan = '/help'
const Listbarang = '/product'
const Pesan = '/order'



    bot.onText(/\/start|\halo|\hi|\hy|\hai/, (msg) => {
    bot.sendMessage(msg.chat.id, `Halo ${msg.chat.last_name} ${welcomebot}`)
    bot.sendMessage(msg.chat.id, `Tentang Toko Ini ${Deksripsi}`)
    bot.sendMessage(msg.chat.id, `Temukan yang kamu butuhkan disini ${Bantuan}`)
  });

//deskripsi produk
bot.onText(/\/description/, msg => {
    bot.sendMessage(msg.chat.id, `Ipay'store Local Pride toko, menjual brand local mulai dari sepatu, apparel, denim etc`)
})


bot.onText(/\/help/, msg => {
    bot.sendMessage(msg.chat.id, `*Selamat Datang di Pusat Bantuan Toko Kami, Silahkan temukan yang kamu butuhkan disini*
                                    =======================================================`)
    bot.sendMessage(msg.chat.id, `Untuk meilhat list produk, silahkan ke sini ${Listbarang}`)
    bot.sendMessage(msg.chat.id, `Untuk Order, silahkan ke sini ${Pesan}`)

})

  // Request List Produk
    bot.onText(/\/product/, msg => {
    let inline_keyboard = (item) => [
        [
            {
                text: "Tambah Ke Keranjang",
                callback_data: JSON.stringify(item.keranjang)
            }
        ]
    ]

    axios.get(API + Product)
        .then(response => { 
            const data = response.data.data
            data.forEach(item => { 
                let row = {
                    keranjang: {
                        id: item.id,
                        action: 'cart'
                    }
                        }
                bot.sendMessage(msg.chat.id,
                    `*Nama*: ${item.name}
                                                *Harga*: Rp. ${item.price}`,
                    {
                        reply_markup: {
                            inline_keyboard: inline_keyboard(row)
                        },
                        parse_mode: "Markdown"
                    }
                )
                    
            });
        }).catch(err => {
            console.log(err.message)
        })
})

bot.on("callback_query", function onCallbackQuery(callbackQuery){
    const action = JSON.parse(callbackQuery.data)
    const msg = callbackQuery.message
    let x = {
        keranjang: {
            id: action.id,
            action: 'cart'
    }
}
const opts1 = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
	reply_markup: {
		inline_keyboard: [[
			{
				text: "Tambah Ke Keranjang",
				callback_data: JSON.stringify(x.keranjang)
			}
		]]
	}
  };
  const opts2 = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;
	
	axios.get(API + Product + action.id)
		.then(response => {
				if (keranjang.length == 0) {
					keranjang.push({
						name: response.data.data.name,
						price: response.data.data.price,
						quantity: 1
					});
					text = `Product berhasil ditambahkan ke keranjang, 
Silahkan cek keranjang belanja anda ${Checkcart}`;
					bot.editMessageText(text, opts2);
				}
				else {
					let i = keranjang.findIndex(item => item.name == response.data.data.name);
					if (i != -1) {
						keranjang[i].quantity += 1;
                        text = `Product berhasil ditambahkan ke keranjang, 
Silahkan cek keranjang belanja anda ${Checkcart}`;
						bot.editMessageText(text, opts2);
					}
					else {
						keranjang.push({
							name: response.data.data.name,
							price: response.data.data.price,
							quantity: 1
						});
                        text = `Product berhasil ditambahkan ke keranjang, 
Silahkan cek keranjang belanja anda ${Checkcart}`;
						bot.editMessageText(text, opts2);
						
					}
				}
		})
		.catch(err => {
			console.log(err.message);
		});
});

//order produk
bot.onText(/\/order/, async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, `Halo ${msg.chat.last_name}, untuk melakukan order silahkan daftar terkebih dahulu ya!!
                                                                ======================================================
Silahkan isikan data dengan format berikut ini: *Nama* - *Email* - *No. Telp*`)
    bot.sendMessage(chatId, `Ex : *Muhammad Zulfadli* - *zulfadlisimatupang48@gmail.com* - *085760860595*`)
})

// bot.on('message', (msg) => {
//     axios.post(`http://localhost:8080/api/v1/customer`, 
//     {
//         data: {
//             attributes:{
//                 full_name: full_name,
//                 phone_number: phone_number,
//                 username: username,
//                 email: email
//             }
//         }
//     }) .then(response => {
//         console.log(response)
//     }) .catch(function(error) {
//         console.log(error)
//     })
//     bot.sendMessage("Yeay anda telah terdaftar, Silahkan belanja apapun seleramu!!")
// })


// Check Cart
bot.onText(/\/keranjang/, msg => {
    let data = JSON.stringify(keranjang)
    for (let i = 0; i < keranjang.length; i++) {
        total+= keranjang[i].quantity * keranjang[i].price
    }
    bot.sendMessage(msg.chat.id, `Berikut Ini List Belanjaan kamu :  
*${data}* 
Total Belanja Kamu Sebesar Rp. *${total}*`, { parse_mode: "Markdown" }
    )
})


// let { Botkit } = require('botkit');

// const controller = new Botkit('1031146055:AAHjUAyedMvLqyNuncJiGAAuYe-qHNQVoUs');

// controller.hears('hello','direct_message', function(bot, message) {
//     bot.reply(message,'Hello yourself!');
// });

const PORT = process.env.PORT || 8080
app.listen(PORT, console.log(`Server running on port : ${PORT}`))

// app.listen(port, "0.0.0.0", () =>
// console.log(`server is running on http://localhost:${port}`)
// )