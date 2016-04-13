'use strict';

/**
 * practice Node.js project
 *
 * @author Huiming Hou <240050497@qq.com>
 */

import path from 'path';

module.exports = function(done){
  $.router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname,'../../frontend/index.html'));
    //res.end("hello");
  });
  done();
};
