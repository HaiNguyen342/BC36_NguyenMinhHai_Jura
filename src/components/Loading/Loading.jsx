import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import styleLoading from './Loading.module.css';

export default function Loading(props) {
    const {isLoading} = useSelector(state => state.LoadingReducer)

    return (
        <Fragment>
            {isLoading ? <div className={styleLoading.bgLoading}>
                    <img src={require('../../assets/imgLoading/loading.gif')} />
                </div> : ''}
        </Fragment>
    )
}