import React from 'react';
import { loader } from 'graphql.macro';

import config from '../../../config';
import { Body as OpenPedCanSomaticAlterationsBody } from '../../common/OpenPedCanSomaticAlterations';
import Description from './Description';

import usePlatformApi from '../../../hooks/usePlatformApi';
import Summary from './Summary';

const SOMATIC_ALTERATIONS_QUERY = loader('./SomaticAlterationsQuery.gql');

function Body({ definition, id, label }) {
  const summaryRequest = usePlatformApi(
    Summary.fragments.evidenceSomaticAlterationsSummary
  );
  const { ensgId: ensemblId, efoId } = id;
  const variables = { ensemblId, efoId };
  const dataDownloaderFileStem = `OpenPedCanSomaticAlterations-${ensemblId}-${efoId}`;
  const configAPI = `${config.mtpConfig}/front-end/page_evidence`;
  return (
    <OpenPedCanSomaticAlterationsBody
      definition={definition}
      id={id}
      label={label}
      entity="evidence"
      variables={variables}
      BODY_QUERY={SOMATIC_ALTERATIONS_QUERY}
      summaryRequest={summaryRequest}
      Description={Description}
      dataDownloaderFileStem={dataDownloaderFileStem}
      configAPI={configAPI}
    />
  );
}

export default Body;
