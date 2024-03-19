const buttons = [
  "select",
  "shapes",
  // "draw",
  // "line",
  // "path",
  "textbox",
  "upload",
  "background",
  "undo",
  "redo",
  "save",
  "download",
  "clear",
  "themeSwitch",
];

var imgEditor = new ImageEditor("#image-editor-container", buttons, []);
console.log("initialize image editor");
