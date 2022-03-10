import { createSlice } from '@reduxjs/toolkit'
/***
 * @type {Slice<{status: number}, {decrement: reducers.decrement, incrementByAmount: reducers.incrementByAmount, increment: reducers.increment}, string>}
 */
export const libroSlice = createSlice({
    name: 'libro',
    initialState: {
        status: 0,
        Titulo:"",
        Autor:"",
        PrintISBN:"",
        EISBN:"",
        Editorial:"",
        Edicion:"",
        Volumen:"",
        Idioma:"",
        NumPaginas:"",
        Materia:"",
        idLibro:"",
        CreateLibro:""
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload.state
            console.log(action.payload.state)
        },
        setData: (state, action) => {
            state.Titulo = action.payload.Titulo
            state.Autor = action.payload.Autor
            state.PrintISBN = action.payload.PrintISBN
            state.EISBN = action.payload.EISBN
            state.Editorial = action.payload.Editorial
            state.Edicion = action.payload.Edicion
            state.Volumen = action.payload.Volumen
            state.Idioma = action.payload.Idioma
            state.NumPaginas = action.payload.NumPaginas
            state.Materia = action.payload.Materia
            console.log(state)
        },
        setTitulo: (state, action) => {
            state.Titulo = action.payload.Titulo
        },
        setAutor: (state, action) => {
            state.Autor = action.payload.Autor
        },
        setPrintISBN: (state, action) => {
            state.PrintISBN = action.payload.PrintISBN
        },
        setEISBN: (state, action) => {
            state.EISBN = action.payload.EISBN
        },
        setEditorial: (state, action) => {
            state.Editorial = action.payload.Editorial
        },
        setEdicion: (state, action) => {
            state.Edicion = action.payload.Edicion
        },
        setVolumen: (state, action) => {
            state.Volumen = action.payload.Volumen
        },
        setIdioma: (state, action) => {
            state.Idioma = action.payload.Idioma
        },
        setNumPaginas: (state, action) => {
            state.NumPaginas = action.payload.NumPaginas
        },
        setMateria: (state, action) => {
            state.Materia = action.payload.Materia
        },

        setIdlibro:(state,action) => {
            state.idLibro = action.payload.idLibro
        }

    }
})

// Action creators are generated for each case reducer function
export const {
    setStatus,
    setData,
    setTitulo,
    setAutor,
    setPrintISBN,
    setEISBN,
    setEditorial,
    setEdicion,
    setVolumen,
    setIdioma,
    setNumPaginas,
    setMateria,
    setIdlibro
} = libroSlice.actions

export default libroSlice.reducer