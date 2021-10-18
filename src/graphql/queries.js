import { gql } from '@apollo/client';


export const GET_REPOSITORIES = gql`
    query {
        repositories {
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



