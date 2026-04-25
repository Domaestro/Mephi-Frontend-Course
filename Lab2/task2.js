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
  const placeholders = [];

  for (let i = 0; i < urls.length; i++) {
    const box = document.createElement('div');
    gallery.append(box);
    placeholders.push(box);
  }

  urls.forEach(function (url, index) {
    const img = new Image();

    img.onload = function () {
      placeholders[index].append(img);
    };

    img.onerror = function () {
      placeholders[index].append(createErrorParagraph());
    };

    img.src = url;
  });
});
