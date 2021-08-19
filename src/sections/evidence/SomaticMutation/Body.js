import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import SectionItem from '../../../components/Section/SectionItem';
import { DataTable } from '../../../components/Table';
import Description from './Description';
import Link from '../../../components/Link';
import RelevantIcon from '../../../components/RMTL/RelevantIcon'
import { defaultRowsPerPageOptions } from '../../../constants';
import * as DummyData from './DummyData';

// Configuration for how the tables will display each column/row
const columns = {
  snvByGene: [
    {
      id: 'Gene_symbol', label: 'Gene symbol',
      renderCell: ({ Gene_symbol, Gene_Ensembl_ID }) => 
          <Link to={`/target/${Gene_Ensembl_ID}`}>{Gene_symbol}</Link>
    },
    { id: 'PMTL', label: 'PMTL', renderCell: () => <RelevantIcon/>},
    { id: 'Dataset', label: 'Dataset' },
    { id: 'Disease', label: 'Disease' },
    { id: 'EFO', label: 'EFO' },
    { id: 'MONDO',label: 'MONDO'},
    { id: 'Gene_full_name',label: 'Gene full name'},
    { id: 'Gene_type', label: 'Gene type'},
    { id: 'Protein_RefSeq_ID', label: 'Protein RefSeq ID' },
    { id: 'Total_mutations_Over_Patients_in_dataset', label: 'Total mutations Over Patients in dataset'},
    { id: 'Frequency_in_overall_dataset', label: 'Frequency in overall dataset'},
    { id: 'Total_primary_tumors_mutated_Over_Primary_tumors_in_dataset', label: 'Total primary tumors mutated Over Primary tumors in dataset'},
    { id: 'Frequency_in_relapse_tumors', label: 'Frequency in relapse tumors'},
    { id: 'OncoKB_cancer_gene', label: 'OncoKB cancer geneD'},
    { id: 'OncoKB_oncogene_T', label: 'OncoKB oncogene T'},
    { id: 'PedcBioPortal', label: 'PedcBioPortal'},
    { id: 'PedcBioPed', label: 'PedcBioPed'},
  ],
  snvByVariant: [
    { id:'Protein_change', label:'Protein change' },
    { id:'Gene_symbol', label:'Gene symbol' },
    { id:'PMTL', label:'PMTL', renderCell: () => <RelevantIcon/>},
    { id:'Dataset', label:'Dataset' },
    { id:'Disease', label:'Disease' },
    { id:'EFO', label:'EFO' },
    { id:'MONDO', label:'MONDO' },
    { id:'Variant_ID_hg38', label:'Variant ID hg38' },
    { id:'dbSNP_ID', label:'dbSNP ID' },
    { id:'VEP_impact', label:'VEP impact' },
    { id:'SIFT_impact', label:'SIFT impact' },
    { id:'PolyPhen_impact', label:'PolyPhen impact' },
    { id:'Variant_classification', label:'Variant classification' },
    { id:'Variant_type', label:'Variant type' },
    { id:'Gene_full_name', label:'Gene full name' },
    { id:'Protein_RefSeq_ID', label:'Protein RefSeq ID' },
    { id:'Gene_Ensembl_ID', label:'Gene Ensembl ID' },
    { id:'Protein_Ensembl_ID', label:'Protein Ensembl ID' },
    { id:'Total_mutations_Over_Patients_in_dataset', label:'Total mutations Over Patients in dataset' },
    { id:'Frequency_in_overall_dataset', label:'Frequency in overall dataset' },
    { id:'Total_primary_tumors_mutated_Over_Primary_tumors_in_dataset', label:'Total primary tumors mutated Over Primary tumors in dataset' },
    { id:'Frequency_in_primary_tumors', label:'Frequency_in_primary_tumors' },
    { id:'Total_relapse_tumors_mutated_Over_Relapse_tumors_in_dataset', label:'Total relapse tumors mutated Over Relapse tumors in dataset' },
    { id:'Frequency_in_relapse_tumors', label:'Frequency in relapse tumors' },
    { id:'HotSpot', label:'HotSpot' },
    { id:'OncoKB_cancer_gene', label:'OncoKB cancer gene' },
    { id:'OncoKB_oncogene_TSG', label:'OncoKB oncogene TSG' },
  ],
  cnvByGene: [
    { id:'Gene_symbol', label:'Gene symbol'},
    { id:'Gene_Ensembl_ID', label:'Gene Ensembl ID'},
    { id:'Variant_type', label:'Variant type'}, 
    { id:'Variant_category', label:'Variant category'},
    { id:'Dataset', label:'Dataset'},
    { id:'Disease', label:'Disease'},
    { id:'Total_alterations/Patients_in_dataset', label:'Total alterations / Patients in dataset'},
    { id:'Frequency_in_overall_dataset', label:'Frequency in overall dataset'},
    { id:'Total_primary_tumors_altered/Primary_tumors_in_dataset', label:'Total primary tumors altered/Primary tumors in dataset'},
    { id:'Frequency_in_primary_tumors', label:'Frequency in primary tumors'},
    { id:'Total_relapse_tumors_altered/Relapse_tumors_in_dataset', label:''},
    { id:'Frequency_in_relapse_tumors', label:'Frequency in relapse tumors'},
    { id:'Gene_full_name', label:'Gene full name'},
    { id:'RMTL', label:'RMTL', renderCell: () => <RelevantIcon/>},
    { id:'OncoKB_cancer_gene', label:'OncoKB cancer gene'},
    { id:'OncoKB_oncogene_TSG', label:'OncoKB oncogene TSG'},
    { id:'EFO', label:'EFO'},
    { id:'MONDO', label:'MONDO'},
  ]
};

function Body({ definition, id, label }) {
  // Dummy data generated from internal files for populating the tables in the UI
  let request = {
    data: {
      disease: {
        id: "EFO_0000621",
        evidences: {
          snvByGeneRows: DummyData.snvByGeneRows,
          snvByVariantRows: DummyData.snvByVariantRows,
          cnvByGeneRows: DummyData.cnvByGeneRows
        }
      }
    },
    loading: false,
    error: false,
  }
  return (
    <SectionItem
      definition={definition}
      request={request}
      renderDescription={() => (
        <Description symbol={label.symbol} name={label.name} />
      )}
      renderBody={({ disease }) => {
        const { snvByGeneRows, snvByVariantRows, cnvByGeneRows } = disease.evidences;
        return (
          <>
            <Grid container spacing={4}>
              {/* table 1: SNV by Gene */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  SNV by Gene 
                </Typography>
                <DataTable
                  columns={columns.snvByGene}
                  rows={snvByGeneRows}
                  dataDownloader
                  showGlobalFilter
                  rowsPerPageOptions={defaultRowsPerPageOptions}
                  order="asc"
                />
              </Grid>
              {/* table 2: SNV by Variant */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  SNV by Variant 
                </Typography>
                <DataTable
                  columns={columns.snvByVariant}
                  rows={snvByVariantRows}
                  dataDownloader
                  showGlobalFilter
                  rowsPerPageOptions={defaultRowsPerPageOptions}
                  order="asc"
                />
              </Grid>
              {/* table 3: CNV by Gene*/}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                CNV by Gene
                </Typography>
                <DataTable
                  columns={columns.cnvByGene}
                  rows={cnvByGeneRows}
                  dataDownloader
                  showGlobalFilter
                  rowsPerPageOptions={defaultRowsPerPageOptions}
                  order="asc"
                />
              </Grid>
            </Grid>
          </>
        );
      }}
    />
  );
}

export default Body;