const mongoose = require('mongoose')

const db_link = 'mongodb+srv://admin:Password@123@cluster0.blhys.mongodb.net/task-manager?retryWrites=true&w=majority' 

mongoose.connect(db_link )
//  {
    // useNewUrlParser: true,
    // useCreateIndex: true
// })
.then((db)=>{
    console.log("db connected");
})
.catch((e)=>{
    console.log('error');
})
// const User = mongoose.model('User' , {
//     name:{
//         type:String
//     },
//     age: {
//         type: Number
//     }
// })


// const me = new User({
//     name:"And",
//     age: 25
// })

// me.save()
// .then(() => { console.log(me); })
// .catch((error) => {console.log("Error");
// })
