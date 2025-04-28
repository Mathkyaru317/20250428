let capture;
let overlayGraphics;

function setup() {
  // 建立全視窗畫布，背景顏色為 #dde5b6
  createCanvas(windowWidth, windowHeight);
  background('#dde5b6');

  // 初始化攝影機影像
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  // 建立與攝影機影像相同大小的圖層
  overlayGraphics = createGraphics(capture.width, capture.height);
  overlayGraphics.clear(); // 確保圖層透明
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

  // 在 overlayGraphics 上繪製內容
  overlayGraphics.clear(); // 清除之前的內容
  overlayGraphics.fill(255, 0, 0, 100); // 半透明紅色
  overlayGraphics.noStroke();
  overlayGraphics.ellipse(
    overlayGraphics.width / 2,
    overlayGraphics.height / 2,
    overlayGraphics.width * 0.5,
    overlayGraphics.height * 0.5
  );

  // 將圖層顯示在攝影機影像上層
  image(
    overlayGraphics,
    (width - capture.width) / 2,
    (height - capture.height) / 2
  );
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  overlayGraphics = createGraphics(capture.width, capture.height);
}
