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
    {
       "name": "string*",
       "email": "string*",
       "password": "string*",
       "confirmpassword": "password*"
    }

# Response
    {
        "message": "User created succefully!"
    }
```
- [POST] '/auth/login'
```json
# Example body
    {
        "email": "string*",
        "password": "string*"
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