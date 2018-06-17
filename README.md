# Lunch Bot
Creating peace on 🌍 by giving good lunch place suggestions

## Client endpoints

Some routes require authentication, that requires the authorization token be passed in the header. This should be provided as `Authorization: Bearer {auth token}`

### main endpoints:
- `GET /suggestion [public]`\
Returns lunch place suggestions

- `POST /suggestion/:placeId [auth]`\
Add a place to the suggestions pool

- `PUT /suggestion/:placeId [auth]`\
Tag a place as visited

### user endpoints:
- `POST /user [public]`\
Register a new user. Post body json should include:
```json
{
    "userName": "{your username}",
    "password": "{your password}"
}
```

- `POST /user/auth [public]`\
Retrieve your auth token with existing user credentials.
Post body json should include:
```json
{
    "userName": "{your username}",
    "password": "{your password}"
}
```

### utility endpoints:

- `GET /search/:query [auth]`\
Returns a search result of places based on text query

- `GET /search/id/:placeId [auth]`\
Returns a detailed place result based on placeId

- `GET /distance/:placeId [auth]`\
Returns the distance calculations based on origin point and location of placeId