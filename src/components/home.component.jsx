import React, { useState } from "react";  
import { read, utils, writeFile } from 'xlsx';

const HomeComponent = () => {
    const [dataCliente, setdataCliente] = useState([]);

    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setdataCliente(rows)
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }

    const handleExport = () => {
        const headings = [[
            'Empresa',
            'Encargado',
            'Curso',
            'Inscritos',
            'Valor',
            "Nombre",
            "Rut",
            "Correo",
        ]];
        const wb = utils.book_new();
        const ws = utils.json_to_sheet([]);
        utils.sheet_add_aoa(ws, headings);
        utils.sheet_add_json(ws, dataCliente, { origin: 'A2', skipHeader: true });
        utils.book_append_sheet(wb, ws, 'Report');
        writeFile(wb, 'dataCliente Report.xlsx');
    }

    return (
        <>
            <div className="row mb-2 mt-5">
                <div className="col-sm-6 offset-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group">                
                                <div className="custom-file">
                                    <input type="file" name="file" className="custom-file-input" id="customFileLang" required onChange={handleImport} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" lang="es"/>
                                    <label class="custom-file-label" for="customFileLang">Seleccionar Archivo</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <button onClick={handleExport} className="btn btn-primary float-right">
                                Export <i className="fa fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 offset-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Empresa</th>
                                <th scope="col">Encargado</th>
                                <th scope="col">Nombre Curso</th>
                                <th scope="col">Inscritos</th>
                                <th scope="col">Valor</th>
                            </tr>
                        </thead>
                        <tbody> 
                        {
                                    dataCliente.length
                                    ?
                                    dataCliente.map((movie) => (
                                        <tr>
                                            <th>{ movie.Empresa }</th>
                                            <td>{ movie.Encargado }</td>
                                            <td>{ movie.Curso }</td>
                                            <td>{ movie.Inscritos }</td>
                                            <td>{ movie.Valor }</td>
                                        </tr> 
                                    ))
                                    :
                                    <tr>
                                        <td colSpan="5" className="text-center">No dataCliente Found.</td>
                                    </tr> 
                                }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 offset-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Rut</th>
                                <th scope="col">Correo</th>
                            </tr>
                        </thead>
                        <tbody> 
                               
                                 {
                                    dataCliente.length
                                    ?
                                    dataCliente.map((movie, index) => (
                                        <tr key={index}>
                                            <th scope="row">{ index + 1 }</th>
                                            <td>{ movie.Nombre }</td>
                                            <td>{ movie.Rut }</td>
                                            <td>{ movie.Correo }</td>
                                        </tr> 
                                    ))
                                    :
                                    <tr>
                                        <td colSpan="5" className="text-center">No dataCliente Found.</td>
                                    </tr> 
                                }
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
};

export default HomeComponent;
