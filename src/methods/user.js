'use strict';

/**
 * practice Node.js project
 *
 * @author Huiming Hou <240050497@qq.com>
 */

import validator from 'validator';

module.exports = function(done){
  $.method('user.add').check({
    name: {required: true, validate:(v) => validator.isLength(v, {min: 4, max: 20}) && /^[a-zA-Z]/.test(v)},
    email: {required: true, validate:(v) => validator.isEmail(v)},
    password: {required: true, validate:(v) => validator.isLength(v, {min: 6})}
  });
  $.method('user.add').register(async function(params, callback){
    params.name = params.name.toLowerCase();
    {
      const user = await $.method('user.get').call({
        name: params.name
      });
      if(user)
        return callback(new Error(`user ${params.name} already exists`));
    }
    {
      const user = await $.method('user.get').call({
        email: params.email
      });
      if(user)
        return callback(new Error(`user ${params.name} already exists`));
    }
    params.password = $.utils.encryptPassword(params.password.toString());
    //params.password = params.password.toString();
    const user = new $.model.User(params);
    user.save(callback);

    callback(params);
  });
  
  $.method('user.get').check({
    _id: {validate:(v) => validator.isMongoId(v)},
    name: {validate:(v) => validator.isLength(v, {min: 4, max: 20}) && /^[a-zA-Z]/.test(v)},
    email: {validate:(v) => validator.isEmail(v)}
  });

  $.method('user.get').register(async function(params, callback){
    const query = {};
    if(params.id){
      query._id = params._id;
    }else if(params.name){
      query.name = params.name;
    } else if(params.email){
      query.email = params.email;
    }else{
      return callback(new Error('missing parameter _id|name|email'));
    }

    $.model.User.findOne(query,callback);
  });

  // $.method('user.update').check({
  //   name: {required: true, validate:(v) => validator.isLength(v, {min: 4, max: 20}) && /^[a-zA-Z]/.test(v)},
  //   email: {required: true, validate:(v) => validator.isEmail(v)},
  //   password: {required: true, validate:(v) => !validator.isNumeric(v) && validator.isLength(v, {min: 6})}
  // });

  $.method('user.update').register(async function(params, callback){
    const user = $.method('user.get').call(params);
    if(!user){
      return callback(new Error('user does not exist'));
    }

    const update = {};
    if(params.name && user.name !== params.name) update.name = params.name;
    if(params.email && user.email !== params.email) update.email = params.email;
    if(params.password) update.password = params.password;
    if(params.nickname) update.nickname = params.nickname;
    if(params.about) update.about = params.about;

    $.model.User.update({_id: user._id}, {$set:update}, callback);
  });
  done();
};
