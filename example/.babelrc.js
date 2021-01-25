module.exports = (api) => ({
  "presets": ["next/babel"],
  "plugins": api.env("production") ? [
    ["lightwindcss/babel", {
      analysisFile: "./lightwindcss.json"
    }]
  ] : []
});