import React from 'react';
import {
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import NCIFooter from '../../components/NCIFooter';
import NCIHeader from '../../components/NCIHeader';
import {
  appTitle,
  appDescription,
  appCanonicalUrl,
} from '../../constants';
import background from '../../assets/maintenance-graphic.png';
import { contact } from '../../constants';
import RouteLinks from '../../components/helpers/routeLinks';

const useStyles = makeStyles(theme => ({
 homeBox: {
  backgroundImage: 'radial-gradient(#99D3FF,#79c4fc)',
  height: '980px',
 },
 homeboxContainer: {
  backgroundImage: `url(${background})`,
  background: 'transparent',
  margin: '280px auto',
  height: '584px',
  width: '832px',
  border: '0',
  boxShadow: 'none',
  },
  homeboxDiv: {
    textAlign: 'center',
    fontFamily: 'Inter, sans-serif',
    paddingTop: '230px'
  },
  title: {
    fontSize: '46px',
    lineHeight: '45px',
    color: '#00344F',
    padding: '15px'
  },
  desc: {
    fontSize: '17px',
    lineHeight: '23px',
    color: '#fff',
  },
  email: {
    '& a': {
      color: '#00344F',
      textDecoration: 'none',
    }
  }
}));


const MaintenancePage = () => {
  const classes = useStyles();
  return (
    <>
      <Helmet title={appTitle}>
        <meta name="description" content={appDescription} />
        <link rel="canonical" href={appCanonicalUrl} />
      </Helmet>
      <NCIHeader/>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.homeBox}
      >

      <Grid item xs={12} sm={8} md={8} lg={8}>
      <Paper className={classes.homeboxContainer}>
        <div className={classes.homeboxDiv}>
          <div className={classes.title}>
            Under Maintenance
          </div>
          <div className={classes.desc}>
            We are down for scheduled maintenance right now.
            <br/>
            <span>If you have any questions feel free to  </span>
            <span className={classes.email}>
             <RouteLinks to={contact.email}>
                     contact us
                  </RouteLinks> 
            </span>.
          </div>
        </div>
      </Paper>
    </Grid>
      </Grid>

    
      <NCIFooter/>
    </>
  );
};

export default MaintenancePage;
