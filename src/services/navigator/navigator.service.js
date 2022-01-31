import { useNavigate } from "react-router-dom";

export class NavigatorService {
  navigate = useNavigate();

  print = (url) => console.log(`Attempting to navigate to ${url}`);

  register = (param = "") => {
    const url = "/register" + param;
    this.print(url);
    this.navigate(url);
  };
  login = (param = "") => {
    const url = "/login" + param;
    this.print(url);
    this.navigate(url);
  };
  home = (param = "") => {
    const url = "/" + param;
    this.print(url);
    this.navigate(url);
  };
  profile = (param) => {
    const url = "/profile" + param;
    this.print(url);
    this.navigate(url);
  };
  back = () => {
    this.navigate(-1);
  };
}
