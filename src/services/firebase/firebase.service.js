import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FIREBASE_CONFIG } from "../../constants/firebase";

export class FirebaseService {
  app = initializeApp(FIREBASE_CONFIG);
  analytics = getAnalytics(this.app);
}
