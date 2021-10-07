import React from 'react';
import  Header  from './Header';

const headerData = {
  globalHeaderLogo: 'https://raw.githubusercontent.com/CBIIT/ppdc-otp-frontend/ec23481431865b339be01bc837bf06c2eb561237/CCDI-MT-Logo-COLOR.svg',
  globalHeaderLogoLink: '/',
  globalHeaderLogoAltText: 'MTP Logo',
  globalHeaderImage: '',
};


const customStyle = {
  nihLogoImg: {
    height: '110px',
    width: '463px',
    marginLeft: '28px',
    minHeight: '54px',
  },
  headerBar: {
    top: '20px',
    zIndex: '999',
  },
};

const NCIHeader = () => (
  <>
    <Header
      logo={headerData.globalHeaderLogo}
      easter={headerData.globalHeaderImage}
      alt={headerData.globalHeaderLogoAltText}
      homeLink={headerData.globalHeaderLogoLink}
      customStyle={customStyle}
    />
  </>
);
export default NCIHeader;
