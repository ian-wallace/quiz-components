# quiz-components
[![Release Badge](https://github.com/Brightspace/quiz-components/workflows/release/badge.svg)](https://github.com/Brightspace/quiz-components/actions?query=workflow%3Arelease)

Contains various BSI components used by quizzing.

## Components

## Testing

```shell
# unit test
npm run test

# lint only
npm run lint
```

## Versioning and Releasing

Releases occur based on the most recent commit message:
* Commits which contain `[increment patch]` will trigger a `patch` release. Example: `[increment patch] validate input before using`
* Commits which contain `[increment minor]` will trigger a `minor` release. Example: `[increment minor] add toggle() method`
* Commits which contain `[increment major]` will trigger a `major` release. Example: `[increment major] breaking all the things`

**Note:** When merging a pull request, this will be the merge commit message.

