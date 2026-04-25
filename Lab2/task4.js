const orderedBtn = document.getElementById('orderedBtn');
const unorderedBtn = document.getElementById('unorderedBtn');
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

function loadImage(url) {
  return new Promise(function (resolve, reject) {
    const img = new Image();

    img.onload = function () {
      resolve(img);
    };

    img.onerror = function () {
      reject(new Error('Image load failed'));
    };

    img.src = url;
  });
}

orderedBtn.addEventListener('click', async function () {
  gallery.innerHTML = '';
  const urls = askForFiveUrls();

  for (const url of urls) {
    const wrapper = document.createElement('div');
    gallery.append(wrapper);

    try {
      const img = await loadImage(url);
      wrapper.append(img);
    } catch (error) {
      wrapper.append(createErrorParagraph());
    }
  }
});

unorderedBtn.addEventListener('click', function () {
  gallery.innerHTML = '';
  const urls = askForFiveUrls();

  urls.forEach(async function (url) { // Foreach не контролирует async (цикл не остановится для того чтобы дождаться загрузки картинки), в отличие от for
    const wrapper = document.createElement('div');

    try {
      const img = await loadImage(url);
      wrapper.append(img);
    } catch (error) {
      wrapper.append(createErrorParagraph());
    }

    gallery.append(wrapper);
  });
});
