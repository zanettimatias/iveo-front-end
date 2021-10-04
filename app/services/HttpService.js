const bghttp = require("@nativescript/background-http");
const session = bghttp.session("image-upload");

const serverPath = "http://10.0.2.2:8080"

export class HttpService {
    static match(multiPartFiles) {
        return new Promise((resolve, reject) => {
            let task = null;
            let request = {
                url: serverPath + "/producto/match",
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
    static newProductoTestMulti(multiPartFiles) {
        return new Promise((resolve, reject) => {
            let task = null;
            let request = {
                url: serverPath + "/producto/new",
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
}