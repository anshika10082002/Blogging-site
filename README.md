# Lithium

## Project Title- *Blogging Site*

*This project is a backend API for a blogging site, built using **Node.js**, **Express**, and **MongoDB**. It includes multiple **API** endpoints for **author** and **blog management**.Used JWT to perform Authentication and Authorization for some protected Api's*

- *This project uses a MongoDB database to store data. The database can be connected to using the `Mongoose` liberary.*

- *The API can be accessed through the base URL `localhost:3000/`*

### Models
- **Author Model**
```yaml
{ 
  fname: { mandatory}, 
  lname: {mandatory},
  title: {mandatory, enum[Mr, Mrs, Miss]}, 
  email: {mandatory, valid email, unique}, 
  password: {mandatory} 
}
```
- **Blogs Model**
```yaml
{ 
  title: {mandatory}, 
  body: {mandatory}, 
  authorId: {mandatory, refs to author model}, 
  tags: {array of string}, 
  category: {string, mandatory}, 
  subcategory: {array of string, examples[technology-[web development, mobile development, AI, ML etc]] },  
  deletedAt: {when the document is deleted}, 
  isDeleted: {boolean, default:false}, 
  publishedAt: {when the blog is published}, 
  isPublished: {boolean, default:false}}
```

## Register Author
- **Endpoint** :- /authors
- **Method** :- POST

## Login Author
- **Endpoint** :- /login
- **Method** :- POST
- **In request body(login with)**
   - email
   - password

- _**On success**_ :- return a JWT token contatining the authorId in response body.
## Successful Login Response structure
```yaml
{
  status: true,
  data: {
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JJZCI6IjYyZmUzYmUzMzY2ZmFkNDZjY2Q1MzI3ZiIsImlhdCI6MTY2MDgzMDA4MywiZXhwIjoxNjYwODY2MDgzfQ.mSo-TLyRlGhMNcy4ftEvvIlCHlyEqpaFZc-iBth4lfg"

  }
}
```
- _**error response**_ :- return a suitable error message with a valid HTTP status code

## POST /blogs (authentication and authorization reaquired)
- **Endpoint** :- /blogs
- **Method** :- POST

-  Get authorId in request body only.
- Make sure the authorId is a valid authorId by checking the author exist in the authors collection.
- _**On success**_ :- Return HTTP status 201 on a succesful blog creation with blog document.  [this](#successful-response-structure) 

- _**error response**_ :- Return HTTP status 400 for an invalid request with a response body like [this](#error-response-structure)

## Get Blogs(authentication required)
- **Endpoint** :- /blogs
- **Method** :- GET

- Returns all blogs in the collection that aren't deleted and are published

- _**On success**_ :-- Return the HTTP status 200 if any documents are found.  [this](#successful-response-structure) 

- If no documents are found then return an HTTP status 404 with a response like [this](#error-response-structure)

- _**Filtered**_
- Filter blogs list by applying filters
- **Query param**(any combination)
  - By author Id
  - By category
  - List of blogs that have a specific tag
  - List of blogs that have a specific subcategory

- Example of a query url: blogs?filtername=filtervalue&f2=fv2

## Update Blog(by path param- blogId)-(authentication and authorization)
- **Endpoint** :- /blogs/:blogId
- **Method** :- PUT

- Updates a blog by changing the its title, body, adding tags, adding a subcategory. (Assuming tag and subcategory received in body is need to be added)
- Updates a blog by changing its publish status i.e. adds publishedAt date and set published to true
- Check if the blogId exists (must have isDeleted false). If it doesn't, return an HTTP status 404 with a response body like [this](#error-response-structure)

- _**On success**_ :- Return an HTTP status 200 if updated successfully with updated document [this](#successful-response-structure) 
 

## Delete Blog(by path param- blogId)-(authentication and authorization)
- **Endpoint** :- /blogs/:blogId
- **Method** :- DELETE

- Check if the blogId exists( and is not deleted). If it does, mark it deleted and return an HTTP status 200 without any response body.
- If the blog document doesn't exist then return an HTTP status of 404 with a body like [this](#error-response-structure) 

### Delete Blog(by query param)-(authentication and authorization)
- **Endpoint** :- /blogs
- **Method** :- PUT
- Delete blog documents by category, authorid, tag name, subcategory name, unpublished
- If the blog document doesn't exist then return an HTTP status of 404 with a body like [this](#error-response-structure) 



- *Add authentication and authroisation feature*


### Authentication
- Add an authorisation implementation for the JWT token that validates the token before every protected endpoint is called. 
- If the validation fails, return a suitable error message with a corresponding HTTP status code
- Protected routes are create a blog, edit a blog, get the list of blogs, delete a blog(s)
- Set the token, once validated, in the request - `x-api-key`
- Use a middleware for authentication purpose.

### Authorisation
- Make sure that only the owner of the blogs is able to edit or delete the blog.
- In case of unauthorized access return an appropirate error message.


- **Tool(for testing)**
  - Postman


## Responses

### Successful Response structure
```yaml
{
  status: true,
  data: {

  }
}
```
### Error Response structure
```yaml
{
  status: false,
  msg: ""
}
```

## Collections
### Blogs
```yaml
{
  "title": "How to win friends",
  "body": "Blog body",
  "tags": ["Book", "Friends", "Self help"],
  "category": "Book",
  "subcategory": ["Non fiction", "Self Help"],
  "published": false,
  "publishedAt": "", // if published is true publishedAt will have a date 2021-09-17T04:25:07.803Z
  "deleted": false,
  "deletedAt": "", // if deleted is true deletedAt will have a date 2021-09-17T04:25:07.803Z,
  "createdAt": "2021-09-17T04:25:07.803Z",
  "updatedAt": "2021-09-17T04:25:07.803Z",
}
```

