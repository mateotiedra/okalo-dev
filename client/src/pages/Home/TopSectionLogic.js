const TopSectionLogic = (props) => {
  const typoVariant = {
    xs: 'h4',
    sm: 'h4',
    md: 'h3',
    lg: 'h2',
  }[props.width];

  const wheelRadius = {
    xs: '220px',
    sm: '350px',
    md: '400px',
    lg: '400px',
  }[props.width];

  const emojisSize = {
    xs: 40,
    sm: 55,
    md: 60,
    lg: 65,
  }[props.width];

  return { typoVariant, wheelRadius, emojisSize };
};

export default TopSectionLogic;
