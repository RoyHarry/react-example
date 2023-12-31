import React from "react";
import { Routes, Route} from 'react-router-dom';
import { Auth, Users, Blog, Course, Menu, NewsLetter } from '../pages/admin';
import { AdminLayout, ClienteLayout } from '../layouts/';
import { useAuth } from "../hooks";

//const user = { email : "rcolorado02@gmail.com"};

export function AdminRouter(){
    console.log(useAuth());
    const { user } = useAuth();
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