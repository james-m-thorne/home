import {
  makeStyles,
} from "@material-ui/core"

export const useStyles = makeStyles(() => ({
  header: {
    paddingRight: "50px",
    paddingLeft: "50px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
      paddingRight: 0,
    },
    position: 'inherit'
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "20px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "20px 30px",
  },
}))