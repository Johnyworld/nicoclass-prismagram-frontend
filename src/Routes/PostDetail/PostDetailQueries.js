import { gql } from 'apollo-boost';

export const POST_DETAIL = gql`
    query seeFullPost( $id: String! ) {
        seeFullPost( id: $id ) {
            id
            location
            caption
            likeCount
            comments {
                id
                user {
                    id
                    avatar
                    username
                }
                text
            }
            commentCount
            isLiked
            createdAt
            files {
                id
                url
            }
            user {
                id
                avatar
                username
            }
        }
    }
`;