import fs from 'fs'
function delimeterSeperator(targetString, leftDelimiter,rightDelimiter) {
    //TODO -> have edge case when there is no left or right delimiter. Regex based search is more stable.
  const targetSubString = [];
  let remainSubString = targetString;
  while(length(remainSubString) != 0){
    const leftDelimeterIndex = remainSubString.indexOf(leftDelimiter);
    remainSubString = remainSubString.subString(leftDelimeterIndex + length(leftDelimiter));
    const targetString = remainSubString.split(rightDelimiter)[0];
    targetSubString.push(targetString);

    const rightDelimeterIndex = remainSubString.indexOf(rightDelimiter);
    remainSubString = remainSubString.subString(rightDelimeterIndex + length(rightDelimiter));
  }
  return targetSubString;
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

export {saveImageFromUrl, delimeterSeperator}