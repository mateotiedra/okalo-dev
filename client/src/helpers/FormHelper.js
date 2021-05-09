const FormHelper = (props) => {
  const isEmail = (testedEmail) => {
    return (
      testedEmail.includes('@') &&
      testedEmail.indexOf('@') < testedEmail.indexOf('.')
    );
  };

  return { isEmail };
};

export default FormHelper;
