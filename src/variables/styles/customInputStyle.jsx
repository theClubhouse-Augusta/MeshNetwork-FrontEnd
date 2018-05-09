// ##############################
// // // CustomInput styles
// #############################

import {
  // primaryColor,
  dangerColor,
  successColor,
  defaultFont
} from "../../variables/styles";

const customInputStyle = theme => ({
  disabled: {
    "&:before": {
      backgroundColor: "transparent !important"
    }
  },
  underline: {
    "&:before": {
      // backgroundColor: "#D2D2D2",
      backgroundColor: "#AAAAAA",
      height: "1px !important"
    }
  },
  labelRoot: {
    ...defaultFont,
    //color: "#AAAAAA",
    color: theme.typography.display1.color,
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "1.42857",
    boxSizing: "border-box",
    paddingLeft: "30",
  },
  labelRootError: {
    color: dangerColor
  },
  labelRootSuccess: {
    color: successColor
  },
  feedback: {
    position: "absolute",
    top: "18px",
    right: "0",
    zIndex: "2",
    display: "block",
    width: "24px",
    height: "24px",
    textAlign: "center",
    pointerEvents: "none"
  },
  marginTop: {
    marginTop: "16px"
  },
  formControl: {
    paddingBottom: "10px",
    margin: "27px 0 0 0",
    position: "relative",
    boxSizing: "border-box",
    paddingLeft: "30",
    paddingRight: "30",
  }
});

export default customInputStyle;
