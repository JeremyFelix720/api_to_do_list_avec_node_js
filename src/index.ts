console.log('Hello world');

//const express = require('express')
import express from 'express'
import "dotenv/config"

const app = express()

const port = process.env.PORT
const dbUsername = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD
const dbName = process.env.DATABASE_NAME
const dbPort = process.env.PORT_DATABASE
// Récupération des valeurs indiquées dans le fichier ".env" ; pas besoin des infos de la BDD pour utiliser "DB SQLite" mais juste pour postGres et PgAdmin.

/*
console.log("dbPort = " + dbUsername, "/ dbPassword = " + dbPassword, "/ dbName = " + dbName, "/ dbPort = " + dbPort);
*/



// Copié-collé du code de Thomas (pour créer la BDD locale avec SQLite) :

import { DataTypes, Sequelize } from "sequelize"

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
})

const Todo = sequelize.define("Todo", {
  name: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
}, {
  timestamps: false,
})

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('La synchronisation a réussi.');
    Todo.create({
      name: "tache 1",
      status: true,
    })
    .then((todo) => {
      console.log("todo", todo)
      Todo.findAll().then((todos) => {
        console.log("todos", todos)
      })
    })
  })
  .catch(error => {
    console.error('Erreur de synchronisation:', error);
  });




app.get('/', (req, res) => {
  res.send('Hello World!')

  Todo.create({
    name: "toto",
    status: false
  })

  Todo.create({
    name: "tata",
    status: true
  })

  Todo.create({
    name: "patate",
    status: false
  })
})

app.get('/toto', (req, res) => {
    res.send('Toto')
  })


// ROUTES EN LIEN AVEC LA TO DO LIST :

// Ajout d'une tache dans la liste lorsque le bouton de rajout est cliqué.
app.get('/add_task/:description', (req, res) => {
    let taskDescription = req.params.description

    // Avec l'ORM "Sequalize", rempli les champs "name" et "status" dans la BDD (table SQLite "Todos" ; voir fichier "db.sqlite")
    Todo.create({
      name: taskDescription,
      status: false
    })

    console.log(taskDescription)
    res.send("La tache suivante a bien été rajoutée : " + taskDescription)
})


// Mise à jour d'une tache (active / non-active) de la liste lorsqu'une coche est cliquée.
app.patch('/update_task/:id/:status', async (req, res) => {
  let idTask = req.params.id
  let statusTask = req.params.status
  //let idTask = 2
  //let statusTask = true

  // Avec l'ORM "Sequalize", change le status de la tache dans la BDD qui a pour id celui entré en parametre.
  const updatedTodo = await Todo.update({ status: statusTask }, {
    where: {
      id: idTask
    }
  })
  
  console.log("idTask = " + idTask + " / statusTask = " + statusTask)
  res.send("La tache avec pour id : " + idTask + " a bien été mis à jour.")
})

// Suppression d'une tache lorsque la croix est cliquée.
app.delete('/remove_task/:id', async  (req, res) => {
  let idTask = req.params.id
  //let idTask = 2

  // Avec l'ORM "Sequalize", supprime la tache dans la BDD qui a pour id celui entré en parametre.
  await Todo.destroy({
    where: {
      id: idTask
    }
  });
  
  res.send("La tache avec pour id : " + idTask + " a bien été supprimée.")
})

// Suppression de toutes les taches lorsque le bouton tout en bas est cliqué.
app.delete('/remove_all_tasks/:id', (req, res) => {
    let idTask = req.params.id
    res.send("Tous les éléments de la liste ont bien été supprimés.")
})

// Selection (et rajout ?) dans la liste de toutes les taches lorsque l'on raffraichit la page web.
app.get('/get_all_tasks/', async (_, res) => {

  // Récupère toutes les taches
  const todos = await Todo.findAll();
  console.log(todos.every(task => task instanceof Todo)); // true
  console.log("All tasks:", JSON.stringify(todos, null, 2));
  console.log(todos)
  res.send(todos)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// Option 3: Passing parameters separately (other dialects)

/*
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
/*  });*/


