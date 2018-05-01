// ##############################
// // // RegularCard styles
// #############################

import {
  card,
  meshCard,
  cardHeader,
  defaultFont,
  customFont,
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  meshRedCardHeader,
  blueCardHeader,
  purpleCardHeader
} from "../../variables/styles";

const regularCardStyle = {
  root: {
    overflow: 'visible'
  },
  card,
  meshCard,
  cardPlain: {
    background: "transparent",
    boxShadow: "none"
  },
  bbb: {
    background: '#4dfff3',
  },
  cardHeader: {
    ...cardHeader,
    ...defaultFont
  },
  cardPlainHeader: {
    marginLeft: 0,
    marginRight: 0
  },
  orangeCardHeader,
  greenCardHeader,
  redCardHeader,
  meshRedCardHeader,
  blueCardHeader,
  purpleCardHeader,
  cardTitle: {
    color: "#FFFFFF",
    marginTop: "0",
    marginBottom: "5px",
    ...defaultFont,
    fontSize: "1.125em"
  },
  cardTitleStyle: {
    color: "#FFFFFF",
    marginTop: "0",
    marginBottom: "5px",
    ...customFont,
    fontSize: "2.5em",
    textAlign: "center",
  },
  cardSubtitle: {
    ...defaultFont,
    marginBottom: "0",
    color: "rgba(255, 255, 255, 0.62)",
    margin: "0 0 10px"
  },
  cardSubtitleStyle: {
    ...defaultFont,
    marginBottom: "0",
    color: "rgba(255, 255, 255, 0.75)",
    margin: "0 0 10px",
    textAlign: "center",
  },
  cardActions: {
    padding: "14px",
    display: "block",
    height: "auto"
  }
};

export default regularCardStyle;
