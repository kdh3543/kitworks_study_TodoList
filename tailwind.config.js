function generateColorWithOpacity(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16); // 빨강
  const g = parseInt(hex.slice(3, 5), 16); // 녹색
  const b = parseInt(hex.slice(5, 7), 16); // 파랑

  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`; // rgba 형식의 문자열 반환
}

// 기본 색상과 원하는 투명도를 사용하여 색상 팔레트를 생성하는 함수
function generateColors(hex, opacities) {
  const colors = {};
  opacities.forEach((opacity) => {
    colors[opacity] = generateColorWithOpacity(hex, opacity); // 각 투명도에 따른 색상 생성
  });
  return colors;
}

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customerPurple: {
          DEFAULT: "#C896FF",
          ...generateColors("#C896FF", [20, 40, 60, 80]),
        },
        customBlue: {
          DEFAULT: "#c8dceb",
          ...generateColors("#c8dceb", [20, 40, 60, 80]),
        },
      },
    },
  },
  plugins: [],
};
