import { gql } from '@apollo/client';


export const GET_REPOSITORIES = gql`
    query repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String){
        repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
            edges {
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
    query {
        authorizedUser {
            id
            username
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
    query repository($id: ID!) {
        repository(id: $id) {
            id
            fullName
            reviews {
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
                }
            }
        }
    }
}
`;



