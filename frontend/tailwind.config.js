/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        obsidian: "#0f1115",
        graphite: "#151922",
        plasma: "#00ff88",
        "plasma-deep": "#00cc6f",
        danger: "#ff4d4f",
        muted: "#9ca3af",
      },
      boxShadow: {
        glow: "0 0 45px rgba(0, 255, 136, 0.25)",
        "glow-soft": "0 0 80px rgba(0, 255, 136, 0.16)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.45)",
      },
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Consolas", "monospace"],
      },
      backgroundImage: {
        "radial-green":
          "radial-gradient(circle at center, rgba(0, 255, 136, 0.24), transparent 34rem)",
        "glass-line":
          "linear-gradient(135deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04))",
      },
    },
  },
  plugins: [],
};
