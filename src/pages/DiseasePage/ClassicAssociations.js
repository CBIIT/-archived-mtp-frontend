import React, { useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import ClassicAssociationsTable from './ClassicAssociationsTable';
import { Facets } from '../../components/Facets';
import Link from '../../components/Link';

const DISEASE_FACETS_QUERY = loader('./DiseaseFacets.gql');

function ClassicAssociations({ efoId, name }) {
  const [aggregationFilters, setAggregationFilters] = useState([]);
  const { loading, data } = useQuery(DISEASE_FACETS_QUERY, {
    variables: { efoId, aggregationFilters },
  });

  const handleChangeFilters = newFilters => {
    setAggregationFilters(newFilters);
  };

  const facetData = data?.disease?.associatedTargets.aggregations.aggs;

  return (
    <Grid style={{ marginTop: '8px' }} container spacing={2}>
      <Grid item xs={12} md={4}>
        <Typography variant="h6">
          {data ? (
            <>
              <strong>{data.disease.associatedTargets.count} targets</strong>{' '}
              associated with <strong>{data.disease.name}</strong>
            </>
          ) : (
            <strong>Loading...</strong>
          )}
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="h6">
          {data ? (
            <>
            <span style={{fontSize: '15px'}}>Pediatric Cancer Data is not yet part of these results. Please use </span> {' '} 
              <Link to={{
                pathname: "/pediatric-cancer-data-navigation",
                state: {
                  entity: 'disease',
                  'disease': name
                }
              }}>
                <span style={{fontSize: '16px'}}>Pediatric Cancer Data Navigation</span>
              </Link> {' '}
              <span style={{fontSize: '15px'}}>to search for pediatric cancer data.</span>
            </>
          ) : (
            <></>
          )}
        </Typography>
      </Grid>{' '}

      <Grid item xs={12} lg={3}>
        <Card elevation={0}>
          <CardContent>
            <Facets
              loading={loading}
              data={facetData}
              onChange={handleChangeFilters}
              type="target"
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={9}>
        <Card elevation={0} style={{ overflow: 'visible' }}>
          <CardContent>
            <ClassicAssociationsTable
              efoId={efoId}
              aggregationFilters={aggregationFilters}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ClassicAssociations;
