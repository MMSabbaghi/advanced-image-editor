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
    mainPanel.innerHTML += `<div class="toolpanel" id="background-panel"><div class="content"><p class="title">تنظیمات</p></div></div>`;
    const panelContent = mainPanel.querySelector("#background-panel .content");

    // set dimension section
    (() => {
      panelContent.innerHTML += `
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
    `;

      var setDimension = () => {
        try {
          let width = panelContent.querySelector("#input-width").value;
          let height = panelContent.querySelector("#input-height").value;
          _self.setDimension(width, height);
        } catch (_) {}
      };

      panelContent
        .querySelector("#input-width")
        .addEventListener("change", () => setDimension());

      panelContent
        .querySelector("#input-height")
        .addEventListener("change", () => setDimension());
    })();
    // end set dimension section

    // background color
    (() => {
      panelContent.innerHTML += `
      <div class="color-settings">
        <div class="tab-container">
          <div class="tabs">
            <div class="tab-label" data-value="color-fill">رنگ </div>
            <div class="tab-label" data-value="gradient-fill"> گرادینت </div>
          </div>
          <div class="tab-content" data-value="color-fill">
            <input id="color-picker" value='black'/><br>
          </div>
          <div class="tab-content" data-value="gradient-fill">
            <div id="gradient-picker"></div>

            <div class="gradient-orientation-container">
              <div class="input-container">
                <label>جهت</label>
                <select id="select-orientation">
                  <option value="linear">مستطیلی</option>
                  <option value="radial">گرد</option>
                </select>
              </div>
              <div id="angle-input-container" class="input-container">
                <label>زاویه</label>
                <div class="custom-number-input">
                  <button class="decrease">-</button>
                  <input type="number" min="0" max="360" value="0" id="input-angle">
                  <button class="increase">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

      const tabLabels = panelContent.querySelectorAll(".tab-label");
      const tabContents = panelContent.querySelectorAll(".tab-content");

      const activeTabLabel = (target) => {
        tabLabels.forEach((lbl) => {
          lbl.classList.remove("active");
          if (lbl.dataset["value"] === target) lbl.classList.add("active");
        });
      };

      const activeTabContent = (target) => {
        tabContents.forEach((content) => {
          if (content.dataset["value"] === target) content.style.display = null;
          else content.style.display = "none";
        });
      };

      tabLabels.forEach((lbl) =>
        lbl.addEventListener("click", function () {
          let target = lbl.dataset["value"];
          activeTabLabel(target);
          activeTabContent(target);

          if (target === "color-fill") {
            let color = mainPanel.querySelector("#color-picker").value;
            try {
              _self.canvas.backgroundColor = color;
              _self.canvas.renderAll();
            } catch (_) {
              console.log("can't update background color");
            }
          } else {
            updateGradientFill();
          }
        })
      );

      mainPanel.querySelector(".tab-label[data-value=color-fill]").click();

      $(
        `${this.containerSelector} .toolpanel#background-panel .content #color-picker`
      ).spectrum({
        flat: true,
        showPalette: false,
        showButtons: false,
        type: "color",
        showInput: "true",
        allowEmpty: "false",
        move: function (color) {
          let hex = "transparent";
          color && (hex = color.toRgbString()); // #ff0000
          _self.canvas.backgroundColor = hex;
          _self.canvas.renderAll();
        },
      });

      const gp = new Grapick({
        el: `${this.containerSelector} .toolpanel#background-panel .content #gradient-picker`,
        colorEl: '<input id="colorpicker"/>', // I'll use this for the custom color picker
      });

      gp.setColorPicker((handler) => {
        const el = handler.getEl().querySelector("#colorpicker");
        $(el).spectrum({
          showPalette: false,
          showButtons: false,
          type: "color",
          showInput: "true",
          allowEmpty: "false",
          color: handler.getColor(),
          showAlpha: true,
          change(color) {
            handler.setColor(color.toRgbString());
          },
          move(color) {
            handler.setColor(color.toRgbString(), 0);
          },
        });
      });

      gp.addHandler(0, "red");
      gp.addHandler(100, "blue");

      const updateGradientFill = () => {
        const orientationEl = document.querySelector(
          `${this.containerSelector} .toolpanel#background-panel .content .gradient-orientation-container`
        );
        let stops = gp.getHandlers();
        let orientation = orientationEl.querySelector(
          "#select-orientation"
        ).value;

        let angle = parseInt(orientationEl.querySelector("#input-angle").value);

        let gradient = generateFabricGradientFromColorStops(
          stops,
          _self.canvas.width,
          _self.canvas.height,
          orientation,
          angle
        );
        _self.canvas.setBackgroundColor(gradient);
        _self.canvas.renderAll();
      };

      // Do stuff on change of the gradient
      gp.on("change", (complete) => {
        updateGradientFill();
      });

      const orientationEl = document.querySelector(
        `${this.containerSelector} .toolpanel#background-panel .content .gradient-orientation-container`
      );

      orientationEl
        .querySelector("#select-orientation")
        .addEventListener("change", function ({ target }) {
          let type = target.value;
          const angleInputContainer = target
            .closest(".gradient-orientation-container")
            .querySelector("#angle-input-container");

          if (type === "radial") angleInputContainer.style.display = "none";
          else angleInputContainer.style.display = null;
          updateGradientFill();
        });

      orientationEl
        .querySelector("#input-angle")
        .addEventListener("change", () => updateGradientFill());
    })();
  };

  window.ImageEditor.prototype.initializeCanvasSettingPanel = canvasSettings;
})();
