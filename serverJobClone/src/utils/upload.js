import path from 'path';
import multer from 'multer'
var storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'public/uploads/')
    },
    filename:function(req,file,cb){
        let ext = path.extname(file.originalname)
        cb(null,Date.now()+ext)
    },

})

var upload = multer({
    storage: storage,
    fileFilter:function (req,file,callback){
        // console.log(file)
        if(
           
            file.mimetype == "application/pdf"
            
        ){
            callback(null,true)
        }else{
            console.log('only PDF file Supported')
            callback(null,false)
        }

    },
    limits:{
        fileSize : 1024 * 1024 * 2
    }
})

export default upload