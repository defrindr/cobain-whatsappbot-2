import { query } from '../components/mysql'

export async function getWord() {
    const rows = await query('select * from kata_kata order by rand() limit 1');
    return rows;
}
