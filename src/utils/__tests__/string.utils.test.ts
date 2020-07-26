import { first } from 'lodash-es'

import { getMatches } from '../string.utils'

describe('string.utils.ts', () => {
  it('getMatches should work as described', () => {
    const sampleLog = `},
      "upvotes": 6,
      "userUpvoted": null
    },
    {
      "_id": "58e008340aac31001185ecfb",
      "text": "Cats sleep 70% of their lives.",
      "type": "cat",
      "user": {
        "_id": "58e007480aac31001185ecef",
        "name": {
          "first": "Kasimir",
          "last": "Schulz"
        }
      },
      "upvotes": 6,
      "userUpvoted": null
    },
    {
      "_id": "599f87db9a11040c4a16343f",
      "text": "The goddess of love, beauty, and fertility in Norse mythology, Freyja was log the first cat lady. She is depicted in stories as riding a chariot that was drawn by cats.",
      "type": "cat",
      "user": {
        "_id": "5a9ac18c7478810ea6c06381",
        "name": {
          "first": "Alex",
          "last": "Wohlbruck"
        }
      },
      "upvotes": 6,
      "userUpvoted": null
    },
    {
      "_id": "5894af975cdc7400113ef7f9",
      "text": "The technical term for a cat’s hairball is a bezoar.",
      "type": "cat",
      "user": {
        "_id": "5a9ac18c7478810ea6c06381",
        "name": {
          "first": "Alex",
          "last": "Wohlbruck"
        }
      },
      "upvotes": 6,
      "userUpvoted": null
    },`

    expect(first(getMatches(sampleLog, 'log'))).toBe(
      `      "text": "The goddess of love, beauty, and fertility in Norse mythology, Freyja was log the first cat lady. She is depicted in stories as riding a chariot that was drawn by cats.",`,
    )
  })
})
