const video = document.querySelector("#promo-video");
const playButton = document.querySelector("#play-button");
const shareButton = document.querySelector("#share-button");
const statusMessage = document.querySelector("#status-message");

playButton.addEventListener("click", async () => {
  try {
    await video.play();
  } catch {
    statusMessage.textContent = "请点击视频画面上的播放按钮。";
  }
});

video.addEventListener("play", () => {
  playButton.classList.add("is-hidden");
  statusMessage.textContent = "";
});

video.addEventListener("pause", () => {
  if (video.currentTime < video.duration && !video.ended) {
    playButton.classList.remove("is-hidden");
  }
});

video.addEventListener("ended", () => {
  playButton.classList.remove("is-hidden");
});

shareButton.addEventListener("click", async () => {
  const shareData = {
    title: document.title,
    text: "文明吸烟环境宣传片",
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    statusMessage.textContent = "观看地址已复制，可以发送给他人。";
  } catch (error) {
    if (error?.name !== "AbortError") {
      statusMessage.textContent = "请复制浏览器地址后发送给他人。";
    }
  }
});
