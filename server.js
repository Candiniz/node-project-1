import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'
//import { DatabaseMemory } from './database-memory'


const server = fastify()
const database = new DatabasePostgres()
//const database = new DatabaseMemory()


//POST----------------------------------------------------
server.post('/videos', async (request, reply) => {

    const {title, description, duration} = request.body

    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

//GET-----------------------------------------------------
server.get('/videos', async (request) => {
    const search = request.query.search
    const videos = await database.list(search)

    return videos
})

//PUT-----------------------------------------------------
server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id;
    const { title, description, duration } = request.body;

    try {
        await database.update(videoId, {
            title,
            description,
            duration,
        });

        return reply.status(204).send(); // 204 No Content
    } catch (error) {
        console.error("Error updating video:", error);
        return reply.status(500).send({
            error: "Failed to update video",
            details: error.message,
        });
    }
});

//DELETE--------------------------------------------------
server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    database.delete(videoId)
    
    return reply.status(204).send()
})


server.listen ({
    port: process.env.PORT ?? 3333,
})