const Helper = (props) => {
  const strMadeOf = (value, specialAllowed) => {
    return value.match('^[a-zA-Z0-9' + specialAllowed + ']*$');
  };

  const randint = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return { strMadeOf, randint };
};

export default Helper;
