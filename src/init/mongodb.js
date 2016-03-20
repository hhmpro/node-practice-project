'use strict';

/**
 * practice Node.js project
 *
 * @author Huiming Hou <240050497@qq.com>
 */

import mongoose from 'mongoose';
module.exports = function(done){
  const conn = mongoose.createConnection($.config.get('db.mongodb'));
  $.mongodb  = conn;
  done();
};
