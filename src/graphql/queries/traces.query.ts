import { gql } from 'apollo-boost'

export const GetTraces = gql`
    query getTraces($search: String, $offset: Int) {
        getTraces(search: $search, offset: $offset) {
            traces {
                id
                unitName
                start
                end
                duration
                status
                request
                response
                error
            }
            offset
            hasMore
        }
    }
`

export const GetTrace = gql`
    query getTrace($id: String!) {
        getTrace(id: $id) {
            id
            unitName
            start
            end
            duration
            status
            request
            response
            error
            functionCallEvents {
                start
                end
                functionName
                fileName
            }
            resourceAccessEvents {
                start
                end
                serviceName
                resourceIdentifier
                request
                response
                status
                error
            }
        }
    }
`
