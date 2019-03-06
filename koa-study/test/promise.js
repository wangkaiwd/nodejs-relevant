const getTime = () => {
  return new Promise((resolve, reject) => {
    // setTimeout(() => Promise.resolve('done'), 1000);
    return Promise.resolve('done');
  });
};

getTime().then(
  res => {

  }
);