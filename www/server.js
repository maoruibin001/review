/**
 * Created by lenovo on 2017/9/4.
 */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const fs = require('fs');


const app = express();

// app.use(multer({dest: '/dest'}).any());

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, '../static')));

// app.use(multer({dest: '../dest'}).any());

app.post('/upload', multer({dest: '/dest'}).any(), function(req, res) {
        console.log(req.files[0].path);
        var staticPath = path.join(__dirname, '../static/images/', req.files[0].originalname)
        console.log(staticPath)
        fs.readFile(req.files[0].path, function(error, data) {
            if (error) {
                console.log(error);
                return;
            }
            console.log(data);
            fs.writeFile(staticPath, data, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (!err) {
                    console.log('保存成功')
                    res.send('hi , i am post');
                }
            })
        })
    });

// app.post('/upload', multer({dest: '/dest'}).any(), function(req, res) {
//     console.log(req.files[0]);
//
//     var dest_file = path.join(__dirname, '../static/images/', req.files[0].originalname);
//     console.log(dest_file);
//     fs.readFile(req.files[0].path, function(err, data) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         fs.writeFile(dest_file, data, function(error) {
//             if (error) {
//                 console.log(error);
//                 return;
//             }
//             res.send(JSON.stringify({filename: req.files[0].originalname, msg: 'success'}))
//             console.log('文件保存成功');
//         })
//     })
// });
app.listen(3001, function() {
    console.log('server start at localhost: 3000');
});