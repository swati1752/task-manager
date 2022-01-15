const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

// const id = new mongodb.ObjectId()
// console.log(id);

const connectionURL =  'mongodb://127.0.0.1:27017'
const databaseName = 'task-manag'

MongoClient.connect(connectionURL, { useNewUrlParser: true} , (e, c) =>{
    if(e){
        return console.log('error')
    }
    const db = c.db(databaseName);

    const col1 = db.collection('users')
    
    col1.insertOne({
        name:"nd",
        age:21
    }, (e , r) =>{
        if(e){
            return console.log('error')
        }
        console.log(r);
    })
})