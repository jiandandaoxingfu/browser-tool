const fs = require('fs');
// const path = "C:/Users/jiami/Desktop/日记/";

class Rename {
    constructor() {
        this.files = fs.readdirSync(path);
    }

    rename(old_str, new_str) {
    	this.files.forEach( file => {
    		fs.renameSync(path + file, path + file.replace(old_str, new_str), err => {
    			if(err) {
        			console.error(file + ' : rename failed');
        			return
        		}
    		})
            console.log(file);
		})
    }
}

// let rename = new Rename();
// // console.log(rename.files)
// rename.rename(/.*?(\d+)年(\d+)月(\d+)日 ?\.pdf/, '$1.0$2.0$3.pdf');
// // rename.rename(/.*?(\d+)年(\d+)月(\d+)日 (\d\d)_(\d\d)_(\d\d) ?\.pdf/, '$1.0$2.0$3-$4.$5.$6.pdf');
// rename.rename(/\.0(\d\d)/g, '.$1');

// function fn(path){
//     fs.readdir(path,(err, files)=>{
//         files.forEach(function(item){
//             fs.stat(path + item,(err, data)=>{
//                 if(!data.isFile()){
//                     fs.readdir(path + item, (err, files) => {
//                         let fn = files.filter( fn => fn.match(/认定表/))[0];
//                         fs.rename(path + item + '/' + fn, path + item + '/' + `干部人事档案专项审核认定表(${item}).doc`, err => {
//                             if(err) {
//                                 console.log(err)
//                                 console.error(fn + ' : rename failed');
//                                 return
//                             }
//                         })
//                     })
//                 }
//             })
//         })
//     })
// }

// fn(path)

// fs.readdir("C:/Users/jiami/iCloudDrive/iCloud~md~obsidian/JMx/日记",(err, files)=>{
//     files = files.sort();
//     files.forEach( function(item) {
//         if (item.match(/\.md$/)) {
//             console.log(item)
//             item.read
//         }
//     })
// })


const path = require('path');

const folderPath = 'C:/Users/jiami/iCloudDrive/iCloud~md~obsidian/JMx/日记';

fs.readdir(folderPath, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (!file.match(/\.md$/)) return
    const filePath = path.join(folderPath, file);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) throw err;

      console.log(file.slice(0, -3));
      console.log(data);
    });
  });
});