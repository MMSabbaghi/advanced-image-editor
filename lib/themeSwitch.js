(function () {
  "use strict";

  const Switch = () => {
    const themeSwitchBtn = document.getElementById("themeSwitch");
    const LIGHT = "light";
    const DARK = "dark";

    const setTheme = (theme) => {
      document.body.dataset.theme = theme;
    };

    const getTheme = () => {
      return localStorage.getItem("theme") || LIGHT;
    };

    themeSwitchBtn.addEventListener("click", (e) => {
      const cuurentMode = getTheme();
      const newMode = cuurentMode === LIGHT ? DARK : LIGHT;
      setTheme(newMode);
      localStorage.setItem("theme", newMode);
    });

    (() => setTheme(getTheme()))();
  };

  window.ImageEditor.prototype.initializeThemeSwitch = Switch;
})();
