const fs = require('fs');

let file_fd = fs.openSync('sample.txt', 'r');
fs.fstat(file_fd, (error, stats) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Stats object for: sample.txt");
        console.log(stats);

        // Using methods of the Stats object
        console.log("Path is file:", stats.isFile());
        console.log("Path is directory:", stats.isDirectory());
    }
});

// stat sample.txt