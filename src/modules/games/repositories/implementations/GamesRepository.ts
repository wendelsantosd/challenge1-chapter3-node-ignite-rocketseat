import { getRepository, Repository } from 'typeorm'

import { User } from '../../../users/entities/User'
import { Game } from '../../entities/Game'

import { IGamesRepository } from '../IGamesRepository'

export class GamesRepository implements IGamesRepository {
    private repository: Repository<Game>
    private userRepository: Repository<User>

    constructor() {
        this.repository = getRepository(Game)
    }

    async findByTitleContaining(param: string): Promise<Game[]> {
        return await this.repository
            .createQueryBuilder()
            .where('title ILIKE :title')
            .setParameter('title', `%${param}%`)
            .getMany()
    }

    async countAllGames(): Promise<[{ count: string }]> {
        return await this.repository.query(`
          SELECT COUNT(id) FROM games
        `) // Complete usando raw query
    }

    async findUsersByGameId(id: string): Promise<User[] | null> {
        const users = await this.repository
            .createQueryBuilder()
            .select('users')
            .where('id = :id', { id })
            .getMany()

        return null
        // Complete usando query builder
    }
}
