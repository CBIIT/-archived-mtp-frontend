import React from 'react';
import { loader } from 'graphql.macro';

import { Body as OpenPedCanSomaticAlterationsBody} from '../../common/OpenPedCanSomaticAlterations';
import Description from './Description';
import usePlatformApi from '../../../hooks/usePlatformApi';
import Summary from './Summary';

const SOMATIC_ALTERATIONS_QUERY = loader('./SomaticAlterationsQuery.gql');

function Body({ definition, id, label: symbol}) {
  const summaryRequest = usePlatformApi(Summary.fragments.targetSomaticAlterationsSummary)
  
  const variables = { ensemblId: id };
  const dataDownloaderFileStem = `OpenPedCanSomaticAlterations-${id}`
  // TODO: Have this imported as env variable
  const CONFIG_URL = "https://raw.githubusercontent.com/CBIIT/mtp-config/CCDIMTP-76"
  const configAPI = `${CONFIG_URL}/front-end/page_target`
  return (
    <OpenPedCanSomaticAlterationsBody 
      definition={definition}
      id={id}
      label={{symbol}}
      entity="target"
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
