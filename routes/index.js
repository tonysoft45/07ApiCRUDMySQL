'use strict'

var movies = require('../models/movies.js')
var express = require('express')
var router = express.Router()
 
function error404(req,res,next){
    let error = new Error()
    let locals = {
        title : 'Error 404',
        description: 'Recurso no encontrado',
        error : error.message

    }

    error.status = 404

    res.render('error',locals)

    next() 
}
 
router
	.use(movies)
	.get('/', (req, res, next) => {
		req.getConnection((err, movies) => {
			movies.query('SELECT * FROM movie', (err, rows) => {
				if(err)
				{
					next( new Error('No hay regitros de Películas') )
				}
				else
				{
					let locals = {
						title : 'Lista de Películas',
						data : rows
					}

					res.render('index', locals)
				}
			})
		})
		//next()
    })    
    
    .get('/agregar', (req, res, next) =>{
        res.render('add-movie',{ title : 'Agregar Pelicula' })
    })

    .post('/', (req,res,next) => {
        req.getConnection((err, movies) => {
            let movie = {
                movie_id : req.body.movie_id,
                title : req.body.title,
                release_year : req.body.release_year,
                rating : req.body.rating,
                image : req.body.image
            }

            console.log("DATOS" + movie)

            movies.query('INSERT INTO movie SET ?', movie, (err,rows) => {
                return (err) ? res.redirect('/agregar') : res.redirect('/')
            })
        })
    })

    .get('/editar/:movie_id', (req, res, next) => {
        let movie_id= req.params.movie_id
        console.log(movie_id)

        req.getConnection((err, movies) => {
            movies.query('SELECT * FROM movie WHERE movie_id=?', movie_id, (err,rows) => {
                console.log(err, '----', rows)
                if(err){
                    throw(err);
                } else {
                    let locals = {
                        title : 'Editar Pelicula',
                        data : rows
                    }

                    res.render('edit-movie', locals)
                }
            })
        })
    })

    .post('/actualizar/:movie_id', (req,res,next) =>{
        req.getConnection((err, movies) => {
            let movie = {
                movie_id : req.body.movie_id,
                title : req.body.title,
                release_year : req.body.release_year,
                rating : req.body.rating,
                image : req.body.image
            }

            console.log("DATOS" + movie)

            movies.query('UPDATE movie SET ? WHERE movie_id = ?', [movie, movie.movie_id],  (err,rows) => {
                return (err) ? res.redirect('/editar/:movie_id') : res.redirect('/')
            })
        })
    })

    .post('/eliminar/:movie_id', (req,res,next) =>{
        req.getConnection((err, movies) => {
            let movie_id = req.params.movie_id
            console.log(movie_id)
 
            movies.query('DELETE FROM movie WHERE movie_id = ?', movie_id,  (err,rows) => {
                console.log(err, '----', rows)
                return (err) ? next(new Error('Registro No encontrado')) : res.redirect('/')
            })
        })
    })

/*router.use(peliculas)*/

router.use(error404)


module.exports = router

/*

movies.query('SELECT * from movie', (err,rows)=>{
    let locals  = {
        title : 'Lista de Peliculas',
        data : rows
    }

    res.render('index.jade',locals)
})
*/