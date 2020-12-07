var express = require('express')
var app = express()
const uuid = require('uuid')
const multer = require('multer')
var upload = multer({ dest: '/home/ubuntu/efs/inputs/' })
var { MongoClient } = require('mongodb');

const amqplib = require('amqplib/callback_api')

const q = 'stp2glb';

function publisher(conn, db){
  conn.createChannel(on_open);
  function on_open(err, ch){
    if(err != null) console.error(err)
    ch.assertQueue(q)

    
    app.route('/process')
      .post(upload.single('stp'), (req, res) => {
        let model = {
          id: uuid.v4(),
          fileId: req.file.filename,
          createdAt: new Date().getTime(),
          status: "PREPROCESS"
        }

        db.collection('models').insertOne(model, (err) => {
          if(!err){
            ch.sendToQueue(q, Buffer.from(req.file.filename))
            res.send({success: true, id: model.id})
          }else{
            res.send({error: err})
          }
        })
      })

  }
}
MongoClient.connect('mongodb://localhost', (err, conn) => {
  let db = conn.db('cae')

  amqplib.connect('amqp://rabbitmq:rabbitmq@localhost', (err, conn) => {
    console.log(err, conn)
    publisher(conn, db)
  })
})

require("greenlock-express")
    .init({
        packageRoot: __dirname,
        configDir: "./greenlock.d",
        // contact for security and critical bug notices
        maintainerEmail: "professional.balbatross@gmail.com",
        // whether or not to run at cloudscale
        cluster: false
    })
    // Serves on 80 and 443
    // Get's SSL certificates magically!
    .serve(app);
