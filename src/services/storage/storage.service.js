import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser, selectUser } from "../../redux/slices/User";
import {
  selectPost,
  createPost,
  cancelCreatePost,
  triggerPendingPost,
  initializePendingPost,
  pushImageUrl,
  clearImageUrl,
  clearPendingPost,
} from "../../redux/slices/Post";
import { selectPage, changePage } from "../../redux/slices/Page";

export class StorageService {
  user = useSelector(selectUser);
  post = useSelector(selectPost);
  page = useSelector(selectPage);
  dispatch = useDispatch();

  /*-----User-----*/
  storUserData = (userData) => {
    this.dispatch(updateUser(userData));
  };

  getUserData = () => {
    console.log(this.user);
    return this.user;
  };

  clearUserData = () => {
    this.dispatch(deleteUser());
  };

  /*-----Post-----*/
  createPost = () => {
    this.dispatch(createPost());
  };

  cancelCreatePost = () => {
    this.dispatch(cancelCreatePost());
  };

  triggerPendingPost = () => {
    this.dispatch(triggerPendingPost());
  };

  initializePendingPost = () => {
    this.dispatch(initializePendingPost());
  };

  pushImageUrl = (imageUrl = "") => {
    this.dispatch(pushImageUrl(imageUrl));
  };

  clearPendingTasks = () => {
    this.dispatch(clearImageUrl());
    this.dispatch(clearPendingPost());
  };

  getPostData = () => {
    return this.post;
  };

  /*-----Page-----*/
  changePage = (page) => {
    this.dispatch(changePage(page));
  };

  getCurrentPage = () => {
    return this.page.page;
  };
}
