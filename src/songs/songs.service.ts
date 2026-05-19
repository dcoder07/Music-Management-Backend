import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class SongsService {
    constructor(@Inject('POSTGRES_POOL') private readonly sql: any) { }
    async getAllSongs(): Promise<any[]> {
        const result = await this.sql.query(`SELECT * FROM public.songs`);
        return result;
    }
}