import { Box, makeStyles } from "@material-ui/core";
import { Button, Card, CardActions, CardContent, Container, List, ListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    [theme.breakpoints.up("sm")]: {
      width: 400,
      marginTop:"4rem"
    },
    border: "1px solid #ddd",
    borderRadius: 0,
    marginTop: theme.spacing(3),
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#fff",
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    color: "#333",
    marginBottom: theme.spacing(1),
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
  content: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  button: {
    textTransform: "none",
  },
}));

export function UserCard(props) {
  const classes = useStyles();
  const { name } = props;

  const firstName = name.split(" ")[0];
  const lastName = name.split(" ")[1];

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} component="h2" sx={{ color: "#28a745", fontSize: 22}}>
          Welcome
        </Typography>
        <Typography className={classes.title} component="h2" sx={{color: '#333', fontSize: 20}}>
          {firstName} {lastName}
        </Typography>
        <Typography className={classes.subtitle} component="p" sx={{color: '#666', fontSize: 16}}>
          Find a great job for you
        </Typography>
        <Typography className={classes.content} variant="body2" color="textSecondary" component="p" sx={{color: '#666', fontSize: 14}}>
          Create a professional CV with our easy-to-use tool.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className={classes.button}
          size="large"
          variant="contained"
          component={Link}
          to="cv/payment"
          sx={{ backgroundColor: "#017143" }}
        >
          Generate CV
        </Button>
      </CardActions>
      <CardActions>
        <Button
          className={classes.button}
          size="large"
          variant="contained"
          component={Link}
          to="update"
          sx={{ backgroundColor: "#017143"  , marginBottom: '2%'}}
        >
          UPDATE PROFILE
        </Button>
      </CardActions>
    </Card>
  );
}
