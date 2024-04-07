import { gql, useQuery } from '@apollo/client';

const GET_ASSET_TOTAL_COUNT = gql`
  query getAssetsTotalCount($id: String!){
    assetsConnection(orderBy: id_ASC, where: {hub_eq: $id}) {
      totalCount
    }
  }
`;

function useAssetsTotalCount(id: string) {
  const { loading, error, data } = useQuery(GET_ASSET_TOTAL_COUNT, {
    variables: { 
      id,
      orderBy: 'id_ASC',
    }
  });
  return { loading, error, data }
}

export default useAssetsTotalCount