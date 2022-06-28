const fs = require('fs');
const path = "C:/Users/jiami/Desktop/数学与统计学院67,61/";

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
// console.log(rename.files)
// rename.rename(/[a-zA-Z0-9- ]/g, '');
// rename.rename("学院", '');

function fn(path){
    fs.readdir(path,(err, files)=>{
        files.forEach(function(item){
            fs.stat(path + item,(err, data)=>{
                if(!data.isFile()){
                    fs.readdir(path + item, (err, files) => {
                        let fn = files.filter( fn => fn.match(/认定表/))[0];
                        fs.rename(path + item + '/' + fn, path + item + '/' + `干部人事档案专项审核认定表(${item}).doc`, err => {
                            if(err) {
                                console.log(err)
                                console.error(fn + ' : rename failed');
                                return
                            }
                        })
                    })
                }
            })
        })
    })
}

fn(path)