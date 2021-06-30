import { Box, useTheme } from '@material-ui/core';
import { useRef } from 'react';
import Helper from '../../helpers/index';

const BlobAvatar = ({ children, className, size, color }) => {
  const theme = useTheme();

  const { randint } = Helper();
  const imgSrc = useRef(
    require(`../../assets/svgs/blobs/blob-${randint(1, 9)}.svg`).default
  );

  const width = {
    small: '50px',
    medium: '100px',
    big: '200px',
  }[size || 'medium'];

  const backgroundColor = theme.palette[color || 'primary'].main;

  return (
    <Box
      style={{
        width: width,
        height: width,
        backgroundColor: backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        WebkitMaskImage: `url(${imgSrc.current})`,
        WebkitMaskPosition: 'center',
        WebkitMaskSize: 'cover',
        WebkitMaskRepeat: 'no-repeat',
      }}
      className={className}
    >
      <Box style={{ zIndex: 10 }}>{children}</Box>
    </Box>
  );
};

export default BlobAvatar;
