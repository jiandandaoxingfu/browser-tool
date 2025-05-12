const sharp = require('C:/Users/LENOVO/node_modules/sharp');

async function adjustBlueTone(inputPath, outputPath, blueIntensity = 1.2) {
  try {
    const { data, info } = await sharp(inputPath)
      .raw()
      .toBuffer({ resolveWithObject: true });

    const newData = Buffer.from(data);

    // 遍历像素数据，增强蓝色通道
    for (let i = 0; i < newData.length; i += info.channels) {
      newData[i + 2] = Math.min(255, newData[i + 2] * blueIntensity); // 只增强蓝色通道
    }

    await sharp(newData, {
      raw: {
        width: info.width,
        height: info.height,
        channels: info.channels,
      },
    })
      .toFormat('jpeg', { quality: 100 })
      .toFile(outputPath);

    console.log('蓝色色调调整完成');
  } catch (error) {
    console.error('处理图像时出错:', error);
  }
}

// 使用示例
adjustBlueTone('E:input.jpg', 'E:output_blue.jpg', 1.0);
