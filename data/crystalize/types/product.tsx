export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Datetime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};






export type MetaProperty = {
  __typename?: 'MetaProperty';
  key: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
  endCursor: Scalars['String'];
  totalNodes: Scalars['Int'];
};



export type Query = {
  __typename?: 'Query';
  _service: _Service;
  grid?: Maybe<Grid>;
  catalogue?: Maybe<Item>;
  /** @deprecated `tree` query is deprecated and will be removed in a future release. Use the `catalogue` query instead. */
  tree?: Maybe<Array<Maybe<Item>>>;
  tenant?: Maybe<Tenant>;
  topics: Array<Topic>;
  version?: Maybe<VersionInfo>;
};


export type QueryGridArgs = {
  id: Scalars['ID'];
  language?: Maybe<Scalars['String']>;
};


export type QueryCatalogueArgs = {
  path?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  version?: Maybe<VersionLabel>;
};


export type QueryTreeArgs = {
  path?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
};


export type QueryTenantArgs = {
  language?: Maybe<Scalars['String']>;
};


export type QueryTopicsArgs = {
  name?: Maybe<Scalars['String']>;
  ancestry?: Maybe<Array<Scalars['String']>>;
  language?: Maybe<Scalars['String']>;
};

export type _Service = {
  __typename?: '_Service';
  /** The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied */
  sdl?: Maybe<Scalars['String']>;
};

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type BooleanContent = {
  __typename?: 'BooleanContent';
  value?: Maybe<Scalars['Boolean']>;
};

export type ComponentChoiceContent = {
  __typename?: 'ComponentChoiceContent';
  selectedComponent: Component;
};

export type ContentChunkContent = {
  __typename?: 'ContentChunkContent';
  chunks: Array<Array<Component>>;
};

export type DatetimeContent = {
  __typename?: 'DatetimeContent';
  datetime?: Maybe<Scalars['Datetime']>;
};

export type GridRelationsContent = {
  __typename?: 'GridRelationsContent';
  grids?: Maybe<Array<Grid>>;
};

export type ImageContent = {
  __typename?: 'ImageContent';
  images?: Maybe<Array<Image>>;
};

export type ItemRelationsContent = {
  __typename?: 'ItemRelationsContent';
  items?: Maybe<Array<Item>>;
};

export type LocationContent = {
  __typename?: 'LocationContent';
  lat?: Maybe<Scalars['Float']>;
  long?: Maybe<Scalars['Float']>;
};

export type NumericContent = {
  __typename?: 'NumericContent';
  number: Scalars['Float'];
  unit?: Maybe<Scalars['String']>;
};

export type ParagraphCollectionContent = {
  __typename?: 'ParagraphCollectionContent';
  paragraphs?: Maybe<Array<ParagraphContent>>;
};

export type ParagraphContent = {
  __typename?: 'ParagraphContent';
  title?: Maybe<SingleLineContent>;
  body?: Maybe<RichTextContent>;
  images?: Maybe<Array<Image>>;
  videos?: Maybe<Array<Video>>;
};

export type PropertiesTableContent = {
  __typename?: 'PropertiesTableContent';
  sections?: Maybe<Array<PropertiesTableSection>>;
};

export type PropertiesTableSection = {
  __typename?: 'PropertiesTableSection';
  title?: Maybe<Scalars['String']>;
  properties?: Maybe<Array<PropertiesTableValue>>;
};

