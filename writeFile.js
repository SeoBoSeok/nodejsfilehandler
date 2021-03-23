const fs = require('fs');

fs.writeFile('myname.txt', 'My name is Boseok.', (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});

fs.writeFileSync('mynamesync.txt', 'My name is Boseok', {
    encoding: 'utf-8',
    flag: 'w'
});