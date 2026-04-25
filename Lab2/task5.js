const startBtn = document.getElementById('startBtn');
const output = document.getElementById('output');

const blockedCountries = [
  'Russia',
  'Belarus',
  'Afghanistan',
  'China',
  'Venezuela',
  'Iran'
];

function askForFiveIps() {
  const ips = [];

  for (let i = 0; i < 5; i++) {
    const ip = prompt('Введите IP-адрес №' + (i + 1));

    if (!ip) {
      alert('Нужно ввести IP-адрес.');
      i--;
      continue;
    }

    ips.push(ip);
  }

  return ips;
}

async function checkIp(ip) {
  const response = await fetch('https://json.geoiplookup.io/' + ip);
  const data = await response.json();
  return data;
}

startBtn.addEventListener('click', async function () {
  output.innerHTML = '';
  const ips = askForFiveIps();

  try {
    const results = await Promise.allSettled(
      ips.map(function (ip) {
        return checkIp(ip);
      })
    );

    let hasBlockedCountry = false;

    results.forEach(function (result, index) {
      const p = document.createElement('p');

      if (result.status === 'fulfilled') {
        const country = result.value.country_name || 'Не удалось определить страну';
        p.textContent = ips[index] + ' - ' + country;
        if (blockedCountries.includes(country)) {
          hasBlockedCountry = true;
        }
      } else {
        p.textContent = ips[index] + ' - ошибка запроса';
      }

      output.append(p);
    });

    if (hasBlockedCountry) {
      alert('Our services are not available in your country');
    } else {
      alert('Welcome to our website!');
    }
  } catch (error) {
    alert('Ошибка при обращении к API');
    output.textContent = 'Ошибка при обращении к API';
  }
});
