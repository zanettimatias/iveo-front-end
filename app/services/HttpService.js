const bghttp = require("@nativescript/background-http");
const session = bghttp.session("image-upload");
import { Http } from "@nativescript/core";
import authHeader from "@/utils/AuthHeader";

const serverPath = "http://192.168.0.53:8080";

export class HttpService {
  static match(multiPartFiles, user) {
    return new Promise((resolve, reject) => {
      let task = null;
      let request = {
        url: serverPath + "/producto/match",
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          Authorization: authHeader(user)
        },
        description: "Subiendo archivos a "
      };
      task = session.multipartUpload(multiPartFiles, request);
      task.on("progress", e => {
        // console log data
        //console.log(`uploading... ${e.currentBytes} / ${e.totalBytes}`);
      });

      task.on("error", e => {
        // console log data
        console.log(`Error processing upload ${e.responseCode} code.`);
        reject(`Error uploading image!`);
      });

      task.on("responded", e => {
        // console log data
        //console.log(`received ${e.responseCode} code. Server sent: ${e.data}`);
        // var uploaded_response = JSON.parse(e.data);
        resolve(e);
      });

      task.on("complete", e => {
        // console log data
        console.log(`upload complete!`);
        console.log(`received ${e.responseCode} code`);
      });
    });
  }
  static newProductoTestMulti(multiPartFiles, user) {
    return new Promise((resolve, reject) => {
      let task = null;
      let request = {
        url: serverPath + "/producto/new",
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
          Authorization: authHeader(user)
        },
        description: "Subiendo archivos a "
      };
      task = session.multipartUpload(multiPartFiles, request);
      task.on("progress", e => {
        // console log data
        console.log(`uploading... ${e.currentBytes} / ${e.totalBytes}`);
      });

      task.on("error", e => {
        // console log data
        console.log(`Error processing upload ${e.responseCode} code.`);
        reject(e.responseCode);
      });

      task.on("responded", e => {
        // console log data
        console.log(`received ${e.responseCode} code. Server sent: ${e}`);
        // var uploaded_response = JSON.parse(e.data);
        resolve(e);
      });

      task.on("complete", e => {
        // console log data
        console.log(`upload complete!`);
        console.log(`received ${e.responseCode} code`);
        // console.log(e.data);
        // resolve(task);
      });
    });
  }
  static login(username, password) {
    return Http.request({
      url: serverPath + "/login",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({
        username: username,
        password: password
      })
    });
  }
  static signUp(username, password, email) {
    return Http.request({
      url: serverPath + "/signup",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({
        username: username,
        password: password,
        email: email
      })
    });
  }
}
