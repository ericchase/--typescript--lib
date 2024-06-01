// ==UserScript==
// @name        Text Color: Gray to Black
// @author      ericchase
// @description 10/1/2021
// ==/UserScript==

(function () {
  const RGB_BLACK = 'rgb(30, 30, 30)';
  const HEX_BLACK = '#1E1E1E';

  function isDigit(ch) {
    return ch >= '0' && ch <= '9';
  }

  function extractHEXStrings(str) {
    let arr = [];
    if (str.length === 3) {
      arr = [str[0] + str[0], str[1] + str[1], str[2] + str[2]];
    }
    if (str.length === 6) {
      arr = [str[0] + str[1], str[2] + str[3], str[4] + str[5]];
    }
    if (arr.length === 0) {
      throw new Error(`extractHEXStrings("${str}"): Argument is not a proper hex string!`);
    }
    return arr;
  }

  function extractRGBStrings(str) {
    // ie. "rgb(1, 23, 456)" => ["1", "23", "456"]
    let arr = Array.from(str)
      .filter((ch) => isDigit(ch) || ch === ',' || ch === '-')
      .join('')
      .split(',');
    if (arr.length < 3) {
      throw new Error(`extractRGBStrings("${str}"): Argument is not a proper rgb string!`);
    }
    return arr;
  }

  function extractRGB(str) {
    let arr = [];
    let hex = false;
    if (str[0] === '#') {
      arr = extractHEXStrings(str.substring(1, 7)).map((s) => Number.parseInt(s, 16));
      hex = true;
    } else if (str.substring(0, 3) === 'rgb') {
      arr = extractRGBStrings(str)
        .map((s) => Number.parseInt(s))
        .slice(0, 3);
    }
    if (arr.some((ele) => Number.isNaN(ele) || ele < 0 || ele > 255)) {
      throw new Error(`extractRGB("${str}"): Argument is not a proper color string!`);
    }
    return { rgb: arr, hex: hex };
  }

  function withinRangeArray(arr, maxDeviation) {
    return maxDeviation >= Math.max(...arr) - Math.min(...arr);
  }

  function changeColorGrayToBlack(colorString) {
    try {
      const { rgb, hex } = extractRGB(colorString);
      // only rgb values below 200 will be considered gray
      if (rgb.every((val) => val < 200)) {
        // rgb values need to be in close proximity of eachother
        if (withinRangeArray(rgb, 33)) {
          return hex ? HEX_BLACK : RGB_BLACK;
        }
      }
    } catch (err) {
      console.log(err.toString());
    }
    return null;
  }

  // Get all elements that have a style attribute
  const elementList = document.querySelectorAll('*');
  // Loop through them
  Array.prototype.forEach.call(elementList, (ele) => {
    ele.style.setProperty('color', changeColorGrayToBlack(window.getComputedStyle(ele)['color']), 'important');
  });
})();