export type PropertiesTableValue = {
  __typename?: 'PropertiesTableValue';
  key: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type RichTextContent = {
  __typename?: 'RichTextContent';
  json?: Maybe<Array<Scalars['JSON']>>;
  html?: Maybe<Array<Scalars['String']>>;
  plainText?: Maybe<Array<Scalars['String']>>;
};

export type SingleLineContent = {
  __typename?: 'SingleLineContent';
  text?: Maybe<Scalars['String']>;
};

export type VideoContent = {
  __typename?: 'VideoContent';
  videos?: Maybe<Array<Video>>;
};

export type ComponentContent = BooleanContent | ComponentChoiceContent | ContentChunkContent | DatetimeContent | GridRelationsContent | ImageContent | ItemRelationsContent | LocationContent | NumericContent | ParagraphCollectionContent | PropertiesTableContent | RichTextContent | SingleLineContent | VideoContent;

export enum ComponentType {
  Boolean = 'boolean',
  ComponentChoice = 'componentChoice',
  ContentChunk = 'contentChunk',
  Datetime = 'datetime',
  GridRelations = 'gridRelations',
  Images = 'images',
  ItemRelations = 'itemRelations',
  Location = 'location',
  Numeric = 'numeric',
  ParagraphCollection = 'paragraphCollection',
  PropertiesTable = 'propertiesTable',
  RichText = 'richText',
  SingleLine = 'singleLine',
  Videos = 'videos'
}

export type Component = {
  __typename?: 'Component';
  id: Scalars['String'];
  name: Scalars['String'];
  type: ComponentType;
  /** @deprecated meta properties on components are no longer supported and will be removed in a future release */
  meta?: Maybe<Array<MetaProperty>>;
  /** @deprecated meta properties on components are no longer supported and will be removed in a future release */
  metaProperty?: Maybe<Scalars['String']>;
  content?: Maybe<ComponentContent>;
};


export type ComponentMetaPropertyArgs = {
  key: Scalars['String'];
};

export type GridColumnLayout = {
  __typename?: 'GridColumnLayout';
  colspan?: Maybe<Scalars['Int']>;
  rowspan?: Maybe<Scalars['Int']>;
};

export type GridColumn = {
  __typename?: 'GridColumn';
  meta?: Maybe<Array<MetaProperty>>;
  metaProperty?: Maybe<Scalars['String']>;
  layout?: Maybe<GridColumnLayout>;
  itemId?: Maybe<Scalars['ID']>;
  itemType?: Maybe<Scalars['String']>;
  item?: Maybe<Item>;
};


export type GridColumnMetaPropertyArgs = {
  key: Scalars['String'];
};

export type GridRow = {
  __typename?: 'GridRow';
  meta?: Maybe<Array<MetaProperty>>;
  metaProperty?: Maybe<Scalars['String']>;
  columns: Array<GridColumn>;
};


export type GridRowMetaPropertyArgs = {
  key: Scalars['String'];
};

export type Grid = {
  __typename?: 'Grid';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  language: Scalars['String'];
  meta?: Maybe<Array<MetaProperty>>;
  metaProperty?: Maybe<Scalars['String']>;
  rows: Array<GridRow>;
  createdAt?: Maybe<Scalars['Datetime']>;
};


export type GridMetaPropertyArgs = {
  key: Scalars['String'];
};

export type ImageVariant = {
  __typename?: 'ImageVariant';
  url: Scalars['String'];
  key: Scalars['String'];
  width: Scalars['Int'];
  height?: Maybe<Scalars['Int']>;
};

export type Image = {
  __typename?: 'Image';
  url: Scalars['String'];
  key: Scalars['String'];
  altText?: Maybe<Scalars['String']>;
  caption?: Maybe<RichTextContent>;
  meta?: Maybe<Array<MetaProperty>>;
  metaProperty?: Maybe<Scalars['String']>;
  variants?: Maybe<Array<ImageVariant>>;
  createdAt?: Maybe<Scalars['Datetime']>;
};


export type ImageMetaPropertyArgs = {
  key: Scalars['String'];
};

export type Document = Item & {
  __typename?: 'Document';
  id: Scalars['ID'];
  version: ItemVersion;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  shape: Shape;
  language?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  components?: Maybe<Array<Component>>;
  component?: Maybe<Component>;
  children?: Maybe<Array<Item>>;
  subtree: SubtreeConnection;
  topics?: Maybe<Array<Topic>>;
  relatingItems?: Maybe<Array<Item>>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  publishedAt?: Maybe<Scalars['Datetime']>;
};


export type DocumentComponentsArgs = {
  ids?: Maybe<Array<Scalars['String']>>;
};


export type DocumentComponentArgs = {
  id: Scalars['String'];
};


export type DocumentSubtreeArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortDirection>;
  sortField?: Maybe<ItemSortField>;
};

export type Folder = Item & {
  __typename?: 'Folder';
  id: Scalars['ID'];
  version: ItemVersion;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  shape: Shape;
  language?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  components?: Maybe<Array<Component>>;
  component?: Maybe<Component>;
  children?: Maybe<Array<Item>>;
  subtree: SubtreeConnection;
  topics?: Maybe<Array<Topic>>;
  relatingItems?: Maybe<Array<Item>>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  publishedAt?: Maybe<Scalars['Datetime']>;
};


export type FolderComponentsArgs = {
  ids?: Maybe<Array<Scalars['String']>>;
};


export type FolderComponentArgs = {
  id: Scalars['String'];
};


export type FolderSubtreeArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortDirection>;
  sortField?: Maybe<ItemSortField>;
};

export enum ItemSortField {
  TreePosition = 'treePosition'
}

export type ItemVersion = {
  __typename?: 'ItemVersion';
  id: Scalars['ID'];
  label: VersionLabel;
  createdAt?: Maybe<Scalars['Datetime']>;
};

export type Item = {
  id: Scalars['ID'];
  version: ItemVersion;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  shape: Shape;
  language?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  components?: Maybe<Array<Component>>;
  component?: Maybe<Component>;
  children?: Maybe<Array<Item>>;
  subtree: SubtreeConnection;
  topics?: Maybe<Array<Topic>>;
  relatingItems?: Maybe<Array<Item>>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  publishedAt?: Maybe<Scalars['Datetime']>;
};


export type ItemComponentsArgs = {
  ids?: Maybe<Array<Scalars['String']>>;
};


export type ItemComponentArgs = {
  id: Scalars['String'];
};


export type ItemSubtreeArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortDirection>;
  sortField?: Maybe<ItemSortField>;
};

export type SubtreeConnection = {
  __typename?: 'SubtreeConnection';
  edges?: Maybe<Array<SubtreeEdge>>;
  pageInfo: PageInfo;
};

