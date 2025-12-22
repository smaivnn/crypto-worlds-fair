import { Injectable } from '@nestjs/common';
import { UserSearchRepository } from '../../domain/repositories/user-search.repository';
import { User } from '../../domain/entities/user.entity';

type EsClient = any; // 실제 ES 클라이언트 타입으로 교체

@Injectable()
export class UserSearchElasticsearchRepository implements UserSearchRepository {
  constructor(private readonly esClient: EsClient) {}

  async searchByKeyword(keyword: string): Promise<User[]> {
    const result = await this.esClient.search({
      index: 'users',
      query: {
        match: { name: keyword },
      },
    });

    return result.hits.hits.map((hit: any) => {
      const s = hit._source;
      return new User(s.id, s.email, s.name, new Date(s.createdAt));
    });
  }

  async indexUser(user: User): Promise<void> {
    await this.esClient.index({
      index: 'users',
      id: user.id,
      document: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt.toISOString(),
      },
    });
  }
}
