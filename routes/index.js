const express = require('express')
const routes = express.Router()
const multer = require('multer')
const movieController = require('../controllers/movieController')

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads")
    },
    filename : (req,file,cb) => {
        let img = Date.now()+"-"+file.originalname
        cb(null,img);
    }
})

const fileUpload = multer({storage : storage}).single('img');

routes.get('/', movieController.viewMovie)
routes.post('/movieAdd',fileUpload, movieController.addMovie)
routes.get('/deleteData',movieController.deleteMovie)
routes.get('/editData', movieController.editData)
routes.post('/updateRecord',fileUpload, movieController.updateRecord)


module.exports = routes