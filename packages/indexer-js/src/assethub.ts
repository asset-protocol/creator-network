import { ApolloClient, gql, useQuery } from '@apollo/client';
import { AssetHubInfo } from '@creator-network/core';

export type GqlAssetHubList<T> = {
  assetHubs: T[];
};

const GET_Asset_HUBS = gql`
  query GetAssetHubs($owners: [String!], $limit: Int) {
    assetHubs(
      where: { admin_in: $owners }
      limit: $limit
      orderBy: timestamp_ASC
    ) {
      id
      admin
      name
      isOpen
      nftGatedModule
      feeCollectModule
      tokenCollectModule
      timestamp
      management
      version
      hash
      metadata
    }
  }
`;

const GET_HUB_BY_ID = gql`
  query GetHubById($id: String!) {
    assetHubById(id: $id) {
      id
      admin
      name
      isOpen
      nftGatedModule
      feeCollectModule
      tokenCollectModule
      timestamp
      version
      management
      hash
      metadata
    }
  }
`;

export function useGetAssetHubs(
  owners?: string[],
  skipFunc?: (owners?: string[]) => boolean
) {
  const { data, ...res } = useQuery<GqlAssetHubList<AssetHubInfo>>(
    GET_Asset_HUBS,
    {
      variables: { owners, limit: 999 },
      skip: skipFunc?.(owners),
    }
  );
  return { ...res, data: data?.assetHubs ?? [] };
}

const GET_HUB_BY_NAME_OR_ID = gql`
  query GetAssetHubBy($nameOrId: String) {
    assetHubs(
      where: { OR: [{ id_eq: $nameOrId }, { name_eq: $nameOrId }] }
      orderBy: timestamp_ASC
    ) {
      id
      admin
      name
      isOpen
      nftGatedModule
      feeCollectModule
      tokenCollectModule
      timestamp
      version
      management
      hash
      metadata
    }
  }
`;

export function useGetAssetHubByNameOrId(nameOrId?: string) {
  nameOrId = nameOrId || '';
  const { data, ...res } = useQuery<GqlAssetHubList<AssetHubInfo>>(
    GET_HUB_BY_NAME_OR_ID,
    {
      variables: {
        nameOrId: nameOrId,
      },
      skip: !nameOrId,
    }
  );
  return { ...res, data: data?.assetHubs[0] };
}

export class AssetHubAPI {
  constructor(private _client: ApolloClient<unknown>) {}

  async fetchAssetHubs(owners?: string[], limit?: number) {
    const { data } = await this._client.query<GqlAssetHubList<AssetHubInfo>>({
      query: GET_Asset_HUBS,
      variables: { owners, limit: limit ?? 10 },
      fetchPolicy: 'no-cache',
    });
    return data.assetHubs;
  }
  async fetchByNameOrId(nameOrId: string) {
    const { data } = await this._client.query<GqlAssetHubList<AssetHubInfo>>({
      query: GET_HUB_BY_NAME_OR_ID,
      variables: { nameOrId: nameOrId },
      fetchPolicy: 'no-cache',
    });
    return data.assetHubs[0];
  }
}
