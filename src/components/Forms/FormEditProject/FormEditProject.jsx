import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectAction } from "../../../store/actions/projectAction";
import { projectCategoryAction } from "../../../store/actions/projectCategoryAction";
import { SET_SUBMIT_EDIT_PROJECT } from "../../../store/types/projectType";

const FormEditProject = (props) => {
  const { projectEdit } = useSelector((state) => state.projectReducer);
  const { arrProjectCategory } = useSelector(
    (state) => state.projectCategoryReducer
  );
  const dispatch = useDispatch();
  const submitForm = (e) => {
    e.preventDefault();
    log();
    formik.handleSubmit();
  };
  useEffect(() => {
    dispatch({
      type: SET_SUBMIT_EDIT_PROJECT,
      payload: submitForm,
    });
    dispatch(projectCategoryAction.getProjectCategoryAction());
  }, []);
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      formik.setFieldValue("description", editorRef.current.getContent());
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: projectEdit.id,
      projectName: projectEdit.projectName,
      creator: projectEdit.creator?.id,
      description: projectEdit.description,
      categoryId: projectEdit.projectCategory?.id,
    },
    onSubmit: (values) => {
      const action = projectAction.updateProjectAction(values, values.id);
      dispatch(action);
    },
  });

  return (
    <div>
      <form className="container-fuild" onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-4">
            <div className="form-group">
              <p className="font-weight-bold">Project id</p>
              <input
                onChange={formik.handleChange}
                value={formik.values.id}
                disabled
                className="form-control"
                name="id"
              />
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <p className="font-weight-bold">Project name</p>
              <input
                value={formik.values.projectName}
                className="form-control"
                name="projectName"
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="form-group">
              <p className="font-weight-bold">Project Category</p>
              <select
                onChange={formik.handleChange}
                className="form-control"
                name="categoryId"
                value={formik.values.categoryId}
              >
                {arrProjectCategory?.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.projectCategoryName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <p className="font-weight-bold">Description</p>
              <Editor
                name="description"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={formik.values.description}
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "preview",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormEditProject;
