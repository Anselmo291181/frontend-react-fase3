import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import PostForm from "./components/PostForm";
import AuthorForm from "./components/AuthorForm";
import PostDetail from "./routes/PostDetail";
import LoginForm from "./components/Auth/LoginForm";
import AdminPosts from "./routes/Admin/Posts";
import PrivateRoute from "./components/Auth/PrivateRoute";
import EditPostForm from "./components/PostForm/EditPostForm";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  a {
    color: #007bff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/postagem/:id" element={<PostDetail />} />

        {/* Rotas protegidas */}
        <Route
          path="/admin/posts"
          element={
            <PrivateRoute>
              <AdminPosts />
            </PrivateRoute>
          }
        />
        <Route
          path="/postagem"
          element={
            <PrivateRoute>
              <PostForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/autor"
          element={
            <PrivateRoute>
              <AuthorForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/postagem/editar/:id"
          element={
            <PrivateRoute>
              <EditPostForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
