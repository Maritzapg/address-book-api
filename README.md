# User and Score Data REST API

This is a REST API to get and store user data. It runs on port 3000 by default but may be configured in the environment.

The API is connected to an Atlas Cloud Cluster at `mongodb+srv://<username>:<password>@scoringapp.beqhsqp.mongodb.net/local_userchanger?retryWrites=true&w=majority&appName=AtlasApp
`

The connection string is in the .env file with the user credentials. This was done in order to allow the API to be ran out of the box with node without the client needing to spin up a local mongo server. The .env file is not gitignored so the project can be ran immediately after cloning.

## Requirements

    node
    typescript

## Install

    npm install

## Run the app

    npm run start

# REST API

## Get list of User data

### Request

`GET /users`

    curl --location 'http://localhost:3000/users'

### Response

```
[
	{
		"_id": "6508e69764d383146471a2bf",
		"givenName": "givenName",
		"familyName": "FamilyName",
		"nickName": "nickName",
		"emails": [
			{
				"label": "home",
				"address": "homeemailaddress@gmail.com"
			}
		],
		"phones": [
			{
				"label": "cell",
				"number": "5203125410"
			}
		]
	}
]
```

## Get a single User

### Request

`GET /users/:id`

    curl --location 'http://localhost:3000/users/6508e69764d383146471a2bf'

### Response

```
	{
		"_id": "6508e69764d383146471a2bf",
		"givenName": "givenName",
		"familyName": "FamilyName",
		"nickName": "nickName",
		"emails": [
			{
				"label": "home",
				"address": "homeemailaddress@gmail.com"
			}
		],
		"phones": [
			{
				"label": "cell",
				"number": "5203125410"
			}
		]
	}
```

## Insert a new User

### Request

`POST /users`

### Body

```
	{
		"givenName": "givenName",
		"familyName": "FamilyName",
		"nickName": "nickName",
		"emails": [
			{
				"label": "home",
				"address": "homeemailaddress@gmail.com"
			}
		],
		"phones": [
			{
				"label": "cell",
				"number": "5203125410"
			}
		]
	}
```

    curl --location 'http://localhost:3000/users' --header 'Content-Type: application/json'

### Response

    <id>

## Delete a user

### Request

`DELETE /users`

### Body

```
	{
		"id": "23456"
	}
```
