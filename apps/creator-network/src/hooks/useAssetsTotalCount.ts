import { gql, useQuery } from '@apollo/client';

const GET_ASSET_TOTAL_COUNT = gql`
  query MyQuery {
    assetsConnection(orderBy: id_ASC, where: {hub_eq: "0xC2876F1d401aDe7041774AE81b3b272476e43eC0"}) {
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