const bghttp = require("@nativescript/background-http");
const session = bghttp.session("image-upload");

const serverPath = "http://10.0.2.2:8080"

export class HttpService {
    static newProducto(productoDto) {
        let request = {
            url: serverPath + " api/",
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream"
            },
            description: "Subiendo archivos a "
        };

        let files = []
        productoDto.imagenes.forEach(element =>
            files.push({ name: "imagen", filename: element, mimeType: "image/jpeg" })
        );
        return task = session.multipartUpload(params, request);
    }
    static newProductoTestMulti(multiPartFiles) {
        return new Promise((resolve, reject) => {
            let task = null;
            let request = {
                url: serverPath + "/test/new/multi",
                method: "POST",
                headers: {
                    "Content-Type": "application/octet-stream"
                },
                description: "Subiendo archivos a "
            };
            task = session.multipartUpload(multiPartFiles, request);
            task.on("progress", (e) => {
                // console log data
                console.log(`uploading... ${e.currentBytes} / ${e.totalBytes}`);
            });

            task.on("error", (e) => {
                // console log data
                console.log(`Error processing upload ${e.responseCode} code.`);
                reject(`Error uploading image!`);
            });

            task.on("responded", (e) => {
                // console log data
                console.log(`received ${e.responseCode} code. Server sent: ${e.data}`);
                // var uploaded_response = JSON.parse(e.data);

                resolve(task);
            });

            task.on("complete", (e) => {
                // console log data
                console.log(`upload complete!`);
                console.log(`received ${e.responseCode} code`);
                // console.log(e.data);
            });

        });
    }
    static newProductoSingle(imagen) {

        const name = imagen.substr(imagen.lastIndexOf("/") + 1);
        return new Promise((resolve, reject) => {
            let task = null;
            let request = {
                url: serverPath + "/test/new/single",
                method: "POST",
                headers: {
                    "Content-Type": "application/octet-stream"
                },
                "File-Name": name,
                description: "Subiendo archivos a"
            };
            task = session.uploadFile(imagen, request);

            task.on("progress", (e) => {
                // console log data
                console.log(`uploading... ${e.currentBytes} / ${e.totalBytes}`);
            });

            task.on("error", (e) => {
                // console log data
                console.log(`Error processing upload ${e.responseCode} code.`);
                reject(`Error uploading image!`);
            });

            task.on("responded", (e) => {
                // console log data
                console.log(`received ${e.responseCode} code. Server sent: ${e.data}`);
                // var uploaded_response = JSON.parse(e.data);

                resolve(task);
            });

            task.on("complete", (e) => {
                // console log data
                console.log(`upload complete!`);
                console.log(`received ${e.responseCode} code`);
                // console.log(e.data);
            });

        });
    }
}