import React from 'react';
import { useState } from "react";
import { uid } from "uid";
import './form.css';
import { Table } from "../index"

function Form() {
  const [popUpForm, setPopUpForm] = useState(false);

  const [produks, setProduks] = useState([
    {
      nama: "Iphone 12 Pro",
      beli: "12000000",
      jual: "13000000",
      stok: "4",
    }
  ]);

  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  const [formData, setFormData] = useState({
    nama: "",
    beli: "",
    jual: "",
    stok: "",
  });

  function handleChange(e) {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let data = [...produks];

    if (formData.nama === "") {
      return false;
    }

    if (formData.beli === "") {
      return false;
    }

    if (formData.jual === "") {
      return false;
    }

    if (formData.stok === "") {
      return false;
    }

    if (isUpdate.status) {
      data.forEach((produk) => {
        if (produk.id === isUpdate.id) {
          produk.nama = formData.nama;
          produk.beli = formData.beli;
          produk.jual = formData.jual;
          produk.stok = formData.stok;
        }
      });
    } else {
      data.push({ id: uid(), nama: formData.nama, beli: formData.beli, jual: formData.jual, stok: formData.stok });
    }

    setProduks(data);
    setFormData({ nama: "", beli: "", jual: "", stok: "" });
    setIsUpdate({ id: null, status: false });
  }

  function handleEdit(id) {
    let data = [...produks];
    let foundData = data.find((produk) => produk.id === id);
    setFormData({ nama: foundData.nama, beli: foundData.beli, jual: foundData.jual, stok: foundData.stok });
    setIsUpdate({ id: id, status: true });
    popUpFormHandler()
  }

  function handleDelete(id) {
    let data = [...produks];
    if (window.confirm("Hapus Data?")) {
      let filterData = data.filter((produk) => produk.id !== id);
      setProduks(filterData);
    } else {
      return false;
    }

    setPopUpForm(false);
  }

  function popUpFormHandler() {
    setPopUpForm(true);
  }

  function closePopUpFormHandler() {
    setPopUpForm(false);
    setFormData({ nama: "", beli: "", jual: "", stok: "" });
  }
  return (
    <div className="halaman-utama">
      {popUpForm ?
        <div class="form-container">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="nama">Nama Barang</label>
              <input type="text" className='form-input' onChange={handleChange} value={formData.nama} name="nama" />
            </div>
            <div className="form-group">
              <label htmlFor="">Harga Beli</label>
              <input type="number" className='form-input' onChange={handleChange} value={formData.beli} name="beli" />
            </div>
            <div className="form-group">
              <label htmlFor="">Harga Jual</label>
              <input type="number" className='form-input' onChange={handleChange} value={formData.jual} name="jual" />
            </div>
            <div className="form-group">
              <label htmlFor="">Stok</label>
              <input type="number" className='form-input' onChange={handleChange} value={formData.stok} name="stok" />
            </div>
            <div>
              <button type="submit" className="btn-simpan">
                Simpan
              </button>
              <button type="submit" onClick={closePopUpFormHandler} className="btn-keluar">
                Keluar
              </button>
            </div>
          </form>
        </div>
        :
        ""}

      <button type='submit' onClick={popUpFormHandler} className='tombol-form'>Isi Form</button>
      <Table handleEdit={handleEdit} handleDelete={handleDelete} data={produks} />
    </div>

  )
}

export default Form