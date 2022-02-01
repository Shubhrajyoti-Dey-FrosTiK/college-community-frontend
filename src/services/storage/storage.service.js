import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser, selectUser } from "../../redux/slices/User";

export class StorageService {
  user = useSelector(selectUser);
  dispatch = useDispatch();

  storUserData = (userData) => {
    this.dispatch(updateUser(userData));
    // localStorage.setItem("username", userData.username);
    // localStorage.setItem("token", userData.token);
    // localStorage.setItem("userid", userData.userid);
  };

  getUserData = () => {
    // return {
    //   username: localStorage.getItem("username"),
    //   token: localStorage.getItem("token"),
    //   userid: localStorage.getItem("userid"),
    // };
    return this.user;
  };

  clearUserData = () => {
    // localStorage.removeItem("username");
    // localStorage.removeItem("token");
    // localStorage.removeItem("userid");
    this.dispatch(deleteUser());
  };
}
