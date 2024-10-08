import { Provider } from "react-redux";
import "./App.css";
import LoginPage from "./component/connection/login.tsx";
import Room from "./component/connection/room.tsx";
import JudgementCall from "./component/judgementCallRoom";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";
import store from "./features/store";

const router = createBrowserRouter([
  {
    path: "/",
    loader: async ({ request }) => {
      const url = new URL(request.url);
      const studentId = url.searchParams.get("studentId");
      if (studentId) {
        return redirect(`/${studentId}`);
      } else {
        return {};
      }
    },
    element: <LoginPage />,
  },
  {
    path: "/:userId",
    loader: async ({ params }) => {
      return { userId: params.userId };
    },
    element: <Room />,
  },
  {
    path: "/:userId/:roomId",
    loader: async ({ params }) => {
      return { userId: parseInt(params.userId), roomId: parseInt(params.roomId) };
    },
    element: <Provider store={store}><JudgementCall></JudgementCall></Provider>,
  },
]);
function ExampleParam() {
  const paramId = useLoaderData();
  return <div>{paramId}</div>;
}

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
