const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config({path: '.env'})


const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TOKEN;
const axios = require("axios");
const API = process.env.URL
const Product = process.env.PRODUK
const CUSTOMER = process.env.CUSTOMER
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

const welcomebot = `Selamat Datang !\nUntuk memudahkan kamu dalam berbelanja, \nSilahkan daftar terlebih dahulu ya`
const Deksripsi = '/description'
const Checkcart = '/keranjang'
const Bantuan = '/help'
const Listbarang = '/product'
const Profil = '/me'
const Daftar = '/register'


    bot.onText(/\/start|\halo|\hi|\hy|\hai/, (msg) => {
    bot.sendMessage(msg.chat.id, `Halo ${msg.chat.last_name} ${welcomebot}\n Silahkan ikuti format berikut :\n${Daftar} Zulfadli - zulfadli48 - ipay48@gmail.com - 085760860595`)
    bot.sendMessage(msg.chat.id, `Tentang Toko Ini ${Deksripsi}`)
    bot.sendMessage(msg.chat.id, `Temukan yang kamu butuhkan disini ${Bantuan}`)
  });

//daftar akun
bot.onText(/\/register (.+)/, async (msg, data)=> {
    const [full_name,username,email,phone_number] = data[1].split('-')

    try{
        const response = await axios.post (API + CUSTOMER, {
            "data" :{
                "attributes": {
                    "id": msg.from.id,
                    "full_name": full_name,
                    "username": username,
                    "email": email,
                    "phone_number": phone_number
                }
            }
        })
        bot.sendMessage(msg.chat.id, `Yeay pendaftaran kamu berhasil, silahkan lihat detail profil kamu /me\n atau ingin melakukan order silahkan lihat list produk ${Listbarang}`)
    } catch (error){
        console.log(error)
        bot.sendMessage(msg.chat.id, 'Kamu telah terdaftar')
    }
})

// profil
bot.onText(/\/me/, async (msg)=>{
    const id = msg.from.id
    try {
        const response = await axios.get(API + CUSTOMER + id )
        bot.sendMessage(msg.chat.id, `Berikut detail profil kamu : \nNama : ${response.data.data.full_name} \nUsername: ${response.data.data.username}\nEmail: ${response.data.data.email}\nPhone number: ${response.data.data.phone_number}.`, {
            parse_mode:'Markdown'
        })
    } catch (error) {
        console.log(error);
        bot.sendMessage(msg.chat.id, `Maaf, kamu belum terdaftar disistem kami.\nSilahkan mendaftar dengan mengirimkan data dengan format berikut : \n/daftar *nama*-*username*-*email*-*phone number*\nContoh : /daftar *Zulfadli*-*zulfadli*-* ipay48@gmail.com*-*085760860595*`,{
            parse_mode:"Markdown"
        })
    }
})

//deskripsi toko
bot.onText(/\/description/, msg => {
    bot.sendMessage(msg.chat.id, `Ipay'store`)
})

//help
bot.onText(/\/help/, msg => {
    bot.sendMessage(msg.chat.id, `*Selamat Datang di Pusat Bantuan Toko Kami, Silahkan temukan yang kamu butuhkan disini*
                                    =======================================================`)
    bot.sendMessage(msg.chat.id, `Untuk Melihat detail profil ${Profil}`)
    bot.sendMessage(msg.chat.id, `Untuk Order, silahkan ke sini ${Listbarang}`)

})


//product
bot.onText(/\/product/, async (msg) => {
    try {
        const response = await axios.get(API + Product );
        const data = response.data.data;
        bot.sendMessage(msg.chat.id, 'List Produk')
        data.forEach(el => {
            bot.sendMessage(
              msg.chat.id,
              `*Nama*:    ${el.name}\n*Harga*: Rp ${el.price}
        `,{
                    "reply_markup":{
                        "inline_keyboard": [
                            [
                                {
                                    text: "Tambah Ke Keranjang",
                                    callback_data: el.id,
                                },
                            ],
                        ],
                    }, parse_mode: "Markdown"}
                )
        })
        setTimeout(() =>{
            bot.sendMessage(msg.chat.id, `Silahkan cek keranjang belanja anda ${Checkcart}`)
        }, 2000)
    } catch (error){
        console.log(error)
    }
})

bot.on("callback_query", function onCallbackQuery(callback) {
    const action = parseInt(callback.data)
    const msg = callback.message
    const [nama,harga] = callback.message.text.split('\n')
    const name = nama.replace('Nama:   ','')
    const price = harga.replace('Harga: Rp ','')
    const newPrice = parseInt(price)

    const opts = {
        chat_id: msg.chat.id,
        message_id: msg.message_id,
        parse_mode:'markdown'
      };
    const list = {
        "product_id": action,
        "name": name,
        "price": newPrice,
        "quantity": 1
    }
   keranjang.push(list)
   bot.editMessageText(`${name} ditambahkan ke keranjang`, opts)
});

//cek keranjang
bot.onText(/\/keranjang/, async (msg) => {

const id = msg.from.id
try {
    const res = await axios.get(API + CUSTOMER + id)
    const data_user = res.data
    if(keranjang.length>0){
        let total =[]
        keranjang.forEach(el => {
            total.push(el.quantity*el.price)
        })
        bot.sendMessage(msg.chat.id, `Berikut List Belanjaan Kamu`)
        keranjang.forEach((el) =>{
            bot.sendMessage(msg.chat.id, `- ${el.name}\nRp. ${el.price*el.quantity}`)
        })
        cart = []
    } else {
        bot.sendMessage(msg.chat.id, `Keranjang Belanja Anda Kosong`)
    }
} catch (err){
    console.log(err.message)
}
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