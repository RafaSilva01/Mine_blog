import {useState, useEffect, useReducer} from 'react'
import {db} from '../firebase/config'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const initialState = {
    loading: null,
    error: null
}

const insertReducer = (state, action) =>{
    switch(action.type){
        case "LOADING":
            return {loading: true, error:null}
        case "INSERTED_DOC":
            return {loading: false, error:null}
        case "ERROR":
            return {loading: false, error:action.payload}
        default:
            return state;
    }

}

export const useInsertDocument = (doColletion) => {
console.log(doColletion)
    const [response, dispatch] = useReducer(insertReducer, initialState)

    // Vzamento de memoria
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDiparch = (action) => {
        if(!cancelled){
            dispatch(action);
        }
    }

    const insertDocument = async(document) =>{
        
        checkCancelBeforeDiparch({
            type:"LOADING",
            payload: insertDocument
        })

        try{
            const newDocument = {...document, createAt: Timestamp.now()}
            const InsertDocument = await addDoc(
                collection(db, doColletion),
                newDocument
            )
            checkCancelBeforeDiparch({
                type:"INSERTED_DOC",
                payload: InsertDocument
            })
        } catch(error){
            checkCancelBeforeDiparch({
                type:"ERROR",
                payload: error.message
            })
        }
    }
    useEffect(()=>{
        return () => setCancelled(true);
    },[])
    return {insertDocument, response}

}