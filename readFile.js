const fs = require('fs');

// readFile은 buffer를 사용.
// 파일을 읽을 때 버퍼(Buffer) 형식으로 읽는다.
// fs.readFile('./sample.txt' , function(err, data) {
//     if (err) throw err;
//     console.log(data);
//     console.log(data.toString());
//     fs.writeFile('./copiedSample.txt', data, function(err) {
//         if (err) throw err;
//         console.log('The file has been saved!');
//     });
// });

// 동기 방식과 비동기 방식.
// fs.readFile('./asyncSample.txt', (err, data) => {
//     if (err) throw err;
//     console.log('1번째: ', data.toString());
// });
// console.log('1번째 File Read.');
// fs.readFile('./asyncSample.txt', (err, data) => {
//     if (err) throw err;
//     console.log('2번째: ', data.toString());
// });
// console.log('2번째 File Read.');
// fs.readFile('./asyncSample.txt', (err, data) => {
//     if (err) throw err;
//     console.log('3번째: ', data.toString());
// });
// console.log('3번째 File Read.');
// fs.readFile('./asyncSample.txt', (err, data) => {
//     if (err) throw err;
//     console.log('4번째: ', data.toString());
// });
// console.log('4번째 File Read.');
// fs.readFile('./asyncSample.txt', (err, data) => {
//     if (err) throw err;
//     console.log('5번째: ', data.toString());
// });
// console.log('5번째 File Read.');

// 동기식으로 흉내내기.
let readFileAsSync = (index) => {
    return new Promise((resolve, reject) => {
        fs.readFile('./asyncSample.txt', (err, data) => {
            if (err) throw err;
            console.log(`${index}번째: `, data.toString());
            resolve(index);
        });
    });
}
(async () => {
    let index;
    index = await readFileAsSync(1);
    console.log(index + "번째 File Read.");
    index = await readFileAsSync(2);
    console.log(index + "번째 File Read.");
    index = await readFileAsSync(3);
    console.log(index + "번째 File Read.");
    index = await readFileAsSync(4);
    console.log(index + "번째 File Read.");
    index = await readFileAsSync(5);
    console.log(index + "번째 File Read.");
})();

// readFile 이용해서 순차적으로 실행시키기.
// let data = fs.readFileSync('./asyncSample.txt');
// console.log(data.toString());
// console.log('1번째 File Read.');
// data = fs.readFileSync('./asyncSample.txt');
// console.log(data.toString());
// console.log('2번째 File Read.');
// data = fs.readFileSync('./asyncSample.txt');
// console.log(data.toString());
// console.log('3번째 File Read.');
// data = fs.readFileSync('./asyncSample.txt');
// console.log(data.toString());
// console.log('4번째 File Read.');
// data = fs.readFileSync('./asyncSample.txt');
// console.log(data.toString());
// console.log('5번째 File Read.');


