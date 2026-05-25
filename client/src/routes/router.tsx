import { createBrowserRouter } from "react-router";
import Whiteboard from "../components/Whiteboard";
import RootLayout from "../layouts/RootLayout";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                path:"board",
                Component: Whiteboard
            }
        ]
    }
]);

export default router;