import "./App.css";
import { API_METHODS } from "./constants/api";
import { FIREBASE_CONFIG } from "./constants/firebase";
import { APIService } from "./services/api/api.service";

const api = new APIService();

function App() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export default App;