export type SubtreeEdge = {
  __typename?: 'SubtreeEdge';
  cursor: Scalars['String'];
  node: Item;
};

export enum VersionLabel {
  Published = 'published',
  Draft = 'draft'
}

export type ProductPriceVariant = {
  __typename?: 'ProductPriceVariant';
  identifier: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
};

export type ProductVariantAttribute = {
  __typename?: 'ProductVariantAttribute';
  attribute: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type ProductVariantSubscriptionPlan = {
  __typename?: 'ProductVariantSubscriptionPlan';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  initialPeriod?: Maybe<Scalars['Int']>;
  initialPeriodUnit?: Maybe<SubscriptionPlanPeriodUnit>;
  recurringPeriod?: Maybe<Scalars['Int']>;
  recurringPeriodUnit?: Maybe<SubscriptionPlanPeriodUnit>;
  initialPrice?: Maybe<Scalars['Float']>;
  recurringPrice?: Maybe<Scalars['Float']>;
  meta?: Maybe<Array<MetaProperty>>;
  metaProperty?: Maybe<Scalars['String']>;
};


export type ProductVariantSubscriptionPlanMetaPropertyArgs = {
  key: Scalars['String'];
};

export type ProductVariant = {
  __typename?: 'ProductVariant';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  /** @deprecated The `image` property is deprecated and will be removed in a future release. Use the `images` property instead. */
  image?: Maybe<Image>;
  images?: Maybe<Array<Image>>;
  sku: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  priceVariants?: Maybe<Array<ProductPriceVariant>>;
  stock?: Maybe<Scalars['Int']>;
  attributes?: Maybe<Array<Maybe<ProductVariantAttribute>>>;
  subscriptionPlans?: Maybe<Array<Maybe<ProductVariantSubscriptionPlan>>>;
  isDefault?: Maybe<Scalars['Boolean']>;
};


export type ProductVariantPriceArgs = {
  identifier?: Maybe<Scalars['String']>;
};

export type Product = Item & {
  __typename?: 'Product';
  id: Scalars['ID'];
  version: ItemVersion;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  shape: Shape;
  language?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  components?: Maybe<Array<Component>>;
  component?: Maybe<Component>;
  vatType?: Maybe<VatInfo>;
  isVirtual?: Maybe<Scalars['Boolean']>;
  isSubscriptionOnly?: Maybe<Scalars['Boolean']>;
  variants?: Maybe<Array<ProductVariant>>;
  defaultVariant?: Maybe<ProductVariant>;
  children?: Maybe<Array<Item>>;
  subtree: SubtreeConnection;
  topics?: Maybe<Array<Topic>>;
  relatingItems?: Maybe<Array<Item>>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  publishedAt?: Maybe<Scalars['Datetime']>;
};


export type ProductComponentsArgs = {
  ids?: Maybe<Array<Scalars['String']>>;
};


export type ProductComponentArgs = {
  id: Scalars['String'];
};


export type ProductSubtreeArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortDirection>;
  sortField?: Maybe<ItemSortField>;
};

export enum SubscriptionPlanPeriodUnit {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year'
}

export type Shape = {
  __typename?: 'Shape';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  meta?: Maybe<Array<MetaProperty>>;
  metaProperty?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};


export type ShapeMetaPropertyArgs = {
  key: Scalars['String'];
};

export type TenantDefaults = {
  __typename?: 'TenantDefaults';
  language?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
};

export type Tenant = {
  __typename?: 'Tenant';
  id: Scalars['ID'];
  identifier: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  logo?: Maybe<Image>;
  language?: Maybe<Scalars['String']>;
  defaults?: Maybe<TenantDefaults>;
  isTrial?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

export type VatInfo = {
  __typename?: 'VatInfo';
  name?: Maybe<Scalars['String']>;
  percent?: Maybe<Scalars['Float']>;
};

export type TopicItemConnection = {
  __typename?: 'TopicItemConnection';
  edges?: Maybe<Array<TopicItemEdge>>;
  pageInfo: PageInfo;
};

export type TopicItemEdge = {
  __typename?: 'TopicItemEdge';
  cursor: Scalars['String'];
  node: Item;
};

export enum TopicItemSortField {
  CreatedAt = 'createdAt'
}

export type Topic = {
  __typename?: 'Topic';
  id: Scalars['ID'];
  name: Scalars['String'];
  language?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['ID']>;
  parent?: Maybe<Topic>;
  children?: Maybe<Array<Topic>>;
  items: TopicItemConnection;
  createdAt?: Maybe<Scalars['Datetime']>;
};


export type TopicItemsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortDirection>;
  sortField?: Maybe<TopicItemSortField>;
};

export type VersionInfo = {
  __typename?: 'VersionInfo';
  apiVersion: Scalars['String'];
  commitSha: Scalars['String'];
};

export type Video = {
  __typename?: 'Video';
  id: Scalars['String'];
  playlists?: Maybe<Array<Scalars['String']>>;
  playlist?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  thumbnails?: Maybe<Array<Image>>;
};


export type VideoPlaylistArgs = {
  type: Scalars['String'];
};
