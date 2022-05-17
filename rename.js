const fs = require('fs');
const path = "I:/歌曲/新建文件夹 (2)/";

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
rename.rename('_ev', '')