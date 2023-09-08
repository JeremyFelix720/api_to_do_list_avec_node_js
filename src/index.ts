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
})

app.get('/toto', (req, res) => {
    res.send('Toto')
  })

// ROUTES EN LIEN AVEC LA TO DO LIST :

// Ajout d'une tache dans la liste lorsque le bouton de rajout est cliqué.
app.get('/add_task/:description', (req, res) => {
    //let taskDescription = preq.params.description
    //res.send()
})

// Mise à jour d'une tache (active / non-active) de la liste lorsqu'une coche est cliquée.
app.get('/update_task/:id/:active', (req, res) => {
    //let idTask = preq.params.id
    //let activeTask = preq.params.active
    //res.send()
})

// Suppression d'une tache lorsque la croix est cliquée.
app.get('/remove_task/:id', (req, res) => {
    //let idTask = preq.params.id
    //res.send()
})

// Suppression de toutes les taches lorsque le bouton tout en bas est cliqué.
app.get('/remove_all_tasks/:id', (req, res) => {
    //let idTask = preq.params.id
    //res.send()
})

// Selection et rajout dans la liste de toutes les taches lorsque l'on raffraichit la page web.
app.get('/get_all_tasks/:id', (req, res) => {
    //let idTask = preq.params.id
    //res.send()
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
