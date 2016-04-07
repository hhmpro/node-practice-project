'use strict';

/**
 * practice Node.js project
 *
 * @author Huiming Hou <240050497@qq.com>
 */

import validator from 'validator';
module.exports = function(done){
  $.checkLogin = async function(req, res, next){
    if(!(req.session.user && req.session.user._id)) return next(new Error('please login first!'));
    next();
  };
  
  done();  
};