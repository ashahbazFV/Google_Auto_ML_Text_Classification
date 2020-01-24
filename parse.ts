import * as fs from "fs-extra";

//Reads the JSON data file and stores it as an array
//Array is then writen to the file system, and seperated with folders
//by the label
const data = fs.readJson("filepath-for-json")
    .then(data => data.forEach((element, i) => {
        fs.outputFile(`filepath/label/file${i}.txt`, "what you want to write to the file");
}));

//Example: fs.outputFile(`file-path/${element._source.product}/file${i}.txt`, element._source.complaint_what_happened);