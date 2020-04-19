const express = require('express')
const router = express.Router()

router.get('/', (req,res) =>{
    res.json({
        "Author": "Muhammad Zulfadli",
        "Github": "https://github.com/MuhammadZulfadli",
        "Project": "Online-Order"
    })
})

module.exports = router