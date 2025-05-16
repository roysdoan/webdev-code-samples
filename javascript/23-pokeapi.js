const url = 'https://pokeapi.co/api/v2/pokemon/ditto';
const url2 = 'https://pokeapi.co/api/v2/pokemon?limit=15';

const createNewElement = ({ name, url }) => {
  const card = document.createElement('div');
  const cardBody = document.createElement('div');
  // TODO: check accessibility issue for skipped headings
  const cardTitle = document.createElement('h5');
  const cardText = document.createElement('p');
  const cardButton = document.createElement('button');

  card.setAttribute('class', 'card mb-2');
  // TODO: remove inline css
  card.setAttribute('style', 'width: 18rem;');
  cardBody.setAttribute('class', 'card-body');
  cardTitle.setAttribute('class', 'card-title');
  cardText.setAttribute('class', 'card-text');
  cardButton.setAttribute('class', 'btn btn-warning');

  cardTitle.textContent = name;
  cardText.textContent = `More information about this pokemon can be found here: ${url}`;
  cardButton.textContent = 'More info';

  cardBody.append(cardTitle);
  cardBody.append(cardText);
  cardBody.append(cardButton);
  card.append(cardBody);

  return card;
};

const getData = function fetchFromAPI(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.results);
      const section = document.querySelector('#results');
      section.setAttribute('class', 'd-flex flex-wrap justify-content-around');

      data.results.forEach((item) => {
        console.log(`the info for ${item.name} is located at ${item.url}`);
        const element = createNewElement(item);
        section.append(element);
      });
    })
    .catch((error) => {
      const main = document.querySelector('main');
      const errorElement = document.createElement('div');
      errorElement.setAttribute('class', 'text-danger w-25 mx-auto');
      errorElement.textContent =
        'Error: Unable to fetch data. Please try again.';
      main.append(errorElement);
    })
    .finally(() => {
      const loader = document.querySelector('.loader');
      loader.setAttribute('class', 'd-none');
    });
};

getData(url2);
