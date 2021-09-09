import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
      return await this.repository
      .createQueryBuilder()
      .select('*')
      .where('title = :title', { title: `LOWER(%${param}%)`})
      .getMany()
      // Complete usando query builder
    //SELECT * FROM games WHERE param LIKE LOWER(%param%)
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return await this.repository.query(`
      SELECT COUNT(id) FROM games
    `); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const users = await this.repository
      .createQueryBuilder()
      .leftJoinAndSelect(
        qb => qb
        .select('*')
        .from('users', 'u'),
        'u'
      )
      .where('id = :id', {id})
      .getRawMany()
      // Complete usando query builder
  }
}
