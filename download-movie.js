const axios = require('axios');
const fs = require('fs');

const headers = {
	'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
}

class Downloader {
	constructor(threads, url) {
		this.threads = threads;
		this.root_url = url; // web 
		this.m3u8_url = '';
		this.video_urls = [];
		this.state_arr = []; 
		this.video_count = 0;
		this.downloaded_count = 0;
		this.isdownload = !1;
		this.tic = new Date().getTime();
	}

	get_m3u8_url() {
		let this_ = this;
		axios({
			url: this_.root_url,
  			method: 'GET',
  			responseType: 'text',
  			headers: headers
  		}).then( res => {
  			let m1 = res.data.match(/\n\/.*?index\.m3u8\n/),
  				m2 = res.data.indexOf('#EXT-X-ENDLIST') > 0;
  			if( m1 || m2 ) {
  				this_.m3u8_url = m2 ? this_.root_url
  									: this_.root_url.replace(/\.com\/.*/, '.com' + match[0].slice(1, -1));
  				this_.get_video_urls();
  			}
		}).catch( e => {
			console.log(e)
		})
	}

	get_video_urls() {
		let this_ = this;
		axios({
			url: this_.m3u8_url,
  			method: 'GET',
  			responseType: 'text',
  			headers: headers
  		}).then( res => {
  			let match = res.data.match(/\nhttps:.*?\n/g);
  			if( match ) {
  				this_.video_urls = match.map(a => a.slice(1, -1));
  				this_.video_count = this_.video_urls.length;
  				this_.state_arr = new Array(this_.video_count).join(',').split(',').map( s => 0);
  				this_.start();
  				this_.update_state();
  			}
		}).catch( e => {
			console.log(e)
		})
	}

	start() {
		let n = Math.min(this.threads, this.video_count);
		for(let i=0; i<n; i++) {
			this.crawl(i);
		}
	}

	crawl(i) {
		let this_ = this;
		this.state_arr[i] = 1;
		this.downloaded_count += 1;
		axios({
			url: this_.video_urls[i],
  			method: 'GET',
  			responseType: 'stream',
  			headers: headers
  		}).then( res => {
  			let stream = res.data.pipe( fs.createWriteStream(`F:/movie/temp/${i+1}.ts`, {end: false}));
  			stream.on('error', err => {
				this_.next();
			})

  			stream.on('finish', err => {
				this_.next();
			})
		}).catch( e => {
			console.log(`第 ${i} 个下载出错`);
			this_.next();
		})
	}

	next() {
		if( this.video_count === this.downloaded_count ) { 
			this.done();
		} else {
			let i = this.state_arr.indexOf(0);
			if( i > 0 ) {
				this.crawl(i);
			}
		}

	}

	update_state() {
		let this_ = this;
		this_.interval = setInterval( () => {
			let toc = new Date().getTime();
			let process_ = (this_.downloaded_count * 100 / this_.video_count).toFixed(2);
			console.log([ this_.downloaded_count, this_.video_count] )
			let time = (toc - this_.tic) / 1000;
			console.log( '----------已下载' + process_ + '%,   已运行：' + time + 's---------------');
			if( this_.downloaded_count === this_.video_count ) {
				clearInterval(this_.interval);
			}
		}, 3000)
	}

	done() {
		console.log('done');
		merger.merge();
	}
}

class Merger {
    constructor() {
        this.files = fs.readdirSync('F:/movie/temp/')
            .map( f => f.slice(0, -3) )
            .sort( (a, b) =>  a - b );
        this.movie = fs.createWriteStream('F:/movie/test.mp4');
    }

    merge() {
    	let this_ = this;
        if (!this.files.length) {
            this.movie.end("Done");
            console.log('merge done');
            return;
        }
        let file = 'F:/movie/temp/' + this.files.shift() + '.ts';
        let stream = fs.createReadStream(file);
        stream.pipe(this.movie, {end: false});
        stream.on("end", () => {
            this_.merge();
        });
    }
}

let downloader = new Downloader(10, 'https://ts3.510yh.cc/20210120/NZjgSSfD/1000kb/hls/index.m3u8');
let merger = new Merger();
downloader.get_m3u8_url();
if ( downloader.isdownload ) merger.merge()