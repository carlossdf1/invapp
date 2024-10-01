const developMode = true;
const api = developMode ? 'http://localhost:3000/api/' : "https://invapi.onrender.com/api/";
const url = origin === "http://127.0.0.1:5501" || origin.includes('http://192.168.1.') ? "" : "/invapp";
darkModeChange();