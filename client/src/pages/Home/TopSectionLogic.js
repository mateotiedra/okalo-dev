import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const NavbarLogic = () => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('lg'));
  const tablet = useMediaQuery(theme.breakpoints.up('sm'));
  const mobile = useMediaQuery(theme.breakpoints.up('xs'));

  const GetTypoVariant = () => {
    if (desktop) return 'h2';
    if (tablet) return 'h3';
    if (mobile) return 'h4';
  };
  const TypoVariant = GetTypoVariant();
  return { TypoVariant };
};

export default NavbarLogic;
