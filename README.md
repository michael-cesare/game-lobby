# Senior Frontend Developer Assessment

## Introduction

The purpose of this assessment is to evaluate your front-end technical skills and your ability to think out of the box while implementing such features.

## Requirements

As a user, I want to see a games lobby interface, which needs to have these functionalities:

- Game menu lobby categories navigation
- Games list
  - Trending games from mock websocket
  - Hot games from mock websocket
- Games search

The game lobby should be fully functional. The user must be able to navigate between the categories menu and display a list of games accordingly.

**Main technologies to use are ReactJS 18 & NextJS.**

**Extra bonus points if you make use of:**
- TypeScript
- State management such as useContext or Zustand or Redux
- Server-side rendering (SSR)
- SASS

It would be nice to also implement some unit tests.

## API

**Provided endpoint:** `https://casino.api.pikakasino.com/v1/pika`

### Endpoints

**GET `/en/config`** - Fetch menu lobby categories
- `getPage` response property retrieves category games list

**GET `/en/games`** - Fetch games with available query parameters:
- `pageSize` (e.g., `?pageSize=100`)
- `search` (for search functionality)
- `pageNumber` (for pagination)

## Result

The delivery of the assessment should take approximately 6 hours. However, we encourage you to showcase your technical expertise and problem-solving abilities rather than being pressured by time.

Your code should:
- Adhere to standards
- Be readable & self-explained
- Contain comments wherever it's necessary
- Have good performance optimisations
- Use server-side rendering where needed
- Leverage caching strategies
- Implement proper state management

Kindly upload this test assessment result on your GitHub account and provide us the direct public URL to it.

Should you encounter any difficulties, please contact us.