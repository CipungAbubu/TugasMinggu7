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
    rl.question("Masukan Nama Folder: ", (folder) => {
        rl.question("Masukan Nama File: ", (file) => {
            rl.question("Masukan extension (misal: txt, js, etc): ", (ext) => {
                // Menggabungkan path dengan benar
                const filePath = `${__dirname}/${folder}/${file}.${ext}`;

                // Buat folder jika belum ada
                fs.mkdir(`${__dirname}/${folder}`, { recursive: true }, (err) => {
                    if (err) throw err;

                    // Buat file kosong
                    fs.writeFile(filePath, '', (err) => {
                        if (err) throw err;
                        console.log(`File berhasil dibuat: ${filePath}`);
                        rl.close();
                    });
                });
            });
        });
    });
};

// script membuat extSorter
app.extSorter = (res) => {
    for (let index = 0; index < res.length; index++) {
        const element = res[index];
        const ext = element.split(".")[element.split(".").length - 1];

        if (["txt", "pdf", "md"].includes(ext)) {
            fs.mkdir(__dirname + '/text', () => {
                console.log("success created new folder");
                fs.rename(
                    __dirname + '/unorganize_folder/' + element,
                    __dirname + '/text/' + element,
                    (err) => {
                        if (err) throw err; 
                        console.log(`File ${element} berhasil dipindahkan ke folder 'text'`);
                    }
                );
            });
        }

    }
};
module.exports = app