import { Box, withWidth } from '@material-ui/core';
import Helper from '../../helpers/index';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useRef } from 'react';

const useStyles = makeStyles((theme) => ({
  cover: {
    width: '100%',
    height: '100vh',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blobSvgContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    overflow: 'hidden',
    zIndex: -10,
    objectFit: 'cover',
  },
  svgBackground: {
    height: '100%',
    fill: theme.palette.primary,
  },
}));

function BlobScene({ children, width, onlyBackground, color }) {
  const classes = useStyles();
  const theme = useTheme();

  const { randint } = Helper();
  const device = {
    xs: 'mobile',
    sm: 'deskop',
    md: 'deskop',
    lg: 'deskop',
  }[width];
  const imgSrc = useRef(
    require(`../../assets/svgs/background/${device}/blob-scene-${randint(
      1,
      3
    )}.svg`).default
  );
  return (
    <>
      {/*
      <Box className={`${classes.blobSvgContainer} ${classes.container}`}>
          <BlobSvg
            fill={theme.palette.primary.main}
            style={{ height: '100%' }}
            size={20}
          />
        </Box>
        <Paper
        style={{
          backgroundImage: `url(${imgSrc.current})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          position: 'absolute',
          zIndex: -1,
        }}
        className={`${classes.cover}`}
        square
        elevation={0}
        color='inherit'
      />*/}
      <div
        style={{
          backgroundColor: theme.palette[color || 'secondary'].main,
          position: 'absolute',
          zIndex: -1,

          WebkitMaskImage: `url(${imgSrc.current})`,
          WebkitMaskPosition: 'center',
          WebkitMaskSize: 'cover',
          WebkitMaskRepeat: 'no-repeat',
        }}
        className={`${classes.cover}`}
        color='inherit'
      ></div>

      <Box
        className={`${classes.cover} ${classes.container}`}
        style={onlyBackground ? { position: 'absolute', zIndex: -9 } : {}}
      >
        {children}
      </Box>
    </>
  );
}

export default withWidth()(BlobScene);
