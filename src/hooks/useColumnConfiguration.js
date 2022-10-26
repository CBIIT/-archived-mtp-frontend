import { useEffect, useState } from 'react';
import {
  interpretConfig,
  addColumnCustomFields,
  fetchConfigObj,
} from '../sections/common/OpenPedCanSomaticAlterations/utils';

export default function useColumnConfiguration(
  configAPI,
  onlyExportedColumn = false
) {
  const [columns, setColumns] = useState([]);
  const [dataDownloaderColumns, setDataDownloaderColumns] = useState([]);

  useEffect(
    () => {
      fetchConfigObj(configAPI).then(response => {
        // Interpret Config file
        const interpretedObj = interpretConfig(response, addColumnCustomFields);
        setColumns(interpretedObj.columns);
        setDataDownloaderColumns(interpretedObj.dataDownloaderColumns);
      });
    },
    [configAPI]
  );

  return onlyExportedColumn
    ? [dataDownloaderColumns]
    : [columns, dataDownloaderColumns];
}
