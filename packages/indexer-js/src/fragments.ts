import { gql } from '@apollo/client';

export const ASSET_FIELDS = gql`
  fragment AssetFields on Asset {
    id
    assetId
    hub {
      id
      name
      metadata
    }
    type
    name
    image
    description
    tags {
      name
    }
    publisher
    contentUri
    timestamp
    lastUpdatedAt
    hash
    collectModule
    collectModuleInitData
    collectNft
    collectCount
    gatedModule
    gatedModuleInitData
    query1
    query2
  }
`;
