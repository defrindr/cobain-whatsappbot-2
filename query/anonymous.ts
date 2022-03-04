import { query } from '../components/mysql'

export async function getAdmin() {
    const rows = await query('select * from admin');
    return rows;
}

export async function getListProduct() {
    const rows = await query('select * from product');
    return rows;
}