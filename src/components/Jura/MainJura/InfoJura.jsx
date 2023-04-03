import React from 'react'
import parse from "html-react-parser";
import { FaSearch } from 'react-icons/fa';

const InfoJura = (props) => {
    const {projectDetail} = props

    const renderAvatar = () => {
        return projectDetail?.members?.map((user, index) => {
            return <div key={index} className="avatar">
                        <img src={user.avatar} alt='123' />
                    </div>
        })
    }

    return (
        <div>
            <h3 className='mt-3'>{projectDetail?.projectName}</h3>
            <section>
                {parse(`${projectDetail.description}`)}
            </section>
            <div className="info" style={{ display: 'flex' }}>
                <div className="search-block">
                    <input className="search" />
                    <FaSearch className='fa fa-search' />
                </div>
                <div className="avatar-group" style={{ display: 'flex' }}>
                    {renderAvatar()}
                </div>
                <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
            </div>
        </div>
    )
}

export default InfoJura