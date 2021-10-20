export const getRoundRobin = (total, current) => {
  let nextNum = current;
  if (current === total) {
    nextNum = 0;
  } else {
    nextNum += 1;
  }
  return nextNum;
};

export const getRandomNumber = (min, max) => Math.floor(Math.random() * max);
