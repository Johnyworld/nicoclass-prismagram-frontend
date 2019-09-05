import { gql } from 'apollo-boost';

export const POST_DETAIL = gql`
    query seeFullPost( $id: String! ) {
        seeFullPost( id: $id ) {
            id
            location
            files {
                id
            }
            user {
                avatar
                username
            }
            caption
            likeCount
            comments {
                user {
                    avatar
                    username
                }
                text
            }
            commentCount
            isLiked
            createdAt
        }
    }
`;