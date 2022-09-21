import React from 'react';
import RelevantIcon from '../../../components/RMTL/RelevantIcon';
import NonRelevantIcon from '../../../components/RMTL/NonRelevantIcon';
import Link from '../../../components/Link';
import { genericComparator } from '../../../utils/comparators';

/*
 * Expected input as a String and their associate Icon return
 * Relevant Molecular Target (PMTL version x.x) => Icon [R]
 * Non-Relevant Molecular Target (PMTL version x.x) => Icon [NR]
 * "" => No Icon
 */
export const renderPMTLCell = pmtlText => {
  let PMTLIcon = '';
  if (pmtlText) {
    if (pmtlText.indexOf('Non-Relevant', 0) !== -1) {
      PMTLIcon = <NonRelevantIcon />;
    } else {
      PMTLIcon = <RelevantIcon />;
    }
  }
  return PMTLIcon;
};

// return a default Tab that has available data
export const getSADefaultTab = data => {
  let defaultTab = 'snvByGene';
  if (data) {
    const { snvByGene, snvByVariant, cnvByGene, fusionByGene, fusion } = data;
    if (snvByGene && snvByGene.count !== 0) {
      defaultTab = 'snvByGene';
    } else if (snvByVariant && snvByVariant.count !== 0) {
      defaultTab = 'snvByVariant';
    } else if (cnvByGene && cnvByGene.count !== 0) {
      defaultTab = 'cnvByGene';
    } else if (fusionByGene && fusionByGene.count !== 0) {
      defaultTab = 'fusionByGene';
    } else if (fusion && fusion.count !== 0) {
      defaultTab = 'fusion';
    }
  }
  return defaultTab;
};

export const addCustomFields = (columns, minWidth = '160px') => {
  const labelStyle = { padding: '2px 10px 2px 5px' };
  columns.map(
    (data, i) =>
      (columns[i] = data.minWidth
        ? { ...data, labelStyle }
        : { ...data, minWidth, labelStyle })
  );
};
export const addColumnCustomFields = (column, minWidth = '160px') => {
  const labelStyle = { padding: '2px 10px 2px 5px' };
  return column.minWidth
    ? { ...column, labelStyle }
    : { ...column, minWidth, labelStyle };
};

/*
 * Below are Helper Function to support interpretConfig() Function
 */
// Create Link using the Link components
function createLink({ type, url, linkText }) {
  let link = '';
  // console.log("Config| Creating Link: ", type, url, linkText)
  if (type === 'external') {
    link =
      !isEmpty(linkText) && !isEmpty(url) ? (
        <Link external to={url}>
          {' '}
          {linkText}{' '}
        </Link>
      ) : (
        ''
      );
  } else if (type === 'internal') {
    link =
      !isEmpty(linkText) && !isEmpty(url) ? (
        <Link to={url}> {linkText} </Link>
      ) : (
        ''
      );
  }
  return link;
}

function getFormattedString(str, row) {
  if (str && str.length > 0) {
    // Regex: ex. to get targetFromSourceId from /target/${targetFromSourceId}
    const regex = /\$\{((\w)+)\}/g
    // p1 is the value captured from ((\w)+) regex
    return str.replace(regex, (match, p1) => row[p1] || p1 || "");
  }
  return "";
}

// Generate a URL from input String, replace any ${id} with row[id]
function getURL(row, configURL) {
  return getFormattedString(configURL, row)
}
// Generate Link Text from input String, replace any ${id} with row[id]
function getLinkText(row, configLinkText) {
  return getFormattedString(configLinkText, row)
}
// Handler for missing URL or linkText field
function handleMissingField() {
  const column = {
    renderCell: () => <></>,
    filterValue: () => null,
  };
  return column;
}
//
//Check if a String is null or empty
const isEmpty = myStr => {
  return myStr === null || myStr.trim() === '';
};
/* 
  Given configuration file, This function will interpret and return columns & dataDownloaderColumns 
  that are compatitable to the Table component
*/
export const interpretConfig = (config, addColumnCustomFields) => {
  let interpretedConfig = { columns: [], dataDownloaderColumns: [] };

  config.forEach(c => {
    /****************  Column Used for Exported file ****************/
    if (c.exportValue !== false) {
      const dataDownloaderColumns = { id: c.id };
      if (c.exportLabel) {
        dataDownloaderColumns.exportLabel = c.exportLabel;
      }
      if (typeof c.exportValue === "string") {
        dataDownloaderColumns.exportValue = (row) => getFormattedString(c.exportValue, row)
      }
      interpretedConfig.dataDownloaderColumns.push(dataDownloaderColumns);
    }
    /****************  Column Used for Displaying Table on the UI ****************/
    if (!c.hidden) {
      let column = { id: c.id };

      if (c.label) column.label = c.label;

      if (c.sortable !== false) column.sortable = true;

      if (c.externalLink || c.internalLink) {
        const linkObj = c.externalLink
          ? { type: 'external', obj: c.externalLink }
          : { type: 'internal', obj: c.internalLink };
        const { url, linkText } = linkObj.obj;

        if (!isEmpty(url) && !isEmpty(linkText)) {
          column.renderCell = row =>
            createLink({
              type: linkObj.type,
              url: getURL(row, url),
              linkText: getLinkText(row, linkText),
            });
          // The link text will be used for filtering purpose
          column.filterValue = row => getLinkText(row, linkText);
        } else {
          // Handle Links with missing field
          handleMissingField(c.id);
        }
      }

      if (c.id === 'PMTL') {
        column.renderCell = ({ PMTL }) => renderPMTLCell(PMTL);
        // TODO: ADD filterValue as a new Field under mtp-config
        column.filterValue = false;
      }

      if (c.comparator) {
        const {
          id, /* |Type: String| If provide, the comparator function will use this id for comparison 
                 instead of the current column id. */
          isNumeric // |Type: Boolean| If true, data will be compared as numbers instead of string.
        } = c.comparator;
        column.comparator = (row1, row2) =>
          genericComparator(row1, row2, id || c.id, isNumeric || false);
      }

      column = addColumnCustomFields ? addColumnCustomFields(column) : column;
      interpretedConfig.columns.push(column);
    }
  });
  return interpretedConfig;
};

export function fetchConfigObj(apiURL) {
  return fetch(apiURL).then(res => res.json());
}
