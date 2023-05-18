const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

const sequelize=require('./util/database');



app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


//in here i am going to make one-many relation between two table by using thier models
const productModel=require('./models/product');
const userModel=require('./models/user');
productModel.belongsTo(userModel,{constraints:true , onDelete:'cascade'});
userModel.hasMany(productModel);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    userModel.findByPk(1)
    .then(user=>{
        //we can simply add a new field to our request object we should make sure we didnt override any already presended one
        req.user=user;
        next();
    })
    .catch(err=>{
        console.log(err);
    })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize
//sync({force:true})
.sync()
.then(result=>{
    return userModel.findByPk(1);
})
.then(user=>{
    if(!user){
        userModel.create({name:'max',email:'maxi123@gmail',});
    }
    return user;
})
.then(user=>{
    app.listen(3000);
})
.catch(err=>console.log(err));

