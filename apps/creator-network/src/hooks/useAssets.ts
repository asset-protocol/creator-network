import { gql, useQuery } from '@apollo/client';

const GET_LOCATIONS = gql`
  query GetLocations {
    assets {
      id
      timestamp
      image
      collectCount
      name
      description
      metadata
      assetId
    }
  }
`;

function useAssets() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  return { loading, error, data }
}

export default useAssets