const fs = require("node:fs")
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = {}

// contoh script pembuatan folder
 app.makeFolder = () => {
    rl.question("Masukan Nama Folder : ",(folderName) => {
        fs.mkdir(__dirname + `/${folderName}`,() => {
            console.log("success created new folder");
            
        })
        rl.close()
    })
} 

// Script membuat file
app.makeFile = () => {
    rl.question("Masukan Nama File (termasuk ekstensi): ", (fileName) => {
        rl.question("Masukan Konten File: ", (content) => {
            fs.writeFile(__dirname + `/${fileName}`, content, (err) => {
                if (err) throw err;
                console.log(`File ${fileName} berhasil dibuat!`);
                rl.close();
            });
        });
    });
};



module.exports = app