import React from 'react';
import { getGeneAllCancerPlot } from '../../../utils/externalAPI';
import Description from './Description';

import {getData} from './Summary'; 
import {Body as OpenPedCanGeneExpression} from '../../common/OpenPedCanGeneExpression'

function Body({ definition, id, label: symbol }) {
  const ensemblId = id;
  const downloadFileName = `OpenPedCanGeneExpression-${ensemblId}`;
  const imageAlt = "Ssingle-gene all-diseases";
  // TODO: Have this imported as env variable
  const CONFIG_URL = "https://raw.githubusercontent.com/CBIIT/mtp-config/CCDIMTP-76"
  const configAPI = `${CONFIG_URL}/front-end/page_target/GeneExpression_Config.json`
  return (
    <OpenPedCanGeneExpression
      definition={definition}
      id={id}
      getData={getData}
      getPlot={getGeneAllCancerPlot}
      label={{symbol}}
      entity="target"
      Description={Description}
      fileStem={downloadFileName}
      imageAlt={imageAlt}
      configAPI={configAPI}
    />
  )
}

export default Body;
