import React from "react";
import { NavigatorService } from "../../services/navigator/navigator.service";
import { StorageService } from "../../services/storage/storage.service";

function Home() {
  const ns = new NavigatorService();
  const storage = new StorageService();
  return <div></div>;
}

export default Home;
