/**
 * Define actions to manage tip section
 */
(function () {
  "use strict";

  function tipPanel() {
    const defaultTips = ["برای چرخاندن دقیق تر شکل ، Shift را نگه دارید."];
    const _self = this;

    document.querySelector(`${this.containerSelector} .canvas-holder .content`)
      .appendHTML(`
      <div id="tip-container">${
        defaultTips[parseInt(Math.random() * defaultTips.length)]
      }</div>`);

    this.hideTip = function () {
      document.querySelector(
        `${_self.containerSelector} .canvas-holder .content #tip-container`
      ).style.display = "none";
    };

    this.showTip = function () {
      document.querySelector(
        `${_self.containerSelector} .canvas-holder .content #tip-container`
      ).style.display = null;
    };

    this.updateTip = function (str) {
      typeof str === "string" &&
        (document.querySelector(
          `${_self.containerSelector} .canvas-holder .content #tip-container`
        ).innerHTML = str);
    };
  }

  window.ImageEditor.prototype.initializeTipSection = tipPanel;
})();
