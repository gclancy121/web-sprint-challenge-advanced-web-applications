import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios';

import { PrivateRoute } from './PrivateRoute';
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false);

  const initialFormValues = { title: '', text: '', topic: '' }
  const [values, setValues] = useState(initialFormValues);

  

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate();

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    localStorage.removeItem('token');
    setMessage('Goodbye!')
    navigate('/');
  }

  const login = (userName, passWord) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
    // setSpinnerOn(true);
    setMessage('');
    const credentials = {
      username: userName,
      password: passWord
    }
    axios.post(loginUrl, credentials)
    .then(res => {
    localStorage.setItem('token', res.data.token);
    navigate('/articles');
    })
    .catch(err => {
    console.log(err)
   })
   
  }

  const token = localStorage.getItem('token');

  const getArticles = () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!

    axios.get(articlesUrl, {headers: {authorization: token}})
    .then(res => {
        setArticles(res.data.articles)
        setMessage(res.data.message)
        setSpinnerOn(false);
    })
  }

  const postArticle = article => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
    axios.post(articlesUrl, article, {headers: {authorization: token}})
    .then(res => {
      setArticles([...articles, article]);
      setMessage(res.data.message);
    })
  }
  

  const updateArticle = ({ article_id, article}) => {
    setCurrentArticleId(article_id);
    setValues(article);
    
  }


 
  const deleteArticle = article_id => {
    // ✨ implement
    axios.delete(`http://localhost:9000/api/articles/${article_id}`, {headers: {authorization: token}})
    .then(res => {
      setMessage(res.data.message);
      setArticles(articles.filter(id => id.article_id !== article_id));
    })
    
  }
 
  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <>
      <Spinner on={spinnerOn}/>
      <Message message={message}/>
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to='/articles'>Articles</NavLink>
        </nav>
        {}
        <Routes>
          <Route path="/" element={<LoginForm login={login}/>} />
          <Route path="articles" element={
            <>
              <PrivateRoute>
                <ArticleForm setMessage ={setMessage} 
                values={values} 
                setValues={setValues} 
                articles={articles} 
                setArticles={setArticles}
                postArticle={postArticle} 
                currentArticleId={currentArticleId} 
                updateArticle={updateArticle} 
                setCurrentArticleId={setCurrentArticleId}
                />
                <Articles 
                getArticles={getArticles} 
                articles={articles} 
                setCurrentArticleId={setCurrentArticleId} 
                deleteArticle={deleteArticle} 
                updateArticle={updateArticle}/>
              </PrivateRoute>
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
