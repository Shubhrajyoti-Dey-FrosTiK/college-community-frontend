import React, { useState } from "react";
import { storage } from "../../firebase";
import { StorageService } from "../storage/storage.service";

export class FirebaseService {
  st = new StorageService();

  uploadToFirebaseStorage(files = []) {
    const user = this.st.getUserData();
    const date = Date.now();
    this.st.triggerPendingPost();
    let urls = [];
    if (files.length > 0) {
      files.map((file, index) => {
        const baseFilePath = `/img/${user.username}/${date}-${file.name}`;
        console.log(baseFilePath);
        const uploadTask = storage.ref(baseFilePath).put(file);
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
              .ref(baseFilePath)
              .getDownloadURL()
              .then((newUrl) => {
                urls.push(newUrl);
                this.st.pushImageUrl(newUrl);
                if (index === files.length - 1) {
                  console.log("Initializing post");
                  this.st.triggerPendingPost();
                }
                console.log(newUrl);
              });
          }
        );
      });
      return urls;
    }
  }
}
