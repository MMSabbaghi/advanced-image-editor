function createColorTabs({
  el,
  container,
  onColorFillChange,
  onGradientFillChange,
  gradientWidth,
  gradientHeight,
}) {
  const containerEl = document.querySelector(container);
  const element = containerEl.querySelector(el);

  element.innerHTML += `
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
  `;

  const tabLabels = containerEl.querySelectorAll(".tab-label");
  const tabContents = containerEl.querySelectorAll(".tab-content");

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
        let color = containerEl.querySelector("#color-picker").value;
        try {
          onColorFillChange(color);
        } catch (_) {
          console.log("can't update background color");
        }
      } else {
        updateGradientFill();
      }
    })
  );

  // containerEl.querySelector(".tab-label[data-value=color-fill]").click();
  activeTabLabel("color-fill");
  activeTabContent("color-fill");

  $(`${container} ${el} #color-picker`).spectrum({
    flat: true,
    showPalette: false,
    showButtons: false,
    type: "color",
    showInput: "true",
    allowEmpty: "false",
    move: function (color) {
      let hex = "transparent";
      color && (hex = color.toRgbString()); // #ff0000
      onColorFillChange(hex);
    },
  });

  const gp = new Grapick({
    el: `${container} ${el} #gradient-picker`,
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
    const orientationEl = containerEl.querySelector(
      `.gradient-orientation-container`
    );
    let stops = gp.getHandlers();
    let orientation = orientationEl.querySelector("#select-orientation").value;

    let angle = parseInt(orientationEl.querySelector("#input-angle").value);

    let gradient = generateFabricGradientFromColorStops(
      stops,
      gradientWidth(),
      gradientHeight(),
      orientation,
      angle
    );
    onGradientFillChange(gradient);
  };

  // Do stuff on change of the gradient
  gp.on("change", (complete) => {
    updateGradientFill();
  });

  const orientationEl = document.querySelector(
    `${container} ${el} .gradient-orientation-container`
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
}
