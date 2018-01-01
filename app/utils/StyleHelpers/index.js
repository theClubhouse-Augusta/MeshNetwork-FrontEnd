export default class StyleHelpers {

  /**
   * Material ui style for reactSelect
   * @param {boolean} focused 
   * @param {array} selected 
   */
  getLabelClassName = (focused, selected) => {
    if (!focused  && !!!selected.length) {
      return "MyInputLabel-hide";
    } else if (selected.length) {
      return "MyInputLabel-animated-9 MyInputLabel-shrink-8 MyInputLabel-focused-122 MyInputLabel-formControl-62 MyInputLabel-root-112";
    } else {
      return "MyInputLabel-animated-9 MyInputLabel-shrink-8 MyInputLabel-focused-12 MyInputLabel-formControl-62 MyInputLabel-root-112";
    }
  }


  /**
   * Deterines if label should render and
   * its color
   * @param {boolean} focused 
   * @param {array} selected 
   */
  getLabelStyle = (focused:Boolean, selected:Array<object>) => {
    if (!!selected.length) {
      if (!focused) {
        return ['32px', 'rgba(0, 0, 0, 0.54)'];
      } else {
        return ['32px', '#304ffe'];
      }
    } else {
      return ['32px', '#304ffe'];
    }
  }


  /**
   * Material ui style for reactSelect
   * @param {boolean} focused 
   * @param {array} selected 
   */
  getSelectStyle = (focused, selected) => {
    if (!!selected.length) {
      if (!focused) {
        return "foobar2";
      } else {
        return "foobar3";
      }
    } else {
      return "foobar";
    }
  }
}