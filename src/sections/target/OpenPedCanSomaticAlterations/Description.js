import React from 'react';
import Link from '../../../components/Link';
import { mtpLinks } from '../../../constants';

const Description = ({ symbol }) => (
  <>
    Somatic alterations associated with <strong>{symbol}</strong> in pediatric
    cancers. Source:{' '}
    <Link
      to={mtpLinks.openPedCan}
      external
    >
      OpenPedCan
    </Link>
    {', '}
    <Link
      to=" https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000218.v23.p8"
      external
    >
      TARGET (v23)
    </Link>
    {', '}
    <Link
      to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs001436.v1.p1"
      external
    >
      Kids First Neuroblastoma
    </Link>
    {', '}
    <Link to="https://alexslemonade.github.io/OpenPBTA-manuscript/" external>
      OpenPBTA for CBTN and PNOC (v21)
    </Link>
    {', '}
    <Link to="https://www.oncokb.org/news#07162021" external>
      OncoKB (v3.5)
    </Link>
  </>
);

export default Description;
