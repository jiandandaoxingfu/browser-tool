function removeLineBreaks(text) {
  return text.replace(/[\r\n]+/g, ' ').replace('', '');
}

document.addEventListener('paste', function (event) {
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
