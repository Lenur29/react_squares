const url = 'http://demo1030918.mockable.io/';

export const getData = () => {
  return fetch(url)
    .then(response => response.json());
};
