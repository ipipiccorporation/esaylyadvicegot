const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
let counter = 1; // 初始化计数器为1

const app = express();

// 解析表单数据
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 处理POST请求并写入文件
app.post('/submit', (req, res) => {
    const formData = req.body;
    const data = Object.keys(formData).map(key => `${key}: ${formData[key]}`).join('\n');
    const fileName = `userdata/${counter}.txt`; // 生成文件名，使用计数器值
    const filePath = path.join(__dirname, fileName);

    fs.writeFile(filePath, data, (err) => {
        if (err) {
            console.error('抱歉我们无法保存您的文件:', err);
            res.status(500).send('Error writing data to file');
        } else {
            console.log(`某个用户文件已经保存到 ${fileName}`);
            res.send(`表格已经提交，感谢您的反馈`);
        }
        counter++; // 每次成功写入后，计数器自增1
    });
});

// 启动服务器并监听端口
app.listen(3000, () => {
    console.log('服务器运行在端口3000');
});