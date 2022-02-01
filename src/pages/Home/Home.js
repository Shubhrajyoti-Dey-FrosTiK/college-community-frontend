import React from "react";
import { NavigatorService } from "../../services/navigator/navigator.service";
import { StorageService } from "../../services/storage/storage.service";

function Home() {
  const ns = new NavigatorService();
  const storage = new StorageService();
  return (
    <div>
      <h1>You are logged in !!</h1>
      <button onClick={() => {
        storage.clearUserData();
        ns.navigate("/");
      }}>Logout</button>
    </div>
  );
}

export default Home;
