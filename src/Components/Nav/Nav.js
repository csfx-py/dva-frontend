import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AvatarImage from "../../Assets/avatar.png";
import { UserContext } from "../../Contexts/UserContext";

function Nav() {
  const navigate = useNavigate();

  const { userData, logout } = useContext(UserContext);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const settings = [
    {
      name: "Profile",
      handler: () => {
        setAnchorElUser(null);
        navigate("/profile");
      },
    },
    {
      name: "Logout",
      handler: () => {
        setAnchorElUser(null);
        logout();
      },
    },
  ];

  const clientPages = [
    {
      id: "client Home",
      name: "Home",
      handler: () => {
        setAnchorElNav(null);
        navigate("/client/dashboard");
      },
    },
  ];

  const adminPages = [
    {
      id: "admin Home",
      name: "Home",
      handler: () => {
        setAnchorElNav(null);
        navigate("/admin/dashboard");
      },
    },
    {
      id: "admin Departments",
      name: "Departments",
      handler: () => {
        setAnchorElNav(null);
        navigate("/admin/dept");
      },
    },
    {
      id: "admin Students",
      name: "Students",
      handler: () => {
        setAnchorElNav(null);
        navigate("/admin/students");
      },
    },
  ];

  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      component="nav"
      position="sticky"
      sx={{
        zIndex: 99,
        backgroundColor: "#ff0147",
        color: "#fff",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PES
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {userData?.accessLevel !== 2 &&
                clientPages.map((page) => (
                  <MenuItem key={page.name} onClick={page.handler}>
                    <Typography
                      textAlign="center"
                      sx={{
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
              {userData?.accessLevel === 2 &&
                adminPages.map((page) => (
                  <MenuItem key={page.name} onClick={page.handler}>
                    <Typography
                      textAlign="center"
                      sx={{
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PES
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              mr: 2,
            }}
          >
            {userData?.accessLevel !== 2 &&
              clientPages.map((page) => (
                <Button
                  key={page.name}
                  onClick={page.handler}
                  sx={{
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    textDecoration: "none",
                    my: 2,
                    color: "white",
                    display: "block",
                  }}
                >
                  {page.name}
                </Button>
              ))}
            {userData?.accessLevel === 2 &&
              adminPages.map((page) => (
                <Button
                  key={page.name}
                  onClick={page.handler}
                  sx={{
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    textDecoration: "none",
                    my: 2,
                    color: "white",
                    display: "block",
                  }}
                >
                  {page.name}
                </Button>
              ))}
          </Box>
          {userData && (
            <Box sx={{ ml: "auto" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={userData?.avatar || AvatarImage}
                  />
                </IconButton>
              </Tooltip>
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
                {settings.map((setting, index) => (
                  <MenuItem
                    key={index}
                    onClick={handleCloseUserMenu}
                    sx={setting.style}
                  >
                    <Typography variant="h6" onClick={setting.handler}>
                      {setting.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav;
