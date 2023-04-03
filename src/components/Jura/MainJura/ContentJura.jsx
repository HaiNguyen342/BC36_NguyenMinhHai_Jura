import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux'
import { projectAction } from '../../../store/actions/projectAction'

const ContentJura = (props) => {

    const { projectDetail } = props
    const dispatch = useDispatch()
    // console.log("projectDetail: ", projectDetail);

    const handleDragEnd = (result) => {
        // console.log('result: ', result);

        const { source, destination} = result

        if(!destination) {
            return;
        }

        if(source.index === destination.index && source.droppableId === destination.draggableId) {
            return;
        }

        dispatch(projectAction.updateStatusAction({
            taskId: result.draggableId,
            statusId: destination.droppableId,
            projectId: projectDetail.id
        }))

    }

    const renderCardTaskList = () => {
        return <DragDropContext onDragEnd={handleDragEnd}>
            {projectDetail?.lstTask?.map((item, index) => {
                return <Droppable key={index} droppableId={item.statusId}>
                    {(provided) => {
                        return <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            key={index} className="col-span-1 card">
                            <div className="card-header">
                                {item.statusName}
                            </div>
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="list-group list-group-flush">
                                {item.lstTaskDeTail.map((task, index) => {
                                    return <Draggable key={task.taskId.toString()} index={index} draggableId={task.taskId.toString()}>
                                        {(provided) => {
                                            return <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                key={index} className="list-group-item" data-toggle="modal" data-target="#infoModal" onClick={() => {
                                                    dispatch(projectAction.getTaskDetailAction(task.taskId))
                                                }}>
                                                <p className='font-bold'>
                                                    {task.taskName}
                                                </p>
                                                <div className="block" style={{ display: 'flex' }}>
                                                    <div className="block-left">
                                                        {
                                                            (task.priorityTask.priority === 'High') ? <p className="text-danger font-bold">{task.priorityTask.priority}</p> :
                                                                (task.priorityTask.priority === 'Medium') ? <p className="text-success font-bold">{task.priorityTask.priority}</p> :
                                                                    (task.priorityTask.priority === 'Low') ? <p className="text-warning font-bold">{task.priorityTask.priority}</p>
                                                                        :
                                                                        <p className="text-blue-500 font-bold">{task.priorityTask.priority}</p>
                                                        }
                                                    </div>
                                                    <div className="block-right">
                                                        <div className="avatar-group" style={{ display: 'flex' }}>
                                                            {task.assigness.map((mem, index) => {
                                                                return <div className="avatar" key={index}>
                                                                    <img src={mem.avatar} alt={mem.avatar} />
                                                                </div>
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }}
                                    </Draggable>
                                })}
                            </div>

                            {provided.placeholder}
                        </div>
                    }}

                </Droppable>
            })}
        </DragDropContext>
    }

    return (
        <div className="content grid grid-cols-4">
            {renderCardTaskList()}
        </div>
    )
}

export default ContentJura
