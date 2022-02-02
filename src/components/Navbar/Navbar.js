import React, { useEffect } from "react";
import headroom from "headroom.js";
import "./Navbar.css";
import CreatePost from "../CreatePost/CreatePost";

/*-----MUI-----*/
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

/*---Assets---*/
import BigLogo from "../../assets/img/logo-light.png";
import SmallLogo from "../../assets/img/logo-small-light.png";
import User from "../../assets/img/user.png";
import Add from "../../assets/img/add.png";
import Activity from "../../assets/img/activity.png";
import Notifications from "../../assets/img/notifications.png";
import Friends from "../../assets/img/friends.png";
import Like from "../../assets/img/like.png";

/*---Dependencies---*/
import { NavigatorService } from "../../services/navigator/navigator.service";
import { StorageService } from "../../services/storage/storage.service";
import { useSelector } from "react-redux";
import { selectPost } from "../../redux/slices/Post";

function Navbar() {
  const post = useSelector(selectPost);
  const ns = new NavigatorService();
  const storage = new StorageService();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const menuTheme = createTheme({
    palette: {
      action: {
        selected: "#E7A615",
        hover: "#66FCF1",
        disabled: "#9B9B9B",
      },
    },
  });
  const addTheme = createTheme({
    palette: {
      primary: {
        main: "#1f2833",
      },
    },
  });
  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  });

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    const topNav = document.getElementsByClassName("TopNav")[0];
    var h = new headroom(topNav);
    h.init();
  }, []);

  return (
    <React.Fragment>
      {post.open && <CreatePost />}
      <div className="Navbar">
        <div className="TopNav">
          <AppBar position="static" style={{ backgroundColor: "#1f2833" }}>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                >
                  <img src={BigLogo} alt="logo" style={{ width: "100px" }} />
                </Typography>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                >
                  <img src={SmallLogo} alt="logo" style={{ height: "40px" }} />
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <Paper
                    component="form"
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      height: "35px",
                      width: "50vw",
                      borderRadius: "15px",
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Search"
                      inputProps={{ "aria-label": "search google maps" }}
                    />
                    <IconButton
                      type="submit"
                      sx={{ p: "10px" }}
                      aria-label="search"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar style={{ backgroundColor: "white" }}>
                        <img alt="User" src={User} style={{ width: "25px" }} />
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <ThemeProvider theme={menuTheme}>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem key={"PROFILE"} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Profile</Typography>
                      </MenuItem>
                      <MenuItem key={"ACCOUNT"} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Account</Typography>
                      </MenuItem>
                      <MenuItem
                        key={"LOGOUT"}
                        onClick={() => {
                          storage.clearUserData();
                          ns.navigate("/");
                        }}
                      >
                        <Typography textAlign="center">Logout</Typography>
                      </MenuItem>
                    </Menu>
                  </ThemeProvider>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </div>
        <div className="BottomNav">
          <div>
            <AppBar
              position="fixed"
              color="primary"
              sx={{
                top: "auto",
                bottom: 0,
                // display: { xs: "flex", md: "none" },
                backgroundColor: "#1f2833",
                borderTopRightRadius: "30px",
                borderTopLeftRadius: "30px",
              }}
            >
              <ThemeProvider theme={addTheme}>
                <Toolbar
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={Friends}
                      alt="Friends"
                      style={{ height: "30px" }}
                    />
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <img src={Like} alt="like" style={{ height: "30px" }} />
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={Notifications}
                      alt="Notifications"
                      style={{ height: "30px", marginLeft: "90px" }}
                    />
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={Activity}
                      alt="Activity"
                      style={{ height: "30px" }}
                    />
                  </div>
                  <StyledFab color="primary" aria-label="add">
                    <img
                      src={Add}
                      alt="Add"
                      style={{ height: "80px" }}
                      onClick={() => {
                        storage.createPost();
                      }}
                    />
                  </StyledFab>
                </Toolbar>
              </ThemeProvider>
            </AppBar>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Navbar;
