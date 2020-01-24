import * as fs from "fs-extra";
const path = require('path');

const calcPrecision_Recall = () => {
    creditCard.precision = creditCard.truePos / (creditCard.truePos + creditCard.falsePos);
    creditRepo.precision = creditRepo.truePos / (creditRepo.truePos + creditRepo.falsePos);
    debtCol.precision = debtCol.truePos / (debtCol.truePos + debtCol.falsePos);
    mortgage.precision = mortgage.truePos / (mortgage.truePos + mortgage.falsePos);
  
    creditCard.recall = creditCard.truePos / (creditCard.truePos + creditCard.falseNeg);
    creditRepo.recall = creditRepo.truePos / (creditRepo.truePos + creditRepo.falseNeg );
    debtCol.recall = debtCol.truePos / (debtCol.truePos + debtCol.falseNeg);
    mortgage.recall = mortgage.truePos / (mortgage.truePos + mortgage.falseNeg);
  }
  
  const newFilePredict = (setDisplayName: string) => ({
    displayName: setDisplayName,
    truePos: 0,
    falsePos: 0,
    falseNeg: 0,
    recall: 0,
    precision: 0
  })
  
  const creditCard = newFilePredict("Credit card or prepaid card");
  const creditRepo = newFilePredict("Credit Reporting");
  const debtCol = newFilePredict("Debt Collection");
  const mortgage = newFilePredict("Mortgage");
 
  const valueArray = ["Credit card or prepaid card", "Credit Reporting", "Debt collection", "Mortgage"];
  const systemMap = new Map();
   for (let i=0; i < 4; i++) {
    const dir = path.join(process.cwd(), `test_docs/${valueArray[i]}`)
    fs.readdir(dir, function (err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }
      files.forEach(function (file) {
        systemMap.set(file, valueArray[i]);
      })
    })
  }
  const jsonData = fs.readJson(
    "/home/ashahbaz/test/Small_Even.json").then(
      jsonData => jsonData.forEach(element => {
        const fileName = element.textSnippet.contentUri.slice(39, 50);
        const maxScore = Math.max(element.annotations[0].classification.score, element.annotations[1].classification.score,
          element.annotations[2].classification.score, element.annotations[3].classification.score);
          if (maxScore >= 0.50) {
            let maxDisplayName = "";
            for (let i=0; i < 4; i++) {
              if (element.annotations[i].classification.score === maxScore) {
                maxDisplayName=element.annotations[i].displayName
              }
            }
            //Use a map with key value of fileName and value of displayName to lookup true path of a file and compare
            //it with the one below
            //if (maxDisplayName === displayNameFromMap) => maxDisplayName truePos++ else => maxDisplayName falsePos++ and displayNameFromMap falseNeg++
            if (maxDisplayName === systemMap.get(fileName)) {
              if (maxDisplayName === valueArray[0]) {
                creditCard.truePos++;
              } else if (maxDisplayName === valueArray[1]) {
                creditRepo.truePos++;
              } else if (maxDisplayName === valueArray[2]) {
                debtCol.truePos++;
              } else {
                mortgage.truePos++;
              }
            } else {
              if (maxDisplayName === valueArray[0]) {
                creditCard.falsePos++;
              } else if (maxDisplayName === valueArray[1]) {
                creditRepo.falsePos++;
              } else if (maxDisplayName === valueArray[2]) {
                debtCol.falsePos++;
              } else {
                mortgage.falsePos++;
              }
              if (systemMap.get(fileName) === valueArray[0]) {
                creditCard.falseNeg++;
              } else if (systemMap.get(fileName) === valueArray[1]) {
                creditRepo.falseNeg++;
              } else if (systemMap.get(fileName) === valueArray[2]) {
                debtCol.falseNeg++;
              } else {
                mortgage.falseNeg++;
              }
            }
          }
      })).then(jsonData => {
        calcPrecision_Recall()
        console.log(JSON.stringify(creditRepo))
        console.log(JSON.stringify(creditCard))
        console.log(JSON.stringify(debtCol))
        console.log(JSON.stringify(mortgage))
    });
  //NEED TO BATCH PREDICT ON EVEN DISTRIBUTED SET