import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

import Header from './Header';
import Profile from './Profile';
import BasePage from '../../components/BasePage';

const EVIDENCE_QUERY = gql`
  query EvidenceQuery($ensgId: String!, $efoId: String!) {
    target(ensgId: $ensgId) {
      id
      name
      uniprotId
      symbol
      description
      synonyms
    }
    disease(efoId: $efoId) {
      id
      name
      description
      synonyms
    }
  }
`;

const EvidencePage = ({ match }) => {
  const { ensgId, efoId } = match.params;

  const { loading, error, data } = useQuery(EVIDENCE_QUERY, {
    variables: { ensgId, efoId },
  });

  if (loading || error) return null;

  const { target, disease } = data;
  return (
    <BasePage>
      <Helmet>
        <title>{`Evidence for ${target.symbol} in ${disease.name}`}</title>
      </Helmet>
      <Header target={target} disease={disease} />
      <Profile
        ensgId={ensgId}
        efoId={efoId}
        target={target}
        disease={disease}
      />
    </BasePage>
  );
};

export default EvidencePage;
