# Find-A-Friend-API

In this project we will develop an API for animal adoption, the FindAFriend API, using SOLID and tests.

---

### Setup Project

Install npm packages
```
npm install
```
Create project migrations
```
npx prisma generate
```
If you need to create a migration for dev environment:
```
npx prisma migrate dev 
```
If you need to create a migration for production environment:
```
WIP
```

---

### Application rules

- It must be possible to register a pet
- It must be possible to list all avaliable pets for adoption in a specific city
- It must be possible to filter pets by their characteristics
- It must be possible to view details of a pet up for adoption
- It must be possible to register as an ORG
- It must be possible to login as an ORG



### Business rules

- To list the pets, we must inform the city
- An ORG must have an address and a WhatsApp number
- A pet must be linked to an ORG
- The user who wants to adopt will contact the ORG via WhatsApp
- All filters, besides the city, are optional
- For an ORG to access the application as admin, it must be logged in

