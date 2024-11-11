// https://www.youtube.com/watch?v=nH9E25nkk3I

import express, { request, response } from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [
    { id: 1, username: "anson", displayName: "Anson"},
    { id: 2, username: "jack", displayName: "Jack"},
    { id: 3, username: "adam", displayName: "Adam"},
    { id: 4, username: "tina", displayName: "Tina"},
    { id: 5, username: "jason", displayName: "Jason"},
    { id: 6, username: "henry", displayName: "Henry"},
    { id: 7, username: "marilyn", displayName: "Marilyn"},
    { id: 8, username: "yasin", displayName: "Yasin"},
];

app.listen(PORT, ()=> {
    console.log(`Running on port ${PORT}`);
});                                            //arayuze yazdirdihan fonction


app.get("/", (request, response) => {
    response.status(201).send({msg:"Hello"});
});

app.get("/api/users", (request, response) => {
    console.log(request.query);
    const { 
        query : { filter, value },
    } = request;
    
    /* if (!filter && !value) return response.send(mockUsers); //when filter and value are undefined    */
    if (filter && value) 
        return response.send(
            mockUsers.filter((user) => user[filter].includes(value))
        );
    return response.send(mockUsers);
});

//post
app.post("/api/users", (request, response) => {  
    console.log(request.body);
    const { body } = request;
    const newUser = { id: mockUsers[mockUsers.length -1].id + 1, ...body};
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
});

app.get("/api/users/:id", (request, response) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    console.log(parsedId);
    if (isNaN(parsedId))
         return response.status(400).send({msg:"Bad Request . Invalid ID."});
    const findUser = mockUsers.find((user) => user.id === parsedId);
    if (!findUser) return response.sendStatus(404); //eger user id yi bulamazssa
    return response.send(findUser);

});

app.get("/api/products", (request, response) => {
    response.send([{ id: 123, name: "chicken breast", price:12.99 }]);
});


//PUT - apdete
app.put("/api/users/:id", (request, response) => {
    const { 
        body,
        params: { id },
    } = request;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.sendStatus(400);

    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

    if (findUserIndex === -1) return response.sendStatus(404);
    mockUsers[findUserIndex] = { id: parsedId, ...body};
    return response.sendStatus(200);

});


//PATCH --sadece sectimiz elimnti degistiryorv--1:19:30
app.patch("/api/users/:id", (request, response) => {
    const { 
        body,
        params: { id },
    } = request;

    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.sendStatus(400);

    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) return response.sendStatus(404); //user not found
    mockUsers[findUserIndex] = {...mockUsers[findUserIndex], ...body};
    return response.sendStatus(200);

});

//DELETE
app.delete("/api/users/:id", (request, response) => {
    const { 
        params: { id },
    } = request;

    const parsedId = parseInt(id);

    if (isNaN(parsedId)) return response.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) return response.sendStatus(404);
    mockUsers.splice(findUserIndex, 1);
    return response.sendStatus(200);
});
 


// localhost:3000;
//localhost:3000/users
//localhost:3000/products
