/**
 * Define actions to manage tip section
 */
(function () {
  "use strict";

  function tipPanel() {
    const defaultTips = [""];
    const _self = this;
    $(`${this.containerSelector} .canvas-holder .content`).append(`
    <div id="tip-container">${
      defaultTips[parseInt(Math.random() * defaultTips.length)]
    }</div>`);
    this.hideTip = function () {
      $(
        `${_self.containerSelector} .canvas-holder .content #tip-container`
      ).hide();
    };

    this.showTip = function () {
      $(
        `${_self.containerSelector} .canvas-holder .content #tip-container`
      ).show();
    };

    this.updateTip = function (str) {
      typeof str === "string" &&
        $(
          `${_self.containerSelector} .canvas-holder .content #tip-container`
        ).html(str);
    };
  }

  window.ImageEditor.prototype.initializeTipSection = tipPanel;
})();