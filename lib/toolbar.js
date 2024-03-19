/**
 * Initialize toolbar
 */
(function () {
  "use strict";
  var defaultButtons = [
    {
      name: "select",
      title: "Select/move object (V)",
      icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" class="bi bi-cursor" viewBox="0 0 16 16">
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52z"/>
      </svg>
      `,
    },
    {
      name: "shapes",
      title: "Shapes",
      icon: `<svg id="Capa_1" x="0px" y="0px" viewBox="0 0 490.927 490.927" xml:space="preserve"><path d="M336.738,178.502c-12.645,0-24.852,1.693-36.627,4.582L202.57,11.786c-5.869-10.321-22.84-10.321-28.709,0L2.163,313.311 c-2.906,5.105-2.889,11.385,0.078,16.466c2.953,5.088,8.389,8.216,14.275,8.216l166.314,0.009 c2.818,82.551,70.688,148.88,153.906,148.88c85.012,0,154.19-69.167,154.19-154.186S421.749,178.502,336.738,178.502z  M44.917,304.964l143.299-251.63L331.515,304.97L44.917,304.964z"></path></svg>`,
    },
    {
      name: "draw",
      title: "Free draw",
      icon: `<svg height="512pt" viewBox="0 -3 512 512" width="512pt"><g id="surface1"><path d="M 497.171875 86.429688 C 506.734375 76.867188 512 64.152344 512 50.628906 C 512 37.105469 506.734375 24.390625 497.171875 14.828125 C 487.609375 5.265625 474.894531 0 461.371094 0 C 447.847656 0 435.132812 5.265625 425.570312 14.828125 L 198.296875 242.105469 L 269.894531 313.703125 Z M 497.171875 86.429688 " style="stroke: none; fill-rule: nonzero; fill: rgb(0, 0, 0); fill-opacity: 1;"></path><path d="M 65.839844 506.65625 C 92.171875 507.21875 130.371094 496.695312 162.925781 459.074219 C 164.984375 456.691406 166.894531 454.285156 168.664062 451.855469 C 179.460938 435.875 184.695312 418.210938 183.855469 400.152344 C 182.945312 380.5625 174.992188 362.324219 161.460938 348.796875 C 150.28125 337.613281 134.722656 331.457031 117.648438 331.457031 C 95.800781 331.457031 73.429688 341.296875 56.277344 358.449219 C 31.574219 383.152344 31.789062 404.234375 31.976562 422.839844 C 32.15625 440.921875 32.316406 456.539062 11.101562 480.644531 L 0 493.257812 C 0 493.257812 26.828125 505.820312 65.839844 506.65625 Z M 65.839844 506.65625 " style="stroke: none; fill-rule: nonzero; fill: rgb(0, 0, 0); fill-opacity: 1;"></path><path d="M 209.980469 373.621094 L 248.496094 335.101562 L 176.894531 263.503906 L 137.238281 303.160156 C 154.691406 306.710938 170.464844 315 182.859375 327.394531 C 195.746094 340.285156 205.003906 356.1875 209.980469 373.621094 Z M 209.980469 373.621094 " style="stroke: none; fill-rule: nonzero; fill: rgb(0, 0, 0); fill-opacity: 1;"></path></g></svg>`,
    },
    {
      name: "line",
      title: "Line",
      icon: `<svg id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><path d="M349.091,0v124.516L124.516,349.091H0V512h162.909V387.484l224.574-224.574H512V0H349.091z M54.303,457.696v-54.303 h54.303v54.303H54.303z M457.696,108.605h-54.303V54.303h54.303V108.605z"></path></svg>`,
    },
    {
      name: "path",
      title: "Connectable lines & curves",
      icon: '<svg id="svg8" viewBox="28 55 140 140"><path d="m 28.386086,150.01543 v 43.10301 H 71.489092 V 178.7505 H 120.75466 V 164.38283 H 71.355237 L 71.488872,150.0086 H 57.121421 c 0,-49.247 14.367449,-63.614929 63.633239,-63.614929 v -14.36768 c -63.633239,0 -78.000906,28.735609 -78.000906,77.982609 l -14.367888,0.007 z m 14.367669,28.73507 v -14.36767 h 14.367668 v 14.36767 z" id="path840" style="stroke-width: 0.264583;"></path><path d="m 120.74975,150.00843 v 43.10301 h 43.10301 V 150.0016 l -43.10301,0.007 z m 14.36767,28.73507 v -14.36767 h 14.36767 v 14.36767 z" id="path840-1" style="stroke-width: 0.264583;"></path><path d="m 120.74975,57.658601 v 43.103009 h 43.10301 V 57.651771 l -43.10301,0.007 z m 14.36767,28.73507 v -14.36767 h 14.36767 v 14.36767 z" id="path840-1-0" style="stroke-width: 0.264583;"></path></svg>',
    },
    {
      name: "textbox",
      title: "Text box",
      icon: `<svg id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M497,90c8.291,0,15-6.709,15-15V15c0-8.291-6.709-15-15-15h-60c-8.291,0-15,6.709-15,15v15H90V15c0-8.401-6.599-15-15-15 H15C6.599,0,0,6.599,0,15v60c0,8.399,6.599,15,15,15h15v332H15c-8.291,0-15,6.709-15,15v60c0,8.291,6.709,15,15,15h60 c8.291,0,15-6.709,15-15v-15h332v15c0,8.399,6.599,15,15,15h60c8.401,0,15-6.601,15-15v-60c0-8.401-6.599-15-15-15h-15V90H497z  M452,422h-15c-8.401,0-15,6.599-15,15v15H90v-15c0-8.291-6.709-15-15-15H60V90h15c8.401,0,15-6.601,15-15V60h332v15 c0,8.291,6.709,15,15,15h15V422z"></path></g></g><g><g><path d="M361,105H151c-8.291,0-15,6.709-15,15v60c0,6.064,3.647,11.543,9.258,13.857c5.625,2.329,12.056,1.04,16.348-3.252 L187.211,165H226v176.459l-27.48,42.221c-3.062,4.6-3.354,10.518-0.747,15.396S205.463,407,211,407h90 c5.537,0,10.62-3.047,13.228-7.925c2.608-4.878,2.314-10.796-0.747-15.396L286,341.459V165h38.789l25.605,25.605 c4.307,4.307,10.781,5.596,16.348,3.252c5.61-2.314,9.258-7.793,9.258-13.857v-60C376,111.709,369.291,105,361,105z"></path></g></g></svg>`,
    },
    {
      name: "upload",
      title: "Upload image",
      icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" class="bi bi-file-earmark-image" viewBox="0 0 16 16">
      <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
      <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1z"/>
      </svg>
      `,
    },
    {
      name: "background",
      title: "Canvas option",
      icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" class="bi bi-gear" viewBox="0 0 16 16">
      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
      </svg>
      `,
    },
    {
      name: "themeSwitch",
      title: "themeSwitch",
      icon: `<svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16"/></svg>`,
    },
  ];

  const defaultExtendedButtons = [
    {
      name: "undo",
      title: "Undo",
      icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
      <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
      </svg>
      `,
    },
    {
      name: "redo",
      title: "Redo",
      icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
      </svg>
      `,
    },
    {
      name: "save",
      title: "Save",
      icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" class="bi bi-floppy" viewBox="0 0 16 16">
      <path d="M11 2H9v3h2z"/>
      <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z"/>
      </svg>
      `,
    },
    {
      name: "download",
      title: "Download",
      icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" class="bi bi-download" viewBox="0 0 16 16">
      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
      </svg>
      `,
    },
    {
      name: "clear",
      title: "Clear",
      icon: `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" class="bi bi-file-earmark-x" viewBox="0 0 16 16">
      <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293z"/>
      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
      </svg>
      `,
    },
  ];

  var toolbar = function () {
    const _self = this;
    let buttons = [];
    let extendedButtons = [];
    if (Array.isArray(this.buttons) && this.buttons.length) {
      defaultButtons.forEach((item) => {
        if (this.buttons.includes(item.name)) buttons.push(item);
      });
      defaultExtendedButtons.forEach((item) => {
        if (this.buttons.includes(item.name)) extendedButtons.push(item);
      });
    } else {
      buttons = defaultButtons;
      extendedButtons = defaultExtendedButtons;
    }

    try {
      this.containerEl.append(
        `<div class="toolbar" id="toolbar"><div class="main-buttons"></div><div class="extended-buttons"></div></div>`
      );

      // main buttons
      (() => {
        buttons.forEach((item) => {
          $(`${this.containerSelector} #toolbar .main-buttons`).append(
            `<button id="${item.name}">${item.icon}</button>`
          );
        });

        $(`${this.containerSelector} #toolbar .main-buttons button`).click(
          function () {
            let id = $(this).attr("id");

            $(`${_self.containerSelector} #toolbar button`).removeClass(
              "active"
            );
            $(`${_self.containerSelector} #toolbar button#${id}`).addClass(
              "active"
            );
            _self.setActiveTool(id);
          }
        );
      })();

      // zoom
      (() => {
        let currentZoomLevel = 1;
        $(`${this.containerSelector}`).append(
          `<div class="floating-zoom-level-container"></div>`
        );
        $(`${this.containerSelector} .floating-zoom-level-container`).append(`
          <label>زوم :</label>
          <select id="input-zoom-level">
            ${[0.05, 0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3].map(
              (item) =>
                `<option value="${item}" ${
                  item === currentZoomLevel ? "selected" : ""
                }>${item * 100}%</option>`
            )}
          </select>
        `);
        $(
          `${this.containerSelector} .floating-zoom-level-container #input-zoom-level`
        ).change(function () {
          let zoom = parseFloat($(this).val());
          typeof _self.applyZoom === "function" && _self.applyZoom(zoom);
        });
      })();
      // extended buttons
      (() => {
        extendedButtons.forEach((item) => {
          $(`${this.containerSelector} #toolbar .extended-buttons`).append(
            `<button id="${item.name}">${item.icon}</button>`
          );
        });

        $(`${this.containerSelector} #toolbar .extended-buttons button`).click(
          function () {
            let id = $(this).attr("id");
            if (id === "save") {
              if (
                window.confirm(
                  "The current canvas will be saved in your local! Are you sure?"
                )
              ) {
                saveInBrowser.save("canvasEditor", _self.canvas.toJSON());
              }
            } else if (id === "clear") {
              if (window.confirm("This will clear the canvas! Are you sure?")) {
                _self.canvas.clear(), saveInBrowser.remove("canvasEditor");
              }
            } else if (id === "download") {
              $("body").append(`<div class="custom-modal-container">
              <div class="custom-modal-content">
                <div class="button-download" id="svg">Download as SVG</div>
                <div class="button-download" id="png">Download as PNG</div>
                <div class="button-download" id="jpg">Download as JPG</div>
              </div>
            </div>`);

              $(".custom-modal-container").click(function () {
                $(this).remove();
              });

              $(".custom-modal-container .button-download").click(function (e) {
                let type = $(this).attr("id");
                if (type === "svg") downloadSVG(_self.canvas.toSVG());
                else if (type === "png")
                  downloadImage(_self.canvas.toDataURL());
                else if (type === "jpg")
                  downloadImage(
                    _self.canvas.toDataURL({
                      format: "jpeg",
                    }),
                    "jpg",
                    "image/jpeg"
                  );
              });
            } else if (id === "undo") _self.undo();
            else if (id === "redo") _self.redo();
          }
        );
      })();
    } catch (_) {
      console.error("can't create toolbar");
    }
  };

  window.ImageEditor.prototype.initializeToolbar = toolbar;
})();
