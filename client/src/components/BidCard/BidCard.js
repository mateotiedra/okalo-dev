import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  withWidth,
  Link as MaterialLink,
} from '@material-ui/core';
import { BiPlusCircle } from 'react-icons/bi';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    '& > *': { height: '100%', width: '100%' },
  },
  content: {
    padding: theme.spacing(6, 3, 3, 3),
    paddingBottom: '40%',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4, 2, 3, 2),
      paddingBottom: '40%',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addEmpty: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bidText: {
    maxWidth: '100%',
    wordBreak: 'break-word',
    textOverflow: 'ellipsis',
    textTransform: 'capitalize',
  },
  titleContainer: {
    width: '100%',
    overflow: 'hidden',
    height: '7em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    maxHeight: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  price: {
    position: 'absolute',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      right: theme.spacing(1),
      bottom: theme.spacing(1),
    },
    maxWidth: '80%',
  },
  secondaryInfos: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '100%',
  },
  whiteBackground: {
    backgroundColor: 'white',
    borderRadius: '0.3em',
    padding: '0.2em 0.3em',
  },
  postByText: { textAlign: 'center', marginTop: theme.spacing(1) },
}));

function BidCard({
  className,
  title,
  author,
  edition,
  price,
  width,
  createdAt,
  addBidCover,
  uuid,
  displayPrice,
  since,
  sellerUsername,
  displayUser,
  shortBy,
}) {
  const classes = useStyles();

  const dateVariables = createdAt ? createdAt.split(':') : ['', '  '];
  let coverNumber = parseInt(
    dateVariables[dateVariables.length - 1].substring(0, 2)
  );
  coverNumber = Math.floor((coverNumber / 100) * 9 + 1);
  const imgRef = createdAt
    ? require(`../../assets/svgs/bookCover/cover-${coverNumber}.svg`).default
    : undefined;
  const imgSrc = useRef(imgRef);

  return (
    <div className={className}>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          {addBidCover ? (
            <Paper
              className={classes.addEmpty}
              variant='outlined'
              component={Link}
              to='/sell'
            >
              <BiPlusCircle size={40} opacity={0.7} />
            </Paper>
          ) : (
            <Paper
              className={classes.content}
              component={Link}
              to={'/bids/' + uuid}
              style={{
                backgroundImage: `url(${imgSrc.current})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
              elevation={4}
            >
              <div className={classes.titleContainer}>
                <Typography
                  component='h2'
                  variant='body1'
                  className={`${classes.title} ${classes.bidText} ${classes.whiteBackground}`}
                  noWrap={width === 'xs'}
                >
                  {title}
                </Typography>
              </div>
              <div
                className={
                  classes.secondaryInfos + ' ' + classes.whiteBackground
                }
              >
                <Typography
                  component='h3'
                  variant='subtitle1'
                  className={classes.bidText}
                  noWrap
                >
                  {edition}
                </Typography>
                <Typography
                  component='h4'
                  variant='caption'
                  className={classes.bidText}
                  noWrap
                >
                  {author}
                </Typography>
              </div>
            </Paper>
          )}
        </div>
        {!addBidCover && displayPrice && (
          <Typography
            component='h4'
            variant='body1'
            noWrap
            className={classes.price + ' ' + classes.whiteBackground}
          >
            {price}.-
          </Typography>
        )}
        <div style={{ paddingBottom: (3 / 2) * 100 + '%' }} />
      </div>
      {displayUser && (
        <Typography variant='body2' className={classes.postByText}>
          {shortBy ? 'Par ' : `Posté ${since} par `}
          <MaterialLink
            variant='inherit'
            component={Link}
            to={'/users/' + sellerUsername}
          >
            {sellerUsername}
          </MaterialLink>
        </Typography>
      )}
    </div>
  );
}

export default withWidth()(BidCard);
