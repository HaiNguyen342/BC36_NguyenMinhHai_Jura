import React from 'react'

const HeaderJura = (props) => {

    const {projectDetail} = props

    return (
        <div className="header">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{ backgroundColor: 'white' }}>
                    <li className="breadcrumb-item">Project</li>
                    <li className="breadcrumb-item">CyberLearn</li>
                    <li className="breadcrumb-item">Cyber Board</li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {projectDetail.projectName}
                    </li>
                </ol>
            </nav>
        </div>
    )
}

export default HeaderJura