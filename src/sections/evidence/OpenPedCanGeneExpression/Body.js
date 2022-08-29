import React from 'react';
import { getGeneDiseaseGtexPlot } from '../../../utils/externalAPI';
import Description from './Description';

import {getData} from './Summary'; 
import {Body as OpenPedCanGeneExpressionBody} from '../../common/OpenPedCanGeneExpression'

function Body({ definition, id, label}) {
  const { ensgId: ensemblId, efoId } = id;
  const downloadFileName = `OpenPedCanGeneExpression-${ensemblId}-${efoId}`;
  const imageAlt = "Single-gene single-disease all-GTEx-tissue-subgroups";
  // TODO: Have this imported as env variable
  const CONFIG_URL = "https://raw.githubusercontent.com/CBIIT/mtp-config/CCDIMTP-76"
  const configAPI = `${CONFIG_URL}/front-end/page_evidence/GeneExpression_Config.json`
  return (
    <OpenPedCanGeneExpressionBody
      definition={definition}
      id={id}
      getData={getData}
      getPlot={getGeneDiseaseGtexPlot}
      label={label}
      entity="evidence"
      Description={Description}
      fileStem={downloadFileName}
      imageAlt={imageAlt}
      configAPI={configAPI}
    />
  )
}

export default Body;
