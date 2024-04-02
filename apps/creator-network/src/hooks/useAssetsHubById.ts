import { gql, useQuery } from '@apollo/client';


const GET_ASSETS_HUBS_BY_ID = gql`
  query GetAssetsHubsById($id: String!) {
    assetHubById(id: $id) {
      admin
      createAssetModule
      feeCollectModule
      hash
      id
      implementation
      name
      nftGatedModule
      timestamp
      tokenCollectModule
      version
    }
  }
`;

function useAssetHubsById(id: string) {
  const { loading, error, data } = useQuery(GET_ASSETS_HUBS_BY_ID, {
    variables: { id }
  });
  return { loading, error, data }
}

export default useAssetHubsById