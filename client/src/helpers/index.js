const Helper = (props) => {
  const strMadeOf = (value, specialAllowed) => {
    return value.match('^[a-zA-Z0-9' + specialAllowed + ']*$');
  };

  return { strMadeOf };
};

export default Helper;
