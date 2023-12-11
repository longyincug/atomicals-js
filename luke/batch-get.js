const { log, range, padNum } = require("./tool");
const { exec } = require("child_process");

// 定义需要执行的命令列表
// "yarn cli get-container-item capybaras 0599",

const START = 1; // json文件名称的最小数字
const END = 9999; // json文件名称的最大数字
// const containerName = "toothy";
const containerName = "capybaras"; // 0094,0026,0126,0266,0252,0293,0322,0303,0344,0332,0424,0365,0457
// const numList = range(100, 500).map((num) => padNum(num, END));
const numList = ["0094", "0026", "0126"];
const getCmd = (num) =>
  `node dist/cli.js get-container-item ${containerName} ${num}`;

const results = [];
let count = 0;

/**
 * {
  success: true,
  data: {
    status: 'verified',
    candidate_atomical_id: '0000bef9358b346a69ef60050f93dccd22742cafdc1ee239afc1625d2910c3c0i0',
    atomical_id: '0000bef9358b346a69ef60050f93dccd22742cafdc1ee239afc1625d2910c3c0i0',
    candidates: [ [Object] ],
    type: 'item'
  }
}
 */

// 循环执行命令
numList.forEach((no) => {
  const command = getCmd(no);
  exec(command, (error, stdout, stderr) => {
    count++;
    if (error) {
      log(`Error executing command: ${command}`).red();
      console.error(stderr);
    } else {
      // log(`Command output for ${command}:\n${stdout}`).blue();
      try {
        const { data } = JSON.parse(stdout);
        if (
          data &&
          !data.status &&
          !data.atomical_id &&
          !data.candidates?.length
        ) {
          // 还没有被人选中
          results.push(no);
          // log(JSON.stringify(data)).green();
        }
      } catch (e) {
        log(e.message).red();
        // 一般是服务器响应 502 返回一堆html错误
        // log(stdout).red();
      }
    }
    // 全部执行结束
    if (count === numList.length) {
      log(results).green();
    }
  });
});
