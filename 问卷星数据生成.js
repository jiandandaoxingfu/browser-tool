// 获取问卷星数据
const qaq_containers = [...document.getElementById('divQuestion').querySelectorAll('.ui-field-contain')];
let qaqs = qaq_containers.map(qc => {
    // console.log(qc.querySelector('.field-label').innerText);
    // console.log( (qc.querySelector('.ui-controlgroup') || qc.querySelector('.ui-input-text') ).innerText);
    let q = qc.querySelector('.field-label').innerText;
    let a_container = qc.querySelector('.ui-controlgroup') || qc.querySelector('.ui-input-text');
    let a = a_container.innerText.replace(/([ABCDEF]\.?|[ABCDEF] ?)/g, '').split('\n').map((a, i) => i + 1);
    
    return [q, a];
})

// 初始化每个题目的答案概率(每个答案取相等概率), 对于特定的题目, 自行设定概率. 
let weights = qaqs.map(qaq => qaq[1].map(a => 1/qaq[1].length) );
weights = [
    [0.54, 0.46],
    [0.15, 0.3, 0.3, 0.17, 0.08],
    [0.37, 0.34, 0.16, 0.09, 0.04],
    [0.25, 0.43, 0.22, 0.1],
    [0.29, 0.46, 0.17, 0.08],
    [0.09, 0.15, 0.4, 0.36],
    [0.17, 0.33, 0.44, 0.06],
    [0.04, 0.29, 0.57, 0.1],
    [0.6, 0.4, 0.76, 0.8],
    [0.18, 0.3, 0.5, 0.02],
    [0.2, 0.7, 0.07, 0.03],
    [0.6, 0.72, 0.52, 0.67],
    [0.9, 0.8, 0.7, 0.6],
    [0.4, 0.7, 0.17, 0.08],
    [0.14, 0.28, 0.53, 0.04],
    [0.83, 0.74, 0.46, 0.29],
    [0.21, 0.42, 0.28, 0.07],
    [0.07, 0.38, 0.4, 0.15],
    [0.14, 0.54, 0.32],
    [0.04, 0.4, 0.4, 0.16],
    [0.74, 0.69, 0.1, 0.17],
    [0.74, 0.39, 0.45, 0.1],
    [0.19, 0.25, 0.17, 0.39],
    [0.15, 0.31, 0.54],
    [0.3, 0.1, 0.6],
    [0.8, 0.1, 0.3, 0.6],
    [0.67, 0.79, 0.7, 0.51],
    [0.6, 0.9, 0.9, 0.7],
    [0.9, 0.9, 0.6, 0.8],
    [1]
];

// 把多选的每个选项变成单选, 后续再针对性处理
const multiple_choice2single_choice = () => {
    let qaqs_ = [];
    let weights_ = [];
    for(let i=0; i<qaqs.length; i++) {
        if(qaqs[i][0].includes("请选择")) {
            qaqs_ = [...qaqs_, ...qaqs[i][1].map( (a, j) => [`${qaqs[i][0]}-${qaqs[i][1].length}-${j+1}`, [1, 0]]) ];
            weights_ = [...weights_, ...weights[i].map(w => [w, 1-w])];
        } else {
            qaqs_ = [...qaqs_, qaqs[i]];
            weights_ = [...weights_, weights[i]];
        }
    }
    qaqs = qaqs_;
    weights = weights_;
}

multiple_choice2single_choice();

// 根据概率生成数据
const N = 3000;
const num_qaqs = qaqs.length;
// let total_data = new Array(N).fill(new Array(num_qaqs));
let total_data = Array.from({ length: N }, () => new Array(num_qaqs));

const generate_data = () => {
    for(let i=0; i<num_qaqs; i++) {
        for(let j=0; j<N; j++) {
            let r = weights[i].reduce((w1, w2) => w1+ w2) * Math.random();
            let w = 0;
            for(let k=0; k<weights[i].length; k++) {
                w += weights[i][k];
                if(r < w) {
                    total_data[j][i] = qaqs[i][1][k];
                    break;
                }
            }
        }    
    }
}

// 多选题, 如果四个选项都没选, 则设置为都选择; 若只选择一个, 则设置为选择另外三个.
const inv_choice = () => {
    for(let i=0; i<num_qaqs; i++) {
        if(qaqs[i][1] + '' === '1,0') {
            let num_choices = parseInt( qaqs[i][0].slice(-3, -2) );
            for(let j=0; j<N; j++) {
                let s = total_data[j].slice(i, i + num_choices).reduce((i, j) => i + j);
                if(s <= 1) {
                    for(k=0; k<num_choices; k++) {
                        total_data[j][i+k] = 1-total_data[j][i+k];
                    }
                }
            }
            i += num_choices - 1;
        }
    }
}

// 生成每个题目的答案的统计数据
let count_arr = new Array(num_qaqs);
const count_func = () => {
    for(let s=0; s<num_qaqs; s++) {
        let array = total_data.map(data => data[s]);
        let count = {};
    
        array.forEach(item => {
            if (count[item]) {
                count[item]++;
            } else {
                count[item] = 1;
            }
        });
    
        count_arr[s] = count;
        // console.log(s+1);
        // console.log(count);
        
    }
}

// 保存数据到txt文件(复制txt文件内容到excel即可生成)
function download(filename, text) {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

generate_data();
inv_choice();
count_func();
const str_data = total_data.map(data => data.reduce((i, j) => i + '    ' + j)).reduce((i, j) => i + '\n' + j);
download("data.txt", str_data);


function getRandomDate(start, end) {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const randomTime = new Date(startTime + Math.random() * (endTime - startTime));
    return randomTime;
}

function getRandomTimeInRange(date) {
    const startHour = 7;
    const startMinute = 30;
    const endHour = 22;
    const endMinute = 30;

    const start = new Date(date);
    start.setHours(startHour, startMinute, 0, 0);

    const end = new Date(date);
    end.setHours(endHour, endMinute, 0, 0);

    const randomTime = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

    return randomTime;
}

function getRandomDateTimeInRange() {
    const startDate = new Date(2024, 7, 20); // August is month 7 in JS
    const endDate = new Date(2024, 7, 31); // End of August

    const randomDate = getRandomDate(startDate, endDate);
    const randomDateTime = getRandomTimeInRange(randomDate);

    const year = randomDateTime.getFullYear();
    const month = randomDateTime.getMonth() + 1; // Months are 0-11
    const day = randomDateTime.getDate();
    const hours = String(randomDateTime.getHours()).padStart(2, '0');
    const minutes = String(randomDateTime.getMinutes()).padStart(2, '0');
    const seconds = String(randomDateTime.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

function sortDateTimes(dateTime1, dateTime2) {
    const date1 = new Date(dateTime1);
    const date2 = new Date(dateTime2);

    if (date1 < date2) {
        return -1;
    } else if (date1 > date2) {
        return 1;
    } else {
        return 0;
    }
}

dates = new Array(3000).fill(0).map(a => getRandomDateTimeInRange());
const sortedDateTimes = dates.sort(sortDateTimes);