/**
 * initialize canvas setting panel
 */
(function () {
  "use strict";
  var canvasSettings = function () {
    const _self = this;

    const mainPanel = document.querySelector(
      `${this.containerSelector} .main-panel`
    );
    mainPanel.appendHTML(
      `<div class="toolpanel" id="background-panel"><div class="content"><p class="title">تنظیمات</p></div></div>`
    );
    const contentSelector = `${this.containerSelector} #background-panel .content`;

    // set dimension section
    document.querySelector(contentSelector).appendHTML(`
      <div class="canvas-size-setting">
        <h4>اندازه بوم</h4>
        <div class="input-container">
          <label>عرض</label>
          <div class="custom-number-input">
          <button class="decrease">-</button>
          <input type="number" min="100" id="input-width" value="640"/>
          <button class="increase">+</button>
          </div>
        </div>
        <div class="input-container">
          <label>ارتفاع</label>
          <div class="custom-number-input">
          <button class="decrease">-</button>
          <input type="number" min="100" id="input-height" value="480"/>
          <button class="increase">+</button>
          </div>
        </div>
      </div>
      <hr>
      <div class="color-settings"></div>
    `);

    const setDimension = () => {
      try {
        let width = panelContent.querySelector("#input-width").value;
        let height = panelContent.querySelector("#input-height").value;
        _self.setDimension(width, height);
      } catch (_) {}
    };

    // background color
    createColorTabs({
      label: "رنگ پس زمینه",
      el: ".color-settings",
      container: ".toolpanel#background-panel .content",
      onColorFillChange: (color) => {
        _self.canvas.backgroundColor = color;
        _self.canvas.renderAll();
      },
      onGradientFillChange: (gradient) => {
        _self.canvas.setBackgroundColor(gradient);
        _self.canvas.renderAll();
      },
      gradientHeight: () => _self.canvas.height,
      gradientWidth: () => _self.canvas.width,
    });

    document
      .querySelector(`${contentSelector} #input-width`)
      .addEventListener("change", () => setDimension());

    document
      .querySelector(`${contentSelector} #input-height`)
      .addEventListener("change", () => setDimension());
  };

  window.ImageEditor.prototype.initializeCanvasSettingPanel = canvasSettings;
})();
