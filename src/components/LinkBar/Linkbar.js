import React from 'react';
import { withStyles } from '@material-ui/core';

const LinkBar = ({ classes, title, url }) => (
  <>
    <div className={classes.wrapper}>
      <a className={classes.link} href={url}>{title}</a>
    </div>
  </>
);

LinkBar.defaultProps = {
  title: 'National Cancer Institute - cancer.gov',
  url: 'https://www.cancer.gov/',
};

const styles = () => ({
  wrapper: {
    width: '100%',
    height: '25px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#F1F1F1',
    borderBottom: '1px #999999 solid',
  },
  link: {
    lineHeight: '25px',
    textDecoration: 'none',
    color: '#333333',
    fontFamily: '"Noto Sans", Arial, sans-serif',
    fontSize: '10px',
  },
});

export default withStyles(styles)(LinkBar);