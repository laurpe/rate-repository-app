import { gql } from '@apollo/client';


export const GET_REPOSITORIES = gql`
    query repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $after: String, $first: Int){
        repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, after: $after, first: $first) {
            pageInfo {
                hasPreviousPage
                hasNextPage
                startCursor
                endCursor
            }
            edges {
                cursor
                node {
                    ownerAvatarUrl
                    fullName
                    description
                    language
                    stargazersCount
                    forksCount
                    reviewCount
                    ratingAverage
                    id
                }
            }
        }
    }
`;

export const GET_AUTHORIZED_USER = gql`
    query authorizedUser($includeReviews: Boolean!, $first: Int, $after: String) {
        authorizedUser {
            id
            username
            reviews(first: $first, after: $after) @include(if: $includeReviews) {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                        repository {
                            fullName
                            id
                        }
                    }
                    cursor
                }
                pageInfo {
                    hasPreviousPage
                    hasNextPage
                    startCursor
                    endCursor
                }
            }
        }
    }
`;

export const GET_REPOSITORY = gql`
    query repository($id: ID!) {
        repository(id: $id) {
            ownerAvatarUrl
            fullName
            description
            language
            stargazersCount
            forksCount
            reviewCount
            ratingAverage
            id
            url
        }
    }
`;

export const GET_REVIEWS = gql`
    query repository($id: ID!, $first: Int, $after: String) {
        repository(id: $id) {
            id
            fullName
            reviews(first: $first, after: $after) {
                pageInfo {
                    startCursor
                    endCursor
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                    cursor
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;



