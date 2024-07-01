import { gql, useQuery } from '@apollo/client';


const GET_LOCATIONS = gql`
  query GetAssetsHubs {
    assetHubs {
      id
      name
    }
  }
`;

function useAssetsTotalCount() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  return { loading, error, data }
}

export default useAssetsTotalCount