import React, { useEffect, useState } from 'react'
import PT from 'prop-types'
import axios from 'axios';

export default function ArticleForm(props) {
  // console.log(props);
  const {postArticle, currentArticleId, articles, setArticles, values, setValues, setCurrentArticleId, setMessage} = props;
  // ✨ where are my props? Destructure them here

    const token = localStorage.getItem('token');
    const isDisabled = () => {
      const title = document.getElementById('title');
      const text = document.getElementById('text');
      const topic = document.getElementById('topic');
      const button = document.getElementById('submitArticle');

      if (title.value.length >= 1 && text.value.length >= 1 && topic.value.length >1) {
        return button.disabled = false;
      } else {
        return button.disabled = true;
      }
  }
  
 
  useEffect(() => {
    // ✨ implement
    // Every time the `currentArticle` prop changes, we should check it for truthiness:
    // if it's truthy, we should set its title, text and topic into the corresponding
    // values of the form. If it's not, we should reset the form back to initial values.

  }, [])


  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
    isDisabled();
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // const updatedArticle = {
    //   article_id: values.article_id,
    //   title: values.title,
    //   text: values.text,
    //   topic: values.topic
    // }
    // console.log(updatedArticle);
    const newArticle = {
      article_id: Date.now(),
      title: values.title,
      text: values.text,
      topic: values.topic
    }
    console.log(newArticle);
    postArticle(newArticle);
    setValues({ title: '', text: '', topic: '' });
    setMessage('Nice update, Foo!')
    setCurrentArticleId(undefined);
  
  }
 
  const cancelEdit = () => {
    setValues({ title: '', text: '', topic: '' })
    setCurrentArticleId(undefined)
  }

  
  

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id="form" onSubmit={onSubmit}>
      <p>Nice update, Foo!</p>
      <h2>Create Article</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={true}  id="submitArticle">Submit</button>
        <button onClick={cancelEdit}>Cancel edit</button>
      </div>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
