import React from 'react';
import './table.css';

function Table({ data, handleEdit, handleDelete }) {
  return (
    <div className='container-table'>
      <table class="table">
        <tr>
          <th>Nama Barang</th>
          <th>Harga Beli</th>
          <th>Harga Jual</th>
          <th>Stok</th>
          <th>Opsi</th>
        </tr>
        {data.map((produk) => (
          <tr>
            <td>{produk.nama}</td>
            <td>Rp.{produk.beli}</td>
            <td>Rp.{produk.jual}</td>
            <td>{produk.stok}</td>
            <td>
              <button onClick={() => handleEdit(produk.id)} className="btn-edit">Edit</button>
              <button onClick={() => handleDelete(produk.id)} className="btn-hapus">Hapus</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default Table