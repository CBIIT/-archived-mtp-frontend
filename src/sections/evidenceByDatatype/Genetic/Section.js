import React from 'react';
import { Typography } from '@material-ui/core';

import OTGeneticsSection from '../../evidence/OTGenetics/Section';
import UniProtSection from '../../evidence/UniProt/Section';
import UniProtLiteratureSection from '../../evidence/UniProtLiterature/Section';
import EVASection from '../../evidence/EVA/Section';
import GenomicsEnglandSection from '../../evidence/GenomicsEngland/Section';
import Gene2PhenotypeSection from '../../evidence/Gene2Phenotype/Section';

const Section = ({ ensgId, efoId, data }) => (
  <React.Fragment>
    {data.otGenetics && data.otGenetics.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>Open Targets Genetics Portal</strong>.
        </Typography>
        <OTGeneticsSection {...{ ensgId, efoId, data: data.otGenetics }} />
      </React.Fragment>
    ) : null}
    {data.uniProt && data.uniProt.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>UniProt</strong>.
        </Typography>
        <UniProtSection {...{ ensgId, efoId, data: data.uniProt }} />
      </React.Fragment>
    ) : null}

    {data.uniProtLiterature && data.uniProtLiterature.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>UniProt Literature</strong>.
        </Typography>
        <UniProtLiteratureSection
          {...{ ensgId, efoId, data: data.uniProtLiterature }}
        />
      </React.Fragment>
    ) : null}

    {data.eva && data.eva.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>EVA</strong>.
        </Typography>
        <EVASection {...{ ensgId, efoId, data: data.eva }} />
      </React.Fragment>
    ) : null}

    {data.genomicsEngland && data.genomicsEngland.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>Genomics England</strong>.
        </Typography>
        <GenomicsEnglandSection
          {...{ ensgId, efoId, data: data.genomicsEngland }}
        />
      </React.Fragment>
    ) : null}

    {data.gene2Phenotype && data.gene2Phenotype.rows.length > 0 ? (
      <React.Fragment>
        <Typography>
          Evidence from <strong>Gene2Phenotype</strong>.
        </Typography>
        <Gene2PhenotypeSection
          {...{ ensgId, efoId, data: data.gene2Phenotype }}
        />
      </React.Fragment>
    ) : null}
  </React.Fragment>
);

export default Section;
