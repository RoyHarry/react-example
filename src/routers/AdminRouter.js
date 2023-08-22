import React from "react";
import { Routes, Route} from 'react-router-dom';
import { Auth, Users, Blog, Course, Menu, NewsLetter } from '../pages/admin';
import { AdminLayout, ClienteLayout } from '../layouts/';

//const user = { email : "rcolorado02@gmail.com"};
const user = null;
export function AdminRouter(){
    

    const loadLayout = (Layout, Page) => {        

        return (
            <Layout>
                <Page/>
            </Layout>
        );
    }

    return (
        <Routes>
            {!user ? (
                <Route path="/admin/*" element={<Auth />} />
            ) : (
                <>
                {["/admin", "/admin/blog"].map( (path) => ( 
                    <Route key={path} path={path} element={loadLayout(AdminLayout, Blog)} />    
                ))}                
                <Route path="/admin/users" element={loadLayout(AdminLayout, Users)} />
                <Route path="/admin/courses" element={loadLayout(AdminLayout, Course)} />
                <Route path="/admin/menu" element={loadLayout(AdminLayout, Menu)} />
                <Route path="/admin/newsletter" element={loadLayout(AdminLayout, NewsLetter)} />
                </>
            )}                        
        </Routes>    
    );
}