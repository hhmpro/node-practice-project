'use strict';

/**
 * practice Node.js project
 *
 * @author Huiming Hou <240050497@qq.com>
 */

import mongoose from 'mongoose';
module.exports = function(done){
  const Schema = mongoose.Schema;
  const ObjectId = mongoose.ObjectId;
  const User = new Schema({
    name: {type: String, unique: true},
    email: {type: String, unique: true},
    password: {type: String},
    nickname: {type: String},
    about: {type: String}
  });
  $.mongodb.model('User', User);
  $.model.User = $.mongodb.model('User');
  done();
};
