/* eslint-disable array-callback-return */
import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthProviderProducContext = createContext();

export const AdminProvider = ({ children }) => {
	const [productos, setProductos] = useState([]);
	const [producto, setProducto] = useState({});
	const [users, setUsers] = useState([]);
	const [categorias, setCategorias] = useState([]);
	const [ordenes, setOrdenes] = useState([]);
	const [ventas, setVentas] = useState([]);
	const [pagos, setPagos] = useState([]);
	const [_marca, setMarca] = useState("");
	const [baneos, setBaneos] = useState([]);
	// const [rols, setRols] = useState("");
	const [perfilIDUser, setPerfilIDUser] = useState([]);
	const [tatalOrdenes, setTatalOrdenes] = useState();
	const [tatalGanancias, setTatalGanancias] = useState();
	const [totalBalance, setTotalBalance] = useState();
	const [totalMeses, setTotalMeses] = useState([]);
  const [ventasProMes, setVentasProMes] = useState();
  const [totalPorCategorias, setTotalPorCategorias] = useState();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("info_user"));

		if (user?.rol === "Admin") {
			const pagos = async () => {
				try {
					const token = localStorage.getItem("token");
					if (!token) return;
					const config = {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					};
					const { data } = await axios.get(
						`${process.env.REACT_APP_API}/admin/transacciones`,
						config
					);

					setPagos(data);
				} catch (error) {
					console.log(error.response.data.msg);
				}
			};
			pagos();
			const ventas = async () => {
				try {
					const token = localStorage.getItem("token");
					if (!token) return;
					const config = {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					};
					const { data } = await axios.get(
						`${process.env.REACT_APP_API}/admin/ventas`,
						config
					);

					setVentas(data);
				} catch (error) {
					console.log(error.response.data.msg);
				}
			};
			ventas();
			const ordenes = async () => {
				try {
					const token = localStorage.getItem("token");
					if (!token) return;
					const config = {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					};
					const { data } = await axios.get(
						`${process.env.REACT_APP_API}/admin/ordenes`,
						config
					);

					setOrdenes(data);
				} catch (error) {
					console.log(error.response.data.msg);
				}
			};
			ordenes();
			const obtenerCategorias = async () => {
				try {
					const token = localStorage.getItem("token");
					if (!token) return;
					const config = {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					};
					const { data } = await axios.get(
						`${process.env.REACT_APP_API}/admin/categorias`,
						config
					);

					setCategorias(data);
				} catch (error) {
					console.log(error.response.data.msg);
				}
			};
			obtenerCategorias();

			const obtenerUsers = async () => {
				try {
					const token = localStorage.getItem("token");
					if (!token) return;
					const config = {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					};
					const { data } = await axios.get(
						`${process.env.REACT_APP_API}/admin/users`,
						config
					);

					setUsers(data);
				} catch (error) {
					console.log(error.response.data.msg);
				}
			};
			obtenerUsers();
			const obtenerProducto = async () => {
				try {
					const token = localStorage.getItem("token");
					if (!token) return;
					const config = {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					};
					const { data } = await axios.get(
						`${process.env.REACT_APP_API}/admin/obtener`,
						config
					);
					setProductos(data);
					let marcas = {};
					data.map((elem) => {
						if (!marcas.hasOwnProperty([elem.marca])) {
							marcas[elem.marca] = elem.marca;
						}
					});
					setMarca(Object.keys(marcas));
				} catch (error) {
					console.log(error.response.data.msg);
				}
			};
			obtenerProducto();

			const _obtenerPedidos = async () => {
				try {
					const { data } = await axios.get(`/admin/envios`);
					let total = data
						.map((e) => e.payments)
						.filter(e => e.length > 0)
						.reduce((a, b) => a + b[0].transaction_amount, 0);
					let total_ganancia = (total * 40) / 100;
					setTatalOrdenes(data.length);
					setTotalMeses(data.map((e) => e.payments[0].date_approved.split("-")[1]));
					setTatalGanancias(new Intl.NumberFormat("de-DE", {maximumSignificantDigits: 3,}).format(total_ganancia));
					setTotalBalance(new Intl.NumberFormat("de-DE", {maximumSignificantDigits: 3,}).format(total));
					let Jan = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 0)
          let Feb = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 1)
          let Mar = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 2)
          let Apr = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 3)
          let May = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 4)
          let Jun = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 5)
          let Jul = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 6)
          let Aug = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 7)
          let Sep = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 8)
          let Oct = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 9)
          let Nov = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 10)
          let Dec = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 11)
          let obj = {
            '0' : Jan,
            '1' : Feb,
            '2' : Mar,
            '3' : Apr,
            '4' : May,
            '5' : Jun,
            '6' : Jul,
            '7' : Aug,
            '8' : Sep,
            '9' : Oct,
            '10' : Nov,
            '11' : Dec,
          }
          setVentasProMes(obj)
          
          /*  */
          let _categorias = data.map((e) => e.items.map((e) => e.category_id)).flat(Infinity); 
          let total_por_categorias = {};
          for (let i = 0; i < _categorias.length; i++) {
            if ( total_por_categorias.hasOwnProperty(_categorias[i]) ) {
              total_por_categorias[_categorias[i]] += 1;
            } else {
              total_por_categorias[_categorias[i]] = 1;
            }
          }
          setTotalPorCategorias(total_por_categorias)
          /*  */
				} catch (error) {
					console.log(error);
				}
			};
			_obtenerPedidos();
		} else if (user?.rol === "Owner") {
			//********************************************************* */
			const pagos = async () => {
				try {
					const token = localStorage.getItem("token");
					if (!token) return;
					const config = {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					};
					const { data } = await axios.get(
						`${process.env.REACT_APP_API}/owner/transacciones`,
						config
					);

					setPagos(data);
				} catch (error) {
					console.log(error.response.data.msg);
				}
			};
			pagos();
			const ventas = async () => {
				try {
					const token = localStorage.getItem("token");
					if (!token) return;
					const config = {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					};
					const { data } = await axios.get(
						`${process.env.REACT_APP_API}/owner/ventas`,
						config
					);

					setVentas(data);
				} catch (error) {
					console.log(error.response.data.msg);
				}
			};
			ventas();
			const ordenes = async () => {
				try {
					const token = localStorage.getItem("token");
					if (!token) return;
					const config = {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					};
					const { data } = await axios.get(
						`${process.env.REACT_APP_API}/owner/ordenes`,
						config
					);

					setOrdenes(data);
				} catch (error) {
					console.log(error.response.data.msg);
				}
			};
			ordenes();
			const obtenerCategorias = async () => {
				try {
					const token = localStorage.getItem("token");
					if (!token) return;
					const config = {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					};
					const { data } = await axios.get(
						`${process.env.REACT_APP_API}/owner/categorias`,
						config
					);

					setCategorias(data);
				} catch (error) {
					console.log(error.response.data.msg);
				}
			};
			obtenerCategorias();

			const obtenerUsers = async () => {
				try {
					const token = localStorage.getItem("token");
					if (!token) return;
					const config = {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					};
					const { data } = await axios.get(
						`${process.env.REACT_APP_API}/owner/usuarios`,
						config
					);

					setUsers(data);
				} catch (error) {
					console.log(error.response.data.msg);
				}
			};
			obtenerUsers();
			const obtenerProducto = async () => {
				try {
					const token = localStorage.getItem("token");
					if (!token) return;
					const config = {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					};
					const { data } = await axios.get(
						`${process.env.REACT_APP_API}/owner/obtener`,
						config
					);
					setProductos(data);
					let marcas = {};
					data.map((elem) => {
						if (!marcas.hasOwnProperty([elem.marca])) {
							marcas[elem.marca] = elem.marca;
						}
					});
					setMarca(Object.keys(marcas));
				} catch (error) {
					console.log(error.response.data.msg);
				}
			};
			obtenerProducto();
		}
	}, []);

	const obtenerProducto_por_nombre = async (nombre) => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/admin/obtener?nombre=${nombre}`,
				config
			);
			setProductos(data);
		} catch (error) {
			setProductos(error.response.data.msg);
			console.log(error.response.data.msg);
		}
	};

	const obtenerProductos_filtrados = async (marca, stock, precio) => {
		let endpoint;
		if (marca && !stock && !precio) {
			endpoint = `?marca=${marca}`;
		} else if (!marca && stock && !precio) {
			endpoint = `?stock=${stock}`;
		} else if (!marca && !stock && precio) {
			endpoint = `?precio=${precio}`;
		}
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/admin/obtener/filtro${endpoint}`,
				config
			);

			setProductos(data);
		} catch (error) {
			setProductos(error.response.data.msg);
			console.log(error.response.data.msg);
		}
	};

	const guardarProducto = async (producto) => {
		const token = localStorage.getItem("token");
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		if (producto?.id) {
			try {
				const { data } = await axios.put(
					`${process.env.REACT_APP_API}/admin/modificar/${producto.id}`,
					producto,
					config
				);
				const productoActualizado = productos.map((e) =>
					e._id === data._id ? data : e
				);
				setProductos(productoActualizado);
			} catch (error) {
				console.log(error.response.data.msg);
			}
		} else {
			try {
				console.log(producto, "estoy aca");
				const { data } = await axios.post(`/admin/crear`, producto, config);
				const { createdAt, updatedAt, ...productosAlmacenados } = data;
				setProductos([productosAlmacenados, ...productos]);
			} catch (error) {
				console.log(error.response.data.msg);
			}
		}
	};
	//   const banear = async(baneos)=>{
	// 	if (baneos?.id) {
	// 		try {
	// 		  const { data } = await axios.put(
	// 			`${process.env.REACT_APP_API}/admin/modificar/${baneos.id}`,
	// 			producto,
	// 			config
	// 		  );
	// 		  const productoActualizado = productos.map((e) =>
	// 			e._id === data._id ? data : e
	// 		  );
	// 		  setProductos(productoActualizado);
	// 		} catch (error) {
	// 		  console.log(error.response.data.msg);
	// 		}

	//   }
	const putProducto = (e) => {
		setProducto(e);
	};
	const putBan = (e) => {
		setBaneos(e);
	};
	const putRol = (e) => {
		setProducto(e);
	};
	const obtenerPerfilId = async (id) => {
		const token = localStorage.getItem("token");

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};

		try {
			// eslint-disable-next-line no-unused-vars
			const { data } = await axios(
				`${process.env.REACT_APP_API}/admin/perfilUser/${id}`,
				config
			);
			console.log(`Soy la funcion`, data);
			setPerfilIDUser(data);
		} catch (error) {
			console.log(error);
		}
	};

	const UpdateRolUser = async (id, roles) => {
		let obj = {
			rols: roles,
		};
		const token = localStorage.getItem("token");

		console.log(`soy el aut rols`, obj);
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		try {
			// eslint-disable-next-line no-unused-vars
			const { data } = await axios.put(
				`${process.env.REACT_APP_API}/admin/update-rango/${id}`,
				obj,
				config
			);
			console.log(`Soy la RolUpdate`, data);
		} catch (error) {
			console.log(error.message);
		}
	};
	const BanearUsuario = async (id, ban) => {
		let obj = {
			baneo: ban,
		};
		const token = localStorage.getItem("token");

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};

		try {
			// eslint-disable-next-line no-unused-vars
			const { data } = await axios.put(
				`${process.env.REACT_APP_API}/admin/ban/${id}`,
				obj,
				config
			);
			console.log(`Soy la baneo`, data);
		} catch (error) {
			console.log(error.message);
		}
	};
	const eliminarCategoria = async (id) => {
		// eslint-disable-next-line no-restricted-globals
		const confirmar = confirm(
			"¿Confirmas que desas eliminar el siguiente registro ?"
		);
		const token = localStorage.getItem("token");

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		if (confirmar) {
			try {
				// eslint-disable-next-line no-unused-vars
				await axios.delete(
					`${process.env.REACT_APP_API}/admin/categorias/${id}`,
					config
				);
				const categoriaActualizadas = categorias.filter((e) => e.id !== id);
				setCategorias(categoriaActualizadas);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const actualizarCategoria_nombre = async (id, nombre) => {
		const token = localStorage.getItem("token");

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		const body = { nombre };
		try {
			// eslint-disable-next-line no-unused-vars
			const { data } = await axios.put(
				`${process.env.REACT_APP_API}/admin/categorias/${id}/cambiar_nombre`,
				body,
				config
			);
			// setCategorias(data);
		} catch (error) {
			console.log(error);
		}
	};

	const actualizarCategoria_agregar_relacion = async (
		id,
		nombre,
		productos_a_agregar
	) => {
		const token = localStorage.getItem("token");

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		const body = { nombre, productos_a_agregar };
		try {
			// eslint-disable-next-line no-unused-vars
			const { data } = await axios.put(
				`${process.env.REACT_APP_API}/admin/categorias/${id}/agregar_relacion`,
				body,
				config
			);
			// setCategorias(data);
		} catch (error) {
			console.log(error);
		}
	};

	const actualizarCategoria_eliminar_relacion = async (
		id,
		nombre,
		productos_a_eliminar
	) => {
		const token = localStorage.getItem("token");

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		const body = { nombre, productos_a_eliminar };
		try {
			// eslint-disable-next-line no-unused-vars
			const { data } = await axios.put(
				`${process.env.REACT_APP_API}/admin/categorias/${id}/eliminar_relacion`,
				body,
				config
			);
			// setCategorias(data);
		} catch (error) {
			console.log(error);
		}
	};

	const actualizarCategoria_agregar_eliminar_relacion = async (
		id,
		nombre,
		productos_a_eliminar,
		productos_a_agregar
	) => {
		const token = localStorage.getItem("token");

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		const body = { nombre, productos_a_eliminar, productos_a_agregar };
		try {
			// eslint-disable-next-line no-unused-vars
			const { data } = await axios.put(
				`${process.env.REACT_APP_API}/admin/categorias/${id}/agregar_eliminar_relacion`,
				body,
				config
			);
			// setCategorias(data);
		} catch (error) {
			console.log(error);
		}
	};

	const agregarCategorias = async (nombre, productos) => {
		// eslint-disable-next-line no-restricted-globals
		const confirmar = confirm(
			"¿Confirmas que desas agregar el siguiente registro ?"
		);
		const token = localStorage.getItem("token");

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};
		const body = { nombre, productos };
		if (confirmar) {
			try {
				// eslint-disable-next-line no-unused-vars
				await axios.post(
					`${process.env.REACT_APP_API}/admin/categorias`,
					body,
					config
				);
				// const categoriaActualizadas = categorias.filter((e) => e.id !== id);
				setCategorias(categorias);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const eliminarProducto = async (id) => {
		// eslint-disable-next-line no-restricted-globals
		const confirmar = confirm(
			"¿Confirmas que desas eliminar el siguiente registro ?"
		);
		const token = localStorage.getItem("token");

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};

		if (confirmar) {
			try {
				// eslint-disable-next-line no-unused-vars
				const { data } = await axios.delete(
					`${process.env.REACT_APP_API}/admin/borrar/${id}`,
					config
				);
				const productosActualizado = productos.filter((e) => e.id !== id);
				setProductos(productosActualizado);
			} catch (error) {
				console.log(error);
			}
		}
	};
	const _obtenerProducto = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/admin/obtener`,
				config
			);
			setProductos(data);
			let marcas = {};
			data.map((elem) => {
				if (!marcas.hasOwnProperty([elem.marca])) {
					marcas[elem.marca] = elem.marca;
				}
			});
			setMarca(Object.keys(marcas));
		} catch (error) {
			console.log(error.response.data.msg);
		}
	};
	const _obtenerCategorias = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			};
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/admin/categorias`,
				config
			);

			setCategorias(data);
		} catch (error) {
			console.log(error.response.data.msg);
		}
	};

const _obtenerPedidos = async () => {
				try {
					const { data } = await axios.get(`/admin/envios`);
					let total = data.map((e) => e.payments).filter(e => e.length > 0).reduce((a, b) => a + b[0]?.transaction_amount, 0)
					let total_ganancia = (total * 40) / 100;
					setTatalOrdenes(data.length);
					setTotalMeses(data.map((e) => e.payments[0].date_approved.split("-")[1]));
					setTatalGanancias(new Intl.NumberFormat("de-DE", {maximumSignificantDigits: 3,}).format(total_ganancia));
					setTotalBalance(new Intl.NumberFormat("de-DE", {maximumSignificantDigits: 3,}).format(total));
					let Jan = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 0)
          let Feb = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 1)
          let Mar = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 2)
          let Apr = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 3)
          let May = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 4)
          let Jun = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 5)
          let Jul = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 6)
          let Aug = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 7)
          let Sep = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 8)
          let Oct = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 9)
          let Nov = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 10)
          let Dec = await data.filter(e => Number(e.payments[0].date_approved.split("-")[1]) === 11)
          let obj = {
            '0' : Jan,
            '1' : Feb,
            '2' : Mar,
            '3' : Apr,
            '4' : May,
            '5' : Jun,
            '6' : Jul,
            '7' : Aug,
            '8' : Sep,
            '9' : Oct,
            '10' : Nov,
            '11' : Dec,
          }
          setVentasProMes(obj)
          
          /*  */
          let _categorias = data.map((e) => e.items.map((e) => e.category_id)).flat(Infinity); 
          let total_por_categorias = {};
          for (let i = 0; i < _categorias.length; i++) {
            if ( total_por_categorias.hasOwnProperty(_categorias[i]) ) {
              total_por_categorias[_categorias[i]] += 1;
            } else {
              total_por_categorias[_categorias[i]] = 1;
            }
          }
          setTotalPorCategorias(total_por_categorias)
          /*  */
				} catch (error) {
					console.log(error);
				}
};

	return (
		<AuthProviderProducContext.Provider
			value={{
				guardarProducto,
				obtenerProducto_por_nombre,
				putProducto,
				putBan,
				putRol,
				perfilIDUser,
				eliminarProducto,
				obtenerProductos_filtrados,
				eliminarCategoria,
				obtenerPerfilId,
				UpdateRolUser,
				BanearUsuario,
				// actualizarCategoria,
				agregarCategorias,
				users,
				ordenes,
				categorias,
				ventas,
				productos,
				producto,
				pagos,
				_marca,
				_obtenerProducto,
				_obtenerCategorias,
				actualizarCategoria_agregar_eliminar_relacion,
				actualizarCategoria_eliminar_relacion,
				actualizarCategoria_agregar_relacion,
				actualizarCategoria_nombre,
				_obtenerPedidos,
				tatalOrdenes,
				tatalGanancias,
				totalBalance,
				totalMeses,
        ventasProMes,
        totalPorCategorias,
			}}
		>
			{children}
		</AuthProviderProducContext.Provider>
	);
};

export default AuthProviderProducContext;
