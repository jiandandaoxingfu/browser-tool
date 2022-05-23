const fs = require('fs');
const path = "C:\\Users\\Administrator\\iCloudDrive\\学习资料";

class Rename {
    constructor() {
        this.files = fs.readdirSync(path);
    }

    rename(old_str, new_str) {
    	this.files.forEach( file => {
    		fs.renameSync(path + file, path + file.replace(old_str, new_str) ,err => {
    			if(err) {
        			console.error(file + ' : rename failed');
        			return
        		}
    		})
		})
    }
}

let rename = new Rename();
// console.log(rename.files)
// rename.rename('_ev', '')

function fn(path){
    fs.readdir(path,(err,files)=>{
        files.forEach(function(item){
            fs.stat(path+'/'+item,(err,data)=>{
                if(data.isFile()){
                    console.log('文件名',item);
                }else{
                    console.log('文件夹名',item);
                    fn(path+'/'+item)
                }
            })
        })
    })
}
fn(path)