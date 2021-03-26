const http = require('http');
const { URL } = require('url');
const fs = require('fs');
const { logger } = require('./config/winston');

let childProcess = require('child_process');
var cron = require('node-cron');

/**
 * https://www.npmjs.com/package/node-cron
 */
cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
  logger.info('SCHEDULE crawler');
  runScript(__dirname + '/crawler-script.js', function (err) {
    if (err) throw err;
    console.log('finished running crawler-script.js');
  });
});

function runScript(scriptPath, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    let invoked = false;

    let process = childProcess.fork(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}

http.createServer((request, response) => {
  const baseURL = 'http://' + request.headers.host + '/';
  const myURL = new URL(request.url, baseURL);
  const path = myURL.pathname; // url에서 path 추출
  if (request.method === 'GET') { // GET 요청이면
    if (path === '/about') { // 주소가 /about이면
      response.writeHead(200,{'Content-Type':'text/html'}); // header 설정
      fs.readFile(__dirname + '/about.html', (err, data) => { // 파일 읽는 메소드
        if (err) {
          return console.error(err); // 에러 발생시 에러 기록하고 종료
        }
        response.end(data, 'utf-8'); // 브라우저로 전송
      });
    } else if (path === '/crawler') {
      logger.info(`GET crawler `);
      // Now we can run a script and invoke a callback when complete, e.g.
      runScript(__dirname + '/crawler-script.js', function (err) {
        if (err) throw err;
        console.log('finished running crawler-script.js');
        response.end('crawler worked.');
      });
    }
     else if (path === '/') { // 주소가 /이면
      response.writeHead(200,{'Content-Type':'text/html'});
      fs.readFile(__dirname + '/main.html', (err, data) => {
        if (err) {
          return console.error(err);
        }
        response.end(data, 'utf-8');
      });
    } else { // 매칭되는 주소가 없으면
      response.writeHead(404,{'Content-Type':'text/html;charset=UTF-8'});
      logger.error(`Error message: 잘못된 주소 참조. ${path}`);
      response.statusCode = 404; // 404 상태 코드
      response.end('주소가 없습니다');
    }
  }
}).listen(8080).on("listening", () => {
  console.log(`Server is runnning on port 8080.`);
  console.log(`http://localhost:8080`);
});
