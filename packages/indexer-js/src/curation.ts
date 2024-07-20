import { ApolloClient, gql, useQuery } from '@apollo/client';
import { Asset, AssetHubInfo } from '@creator-network/core';

export enum CurationStatus {
  Private = 0,
  Public = 1,
}

export enum AssetApprovalStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
  Expired = 3,
}

export type Curation = {
  id: string;
  tokenId: string;
  name: string;
  description: string;
  image: string;
  status: CurationStatus;
  expiry: number;
  hub: AssetHubInfo;
  tokenURI: string;
  timestamp: string;
  lastUpdatedAt: number;
  externalUrl: string;
  hash: string;
  assets: { asset: Asset; status: AssetApprovalStatus }[];
};
export type GqlCurationList<T> = {
  curationsConnection: {
    edges: { node: T }[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

const GET_CURATIONS = gql`
  query GetCurations($contract: String, $hub: String) {
    curationsConnection(
      orderBy: timestamp_DESC
      where: { hub: { id_eq: $hub }, contract_eq: $contract }
    ) {
      edges {
        node {
          id
          tokenId
          status
          image
          hash
          description
          lastUpdatedAt
          name
          hub {
            id
            name
            metadata
          }
          expiry
          externalUrl
          timestamp
          tokenURI
          assets(limit: 4) {
            status
            asset {
              id
              name
              publisher
              type
              timestamp
              description
              assetId
              image
            }
          }
        }
      }
    }
  }
`;

export function useGetCurations() {
  const { data, ...res } = useQuery<GqlCurationList<Curation>>(GET_CURATIONS, {
    fetchPolicy: 'no-cache',
  });
  return {
    ...res,
    data: data?.curationsConnection.edges.map((edge) => edge.node),
  };
}

const GET_CURATION_BY_ID = gql`
  query GetCurationById($id: String!) {
    curationById(id: $id) {
      id
      tokenId
      name
      image
      description
      lastUpdatedAt
      metadata
      hub {
        id
        name
        metadata
      }
      expiry
      tokenURI
      externalUrl
      timestamp
      assets {
        status
        asset {
          id
          image
          name
          description
          timestamp
          type
          lastUpdatedAt
          publisher
          hub {
            id
            name
            metadata
          }
          assetId
          collectCount
          tags {
            name
          }
        }
      }
    }
  }
`;

export function useGetCurationById(id: string) {
  const { data, ...res } = useQuery<{ curationById: Curation | null }>(
    GET_CURATION_BY_ID,
    {
      variables: { id },
      fetchPolicy: 'no-cache',
      skip: !id,
    }
  );
  return { ...res, data: data?.curationById };
}

const GET_CURATION_ASSETS = gql`
  query GetCurationAssets($publisher: String, $status: Int) {
    curations(
      where: {
        assets_some: { asset: { publisher_eq: $publisher }, status_eq: $status }
      }
    ) {
      assets(
        where: { status_eq: $status, asset: { publisher_eq: $publisher } }
      ) {
        asset {
          id
          assetId
          type
          hub
          hubName
          name
          description
          image
        }
        approveAt
        status
        timestamp
      }
      name
      description
      image
      id
      publisher
      expiry
      timestamp
      externalUrl
    }
  }
`;

export function useGetCurationAssets(
  publisher: string,
  status?: AssetApprovalStatus
) {
  const { data, ...res } = useQuery<{ curations: Curation[] }>(
    GET_CURATION_ASSETS,
    {
      variables: { publisher, status },
      fetchPolicy: 'no-cache',
      skip: !publisher,
    }
  );
  return { ...res, data: data?.curations };
}

const GET_CURATION_TAG_NAMES = gql`
  query GetAssetTagNames($keyword: String, $limit: Int) {
    assetTagNames(keyword: $keyword, limit: $limit) {
      name
      count
    }
  }
`;
export function useGetCurationTagNames(keyword?: string, limit?: number) {
  const { data, ...res } = useQuery<{
    curationTagNames: { name: string; count: number }[];
  }>(GET_CURATION_TAG_NAMES, {
    variables: { keyword, limit },
    fetchPolicy: 'no-cache',
  });
  return { ...res, data: data?.curationTagNames };
}

const GET_ASSET_STATUS = gql`
  query GetCurationAssetsStatus(
    $curationId: String!
    $assets: [String!]!
    $hubs: [String!]!
  ) {
    curationAssetStatus(hubs: $hubs, assets: $assets, curationId: $curationId)
  }
`;
export function useGetCurationAssetsStatus(
  curationId: string,
  assets: { hub: string; assetId: string }[]
) {
  const hubs = assets.map((a) => a.hub);
  const assetIds = assets.map((a) => a.assetId);
  const { data, ...res } = useQuery<{
    curationAssetStatus: AssetApprovalStatus[];
  }>(GET_ASSET_STATUS, {
    variables: { curationId, hubs, assets: assetIds },
    fetchPolicy: 'no-cache',
    skip: !assets || assets.length === 0,
  });
  return { ...res, data: data?.curationAssetStatus };
}

export class CurationAPI {
  constructor(private client: ApolloClient<unknown>) {}

  async fetchCurations(curation: string, studio?: string) {
    console.log('fetchCurations', curation, studio);
    const { data } = await this.client.query<GqlCurationList<Curation>>({
      query: GET_CURATIONS,
      variables: {
        hub: studio,
        contract: curation,
      },
      fetchPolicy: 'no-cache',
    });
    console.log('fetchCurations', data);
    return data.curationsConnection.edges.map((edge) => edge.node);
  }
  async fetchById(tokenId: string) {
    const { data } = await this.client.query<{
      curationById: Curation | null;
    }>({
      query: GET_CURATION_BY_ID,
      variables: { id: tokenId },
      fetchPolicy: 'no-cache',
    });
    return data.curationById;
  }
}
