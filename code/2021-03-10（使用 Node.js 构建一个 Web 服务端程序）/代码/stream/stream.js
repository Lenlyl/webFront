const fs = require('fs');

// let res = fs.readFileSync('1.txt');
// console.log(res.toString());
// let rs = fs.createReadStream("1.txt");
let rs = fs.createReadStream("64*5+1kb");
let num = 0;
rs.on("data", chunk => {
    num++;
    // console.log(chunk.toString());
    console.log(num);
})
rs.on('end', ()=>{
    console.log('读取完成了!');
})

// let buffer = Buffer.alloc(65*1024);
// fs.writeFile("65kb", buffer, err=>{
//     if(err){
//         console.log(err);
//     }
//     console.log('写入成功');
// })


// let buffer = Buffer.alloc(64*5*1024+1024);
// fs.writeFile("64*5+1kb", buffer, err=>{
//     if(err){
//         console.log(err);
//     }
//     console.log('写入成功');
// })


//流会把数据分成64kb的小文件传递