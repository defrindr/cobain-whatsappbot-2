import { query } from '../components/mysql'

export async function getAdmin() {
    const rows = await query('select * from wa_admin');
    return rows;
}
