import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Container,
  withWidth,
  Button,
  Divider,
} from "@material-ui/core";
//import EmojiIcon from '../../components/EmojiIcon/EmojiIcon';

import TopSectionLogic from "./TopSectionLogic";
import BlobScene from "../../components/BlobScene/BlobScene";
import SearchBar from "../../components/pageParts/SearchBar/SearchBar";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "10vh",
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  topline: {
    fontWeight: "bold",
    minWidth: "300px",
    maxWidth: "50vw",
  },
  form: {
    width: "100%",
  },
  ctaContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing(3),
    marginTop: theme.spacing(6),
    [theme.breakpoints.up("sm")]: { marginTop: theme.spacing(8) },
  },
  separator: {
    width: "60%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));

function TopSection(props) {
  const classes = useStyles();

  const { typoVariant } = TopSectionLogic(props);

  return (
    <BlobScene>
      <Container maxWidth="sm" className={classes.root}>
        <Typography
          variant={typoVariant}
          component={"h1"}
          align="center"
          className={classes.topline}
        >
          La plateforme pour trouver tes livres pas chers.
        </Typography>
        <Box
          className={classes.ctaContainer}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="/sell"
            fullWidth
          >
            Mettre un livre en vente
          </Button>
          <Box fullWidth className={classes.separator}>
            <Divider width="35%" />
            <Typography style={{ opacity: 0.7 }}>ou</Typography>
            <Divider width="35%" />
          </Box>

          <SearchBar
            history={props.history}
            className={classes.form}
            variant="outlined"
          />
        </Box>
      </Container>
    </BlobScene>
  );
}

export default withWidth()(TopSection);
