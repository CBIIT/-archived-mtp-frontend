import React, { useState } from 'react';
import { Tab, Tabs, makeStyles} from '@material-ui/core';
import { useQuery } from '@apollo/client';

import SectionItem from '../../../components/Section/SectionItem';
import { dataTypesMap } from '../../../dataTypes';

import SnvByGeneTab from './SnvByGeneTab';
import SnvByVariantTab from './SnvByVariantTab';
import CnvByGeneTab from './CnvByGeneTab';
import FusionByGeneTab from './FusionByGeneTab';
import FusionTab from './FusionTab';
import { getSADefaultTab } from './utils'

function Body({ definition, id, label, entity, variables, BODY_QUERY, summaryRequest, Description, dataDownloaderFileStem}) {

  const request = useQuery(BODY_QUERY, {
    variables: { ...variables, size: 9999 },
  });
  const defaultTab = getSADefaultTab(summaryRequest.data);
  const [tab, setTab] = useState(defaultTab);


 const useStyles = makeStyles({
  tabs: {
    
    "& .MuiTabs-indicator": {
      color: '#5ca300',
    },
    "& .MuiTab-root.Mui-selected": {
      backgroundColor: '#5ca300',
      color:'#fff'
    },
    "& .MuiTab-textColorInherit": {
      color: '#376100 ',
      "&:hover": { backgroundColor: "#bdda99",
      },
    }
  }
})

  const classes = useStyles();

  const handleChangeTab = (_, tab) => {
    setTab(tab)
  }

  return (
    <SectionItem
      definition={definition}
      chipText={entity === 'evidence'? dataTypesMap.somatic_mutation : ''}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={(data) => {
        const {snvByGene, snvByVariant, cnvByGene, fusionByGene, fusion} = data;
        return (
          <>
            <Tabs value={tab} onChange={handleChangeTab} style={{ marginBottom: '2rem' }} className={classes.tabs}>
              <Tab value="snvByGene" label="SNV By Gene" disabled={snvByGene.evidences.count === 0}></Tab>
              <Tab value="snvByVariant" label="SNV By Variant" disabled={snvByVariant.evidences.count === 0}></Tab>
              <Tab value="cnvByGene" label="CNV By Gene" disabled={cnvByGene.evidences.count === 0}></Tab>
              <Tab value="fusionByGene" label="Fusion By Gene" disabled={fusionByGene.evidences.count === 0}></Tab>
              <Tab value="fusion" label="Fusion" disabled={fusion.evidences.count === 0}></Tab>
            </Tabs>
            {/* table 1: SNV by Gene */}
            { tab === "snvByGene" && snvByGene.evidences.count > 0 && 
                <SnvByGeneTab
                  data={snvByGene.evidences.rows}
                  BODY_QUERY={BODY_QUERY}
                  variables={variables}
                  dataDownloaderFileStem={dataDownloaderFileStem} /> }

            {/* table 2: SNV by Variant */}
            { tab === "snvByVariant" && snvByVariant.evidences.count > 0 && 
                <SnvByVariantTab
                  data={snvByVariant.evidences.rows}
                  BODY_QUERY={BODY_QUERY}
                  variables={variables}
                  dataDownloaderFileStem={dataDownloaderFileStem} /> }

            {/* table 3: CNV by Gene*/}
            { tab === "cnvByGene" && cnvByGene.evidences.count > 0 && 
                <CnvByGeneTab
                  data={cnvByGene.evidences.rows}
                  BODY_QUERY={BODY_QUERY}
                  variables={variables}
                  dataDownloaderFileStem={dataDownloaderFileStem}
                   /> }

            {/* table 4: Fusion by Gene*/}
            { tab === "fusionByGene" && fusionByGene.evidences.count > 0 && 
                <FusionByGeneTab
                  data={fusionByGene.evidences.rows}
                  dataDownloaderFileStem={dataDownloaderFileStem}
                  BODY_QUERY={BODY_QUERY}
                  variables={variables} /> }

            {/* table 5: Fusion */}
            { tab === "fusion" && fusion.evidences.count > 0 && 
                <FusionTab
                  data={fusion.evidences.rows}
                  BODY_QUERY={BODY_QUERY}
                  variables={variables}
                  dataDownloaderFileStem={dataDownloaderFileStem} /> }
          </>
        );
      }}
    />
  );
}

export default Body;
