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
  post = (param = "") => {
    const url = "/posts" + param;
    this.print(url);
    this.navigate(url);
  };
  likes = (param = "") => {
    const url = "/likes" + param;
    this.print(url);
    this.navigate(url);
  };
  activity = (param = "") => {
    const url = "/activity" + param;
    this.print(url);
    this.navigate(url);
  };
  notifications = (param = "") => {
    const url = "/notifications" + param;
    this.print(url);
    this.navigate(url);
  };
  back = () => {
    this.navigate(-1);
  };
}
