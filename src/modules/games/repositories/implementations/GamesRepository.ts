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
        `)
    }

    async findUsersByGameId(id: string): Promise<User[] | undefined> {
        const game = await this.repository.findOne({
            relations: ['users'],
            where: { id: id },
        })

        return game?.users
    }
}
