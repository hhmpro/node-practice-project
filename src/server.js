'use strict';

/**
 * practice Node.js project
 *
 * @author Huiming Hou <240050497@qq.com>
 */
import path from 'path';
import ProjectCore from 'project-core';
import createDebug from 'debug';

const $ = global.$ = new ProjectCore();


// 创建Debug函数
$.createDebug = function(name){
  return createDebug('my:'+name);
};

const debug = $.createDebug('server');

// 加载配置文件
$.init.add((done) => {
  $.config.load(path.resolve(__dirname, 'config.js'));
  const env = process.env.NODE_ENV || null;
  if(env){
    debug('load env: %s', env);
    try{
      $.config.load(path.resolve(__dirname, '../config', env + '.js'));
    }catch(e){
      debug('catch exception when loading config,env:%s,:exception: %s', env, e);
      return;
    }
  }
  $.env = env;
  done();
});


//初始化MongoDB
$.init.load(path.resolve(__dirname, 'init', 'mongodb.js'));

// 加载Models
$.init.load(path.resolve(__dirname, 'models'));

// 加载Methods
$.init.load(path.resolve(__dirname, 'methods'));



// 初始化Express
$.init.load(path.resolve(__dirname, 'init', 'express.js'));
// 加载路由
$.init.load(path.resolve(__dirname, 'routes'));


// 初始化
$.init((err) => {
  if(err){
    console.error(err);
    process.exit(-1);
  }else{
    console.log("inited [env=%s]",$.env);
  }
  require('./test');
});
