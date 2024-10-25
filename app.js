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

        // Memindahkan file PNG JPG ke folder 'gambar'
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

// script membuat readFolder
app.readFolder = () => {
    rl.question("Masukan Nama Folder: ", (folderName) => {
        // Daftar file
        const res = fs.readdirSync(folderName);
        const output = [];

        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            try {
                const filePath = __dirname + `/${folderName}/${element}`;
                const stat = fs.statSync(filePath);

                // Konversi ukuran file menjadi KB atau MB
                let ukuranFile;
                if (stat.size < 1024) {
                    ukuranFile = stat.size + ' B';
                } else if (stat.size < 1048576) {
                    ukuranFile = (stat.size / 1024).toFixed(2) + ' KB';
                } else {
                    ukuranFile = (stat.size / 1048576).toFixed(2) + ' MB';
                }

                // Mapping jenis file berdasarkan ekstensi
                const extensi = element.split('.').pop();
                let jenisFile;
                if (['jpg', 'jpeg', 'png', 'gif'].includes(extensi)) {
                    jenisFile = 'gambar';
                } else if (['txt', 'md', 'pdf'].includes(extensi)) {
                    jenisFile = 'text';
                } else {
                    jenisFile = 'lainnya';
                }

                output.push({
                    namaFile: element,
                    extensi: extensi,
                    jenisFile: jenisFile,
                    tanggalDibuat: stat.birthtime.toISOString().split('T')[0], // Format tanggal jadi YYYY-MM-DD
                    ukuranFile: ukuranFile
                });
            } catch (error) {
                console.log("gagal baca file", folderName, element);
            }
        }
        console.log(`berhasil menampilkan isi dari folder ${folderName} :`);
        console.log(JSON.stringify(output, null, 4));
    });
};

// script membuat read file
app.readFile = () => {
    rl.question("Masukan Nama Folder: ", (folderName) => {
        rl.question("Masukan Nama File: ", (fileName) => {
            const filePath = `${__dirname}/${folderName}/${fileName}`;

            // Membaca isi file
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.log(`Gagal membaca file ${fileName}:`, err.message);
                    rl.close();
                    return;
                }
                console.log(`isi dari file ${fileName}:\n\n${data}\n`);
                rl.close();
            });
        });
    });
};


module.exports = app