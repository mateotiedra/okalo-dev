const TopSectionLogic = ({ width, history, ...other }) => {
  const typoVariant = {
    xs: 'h4',
    sm: 'h4',
    md: 'h3',
    lg: 'h2',
    xl: 'h2',
  }[width];

  const wheelRadius = {
    xs: '220px',
    sm: '350px',
    md: '400px',
    lg: '400px',
    xl: 'h2',
  }[width];

  const emojisSize = {
    xs: 40,
    sm: 55,
    md: 60,
    lg: 65,
  }[width];

  return {
    typoVariant,
    wheelRadius,
    emojisSize,
  };
};

export default TopSectionLogic;
