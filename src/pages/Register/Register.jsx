import React from 'react'
import styled from 'styled-components'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { history } from '../../App'
import { usersAction } from '../../store/actions/usersAction'
import { NavLink } from 'react-router-dom'

const Register = (props) => {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      passWord: '',
      name: '',
      phoneNumber: '',
    },
    onSubmit: values => {
      console.log("values: ", values);
      dispatch(usersAction.signUpAction(values))
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(48, "Maximum 48 characters")
        .required("Required!"),
      email: Yup.string()
        .email("Invalid email format!")
        .required("Required!"),
      passWord: Yup.string()
        .min(6, "Minimum 6 characters!")
        .required("Required!"),
      phoneNumber: Yup.string()
        .min(9, "Mininum 9 characters")
        .max(11, "Maximum 11 characters")
        .required("Required!")
    }),
  })

  return (
    <form onSubmit={formik.handleSubmit} className={`${style['bodyLogin']}`}>
      <MainContainer>
        <WelcomeText>Sign up</WelcomeText>
        <div className={`${style['inputContainer']}`}>
          <input className={`${style['input']}`} onChange={formik.handleChange} type="text" placeholder="Email" name='email' />
          {formik.errors.email && formik.touched.email && (
            <p style={{ fontSize: '10px', letterSpacing: 0, }}>{formik.errors.email}</p>
          )}
          <input className={`${style['input']}`} onChange={formik.handleChange} type="password" placeholder="Password" name='passWord' />
          {formik.errors.passWord && formik.touched.passWord && (
            <p style={{ fontSize: '10px', letterSpacing: 0, }}>{formik.errors.passWord}</p>
          )}
          <input className={`${style['input']}`} onChange={formik.handleChange} type="text" placeholder="User Name" name='name' />
          {formik.errors.name && formik.touched.name && (
            <p style={{ fontSize: '10px', letterSpacing: 0, }}>{formik.errors.name}</p>
          )}
          <input className={`${style['input']}`} onChange={formik.handleChange} type="tel" placeholder="Phone Number" name='phoneNumber' />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <p style={{ fontSize: '10px', letterSpacing: 0, }}>{formik.errors.phoneNumber}</p>
          )}
        </div>
        <div className={`${style['buttonContainer']}`}>
          <button className={`${style['buttonn']} mr-5`} type='submit'>
            Sign up
          </button>
          <a className={`${style['buttonnn']}`} onClick={() => {
            history.goBack()
          }}>Back</a>
        </div>
      </MainContainer>
    </form>
  )
}

export default Register


const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 80vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 321px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }

  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 90vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    height: 90vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 90vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 2rem 0 2rem 0;
  font-size: 1.3rem !important;
  color: white;
`;

const LoginWith = styled.h5`
  cursor: pointer;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 80%;
`;

const ForgotPassword = styled.h4`
  cursor: pointer;
`;