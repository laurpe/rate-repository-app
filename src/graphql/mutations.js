import { gql } from '@apollo/client';


export const SIGN_IN = gql`
    mutation authorize($username: String!, $password: String!) {
        authorize(credentials: { username: $username, password: $password }) {
            accessToken
        }
    }
`;

export const CREATE_REVIEW = gql`
    mutation createReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
        createReview(review: { repositoryName: $repositoryName, ownerName: $ownerName, rating: $rating, text: $text }) {
            id
            user {
                id
                username
            }
            repository {
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
            userId
            repositoryId
            rating
            createdAt
            text
        }
    }
`;

export const SIGN_UP = gql`
    mutation createUser($username: String!, $password: String!) {
        createUser(user: {username: $username, password: $password}) {
            id
            username
        }
    }
`;