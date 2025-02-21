# Search-with-Auto-Completion
Design and implement a search API with auto-completion, optimizing for speed and efficiency.


1. Api : it is use for get search data store in db. Below is the apis request and response.
Request : curl --location --request GET 'http://localhost:3000/search?query=hello'

Response : 
{
    "status": 200,
    "data": [
        "hello my name is umnag",
        "hello my name is umang"
    ],
    "message": "Ok"
}

2. Api : it is use for post search data and store in db. Below is the apis request and response.
Request : curl --location --request POST 'http://localhost:3000/search' \
--header 'Content-Type: application/json' \
--data-raw '{
    "term": "hello my name is umang"
}'

Response : 
{
    "message": "Search term recorded"
}