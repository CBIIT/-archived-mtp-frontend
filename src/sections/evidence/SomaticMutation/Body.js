import React, {useState} from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import SectionItem from '../../../components/Section/SectionItem';
import Description from './Description';
import * as DummyData from './DummyData';

import SnvByGeneTab from './SnvByGeneTab';
import SnvByVariantTab from './SnvByVariantTab';
import CnvByGeneTab from './CnvByGeneTab';
import FusionByGeneTab from './FusionByGeneTab';
import FusionTab from './FusionTab';

const QUERY = loader('./SomaticMutationQuery.gql');

function Body({ definition, id, label }) {
  const { ensgId: ensemblId, efoId } = id;
  
  const defaultTab = "snvByGene";
  const [tab, setTab] = useState(defaultTab);

  const request = useQuery(QUERY, {
    variables: { ensemblId, efoId, size: 9999 },
  });

  const handleChangeTab = (_, tab) => {
    setTab(tab)
  }

  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
       renderBody={(data) => {
       const {SnvByGene,SnvByVariant,CnvByGene,FusionByGene,Fusion} = data;
        return (
                 <>
            <Tabs value={tab} onChange={handleChangeTab} style={{ marginBottom: '2rem' }}>
              <Tab value="snvByGene" label="SNV By Gene"></Tab>
              <Tab value="snvByVariant" label="SNV By Variant"></Tab>
              <Tab value="cnvByGene" label="CNV By Gene"></Tab>
              <Tab value="fusionByGene" label="Fusion By Gene"></Tab>
              <Tab value="fusion" label="Fusion"></Tab>
            </Tabs>
            {/* table 1: SNV by Gene */}
            { tab === "snvByGene" && <SnvByGeneTab data={SnvByGene.evidences.rows} ids={id} labels={label}  /> }

            {/* table 2: SNV by Variant */}
            { tab === "snvByVariant" && <SnvByVariantTab data={SnvByVariant.evidences.rows} ids={id} labels={label} /> }

            {/* table 3: CNV by Gene*/}
            { tab === "cnvByGene" && <CnvByGeneTab data={CnvByGene.evidences.rows} ids={id} labels={label}  /> }

            {/* table 4: Fusion by Gene*/}
            { tab === "fusionByGene" && <FusionByGeneTab data={FusionByGene.evidences.rows} ids={id} labels={label}  /> }

            {/* table 5: Fusion */}
            { tab === "fusion" && <FusionTab data={Fusion.evidences.rows} ids={id} labels={label}  /> }

          </>
        );
      }}
    />
  );
}

export default Body;