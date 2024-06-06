const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const app = express();
const cors = require("cors");
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        console.log(file.originalname.split('.'));
        let x = file.originalname.split('.').pop();
      cb(null, `image_predict.${x}`)
    },
  })

const uploadStorage = multer({ storage: storage })


app.post('/process-image', uploadStorage.single('image'), (req, res) => {
    const imagePath = req.file.path;

    // Call Python script to process the image
    console.log(imagePath);
    const python = spawn('python', ["../src/components/Ocr/ocr.py", imagePath]);

    python.stdout.on('data', (data) => {
        messages = data.toString();
        console.log(messages);
        res.status(200).json({
            message: messages,
        })
        // console.log(data.toString());
        // res.json({ result: data.toString() });
    });

    python.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.status(500).send(data.toString());
    });

    // python.on('close', (code) => {
    //     fs.unlinkSync(imagePath);  // Delete the file after processing
    //     console.log(`Python script exited with code ${code}`);
    // });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});