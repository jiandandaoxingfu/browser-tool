const fs = require('fs');
const path = require('path');

// 以下是路径配置
const diaryFolderPath = "F:/日记";
const outputHtmlFile = "F:/日记.html";

function readDiaryEntries(diaryFolderPath) {
  return fs.readdirSync(diaryFolderPath)
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      date: file.replace('.md', ''),
      content: fs.readFileSync(path.join(diaryFolderPath, file), 'utf8')
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

function buildContent(diaryEntries) {
  return diaryEntries.map(entry => {
    return `<div class="diary-entry">
      <h1>${entry.date}</h1>
      ${entry.content}
    </div>`;
  }).join('\n');
}

function generateDiaryHtml() {
  const diaryEntries = readDiaryEntries(diaryFolderPath);
  const completeHtml = buildContent(diaryEntries);

  const htmlOutput = `
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>日记 HTML</title>
  <style>
    .diary-entry {
      margin-bottom: 2rem;
      page-break-after: always;
    }
    img {
      display: inline-block;
      position: relative;
      left: 10%;
      right: 10%;
      width: 80%;
    }
  </style>
</head>
<body>
  ${completeHtml}
</body>
</html>
  `.replace(/\!\[\[(.*?)\]\]/g, '<img src="日记/附件/$1" />')
  fs.writeFileSync(outputHtmlFile, htmlOutput);
  console.log('日记 HTML 已生成!');
}

generateDiaryHtml();
