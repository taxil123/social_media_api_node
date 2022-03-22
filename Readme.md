Endpoint -> /api/v1/users

1. Sign up:
    Endpoint -> /api/v1/users/signup
    Method -> POST
    Body -> {
        "name": "username",
        "email": "test@gmail.com"
        "password": "password",
        "passwordConfirm": "password",
    }
    response -> {
        "token": "token"
    }

2. Sign in:
    Endpoint -> /api/v1/users/login
    Method -> POST
    Body -> {
        "email": "username@gmail.com",
        "password": "password",
    }
    response -> {
        "token": "token"
    }
    
3. Get Profile:
    Endpoint -> /api/v1/users/:id/getProfile
    Method -> GET
    Header -> {
        "Authorization": "Bearer token"
    }

4.Get Posts:
    Endpoint -> /api/v1/users/:id/posts/community
    Method -> GET
    Header -> {
        "Authorization": "Bearer token"
    }

5.Create Posts:
    Endpoint -> /api/v1/users/:id/posts/createPost  
    Method -> POST
    body -> {
        "post": "post",
        "image": "image",
    }
    Header -> {
        "Authorization": "Bearer token"
    }

6.Delete Posts:
    Endpoint -> /api/v1/users/:id/posts/:id  
    Method -> DELETE
    Header -> {
        "Authorization": "Bearer token"
    }

7.Update Posts:
    Endpoint -> /api/v1/users/:id/posts/:id  
    Method -> PATCH
    body -> {
        "post": "post",
        "image": "image",
    }
    Header -> {
        "Authorization": "Bearer token"
    }

8.Get All Friends:
    Endpoint -> /api/v1/users/:id/friends
    Method -> GET
    Header -> {
        "Authorization": "Bearer token"
    }

9.Get Friend:
    Endpoint -> /api/v1/users/:id/friends/getFriend
    Method -> GET
    Header -> {
        "Authorization": "Bearer token"
    }

10.Send Friend Request:
    Endpoint -> /api/v1/users/:id/friends/sendFriendRequest
    body -> {
        "recipient": "friendId"
    }
    Method -> POST
    Header -> {
        "Authorization": "Bearer token"
    }

11.Accept Friend Request:
    Endpoint -> /api/v1/users/:id/friends/acceptFriendRequest
    body -> {
        "recipient": "friendId"
    }
    Method -> POST
    Header -> {
        "Authorization": "Bearer token"
    }

12.Reject Friend Request:
    Endpoint -> /api/v1/users/:id/friends/rejectFriendRequest
    body -> {
        "recipient": "friendId"
    }
    Method -> POST
    Header -> {
        "Authorization": "Bearer token"
    }

13.Activate posts to show friends:
    Endpoint -> /api/v1/users/:id/posts/activatePost
    Method -> POST
    Body -> {
        "isActive": "true"
    }
    Header -> {
        "Authorization": "Bearer token"
    }

14.Activate posts to public:
    Endpoint -> /api/v1/users/:id/posts/activatePost
    Method -> POST
    Body -> {
        "isActive": "false"
    }
    Header -> {
        "Authorization": "Bearer token"
    }