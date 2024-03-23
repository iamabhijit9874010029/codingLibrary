const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema is the structure and the rule that is define so that data insert into it will be of that types
//A database schema is a blueprint or architecture of how our data will look

//in mongodb first it came database than collections then documents
//where collection is like row in sql and documents fields is like column data in sql

//where  Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.

const CodeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  problemDescription: {
    type: String,
    required: true,
  },
  problemConstraints: {
    type: String,
    required: true
  },
  inputFormat:{
    type:String,
    required: true
  },
  outputFormat:{
    type:String,
    required: true
  },
  exampleInput1:{
    type:String,
    required: true
  },
  exampleInput2:{
    type:String,
    required: true
  },
  exampleOutput1:{
    type:String,
    required: true
  },
  exampleOutput2:{
    type:String,
    required: true
  },
  exampleExplanation1:{
    type:String,
    required: true
  },
  exampleExplanation2:{
    type:String,
    required: true
  },
  code: {
    type: String,
    required: true,
  },
},  //this will auto update the timestamp when we do inserting or updating documents of this type schema
{ timestamps: true });

const Code = mongoose.model('Code', CodeSchema);
module.exports = Code;

/*at first we make a schema that define structure and then created model based on that schema in 33 by 
  passing 2args 1st is singular name of collection then the schema that define structure for that object */

  //and finally exporting that Code models which is later used to do CRUD operation