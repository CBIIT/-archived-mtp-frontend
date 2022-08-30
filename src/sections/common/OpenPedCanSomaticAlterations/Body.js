import React, { useState } from 'react';
import { Tab, Tabs, makeStyles } from '@material-ui/core';
import { useQuery } from '@apollo/client';

import SectionItem from '../../../components/Section/SectionItem';
import { dataTypesMap } from '../../../dataTypes';

import SnvByGeneTab from './SnvByGeneTab';
import SnvByVariantTab from './SnvByVariantTab';
import CnvByGeneTab from './CnvByGeneTab';
import FusionByGeneTab from './FusionByGeneTab';
import FusionTab from './FusionTab';
import { getSADefaultTab } from './utils';
import useColumnConfiguration from '../../../hooks/useColumnConfiguration';

function Body({
  definition,
  id,
  label,
  entity,
  variables,
  BODY_QUERY,
  summaryRequest,
  Description,
  dataDownloaderFileStem,
  configAPI,
}) {
  const request = useQuery(BODY_QUERY, {
    variables: { ...variables, size: 9999 },
  });
  const defaultTab = getSADefaultTab(summaryRequest.data);
  const [tab, setTab] = useState(defaultTab);

  // Config Columns for SNV By Gene
  const [
    snvByGeneColumns,
    snvByGeneDataDownloaderColumns,
  ] = useColumnConfiguration(`${configAPI}/SnvByGene_Config.json`);

  // Config Columns for SNV By Variant
  const [
    snvByVariantColumns,
    snvByVariantDataDownloaderColumns,
  ] = useColumnConfiguration(`${configAPI}/SnvByVariant_Config.json`);

  // Config Columns for CNV By Gene
  const [
    cnvByGeneColumns,
    cnvByGeneDataDownloaderColumns,
  ] = useColumnConfiguration(`${configAPI}/CnvByGene_Config.json`);

  // Config Columns for Fusion By Gene
  const [
    fusionByGeneColumns,
    fusionByGeneDataDownloaderColumns,
  ] = useColumnConfiguration(`${configAPI}/FusionByGene_Config.json`);

  // Config Columns for Fusion
  const [fusionColumns, fusionDataDownloaderColumns] = useColumnConfiguration(
    `${configAPI}/Fusion_Config.json`
  );

  const useStyles = makeStyles({
    tabs: {
      '& .MuiTabs-indicator': {
        color: '#5ca300',
      },
      '& .MuiTab-root.Mui-selected': {
        backgroundColor: '#5ca300',
        color: '#fff',
      },
      '& .MuiTab-textColorInherit': {
        color: '#376100 ',
        '&:hover': { backgroundColor: '#bdda99' },
      },
    },
  });

  const classes = useStyles();

  const handleChangeTab = (_, tab) => {
    setTab(tab);
  };

  return (
    <SectionItem
      definition={definition}
      chipText={entity === 'evidence' ? dataTypesMap.somatic_mutation : ''}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={data => {
        const {
          snvByGene,
          snvByVariant,
          cnvByGene,
          fusionByGene,
          fusion,
        } = data;
        return (
          <>
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              style={{ marginBottom: '2rem' }}
              className={classes.tabs}
            >
              <Tab
                value="snvByGene"
                label="SNV By Gene"
                disabled={snvByGene.evidences.count === 0}
              />
              <Tab
                value="snvByVariant"
                label="SNV By Variant"
                disabled={snvByVariant.evidences.count === 0}
              />
              <Tab
                value="cnvByGene"
                label="CNV By Gene"
                disabled={cnvByGene.evidences.count === 0}
              />
              <Tab
                value="fusionByGene"
                label="Fusion By Gene"
                disabled={fusionByGene.evidences.count === 0}
              />
              <Tab
                value="fusion"
                label="Fusion"
                disabled={fusion.evidences.count === 0}
              />
            </Tabs>
            {/* table 1: SNV by Gene */}
            {tab === 'snvByGene' && snvByGene.evidences.count > 0 && (
              <SnvByGeneTab
                data={snvByGene.evidences.rows}
                BODY_QUERY={BODY_QUERY}
                variables={variables}
                dataDownloaderFileStem={dataDownloaderFileStem}
                configColumns={snvByGeneColumns}
                configDataDownloaderColumns={snvByGeneDataDownloaderColumns}
              />
            )}

            {/* table 2: SNV by Variant */}
            {tab === 'snvByVariant' && snvByVariant.evidences.count > 0 && (
              <SnvByVariantTab
                data={snvByVariant.evidences.rows}
                BODY_QUERY={BODY_QUERY}
                variables={variables}
                dataDownloaderFileStem={dataDownloaderFileStem}
                configColumns={snvByVariantColumns}
                configDataDownloaderColumns={snvByVariantDataDownloaderColumns}
              />
            )}

            {/* table 3: CNV by Gene*/}
            {tab === 'cnvByGene' && cnvByGene.evidences.count > 0 && (
              <CnvByGeneTab
                data={cnvByGene.evidences.rows}
                BODY_QUERY={BODY_QUERY}
                variables={variables}
                dataDownloaderFileStem={dataDownloaderFileStem}
                configColumns={cnvByGeneColumns}
                configDataDownloaderColumns={cnvByGeneDataDownloaderColumns}
              />
            )}

            {/* table 4: Fusion by Gene*/}
            {tab === 'fusionByGene' && fusionByGene.evidences.count > 0 && (
              <FusionByGeneTab
                data={fusionByGene.evidences.rows}
                dataDownloaderFileStem={dataDownloaderFileStem}
                BODY_QUERY={BODY_QUERY}
                variables={variables}
                configColumns={fusionByGeneColumns}
                configDataDownloaderColumns={fusionByGeneDataDownloaderColumns}
              />
            )}

            {/* table 5: Fusion */}
            {tab === 'fusion' && fusion.evidences.count > 0 && (
              <FusionTab
                data={fusion.evidences.rows}
                BODY_QUERY={BODY_QUERY}
                variables={variables}
                dataDownloaderFileStem={dataDownloaderFileStem}
                configColumns={fusionColumns}
                configDataDownloaderColumns={fusionDataDownloaderColumns}
              />
            )}
          </>
        );
      }}
    />
  );
}

export default Body;
