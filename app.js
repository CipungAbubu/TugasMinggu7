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
app.extSorter = () => {
    const res = fs.readdirSync("unorganize_folder");
    
    for (let index = 0; index < res.length; index++) {
        const element = res[index];
        const ext = element.split(".")[element.split(".").length - 1];

        // Memindahkan file teks ke folder 'text'
        if (["txt", "pdf", "md"].includes(ext)) {
            fs.mkdir(__dirname + '/text', { recursive: true }, (err) => {
                if (err) {
                    console.error("Error creating text folder:", err);
                    return;
                }
                console.log("success created new folder");
                fs.rename(
                    __dirname + '/unorganize_folder/' + element,
                    __dirname + '/text/' + element,
                    (err) => {
                        if (err) {
                            console.error("Error moving file to text folder:", err);
                        }
                    }
                );
            });
        }

        // Memindahkan file PNG ke folder 'gambar'
        if (ext === "png", "jpg") {
            fs.mkdir(__dirname + '/gambar', { recursive: true }, (err) => {
                if (err) {
                    console.error("Error creating gambar folder:", err);
                    return;
                }
                console.log("success created gambar folder");
                fs.rename(
                    __dirname + '/unorganize_folder/' + element,
                    __dirname + '/gambar/' + element,
                    (err) => {
                        if (err) {
                            console.error("Error moving file to gambar folder:", err);
                        }
                    }
                );
            });
        }
    }
    return;
};

module.exports = app