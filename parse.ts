import * as fs from "fs-extra";
const data = fs.readJson("/home/ashahbaz/Downloads/complaints-2020-01-21_09_31.json")
    .then(data => data.forEach((element, i) => {
        fs.outputFile(`test_docs/${element._source.product}/file${i}.txt`, element._source.complaint_what_happened);
}));

    for (let i = 0; i <413; i++) {
      fs.writeFile(
        "Single_Label_Classification.csv",
        `gs://ml_research_bucket/test_even_docs/file${i}.txt\n`,
        { flag: "a" }
      );
    }
