import React, { useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { projectCategoryAction } from '../../../store/actions/projectCategoryAction';
import { projectAction } from '../../../store/actions/projectAction';

const CreateProject = (props) => {
  const { arrProjectCategory } = useSelector(state => state.projectCategoryReducer)
  const dispatch = useDispatch()
  // console.log("arrProjectCategory: ", arrProjectCategory);

  useEffect(() => {
    dispatch(projectCategoryAction.getProjectCategoryAction())
  }, [])


  const formik = useFormik({
    initialValues: {
      projectName: '',
      description: '',
      categoryId: arrProjectCategory[0]?.id,
      alias: '',
    },
    onSubmit: values => {
      console.log("values: ", values);
      dispatch(projectAction.createProjecAuthorizetAction(values))
    }
  })
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      // console.log(editorRef.current.getContent());
      formik.setFieldValue('description', editorRef.current.getContent())
    }
  };

  const handleChangeSelect = (event) => {
    // console.log(event.target.value);
    return formik.setFieldValue('categoryId', event.target.value)
  }

  return (
    <div className="container">
      <div className='mt-5'>
        <h3 className='ml-2'>CreateProject</h3>
        <form className="container" onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <p>Name</p>
            <input className="form-control" name="projectName" onChange={formik.handleChange} />
          </div>
          <div className="form-group">
            <p>Description</p>
            <Editor
              name='description'
              onInit={(evt, editor) => editorRef.current = editor}
              initialValue=""
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
          </div>
          <div className="form-group">
            <select name="categoryId" className="form-control" onChange={handleChangeSelect}>
              {arrProjectCategory.map((item, index) => {
                return <option key={index} value={item.id}>{item.projectCategoryName}</option>
              })}
            </select>
          </div>
          <button className="btn btn-outline-primary" type="submit" onClick={log}>Create project</button>
        </form>
      </div>
    </div>
  )
}

export default CreateProject