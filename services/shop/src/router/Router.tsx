import {createBrowserRouter} from "react-router-dom";
import {App} from "@/components/App";
import {Suspense} from "react";
import {LazyShop} from "@/pages/shop/Shop.lazy";

const routes = [
    {
        path: "/shop",
        element: <App/>,
        children: [
            {
                path: '/shop/main',
                element: <Suspense fallback={'Загрузка...'}><LazyShop/></Suspense>
            },
        ]
    }
]

export const router = createBrowserRouter(routes);

export default routes;