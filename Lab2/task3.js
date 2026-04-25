const startBtn = document.getElementById('startBtn');
const gallery = document.getElementById('gallery');

function askForFiveUrls() {
  const urls = [];

  for (let i = 0; i < 5; i++) {
    const url = prompt('Введите URL картинки №' + (i + 1));

    if (!url) {
      alert('Нужно ввести ссылку.');
      i--;
      continue;
    }

    urls.push(url);
  }

  return urls;
}

function createErrorParagraph() {
  const p = document.createElement('p');
  p.textContent = "Can’t load image";
  return p;
}

startBtn.addEventListener('click', function () {
  gallery.innerHTML = '';
  const urls = askForFiveUrls();

  urls.forEach(function (url) {
    const img = new Image();
    const wrapper = document.createElement('div');

    img.onload = function () {
      wrapper.append(img);
      gallery.append(wrapper);
    };

    img.onerror = function () {
      wrapper.append(createErrorParagraph());
      gallery.append(wrapper);
    };

    img.src = url;
  });
});
