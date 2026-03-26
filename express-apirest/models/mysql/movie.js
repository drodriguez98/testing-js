import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {

  host: 'localhost',
  user: 'nodeCourse',
  port: 3306,
  password: '',
  database: 'moviesdb'

}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class MovieModel {

  // Obtener todas las películas con sus géneros

  static async getAll ({ genre }) {

    // Si se envía un género, se filtarán las películas por ese género.

    if (genre) {

      // Buscar el ID del género proporcionado. Si no se encuentra el género, retornar un array vacío.

      const lowerCaseGenre = genre.toLowerCase()

      const [genres] = await connection.query('SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre])

      if (genres.length === 0) return []

      const [{ id }] = genres

      // Obtener todas las películas asociadas al género desde la tabla movie_genres

      try {

        const [moviesData] = await connection.query(

          `SELECT BIN_TO_UUID(m.id) id, m.title, m.year, m.director, m.duration, m.poster, m.rate, GROUP_CONCAT(g.name) AS genres
            FROM movie m
            INNER JOIN movie_genres mg ON m.id = mg.movie_id
            INNER JOIN genre g ON mg.genre_id = g.id
            WHERE mg.genre_id = ?
            GROUP BY m.id;`,

          [id]

        )

        const movies = moviesData.map(movie => ({

          title: movie.title,
          year: movie.year,
          director: movie.director,
          duration: movie.duration,
          poster: movie.poster,
          genre: movie.genres ? movie.genres.split(',') : [], // Verificación para asegurar que movie.genres no sea null
          rate: movie.rate

        }))

        return movies

      } catch (error) { throw new Error('Error fetching movies by genre') }

    }

    // Si no se proporciona ningún género, recuperar todas las películas

    const [moviesData] = await connection.query(

      `SELECT BIN_TO_UUID(m.id) id, m.title, m.year, m.director, m.duration, m.poster, m.rate, GROUP_CONCAT(g.name) AS genres
        FROM movie m
        LEFT JOIN movie_genres mg ON m.id = mg.movie_id
        LEFT JOIN genre g ON mg.genre_id = g.id
        GROUP BY m.id;`

    )

    const movies = moviesData.map(movie => ({

      id: movie.id,
      title: movie.title,
      year: movie.year,
      director: movie.director,
      duration: movie.duration,
      poster: movie.poster,
      genre: movie.genres ? movie.genres.split(',') : [], // Verificación para asegurar que movie.genres no sea null
      rate: movie.rate

    }))

    return movies

  }

  // Obtener una película por su id

  static async getById ({ id }) {

    const [movies] = await connection.query(

      `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate
        FROM movie WHERE id = UUID_TO_BIN(?);`,

      [id]

    )

    if (movies.length === 0) return null

    const movieData = movies[0]

    // Obtener los géneros asociados a la película

    const [genresData] = await connection.query(

      `SELECT g.name
        FROM genre g
        INNER JOIN movie_genres mg ON g.id = mg.genre_id
        WHERE mg.movie_id = UUID_TO_BIN(?);`,

      [id]

    )

    const genres = genresData.map(genre => genre.name)

    // Formatear la película con los géneros obtenidos

    const formattedMovie = {

      id: movieData.id,
      title: movieData.title,
      year: movieData.year,
      director: movieData.director,
      duration: movieData.duration,
      poster: movieData.poster,
      rate: movieData.rate,
      genre: genres

    }

    return formattedMovie

  }

  // Crear una película

  static async create ({ input }) { // genre es un array

    try {

      const { genre: genreInput, title, year, duration, director, rate, poster } = input

      // Insertar la película en la tabla movie

      const [uuidResult] = await connection.query('SELECT UUID() uuid;')
      const [{ uuid }] = uuidResult

      const [insertMovie] = await connection.query(

        `INSERT INTO movie (id, title, year, director, duration, poster, rate)
        VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,

        [title, year, director, duration, poster, rate]

      )

      const movieId = insertMovie.insertId

      // Insertar los géneros asociados a la película en la tabla movie_genres

      for (const genre of genreInput) {

        const [genreIdResult] = await connection.query(

          'SELECT id FROM genre WHERE name = ?;',

          [genre])

        if (genreIdResult.length > 0) {

          const [{ id: genreId }] = genreIdResult
          await connection.query(

            `INSERT INTO movie_genres (movie_id, genre_id) 
            VALUES (UUID_TO_BIN("${uuid}"), ?);`,

            [genreId])

        }

      }

      const movieDetails = {

        title,
        year,
        director,
        duration,
        poster,
        rate,
        genre: genreInput

      }

      // Retornar los datos de la película excepto el ID

      return movieDetails

    } catch (error) {

      console.error('Error creating movie:', error) // Registrar el error detallado

      throw new Error('Error creating movie')

    }

  }

  // Actualizar una película

  static async update ({ id, input }) {

    try {

      const allowedFields = ['title', 'year', 'duration', 'director', 'rate', 'poster']

      const updateValues = []
      const updateFields = Object.keys(input)

        .filter(field => allowedFields.includes(field) && input[field] !== undefined)

        .map(field => {

          updateValues.push(input[field])
          return `${field} = ?`

        })

      if (updateFields.length === 0) { throw new Error('No fields provided for update') }

      updateValues.push(id) // Agregar el ID para la condición WHERE

      const updateQuery = `UPDATE movie SET ${updateFields.join(', ')} WHERE id = UUID_TO_BIN(?);`

      await connection.query(updateQuery, updateValues)

      // Obtener la película actualizada después de la actualización

      const [updatedMovieData] = await connection.query(

        `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate
        FROM movie WHERE id = UUID_TO_BIN(?);`,

        [id]

      )

      if (updatedMovieData.length === 0) { throw new Error('Movie not found after update') }

      const updatedMovie = {

        id: updatedMovieData[0].id,
        title: updatedMovieData[0].title,
        year: updatedMovieData[0].year,
        director: updatedMovieData[0].director,
        duration: updatedMovieData[0].duration,
        poster: updatedMovieData[0].poster,
        rate: updatedMovieData[0].rate

      }

      return updatedMovie

    } catch (error) {

      console.error('Error updating movie:', error)
      throw new Error('Error updating movie')

    }

  }

  static async delete ({ id }) {

    try {

      const deleteMovieQuery = await connection.query(

        'DELETE FROM movie WHERE id = UUID_TO_BIN(?);',

        [id]

      )

      if (deleteMovieQuery[0].affectedRows > 0) {

        return { message: 'Movie deleted successfully' }

      } else { throw new Error('Movie not found') }

    } catch (error) {

      console.error('Error deleting movie:', error)
      throw new Error('Error deleting movie')

    }

  }
  
}
