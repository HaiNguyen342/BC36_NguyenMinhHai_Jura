import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContentJura from '../../components/Jura/MainJura/ContentJura'
import HeaderJura from '../../components/Jura/MainJura/HeaderJura'
import InfoJura from '../../components/Jura/MainJura/InfoJura'
import { projectAction } from '../../store/actions/projectAction'

const IndexJura = (props) => {

    const {projectDetail} = useSelector(state => state.projectReducer)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(projectAction.getProjectDetailAction(props.match.params.projectId))
    }, [])

    return (
        <div className="main">
            <HeaderJura projectDetail={projectDetail} />
            <InfoJura projectDetail={projectDetail} />
            <ContentJura projectDetail={projectDetail}  />
        </div>
    )
}

export default IndexJura