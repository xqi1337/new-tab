const themes = [
  "blue",
  "cherry",
  "violet",
  "green",
  "orange",
  "purple",
  "white",
  "mesh-purple",
  "summer-wave",
  "retro-gradient",
  "Animated-Gradient"
];

// Preload themes (disabled)
themes.forEach((theme) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `./main-themes/${theme}/style.css`;
  link.classList.add(`theme-${theme}`);
  link.disabled = true;
  document.head.appendChild(link);
});

function changeCSS(theme) {
  themes.forEach((t) => {
    const linkTag = document.querySelector(`.theme-${t}`);
    if (linkTag) {
      linkTag.disabled = t !== theme;
    }
  });

  changeImgSrc(theme);
  localStorage.setItem("selected-theme", theme);
}

function changeImgSrc(theme) {
  const img = document.getElementById("img");
  if (img) {
    img.src = `./main-themes/${theme}/images/gif.gif`;
  }
}

// Apply saved theme on load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("selected-theme") || "blue";
  changeCSS(savedTheme);
});

// Search function
function search() {
  const is_url =
    /^(((http)|(https)):\/\/)?(www\.)?[a-zA-Z0-9]+\.[a-zA-Z]+\/?([a-zA-Z0-9/?=&%-_]+)?$/;
  const is_ip =
    /^(((http)|(https)):\/\/)?([0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}|localhost)(:[0-9]{1,5})?(\/[a-zA-Z0-9/?=&%-_]+)?$/;

  const search_term = document.getElementById("search_box").value;
  const url_match = search_term.match(is_url);
  const ip_match = search_term.match(is_ip);
  if (url_match != null) {
    window.location.href =
      url_match[0].substring(0, 4) == "http"
        ? url_match[0]
        : "https://" + url_match[0];
  } else if (ip_match != null) {
    window.location.href =
      ip_match[0].substring(0, 4) == "http"
        ? ip_match[0]
        : "http://" + ip_match[0];
  } else {
    const search_url = "https://leta.mullvad.net/search?q=";
    window.location.href = search_url + encodeURIComponent(search_term);
  }

  return false;
}
