function removeLineBreaks(text) {
  return text.replace(/[\r\n]+/g, ' ').replace('', '');
}

(function() {
  let div = document.createElement('div');
  div.style = "position: absolute; top: 24px; left: 305px; width: 120px; height: 40px; z-index: 9999;";
  div.innerHTML = `
    <input type="checkbox" id="removeLineBreaks" name="removeLineBreaks" checked />
    <label for="removeLineBreaks">移除换行符</label>
  `
  document.body.appendChild(div);
})()

document.addEventListener('paste', function (event) {
  if (!document.getElementById('removeLineBreaks').checked) return;
  event.preventDefault();
  navigator.clipboard.readText().then(text => {
    const newText = removeLineBreaks(text);
    if (document.execCommand("insertText", false, newText)) {
        // 如果成功插入文本，什么都不做
    } else {
        // 兼容定义为输入框元素的情况
        const activeElement = document.activeElement;
        if (activeElement) {
            activeElement.value += newText; // 在文本末尾添加新文本
        }
    }
  });
});
