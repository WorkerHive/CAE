var express = require('express')
var app = express()
const multer = require('multer')
var upload = multer({ dest: '/home/ubuntu/efs/inputs/' })

const amqplib = require('amqplib/callback_api')

const q = 'stp2glb';

function publisher(conn){
  conn.createChannel(on_open);
  function on_open(err, ch){
    if(err != null) console.error(err)
    ch.assertQueue(q)

    

app.route('/process')
      .post(upload.single('stp'), (req, res) => {
        console.log(req.file)
     ch.sendToQueue(q, Buffer.from(req.file.filename))
  })


  }
}

amqplib.connect('amqp://localhost', (err, conn) => {
  publisher(conn)
})

app.listen(80)
