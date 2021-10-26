import React from 'react';
import { Grid } from '@material-ui/core';

import { DataTable } from '../../../components/Table';
import { defaultRowsPerPageOptions } from '../../../constants';
import  Link from '../../../components/Link';
import RelevantIcon from '../../../components/RMTL/RelevantIcon';

const createExternalLink = (url, description) => {
  const link = url ? <Link external to={url}> {description} </Link> : '' 
  return link; 
}

// Configuration for how the tables will display the data
const columns = [
  {
    id: 'geneSymbol', label: 'Gene symbol', sortable: true,
    renderCell: ({ geneSymbol, targetFromSourceId }) => 
        <Link to={`/target/${targetFromSourceId}`}>{geneSymbol}</Link>
  },
  { id: 'PMTL', label: 'PMTL', sortable: true, renderCell: () => <RelevantIcon/>, filterValue: false},
  { id: 'dataset', label: 'Dataset', sortable: true },
  { id: 'Disease', label: 'Disease', sortable: true,
    renderCell: ({ diseaseFromSourceMappedId, Disease }) => 
      <Link to={`/disease/${diseaseFromSourceMappedId}`}>{Disease}</Link>},
  { id: 'geneFullName', label: 'Gene full name', sortable: true },
  { id: 'geneType', label: 'Gene type', sortable: true },
  { id: 'proteinRefseqId', label: 'Protein RefSeq ID', sortable: true },
  { id: 'targetFromSourceId', label: 'Gene Ensembl ID', sortable: true },
  { id: 'proteinEnsemblId', label: 'Protein Ensembl ID', sortable: true },
  { id: 'totalMutationsOverPatientsInDataset', label: 'Total mutations Over Patients in dataset', sortable: true },
  { id: 'frequencyInOverallDataset', label: 'Frequency in overall dataset', sortable: true },
  { id: 'totalPrimaryTumorsMutatedOverPrimaryTumorsInDataset', label: 'Total primary tumors mutated Over Primary tumors in dataset', sortable: true },
  { id: 'frequencyInPrimaryTumors', label: 'Frequency in primary tumors', sortable: true},
  { id: 'totalRelapseTumorsMutatedOverRelapseTumorsInDataset', label: 'Total relapse tumors mutated Over Relapse tumors in dataset', sortable: true},
  { id: 'frequencyInRelapseTumors',  label: 'Frequency in relapse tumors', sortable: true },
  { id: 'OncoKBCancerGene', label: 'OncoKB cancer gene', sortable: true},
  { id: 'OncoKBOncogeneTSG', label: 'OncoKB oncogene TSG', sortable: true},
  { id: 'pedcbioPedotOncoprintPlotURL', label: 'PedcBio PedOT oncoprint plot URL', 
    renderCell: ({pedcbioPedotOncoprintPlotURL}) => createExternalLink(pedcbioPedotOncoprintPlotURL, "oncoprint"),
    filterValue: ({pedcbioPedotOncoprintPlotURL}) => pedcbioPedotOncoprintPlotURL ? 'oncoprint' : ''
  },
  { id: 'pedcbioPedotMutationsPlotURL', label: 'PedcBio PedOT mutations plot URL', 
    renderCell: ({pedcbioPedotMutationsPlotURL}) => createExternalLink(pedcbioPedotMutationsPlotURL, "mutations"), 
    filterValue:({pedcbioPedotMutationsPlotURL}) => pedcbioPedotMutationsPlotURL ? 'mutations' : ''
  },
]

const dataDownloaderColumns = [
  { id: 'geneSymbol' },
  { id: 'PMTL' },
  { id: 'dataset' },
  { id: 'Disease' },
  { id: 'diseaseFromSourceMappedId', label:'EFO' },
  { id: 'MONDO' },
  { id: 'geneFullName' },
  { id: 'geneType' },
  { id: 'proteinRefseqId' },
  { id: 'targetFromSourceId', label: 'geneEnsemblID' },
  { id: 'proteinEnsemblId' },
  { id: 'totalMutationsOverPatientsInDataset' },
  { id: 'frequencyInOverallDataset' },
  { id: 'totalPrimaryTumorsMutatedOverPrimaryTumorsInDataset' },
  { id: 'frequencyInPrimaryTumors' },
  { id: 'totalRelapseTumorsMutatedOverRelapseTumorsInDataset' },
  { id: 'frequencyInRelapseTumors' },
  { id: 'OncoKBCancerGene' },
  { id: 'OncoKBOncogeneTSG' },
  { id: 'pedcbioPedotOncoprintPlotURL' },
  { id: 'pedcbioPedotMutationsPlotURL' },
]

function SnvByGeneTab({data, dataDownloaderFileStem}) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <DataTable
          dataDownloaderColumns={dataDownloaderColumns}
          dataDownloaderFileStem={dataDownloaderFileStem}
          columns={columns}
          rows={data}
          dataDownloader
          showGlobalFilter
          rowsPerPageOptions={defaultRowsPerPageOptions}
          noWrapHeader={false}
          order="asc"
        />
      </Grid> 
    </Grid>
  )
}

export default SnvByGeneTab;