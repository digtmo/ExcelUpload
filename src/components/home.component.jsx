import React, { useState } from "react";  
import { read, utils,} from 'xlsx'; // para poder exportar el xls se debe importar esta dependencia " writeFile"
import "./home.css"

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


function Enviar () {
    console.log(dataCliente) // aca debe ir la funcion post para enviar a info 
}

const dataClienteFiltered = dataCliente.map(row => {
    Object.keys(row).forEach(key => {
        if(!row[key]) {
            delete row[key];
        }
    });
    return row;
});


  /*   const handleExport = () => {  // funcion para exportar el archivo xls
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
    } */

    return (
        <>
            <div className="row mb-2 mt-5">
                <div className="col-sm-6 offset-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group">                
                                <div className="custom-file">
                                    <input type="file" name="file" className="custom-file-input" id="customFileLang" required onChange={handleImport} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" lang="es"/>
                                    <label className="custom-file-label" for="customFileLang">Seleccionar Archivo</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <button onClick={Enviar} className="btn btn-primary float-right">
                                Cargar 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6 offset-3">
                <h2>Tabla de Cliente</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Empresa</th>
                                <th scope="col">Encargado</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Nombre Curso</th>
                                <th scope="col">Inscritos</th>
                                <th scope="col">Valor</th>
                            </tr>
                        </thead>
                        <tbody> 
                        {
                                    dataClienteFiltered.length
                                    ?
                                    dataClienteFiltered.map((data) => (
                                        <tr>
                                            <td className={data.Empresa ? '' : 'empty-cell'}>{ data.Empresa }</td>
                                            <td className={data.Encargado ? '' : 'empty-cell'}>{ data.Encargado}</td>
                                            <td className={data.Email ? '' : 'empty-cell'}>{ data.Email}</td>
                                            <td className={data.Curso ? '' : 'empty-cell'}>{ data.Curso }</td>
                                            <td className={data.Inscritos ? '' : 'empty-cell'}>{ data.Inscritos }</td>
                                            <td className={data.Valor ? '' : 'empty-cell'}>{ data.Valor }</td>             
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
                <h2>Tabla de Alumnos</h2>
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
                                    dataCliente.map((data, index) => (
                                        <tr key={index}>
                                            <th scope="row">{ index + 1 }</th>
                                            <td>{ data.Nombre }</td>
                                            <td>{ data.Rut }</td>
                                            <td>{ data.Correo }</td>
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
