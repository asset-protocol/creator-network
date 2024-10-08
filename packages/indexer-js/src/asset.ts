import {
  ApolloClient,
  FetchPolicy,
  gql,
  useApolloClient,
  useQuery,
} from '@apollo/client';
import { ASSET_FIELDS } from './fragments';
import { Asset } from '@creator-network/core';

export type GqlAssetList<T> = {
  assetsConnection: {
    edges: { node: T }[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

const GET_HUb_ASSETS = (args: GetAssetHubAssetsInput) => gql`
${ASSET_FIELDS}
query GetAssets(
  ${args.hub ? '$hub: String, ' : ''}
  $publisher: String, 
  ${args.search ? '$search: String, ' : ''}
  $assetId: BigInt,
  ${args.tags?.length ? '$tags: [String!], ' : ''}, 
  $first: Int, 
  $after: String, 
  $orderBy: [AssetOrderByInput!]!
){
  assetsConnection(
    first: $first,
    after: $after,
    orderBy: $orderBy,
    where: { 
      ${args.hub ? 'hub: {id_eq: $hub}, ' : ''}
      publisher_eq: $publisher,
      ${args.search ? 'name_containsInsensitive: $search,' : ''}
      assetId_eq: $assetId,
      ${args.tags?.length ? ', tags_some: {normalizedName_in: $tags}' : ''} 
    }){
      edges {
        node {
          ...AssetFields
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
}
`;

export type AssetsOrderBy =
  | 'timestamp_ASC'
  | 'timestamp_DESC'
  | 'collectCount_ASC'
  | 'collectCount_DESC'
  | 'type_DESC'
  | 'type_ASC';

export type GetAssetHubAssetsInput = {
  hub?: string;
  publisher?: string;
  assetId?: string;
  search?: string;
  tags?: string[];
  first?: number;
  after?: string;
  orderBy?: AssetsOrderBy[];
  fetchPolicy?: FetchPolicy;
  skipFunc?: (args: GetAssetHubAssetsInput) => boolean;
};

const defaultInput: GetAssetHubAssetsInput = {
  orderBy: ['timestamp_DESC'],
};

export function useGetAssets(args?: GetAssetHubAssetsInput) {
  const gqlText = GET_HUb_ASSETS(args ?? {});
  const { data, ...res } = useQuery<GqlAssetList<Asset>>(gqlText, {
    variables: { ...defaultInput, ...args },
    fetchPolicy: args?.fetchPolicy,
    skip: args?.skipFunc?.(args),
  });
  const newData = {
    assets: data?.assetsConnection.edges.map((a) => {
      return a.node;
    }),
    pageInfo: data?.assetsConnection.pageInfo,
  };
  return { ...res, data: newData };
}

export function useGetAssetsByWallet(publisher: string, hub: string) {
  return useGetAssets({
    hub: hub,
    publisher: publisher,
  });
}

const SEARCH_ASSETS = gql`
  query SearchAssets($query: String!) {
    assets(where: { name_containsInsensitive: $query }) {
      id
      assetId
      hub {
        id
        name
        metadata {
          description
          image
        }
      }
      type
      name
      image
      description
      tags {
        name
      }
      publisher
      timestamp
      hash
    }
  }
`;
export function useSearchAssets(keyword: string) {
  const { data, ...res } = useQuery<{ assets: Asset[] }>(SEARCH_ASSETS, {
    variables: { query: keyword },
    fetchPolicy: 'no-cache',
    skip: !keyword,
  });
  return { ...res, data: data?.assets };
}

const GET_HUb_ASSETS_BY_BIZID = gql`
  ${ASSET_FIELDS}
  query GetAssets(
    $hub: String
    $publisher: String
    $assetId: BigInt
    $first: Int
    $after: String
    $orderBy: [AssetOrderByInput!]!
  ) {
    assetsConnection(
      first: $first
      after: $after
      orderBy: $orderBy
      where: {
        hub: { id_eq: $hub }
        publisher_eq: $publisher
        assetId_eq: $assetId
      }
    ) {
      edges {
        node {
          content
          metadata
          ...AssetFields
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const GET_ASSET_BY_ID = gql`
  ${ASSET_FIELDS}
  query assetById($id: String!) {
    assetById(id: $id) {
      content
      metadata
      ...AssetFields
    }
  }
`;

export function useGetAssetById(assetId: bigint, hub: string) {
  const tokenId = assetId.toString();
  const { data, ...res } = useQuery<GqlAssetList<Asset>>(
    GET_HUb_ASSETS_BY_BIZID,
    {
      variables: { assetId: tokenId, hub: hub, orderBy: 'timestamp_DESC' },
      fetchPolicy: 'no-cache',
      skip: !hub,
    }
  );
  return { ...res, asset: data?.assetsConnection.edges?.[0]?.node };
}

const REFRESH_ASSET_METADATA = gql`
  query RefreshMetatData($assetId: String!, $hub: String!) {
    refreshMetatData(assetId: $assetId, hub: $hub)
  }
`;
export function useRefreshAssetMetadata() {
  const client = useApolloClient();

  const refresh = async (assetId: bigint, hub: string) => {
    const res = await client.query<{ refreshMetatData: boolean }>({
      query: REFRESH_ASSET_METADATA,
      variables: { assetId: assetId.toString(), hub },
      fetchPolicy: 'no-cache',
    });
    return res.data.refreshMetatData;
  };
  return { refresh };
}

const GET_ASSET_TAG_NAMES = gql`
  query GetAssetTagNames($keyword: String, $limit: Float) {
    assetTagNames(keyword: $keyword, limit: $limit) {
      name
      count
    }
  }
`;

export function useGetAssetTagNames(keyword?: string, limit?: number) {
  const { data, ...res } = useQuery<{
    assetTagNames: { name: string; count: number }[];
  }>(GET_ASSET_TAG_NAMES, {
    variables: { keyword, limit },
    fetchPolicy: 'no-cache',
  });
  return { ...res, data: data?.assetTagNames };
}

export class AssetsAPI {
  constructor(private client: ApolloClient<unknown>) {}

  async fetchAssetTags(keyword?: string, limit?: number) {
    const { data } = await this.client.query<{
      assetTagNames: { name: string; count: number }[];
    }>({
      query: GET_ASSET_TAG_NAMES,
      variables: { keyword, limit },
      fetchPolicy: 'no-cache',
    });
    return data.assetTagNames;
  }

  async fetchAssetByBizId(hub: string, assetId: string) {
    const res = await this.client.query<GqlAssetList<Asset>>({
      query: GET_HUb_ASSETS_BY_BIZID,
      fetchPolicy: 'no-cache',
      variables: {
        assetId: assetId.toString(),
        hub: hub,
        orderBy: 'timestamp_DESC',
      },
    });
    return res.data.assetsConnection.edges?.[0]?.node;
  }

  async fetchAssetById(id: string) {
    const res = await this.client.query<{ assetById: Asset | null }>({
      query: GET_ASSET_BY_ID,
      fetchPolicy: 'no-cache',
      variables: {
        id: id,
      },
    });
    return res.data.assetById;
  }

  async fetchAssets(args?: GetAssetHubAssetsInput) {
    if (args) {
      args.tags = args.tags?.map((t) => t.toLowerCase());
    }
    const { data } = await this.client.query<GqlAssetList<Asset>>({
      query: GET_HUb_ASSETS(args ?? {}),
      variables: { ...defaultInput, ...args },
      fetchPolicy: args?.fetchPolicy,
    });
    return {
      assets: data?.assetsConnection.edges.map((a) => {
        return a.node;
      }),
      pageInfo: data?.assetsConnection.pageInfo,
    };
  }
}
