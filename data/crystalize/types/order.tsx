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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: any;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: any;
  /** Floats that will have a value of 0 or more. */
  NonNegativeFloat: any;
  /** Integers that will have a value greater than 0. */
  PositiveInt: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  orders: OrderMutations;
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
  orders: OrderQueries;
  version: VersionInfo;
};








export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export enum AddressType {
  Delivery = 'delivery',
  Billing = 'billing',
  Other = 'other'
}

export type Address = {
  __typename?: 'Address';
  type: AddressType;
  firstName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  streetNumber?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['EmailAddress']>;
};

export type CustomProperties = {
  __typename?: 'CustomProperties';
  property: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type Customer = {
  __typename?: 'Customer';
  identifier?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['Date']>;
  addresses?: Maybe<Array<Address>>;
};

export type Discount = {
  __typename?: 'Discount';
  percent?: Maybe<Scalars['Float']>;
};

export type AddressInput = {
  type: AddressType;
  firstName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  street2?: Maybe<Scalars['String']>;
  streetNumber?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['EmailAddress']>;
};

export type CreateOrderInput = {
  customer: CustomerInput;
  cart: Array<OrderItemInput>;
  payment?: Maybe<Array<PaymentInput>>;
  total?: Maybe<PriceInput>;
  additionalInformation?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type CustomPropertiesInput = {
  property: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type CustomerInput = {
  identifier?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['Date']>;
  addresses?: Maybe<Array<AddressInput>>;
};

export type DiscountInput = {
  percent?: Maybe<Scalars['Float']>;
};

export type OrderItemInput = {
  name: Scalars['String'];
  sku?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['ID']>;
  productVariantId?: Maybe<Scalars['ID']>;
  imageUrl?: Maybe<Scalars['String']>;
  quantity: Scalars['NonNegativeInt'];
  subscription?: Maybe<OrderItemSubscriptionInput>;
  price?: Maybe<PriceInput>;
  subTotal?: Maybe<PriceInput>;
};

export type OrderItemSubscriptionInput = {
  name?: Maybe<Scalars['String']>;
  period: Scalars['PositiveInt'];
  unit: OrderItemSubscriptionPeriodUnit;
  start?: Maybe<Scalars['DateTime']>;
  end?: Maybe<Scalars['DateTime']>;
};

export type PriceInput = {
  gross?: Maybe<Scalars['Float']>;
  net?: Maybe<Scalars['Float']>;
  currency: Scalars['String'];
  discounts?: Maybe<Array<DiscountInput>>;
  tax?: Maybe<TaxInput>;
};

export type TaxInput = {
  name?: Maybe<Scalars['String']>;
  percent?: Maybe<Scalars['Float']>;
};

export type OrderConfirmation = {
  __typename?: 'OrderConfirmation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
};

export type OrderConnectionEdge = {
  __typename?: 'OrderConnectionEdge';
  cursor: Scalars['String'];
  node: Order;
};

export type OrderConnection = {
  __typename?: 'OrderConnection';
  pageInfo: PageInfo;
  edges?: Maybe<Array<OrderConnectionEdge>>;
};

export enum OrderItemSubscriptionPeriodUnit {
  Minute = 'minute',
  Hour = 'hour',
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Year = 'year'
}

export type OrderItemSubscription = {
  __typename?: 'OrderItemSubscription';
  name?: Maybe<Scalars['String']>;
  period: Scalars['PositiveInt'];
  unit: OrderItemSubscriptionPeriodUnit;
  start?: Maybe<Scalars['DateTime']>;
  end?: Maybe<Scalars['DateTime']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  name: Scalars['String'];
  sku?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['ID']>;
  productVariantId?: Maybe<Scalars['ID']>;
  imageUrl?: Maybe<Scalars['String']>;
  quantity: Scalars['NonNegativeInt'];
  subscription?: Maybe<OrderItemSubscription>;
  price?: Maybe<Price>;
  subTotal?: Maybe<Price>;
};

export type OrderMutations = {
  __typename?: 'OrderMutations';
  create: OrderConfirmation;
};


export type OrderMutationsCreateArgs = {
  input: CreateOrderInput;
};

export type OrderQueries = {
  __typename?: 'OrderQueries';
  get?: Maybe<Order>;
  getAll: OrderConnection;
};


export type OrderQueriesGetArgs = {
  id: Scalars['ID'];
};


export type OrderQueriesGetAllArgs = {
  customerIdentifier?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  sort?: Maybe<SortDirection>;
  sortField?: Maybe<OrderSortField>;
};

export enum OrderSortField {
  UpdatedAt = 'updatedAt'
}

export type Order = {
  __typename?: 'Order';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  cart: Array<OrderItem>;
  customer: Customer;
  payment?: Maybe<Array<Payment>>;
  total?: Maybe<Price>;
  additionalInformation?: Maybe<Scalars['String']>;
};

export type CashPayment = PaymentType & {
  __typename?: 'CashPayment';
  provider: PaymentProvider;
  cash?: Maybe<Scalars['String']>;
};

export type CustomPayment = PaymentType & {
  __typename?: 'CustomPayment';
  provider: PaymentProvider;
  properties?: Maybe<Array<CustomProperties>>;
};

export type CashPaymentInput = {
  cash?: Maybe<Scalars['String']>;
};

export type CustomPaymentInput = {
  properties?: Maybe<Array<CustomPropertiesInput>>;
};

export type KlarnaPaymentInput = {
  klarna?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  recurringToken?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['String']>;
};

export type PaymentInput = {
  provider: PaymentProvider;
  klarna?: Maybe<KlarnaPaymentInput>;
  paypal?: Maybe<PaypalPaymentInput>;
  stripe?: Maybe<StripePaymentInput>;
  cash?: Maybe<CashPaymentInput>;
  custom?: Maybe<CustomPaymentInput>;
};

export type PaypalPaymentInput = {
  paypal?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  invoiceId?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['String']>;
};

export type StripePaymentInput = {
  stripe?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  paymentMethod?: Maybe<Scalars['String']>;
  paymentMethodId?: Maybe<Scalars['String']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['String']>;
};

export type KlarnaPayment = PaymentType & {
  __typename?: 'KlarnaPayment';
  provider: PaymentProvider;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  recurringToken?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['String']>;
};

export enum PaymentProvider {
  Klarna = 'klarna',
  Stripe = 'stripe',
  Paypal = 'paypal',
  Cash = 'cash',
  Custom = 'custom'
}

export type PaymentType = {
  provider: PaymentProvider;
};

export type Payment = KlarnaPayment | StripePayment | PaypalPayment | CashPayment | CustomPayment;

export type PaypalPayment = PaymentType & {
  __typename?: 'PaypalPayment';
  provider: PaymentProvider;
  id?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  invoiceId?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['String']>;
};

export type StripePayment = PaymentType & {
  __typename?: 'StripePayment';
  provider: PaymentProvider;
  id?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['String']>;
  paymentMethod?: Maybe<Scalars['String']>;
  paymentMethodId?: Maybe<Scalars['String']>;
  paymentIntentId?: Maybe<Scalars['String']>;
  subscriptionId?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['String']>;
};

export type Price = {
  __typename?: 'Price';
  gross?: Maybe<Scalars['Float']>;
  net?: Maybe<Scalars['Float']>;
  currency: Scalars['String'];
  discounts?: Maybe<Array<Discount>>;
  tax?: Maybe<Tax>;
};

export type Tax = {
  __typename?: 'Tax';
  name?: Maybe<Scalars['String']>;
  percent?: Maybe<Scalars['Float']>;
};

export type VersionInfo = {
  __typename?: 'VersionInfo';
  apiVersion: Scalars['String'];
  commitSha: Scalars['String'];
};
