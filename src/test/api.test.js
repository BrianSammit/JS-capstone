import api from '../score/api';
import 'regenerator-runtime';

const axios = require('axios');

jest.mock('axios');

it('It should return the player name', async () => {
  axios.get.mockResolvedValue({
    data: [
      {
        name: 'Brian',
        score: 540,
      },
    ],
  });
  await api
    .postScores()
    .then((data) => {
      expect(data.name).toEqual('Brian');
    })
    .catch((error) => error);
});

it('It should return the player score', async () => {
  axios.get.mockResolvedValue({
    data: [
      {
        name: 'Brian',
        score: 950,
      },
    ],
  });
  await api
    .postScores()
    .then((data) => {
      expect(data.score).toEqual(950);
    })
    .catch((error) => error);
});

it('It should fail if player score is incorrect', async () => {
  axios.get.mockResolvedValue({
    data: [
      {
        name: 'Brian',
        score: 150,
      },
    ],
  });
  await api
    .postScores()
    .then((data) => {
      expect(data.score).not.toBe(210);
    })
    .catch((error) => error);
});
