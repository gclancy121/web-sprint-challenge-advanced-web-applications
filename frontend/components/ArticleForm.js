import React, { useEffect, useState } from 'react'
import PT from 'prop-types'

export default function ArticleForm(props) {
  // console.log(props);
  const {postArticle, currentArticleId, articles, values, setValues} = props;
  // ✨ where are my props? Destructure them here

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
  
  const update = () => {
    const edit = currentArticleId - 1;
    console.log(edit);
    if (edit === undefined) {
      return values;
    } else  if (edit === 0){
      setValues({title: articles[0].title, text: articles[0].text, topic: articles[0].topic});
    } else  if (edit === 1){
      setValues({title: articles[1].title, text: articles[1].text, topic: articles[1].topic});
    } else if (edit === 2) {
      setValues({title: articles[2].title, text: articles[2].text, topic: articles[2].topic});
    } else if (edit === 3) {
      setValues({title: articles[3].title, text: articles[3].text, topic: articles[3].topic});
    } else if (edit === 4) {
      setValues({title: articles[4].title, text: articles[4].text, topic: articles[4].topic});
    } else if (edit === 5) {
      setValues({title: articles[5].title, text: articles[5].text, topic: articles[5].topic});
    } else if (edit === 6) {
      setValues({title: articles[6].title, text: articles[6].text, topic: articles[6].topic});
    } else {
      return values;
    }
  }
  useEffect(() => {
    // ✨ implement
    // Every time the `currentArticle` prop changes, we should check it for truthiness:
    // if it's truthy, we should set its title, text and topic into the corresponding
    // values of the form. If it's not, we should reset the form back to initial values.
    // update();
  }, [])


  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
    isDisabled();
  }

  const onSubmit = evt => {
    evt.preventDefault()
    const id = articles.length + 1
    const newArticle = {
      article_id: id,
      title: values.title,
      text: values.text,
      topic: values.topic
    }
    postArticle(newArticle);
    setValues({ title: '', text: '', topic: '' });

    // ✨ implement
    // We must submit a new post or update an existing one,
    // depending on the truthyness of the `currentArticle` prop.

  }

 

  
  

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id="form" onSubmit={onSubmit}>
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
        <button onClick={Function.prototype}>Cancel edit</button>
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
