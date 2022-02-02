import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser, selectUser } from "../../redux/slices/User";
import {
  selectPost,
  createPost,
  cancelCreatePost,
} from "../../redux/slices/Post";

export class StorageService {
  user = useSelector(selectUser);
  post = useSelector(selectPost);
  dispatch = useDispatch();

  storUserData = (userData) => {
    this.dispatch(updateUser(userData));
  };

  getUserData = () => {
    return this.user;
  };

  clearUserData = () => {
    this.dispatch(deleteUser());
  };

  createPost = () => {
    this.dispatch(createPost());
  };

  cancelCreatePost = () => {
    this.dispatch(cancelCreatePost());
  };
}
