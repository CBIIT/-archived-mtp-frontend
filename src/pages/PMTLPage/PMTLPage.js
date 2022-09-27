import React, { Component } from 'react';
import {
  Paper,
  Box,
  Typography,
  TextField,
  Link as Lk,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import crossfilter from 'crossfilter2';
import _ from 'lodash';

import BasePageMTP from '../../components/BasePageMTP';
import Link from '../../components/Link';
import DataDownloader from '../../components/DataDownloader';
import RMTLTable from '../../components/RMTLTable';
import RelevantIcon from '../../components/RMTL/RelevantIcon';
import NonRelevantIcon from '../../components/RMTL/NonRelevantIcon';
import UnspecifiedIcon from '../../components/RMTL/UnspecifiedIcon';
import ScrollToTop from '../../components/ScrollToTop';
import ExternalLinkIcon from '../../components/ExternalLinkIcon';
import { mtpPageNames } from '../../constants';
import PMTLData from './PMTL.json';

const { mtpPmtlDocPage } = mtpPageNames;

function getRows(downloadData) {
  const rows = [];
  downloadData.forEach(mapping => {
    rows.push({
      ensemblID: mapping.Ensembl_ID,
      targetSymbol: mapping.Approved_Symbol,
      designation: mapping.FDA_Designation,
      fdaClass: mapping.FDA_Class,
      fdaTarget: mapping.FDA_Target,
      mappingDescription: mapping.Mapping_Description,
    });
  });
  return rows;
}
/*
 * genericComparator: comparing row1 and row2 using the input keyName.
 * return: -1 if first string is lexicographically less than second property
 *          1 if first string is lexicographically greater than second property
 *          0 if both property are equal
 */
function genericComparator(row1, row2, keyName) {
  const a =
    typeof row1[keyName] === 'string'
      ? row1[keyName].toLowerCase()
      : row1[keyName];
  const b =
    typeof row2[keyName] === 'string'
      ? row2[keyName].toLowerCase()
      : row2[keyName];

  return a < b ? -1 : a > b ? 1 : 0;
}

function getColumns(
  targetSymbolOption,
  targetSymbolFilterHandler,
  designationOption,
  designationFilterHandler,
  fdaClassOption,
  fdaClassFilterHandler,
  fdaTargetOption,
  fdaTargetFilterHandler,
  mappingDescriptionOption,
  mappingDescriptionFilterHandler
) {
  const columns = [
    {
      id: 'targetSymbol',
      label: 'Target Symbol',
      renderCell: row => {
        const ensemblID = row.ensemblID;
        const url = '/target/' + ensemblID;
        return ensemblID !== 'Symbol_Not_Found' ? (
          <Link to={url} external>
            {row.targetSymbol}
          </Link>
        ) : (
          <p> {row.targetSymbol} </p>
        );
      },
      renderFilter: () => (
        <TextField
          label="Search..."
          margin="normal"
          fullWidth
          onChange={(event, newValue) => {
            targetSymbolFilterHandler(event, event.target);
          }}
        />
      ),
      comparator: (a, b) => genericComparator(a, b, 'targetSymbol'),
    },
    {
      id: 'designation',
      label: 'Designation',
      renderCell: row => {
        let RMTLIcon = <NonRelevantIcon />;
        if (row.designation === 'Relevant Molecular Target') {
          RMTLIcon = <RelevantIcon />;
        }
        return (
          <p>
            {RMTLIcon} {row.designation}
          </p>
        );
      },
      renderFilter: () => (
        <Autocomplete
          options={designationOption}
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          onChange={designationFilterHandler}
          renderInput={params => (
            <TextField {...params} label="Select..." margin="normal" />
          )}
        />
      ),
      comparator: (a, b) => genericComparator(a, b, 'designation'),
    },
    {
      id: 'fdaClass',
      label: 'FDA Class',
      renderFilter: () => (
        <Autocomplete
          options={fdaClassOption}
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          onChange={fdaClassFilterHandler}
          renderInput={params => (
            <TextField {...params} label="Select..." margin="normal" />
          )}
        />
      ),
      comparator: (a, b) => genericComparator(a, b, 'fdaClass'),
    },
    {
      id: 'fdaTarget',
      label: 'FDA Target',
      renderFilter: () => (
        <TextField
          fullWidth
          label="Search..."
          margin="normal"
          onChange={(event, newValue) => {
            fdaTargetFilterHandler(event, event.target);
          }}
        />
      ),
      comparator: (a, b) => genericComparator(a, b, 'fdaTarget'),
    },

    {
      id: 'mappingDescription',
      label: 'Mapping Description',
      renderFilter: () => (
        <Autocomplete
          options={mappingDescriptionOption}
          getOptionLabel={option => option.label}
          getOptionSelected={option => option.value}
          onChange={mappingDescriptionFilterHandler}
          renderInput={params => (
            <TextField {...params} label="Select..." margin="normal" />
          )}
        />
      ),
      comparator: (a, b) => genericComparator(a, b, 'mappingDescription'),
      tooltip: {
        badgeContent: () => (
          <Lk
            href={`${mtpPmtlDocPage.url}#mapping-description`}
            title="Explanation of 'Mapping Description' column"
          >
            <FontAwesomeIcon icon={faInfoCircle} size="sm" />
          </Lk>
        ),
      },
    },
  ];
  return columns;
}

const downloadColumns = [
  { id: 'ensemblID', label: 'ensemblID' },
  { id: 'targetSymbol', label: 'targetSymbol' },
  { id: 'designation', label: 'designation' },
  { id: 'fdaClass', label: 'fdaClass' },
  { id: 'fdaTarget', label: 'fdaTarget' },
  { id: 'mappingDescription', label: 'mappingDescription' },
];

const getTargetSymbolOptions = rows => {
  return _.uniqBy(rows, 'targetSymbol').map(row => ({
    label: row.targetSymbol,
    value: row.targetSymbol,
  }));
};

const getDesignationOptions = rows => {
  return _.uniqBy(rows, 'designation').map(row => ({
    label: row.designation,
    value: row.designation,
  }));
};

const getFdaClassOptions = rows => {
  return _.uniqBy(rows, 'fdaClass').map(row => ({
    label: row.fdaClass,
    value: row.fdaClass,
  }));
};

const getFdaTargetOptions = rows => {
  return _.uniqBy(rows, 'fdaTarget').map(row => ({
    label: row.fdaTarget,
    value: row.fdaTarget,
  }));
};

const getReformatMethodOptions = rows => {
  return _.uniqBy(rows, 'mappingDescription').map(row => ({
    label: row.mappingDescription,
    value: row.mappingDescription,
  }));
};

class PMTLPage extends Component {
  state = {
    filteredRows: getRows(PMTLData),
    pageSize: 25,
  };
  // Generic Function to handle column filtering
  columnFilterHandlerStartsWith = (e, selection, rmtlXf, columnDim) => {
    if (selection) {
      columnDim.filter(d =>
        d.toUpperCase().startsWith(selection.value.toUpperCase())
      );
    } else {
      columnDim.filterAll();
    }

    this.setState({ filteredRows: rmtlXf.allFiltered() });
  };

  // Generic Function to handle column filtering
  columnFilterHandlerParticalMatch = (e, selection, rmtlXf, columnDim) => {
    if (selection) {
      columnDim.filter(
        d =>
          ' '
            .concat(d.toUpperCase())
            .indexOf(' '.concat(selection.value.toUpperCase())) !== -1
      );
    } else {
      columnDim.filterAll();
    }

    this.setState({ filteredRows: rmtlXf.allFiltered() });
  };

  // Generic Function to handle column filtering
  columnFilterHandlerExact = (e, selection, rmtlXf, columnDim) => {
    if (selection) {
      columnDim.filter(d => d === selection.value);
    } else {
      columnDim.filterAll();
    }

    this.setState({ filteredRows: rmtlXf.allFiltered() });
  };

  targetSymbolFilterHandler = (e, selection) => {
    this.columnFilterHandlerStartsWith(
      e,
      selection,
      this.rmtlXf,
      this.targetSymbolDim
    );
  };

  designationFilterHandler = (e, selection) => {
    this.columnFilterHandlerExact(
      e,
      selection,
      this.rmtlXf,
      this.designationDim
    );
  };

  fdaClassFilterHandler = (e, selection) => {
    this.columnFilterHandlerExact(e, selection, this.rmtlXf, this.fdaClassDim);
  };

  fdaTargetFilterHandler = (e, selection) => {
    this.columnFilterHandlerParticalMatch(
      e,
      selection,
      this.rmtlXf,
      this.fdaTargetDim
    );
  };

  mappingDescriptionFilterHandler = (e, selection) => {
    this.columnFilterHandlerExact(
      e,
      selection,
      this.rmtlXf,
      this.mappingDescriptionDim
    );
  };

  componentDidMount() {
    this.rmtlXf = crossfilter(getRows(PMTLData));
    this.targetSymbolDim = this.rmtlXf.dimension(row => row.targetSymbol);
    this.designationDim = this.rmtlXf.dimension(row => row.designation);
    this.fdaClassDim = this.rmtlXf.dimension(row => row.fdaClass);
    this.fdaTargetDim = this.rmtlXf.dimension(row => row.fdaTarget);
    this.mappingDescriptionDim = this.rmtlXf.dimension(
      row => row.mappingDescription
    );
  }

  handleRowsPerPageChange = newPageSize => {
    this.setState({ pageSize: newPageSize });
  };

  render() {
    // Download Data will be coming from getDownloadRows()
    const { filteredRows, pageSize } = this.state;

    const loading = false,
      error = false;
    const targetSymbolOptions = getTargetSymbolOptions(filteredRows);
    const designationOptions = getDesignationOptions(filteredRows);

    const fdaClassOptions = getFdaClassOptions(filteredRows);
    const fdaTargetOptions = getFdaTargetOptions(filteredRows);
    const mappingDescriptionOptions = getReformatMethodOptions(filteredRows);

    const columns = getColumns(
      targetSymbolOptions,
      this.targetSymbolFilterHandler,
      designationOptions,
      this.designationFilterHandler,
      fdaClassOptions,
      this.fdaClassFilterHandler,
      fdaTargetOptions,
      this.fdaTargetFilterHandler,
      mappingDescriptionOptions,
      this.mappingDescriptionFilterHandler
    );
    const rowsPerPageOptions = [10, 25, 50];
    const FDA_Publication =
      'https://www.fda.gov/about-fda/oncology-center-excellence/pediatric-oncology#target';

    return (
      <BasePageMTP title="PMTL">
        <ScrollToTop />
        <Typography variant="h4" component="h1" align="center" paragraph>
          US Food & Drug Administration Pediatric Molecular Target Lists (FDA
          PMTL)
        </Typography>
        <br />
        <Typography paragraph>
          <Link to={mtpPmtlDocPage.url}> Version 1.1 </Link>
        </Typography>
        <hr />
        <br />
        <Typography paragraph>
          Targets in the FDA's Pediatric Molecular Target Lists (PMTL) are
          important for studies of pediatric cancer and have special legal
          requirements associated with drug development. The table below is a
          computable interpretation of the target lists published by the FDA.
          See our{' '}
          <Link to={mtpPmtlDocPage.url}>
            <b>{mtpPmtlDocPage.label}</b>
          </Link>{' '}
          or the official{' '}
          <Link external to={FDA_Publication}>
            <b>FDA publication</b>
            <ExternalLinkIcon />
          </Link>{' '}
          for details.
        </Typography>
        <Typography paragraph>
          Each target in the list is designated as either a <RelevantIcon />{' '}
          <b> Relevant Molecular Target </b> or <NonRelevantIcon />{' '}
          <b> Non-Relevant Molecular Target</b>. Any target not in this list is
          considered an <UnspecifiedIcon /> <b> Unspecified Target</b> by
          default.
        </Typography>
        <br />
        <hr />
        <br />
        <Paper variant="outlined" elevation={0}>
          <Box m={2}>
            {loading || error ? null : (
              <>
                <Lk
                  href={`${mtpPmtlDocPage.url}#colums-description`}
                  title="FDA PMTL Columns Description"
                >
                  <FontAwesomeIcon icon={faInfoCircle} size="md" /> Columns
                  Description
                </Lk>
                <DataDownloader
                  tableHeaders={downloadColumns}
                  rows={filteredRows}
                  fileStem={`pmtl`}
                />
                <RMTLTable
                  filters
                  columns={columns}
                  data={filteredRows}
                  pageSize={pageSize}
                  onRowsPerPageChange={this.handleRowsPerPageChange}
                  rowsPerPageOptions={rowsPerPageOptions}
                />
              </>
            )}
          </Box>
        </Paper>
      </BasePageMTP>
    );
  }
}
export default PMTLPage;
