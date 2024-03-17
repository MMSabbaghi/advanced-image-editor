/**
 * The Core of Image Editor
 */
(function () {
  "use strict";

  /**
   * Image Editor class
   * @param {String} containerSelector jquery selector for image editor container
   * @param {Array} buttons define toolbar buttons
   * @param {Array} shapes define shapes
   */
  var ImageEditor = function (containerSelector, buttons, shapes) {
    this.containerSelector = containerSelector;
    this.containerEl = $(containerSelector);

    this.buttons = buttons;
    this.shapes = shapes;

    this.containerEl.addClass("default-container");

    this.canvas = null;
    this.activeTool = null;
    this.activeSelection = null;

    /**
     * Get current state of canvas as object
     * @returns {Object}
     */
    this.getCanvasJSON = () => {
      return this.canvas.toJSON();
    };

    /**
     * Set canvas status by object
     * @param {Object} current the object of fabric canvas status
     */
    this.setCanvasJSON = (current) => {
      current &&
        this.canvas.loadFromJSON(
          JSON.parse(current),
          this.canvas.renderAll.bind(this.canvas)
        );
    };

    /**
     * Event handler to set active tool
     * @param {String} id tool id
     */
    this.setActiveTool = (id) => {
      this.activeTool = id;
      $(`${containerSelector} .toolpanel`).removeClass("visible closed");
      if (id !== "select" || (id == "select" && this.activeSelection)) {
        $(`${containerSelector} .toolpanel#${id}-panel`).addClass("visible");
        if (id === "select") {
          console.log("selection");
          $(`${containerSelector} .toolpanel#${id}-panel`).attr(
            "class",
            `toolpanel visible type-${this.activeSelection.type}`
          );
        }
      }

      if (id !== "select") {
        this.canvas.discardActiveObject();
        this.canvas.renderAll();
        this.activeSelection = null;
      }

      this.canvas.isDrawingLineMode = false;
      this.canvas.isDrawingPathMode = false;
      this.canvas.isDrawingMode = false;
      this.canvas.isDrawingTextMode = false;

      this.canvas.defaultCursor = "default";
      this.canvas.selection = true;
      this.canvas.forEachObject((o) => {
        o.selectable = true;
        o.evented = true;
      });

      switch (id) {
        case "draw":
          this.canvas.isDrawingMode = true;
          break;
        case "line":
          this.canvas.isDrawingLineMode = true;
          this.canvas.defaultCursor = "crosshair";
          this.canvas.selection = false;
          this.canvas.forEachObject((o) => {
            o.selectable = false;
            o.evented = false;
          });
          break;
        case "path":
          this.canvas.isDrawingPathMode = true;
          this.canvas.defaultCursor = "crosshair";
          this.canvas.selection = false;
          this.canvas.forEachObject((o) => {
            o.selectable = false;
            o.evented = false;
          });
          this.updateTip(
            "Tip: click to place points, press and pull for curves! Click outside or press Esc to cancel!"
          );
          break;
        case "textbox":
          this.canvas.isDrawingTextMode = true;
          this.canvas.defaultCursor = "crosshair";
          this.canvas.selection = false;
          this.canvas.forEachObject((o) => {
            o.selectable = false;
            o.evented = false;
          });
          break;
        case "upload":
          this.openDragDropPanel();
          break;
        default:
          this.updateTip(
            "Tip: hold Shift when drawing a line for 15° angle jumps!"
          );
          break;
      }
    };

    /**
     * Event handler when perform undo
     */
    this.undo = () => {
      console.log("undo");
      try {
        let undoList = this.history.getValues().undo;
        if (undoList.length) {
          let current = undoList[undoList.length - 1];
          this.history.undo();
          current &&
            this.canvas.loadFromJSON(
              JSON.parse(current),
              this.canvas.renderAll.bind(this.canvas)
            );
        }
      } catch (_) {
        console.error("undo failed");
      }
    };

    /**
     * Event handler when perform redo
     */
    this.redo = () => {
      console.log("redo");
      try {
        let redoList = this.history.getValues().redo;
        if (redoList.length) {
          let current = redoList[redoList.length - 1];
          this.history.redo();
          current &&
            this.canvas.loadFromJSON(
              JSON.parse(current),
              this.canvas.renderAll.bind(this.canvas)
            );
        }
      } catch (_) {
        console.error("redo failed");
      }
    };

    /**
     * Event handler when select objects on fabric canvas
     * @param {Object} activeSelection fabric js object
     */
    this.setActiveSelection = (activeSelection) => {
      this.activeSelection = activeSelection;
      this.setActiveTool("select");
    };

    /**
     * Initialize undo/redo stack
     */
    this.configUndoRedoStack = () => {
      this.history = window.UndoRedoStack();
      const ctrZY = (e) => {
        const key = e.which || e.keyCode;

        if (
          e.ctrlKey &&
          document.querySelectorAll("textarea:focus, input:focus").length === 0
        ) {
          if (key === 90) this.undo();
          if (key === 89) this.redo();
        }
      };
      document.addEventListener("keydown", ctrZY);
    };

    /**
     * Initialize zoom events
     */
    this.initializeZoomEvents = () => {
      this.applyZoom = (zoom) => {
        this.canvas.setZoom(zoom);
        this.canvas.setWidth(this.canvas.originalW * this.canvas.getZoom());
        this.canvas.setHeight(this.canvas.originalH * this.canvas.getZoom());
      };

      // zoom out/in/reset (ctr + -/+/0)
      const keyZoom = (e) => zoomWithKeys(e, this.canvas, this.applyZoom);
      document.addEventListener("keydown", keyZoom);

      // zoom out/in with mouse
      const mouseZoom = (e) => zoomWithMouse(e, this.canvas, this.applyZoom);
      document.addEventListener("wheel", mouseZoom, {
        passive: false,
      });
    };

    /**
     * Initialize image editor
     */
    this.init = () => {
      this.configUndoRedoStack();

      this.initializeToolbar();
      this.initializeMainPanel();

      this.initializeShapes();

      this.initializeFreeDrawSettings();
      this.initializeCanvasSettingPanel();
      this.initializeSelectionSettings();

      this.canvas = this.initializeCanvas();

      this.initializeLineDrawing(this.canvas);
      this.initializePathDrawing(this.canvas);
      this.initializeTextBoxDrawing(this.canvas);
      this.initializeUpload(this.canvas);
      this.initializeThemeSwitch();
      this.initializeCopyPaste(this.canvas);
      this.initializeTipSection();

      this.initializeZoomEvents();
      this.initializeAligningGuidelines(this.canvas);
      this.initializeCenteringGuidelines(this.canvas);

      this.extendHideShowToolPanel();
      this.extendNumberInput();
    };

    /**
     * Initialize main panel
     */
    this.initializeMainPanel = () => {
      $(`${containerSelector}`).append('<div class="main-panel"></div>');
    };

    /**
     * Add features to hide/show tool panel
     */
    this.extendHideShowToolPanel = () => {
      $(`${this.containerSelector} .toolpanel`).each(function () {
        $(this).append(`    
        <div class="hide-show-handler">
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
          y="0px" viewBox="0 0 292.359 292.359" style="enable-background: new 0 0 292.359 292.359" xml:space="preserve"
        >
          <g><path
              d="M222.979,133.331L95.073,5.424C91.456,1.807,87.178,0,82.226,0c-4.952,0-9.233,1.807-12.85,5.424
              c-3.617,3.617-5.424,7.898-5.424,12.847v255.813c0,4.948,1.807,9.232,5.424,12.847c3.621,3.617,7.902,5.428,12.85,5.428
              c4.949,0,9.23-1.811,12.847-5.428l127.906-127.907c3.614-3.613,5.428-7.897,5.428-12.847
              C228.407,141.229,226.594,136.948,222.979,133.331z"
            /></g>
        </svg>
      </div>
      `);
      });

      $(`${this.containerSelector} .toolpanel .hide-show-handler`).click(
        function () {
          let panel = $(this).closest(".toolpanel");
          panel.toggleClass("closed");
        }
      );
    };

    /**
     * Extend custom number input with increase/decrease button
     */
    this.extendNumberInput = () => {
      const types = ["decrease", "increase"];

      types.forEach((type) =>
        document
          .querySelectorAll(`${containerSelector} .${type}`)
          .forEach((btn) =>
            btn.addEventListener("click", function (e) {
              let input = btn
                .closest(".custom-number-input")
                .querySelector("input[type=number]");
              let step = input.step;
              if (!step) step = 1;
              else step = parseFloat(step);
              let val = parseFloat(input.value);
              let newValue = type === "increase" ? val + step : val - step;
              input.value = newValue.toFixed(step.countDecimals());
              input.dispatchEvent(new Event("change"));
            })
          )
      );
    };

    this.init();
  };

  window.ImageEditor = ImageEditor;
})();
