import { ApolloClient, gql } from "@apollo/client";
import * as Product from "./types/product";

export const catalogue = (client: ApolloClient<any>) =>
  client
    .query({
      query: CATALOGUE,
      variables: { language: "en", path: "/" },
    })
    .then((x) => x.data.catalogue.children as Product.Product[])
    .catch((x) => Promise.reject(x.networkError.result.errors));

const CATALOGUE = gql`
  query catalogue($language: String!, $path: String!) {
    catalogue(language: $language, path: $path) {
      ...item
      ...product

      children {
        ...item
        ...product
      }
    }
  }

  fragment item on Item {
    id
    name
    type
    path
    components {
      name
      type
      meta {
        key
        value
      }
      content {
        ...singleLineContent
        ...richTextContent
        ...imageContent
        ...paragraphCollectionContent
        ...itemRelationsContent
        ...locationContent
      }
    }
  }

  fragment product on Product {
    id
    language
    vatType {
      name
      percent
    }
    isVirtual
    isSubscriptionOnly
    variants {
      id
      name
      sku
      price
      priceVariants {
        identifier
        name
        price
        currency
      }
      stock
      isDefault
      images {
        ...image
      }
      subscriptionPlans {
        id
        name
        initialPeriod
        initialPrice
        recurringPeriod
        recurringPrice
      }
    }
  }

  fragment image on Image {
    url
    altText
    variants {
      url
      width
    }
  }

  fragment imageContent on ImageContent {
    images {
      ...image
    }
  }

  fragment singleLineContent on SingleLineContent {
    text
  }

  fragment richTextContent on RichTextContent {
    json
  }

  fragment itemRelationsContent on ItemRelationsContent {
    items {
      id
      name
      path
    }
  }

  fragment locationContent on LocationContent {
    lat
    long
  }

  fragment paragraphCollectionContent on ParagraphCollectionContent {
    paragraphs {
      title {
        ...singleLineContent
      }
      body {
        ...richTextContent
      }
      images {
        ...image
      }
    }
  }
`;
