# JWT Authetication API

This is a simple project using node and express with the objective of studying authentication with JWT.

## Technologies
- Node.js v20.15.1
- Express.js v4.19.2
- jsonwebtoken v9.0.2
- bcrypt v5.1.0
- mongoose v8.5.2

## Routes
**Public**
- [GET] '/'
```json
    {
        "message": "Hello world!"
    }
```
- [POST] '/auth/register'
```json
# Example body
"Name" is required and must be at least 2 characters
"Email" is required and must be a valid email
"Password" is required and must be at least 5 characters
    {
       "name": "John Doe",
       "email": "john@doe.com",
       "password": "12345",
       "confirmpassword": "12345"
    }

# Response
    {
        "status": 201,
        "message": "User created succefully!"
    }
```
- [POST] '/auth/login'
```json
# Example body
"Email" is required
"Password" is required
    {
        "email": "john@doe.com",
        "password": "12345"
    }

# Response
    {
        "message": "Authentication succefully!"
    }
```

**Protected**
- [POST] '/user/:id'
```json
    {
        "message": "Welcome to the dashboard"
    }
```

### Soon new features...