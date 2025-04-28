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
  overlayGraphics.background(0); // 設定背景為黑色
  overlayGraphics.noStroke();

  // 每隔 20 單位繪製方框和圓
  for (let x = 0; x < overlayGraphics.width; x += 20) {
    for (let y = 0; y < overlayGraphics.height; y += 20) {
      // 從 capture 影像中取得相對應位置的顏色
      let col = capture.get(x, y);
      let g = green(col); // 取得 G 值
      overlayGraphics.fill(0, g, 100); // 方框顏色：R=0, G=保留, B=100
      overlayGraphics.rect(x + 1, y + 1, 18, 18); // 繪製方框，寬高為 18

      overlayGraphics.fill(0); // 圓的顏色為黑色
      overlayGraphics.ellipse(x + 10, y + 10, 5, 5); // 繪製圓，寬高為 5
    }
  }

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
