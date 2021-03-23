const fs = require('fs');
const { COPYFILE_EXCL } = fs.constants;

// 파일 수정
// fs.readFile('terms.txt', 'utf8', function(err, data){

//     let newValue = data.replace('19', '20');

//     fs.writeFile('copy.txt', newValue, function(){
//         console.log(newValue);
//     });

// });

// console.log('You have modified the file ');

// 파일 복사.
// fs.copyFile('terms.txt', 'terms_copy.txt', COPYFILE_EXCL, (err) => {
//     if (err) throw err;
//     console.log('terms.txt was copied to destiterms_copynation.txt');
// });

// 파일 삭제.
// fs.unlink('terms_copy.txt', (err) => {
//     if (err) throw err;
//     console.log('You have Deleted This file ');
// });