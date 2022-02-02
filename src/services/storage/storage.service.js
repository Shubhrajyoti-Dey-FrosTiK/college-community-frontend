import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser, selectUser } from "../../redux/slices/User";
import {
  selectPost,
  createPost,
  cancelCreatePost,
} from "../../redux/slices/Post";
import { selectPage, changePage } from "../../redux/slices/Page";

export class StorageService {
  user = useSelector(selectUser);
  post = useSelector(selectPost);
  page = useSelector(selectPage);
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

  getCurrentPage = () => {
    return this.page.page;
  };

  changePage = (page) => {
    this.dispatch(changePage(page));
  };
}
