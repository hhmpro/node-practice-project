'use strict';

/**
 * practice Node.js project
 *
 * @author Huiming Hou <240050497@qq.com>
 */

module.exports = function(done){
  $.router.get('/', function(req, res, next) {
    res.end(`现在是北京时间${new Date()}`);
  });
  done();
};
