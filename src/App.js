import React from 'react'
import Router from './Router';
import { ContextProvider } from './context/Context'

export default function App(){
    return(
        <ContextProvider>
            <Router />
        </ContextProvider>
    );
}