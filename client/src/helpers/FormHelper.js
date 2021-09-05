const FormHelper = () => {
  const isEmail = (testedEmail) => {
    return testedEmail.includes('@');
  };

  return { isEmail };
};

export default FormHelper;
