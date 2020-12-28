// 引入scp2
const client = require('scp2');
// 下面三个插件是部署的时候控制台美化所用 可有可无
const ora = require('ora');
const chalk = require('chalk');

const spinner = ora(chalk.green('正在发布到服务器...'));
spinner.start();
// 线上dev
client.scp('./dist/', { // 本地打包文件的位置
  host: '39.100.128.79', // 服务器的IP地址
  port: '22', // 服务器端口， 一般为 22
  username: 'dp', // 用户名
  password: 'Arken123', // 密码
  path: '/home/dp/DP-CloudServer/dist', // 项目部署的服务器目标位置
}, (err) => {
  spinner.stop();
  if (!err) {
    console.log(chalk.green('项目发布完毕!'));
  } else {
    console.log('err', err);
  }
});
// 曹凯
/* client.scp('./dist/', { // 本地打包文件的位置
  host: '39.100.105.192', // 服务器的IP地址
  port: '22', // 服务器端口， 一般为 22
  username: 'root', // 用户名
  password: '975481DING!', // 密码
  path: '/root/work/cloudserver_test/dist', // 项目部署的服务器目标位置
}, (err) => {
  spinner.stop();
  if (!err) {
    console.log(chalk.green('项目发布完毕!'));
  } else {
    console.log('err', err);
  }
}); */
// 测试 caokai
/* client.scp('./dist/', { // 本地打包文件的位置
  host: '8.131.91.102', // 服务器的IP地址
  port: '22', // 服务器端口， 一般为 22
  username: 'ck', // 用户名
  password: 'Arken123', // 密码
  path: '/home/ck/DP-CloudServer/dist', // 项目部署的服务器目标位置
}, (err) => {
  spinner.stop();
  if (!err) {
    console.log(chalk.green('项目发布完毕!'));
  } else {
    console.log('err', err);
  }
}); */
