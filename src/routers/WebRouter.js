import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Contacto, Blog, Course, Post } from '../pages/web';
import { ClienteLayout } from '../layouts';

export function WebRouter(){

    const loadLayout = (Layout, Page) => {
        return (
            <Layout>
                <Page/>
            </Layout>
        );
    };

    return (
        <Routes>
            <Route path="/" element={loadLayout(ClienteLayout, Home)} />
            <Route path="/contacto" element={loadLayout(ClienteLayout, Contacto)} />            
            <Route path="/course" element={loadLayout(ClienteLayout, Course)} />
            <Route path="/blog" element={loadLayout(ClienteLayout, Blog)} />
            <Route path="/blog/:path" element={loadLayout(ClienteLayout, Post)} />
        </Routes>
    );
}