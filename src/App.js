import logo from './logo.svg';
import './App.css';

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faEdit, faTrashAlt } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Component } from 'react';

const url = "http://localhost:8090/api/v1/venta/";


class App extends Component {

	state = {
		data: [],
		modalInsertar: false,
		form: {
			idVenta: '',
			fechaVenta: '',
			nombreCliente: '',
			producto: '',
			cantidad: '',
			precioUnitario: '',
			precioTotal: ''
		}
	}

	handleChange = async e => {
		e.persist();
		await this.setState({
			form: {
				...this.state.form,
				[e.target.name]: e.target.value
			}
		});
		console.log(this.state.form);
	}

	modalInsertar = () => {
		this.setState({ modalInsertar: !this.state.modalInsertar });
	}

	peticionGet = () => {
		axios.get(url).then(
			response => {
				this.setState({ data: response.data.data });
			}).catch(error => {
				console.log(error.message);
			})
	}

	peticionPost = async () => {
		delete this.state.form.idVenta;
		await axios.post(url, this.state.form).then(response => {
			this.modalInsertar();
			this.peticionGet();
		}).catch(error => {
			console.log(error.message);
		})
	}

	//Ciclo de vida
	componentDidMount() {
		this.peticionGet();
	}

	render() {
		const { form } = this.state;

		return (
			<div className="App">
				<br />
				<button className='btn btn-success' onClick={() => this.modalInsertar()}>Agregar Venta</button>
				<br /><br />
				<h3>Lista de Ventas</h3>
				<table className='table'>
					<thead>
						<tr>
							<th>Id Venta</th>
							<th>Fecha de la venta</th>
							<th>Nombre cliente</th>
							<th>Producto</th>
							<th>Cantidad</th>
							<th>Precio Unitario</th>
							<th>Precio Total</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{this.state.data.map(venta => {
							return (
								<tr>
									<td>{venta.idVenta}</td>
									<td>{venta.fechaVenta}</td>
									<td>{venta.nombreCliente}</td>
									<td>{venta.producto}</td>
									<td>{venta.cantidad}</td>
									<td>{venta.precioUnitario}</td>
									<td>{venta.precioTotal}</td>
									<td>
										<button className="btn btn-primary" onClick={() => { this.seleccionarEmpresa(venta); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
										{"   "}
										<button className="btn btn-danger" onClick={() => { this.seleccionarEmpresa(venta); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				{
					//Modal para insertar Ventas	
				}

				<Modal isOpen={this.state.modalInsertar}>
					<ModalHeader style={{ display: 'block' }}>
						<span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
					</ModalHeader>
					<ModalBody>
						<div className="form-group">
							<label htmlFor="idVenta">ID</label>
							<input className="form-control" type="text" name="idVenta" id="ididVenta" readOnly onChange={this.handleChange} value={this.state.data.length + 1} />
							<br />
							<label htmlFor="fechaVenta">Fecha venta</label>
							<input className="form-control" type="date" name="fechaVenta" id="fechaVenta" onChange={this.handleChange} value={form.fechaVenta} />
							<br />
							<label htmlFor="nombreCliente">Nombre</label>
							<input className="form-control" type="text" name="nombreCliente" id="nombreCliente" onChange={this.handleChange} value={form.nombreCliente} />
							<br />
							<label htmlFor="producto">Producto</label>
							<input className="form-control" type="text" name="producto" id="producto" onChange={this.handleChange} value={form.producto} />
							<br />
							<label htmlFor="cantidad">Cantidad</label>
							<input className="form-control" type="number" name="cantidad" id="cantidad" onChange={this.handleChange} value={form.cantidad} />
							<br />
							<label htmlFor="precioUnitario">Precio Unitario</label>
							<input className="form-control" type="text" name="precioUnitario" id="precioUnitario" onChange={this.handleChange} value={form.precioUnitario} />
							<br />
							<label htmlFor="precioTotal">Precio Total</label>
							<input className="form-control" type="text" name="precioTotal" id="precioTotal" onChange={this.handleChange} value={form.precioTotal} />
						</div>
					</ModalBody>

					<ModalFooter>
						
							<button className="btn btn-success" onClick={() => this.peticionPost()}>
								Insertar
							</button>
						<button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default App;
