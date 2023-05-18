const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Product=sequelize.define('products',{
  id:{
    type:Sequelize.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
  },
  title:Sequelize.STRING, //this syntax is used only when set the type only
  price:{
    type:Sequelize.DOUBLE,
    allowNull:false
  },
  imageUrl:{
    type:Sequelize.STRING,
    allowNull:false
  },
  description:{
    type:Sequelize.STRING,
    allowNull:false
  }
})

module.exports=Product;