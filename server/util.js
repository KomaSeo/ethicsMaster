import fs from 'fs'
function extractStringFromDelimiter(targetString, leftDelimiter,rightDelimiter) {
    //TODO -> have edge case when there is no left or right delimiter. Regex based search is more stable.
  const targetSubString = [];
  let remainSubString = targetString;
  while(remainSubString.length != 0){
    [targetString, remainSubString] = findFirstDelimiterText(remainSubString, leftDelimiter, rightDelimiter);
    if(targetString != undefined){
      targetSubString.push(targetString)
    }
  }
  return targetSubString;
}
function findFirstDelimiterText(inputString, leftDelimiter, rightDelimiter) {
  let remainSubString = inputString
  let resultString
  handleLeftDelimiter();
  [resultString, remainSubString] = handleRightDelimiter();
  return [resultString, remainSubString];

  function handleLeftDelimiter() {
    const leftDelimiterIndex = remainSubString.indexOf(leftDelimiter);
    if (leftDelimiterIndex == -1) {
      remainSubString = "";
    }
    else {
      const targetStringStartIndex = leftDelimiterIndex + leftDelimiter.length
      remainSubString = remainSubString.substring(targetStringStartIndex);
    }
  }
  function handleRightDelimiter() {
    let targetString;
    const rightDelimiterIndex = remainSubString.indexOf(rightDelimiter);
    if (rightDelimiterIndex != -1) {
      const splitWithRightDelimiter = remainSubString.split(rightDelimiter);
      targetString = splitWithRightDelimiter[0];
      remainSubString = remainSubString.substring(rightDelimiterIndex + rightDelimiter.length);
    }
    else {
      remainSubString = "";
      targetString = undefined
    }
    return [targetString, remainSubString];
  }

}

function saveImageFromUrl(imageUrl, saveFileURL) {
  const imagefetchRequest = fetch(imageUrl);
  imagefetchRequest
    .then((fetchData) => {
      return fetchData.arrayBuffer();
    })
    .then((arrayBuffer) => {
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFile(saveFileURL, buffer,(err) => {
        console.log(err);
      });
    });
}

export {saveImageFromUrl, extractStringFromDelimiter}