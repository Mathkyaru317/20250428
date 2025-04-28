let capture;

function setup() {
  // 建立全視窗畫布，背景顏色為 #dde5b6
  createCanvas(windowWidth, windowHeight);
  background('#dde5b6');

  // 初始化攝影機影像
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide(); // 隱藏原始的 HTML 視訊元素
}

function draw() {
  background('#dde5b6'); // 確保背景顏色一致

  // 翻轉畫布以左右顛倒影像
  push();
  translate(width / 2, height / 2); // 將原點移到畫布中心
  scale(-1, 1); // 水平翻轉
  image(
    capture,
    -capture.width / 2,
    -capture.height / 2,
    capture.width,
    capture.height
  );
  pop();
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
}
