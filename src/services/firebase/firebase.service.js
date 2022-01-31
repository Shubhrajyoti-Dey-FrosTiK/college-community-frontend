import React, { useState } from "react";
import { storage } from "../../firebase";

export class FirebaseService {
  uploadToFirebaseStorage(files = []) {
    let urls = [];
    if (files.length > 0) {
      files.map((file) => {
        const uploadTask = storage.ref(`/img/${file.name}`).put(file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("img")
              .child(file.name)
              .getDownloadURL()
              .then((newUrl) => {
                urls.push(newUrl);
                console.log(newUrl);
              });
          }
        );
      });
      return urls;
    }
  }
}
