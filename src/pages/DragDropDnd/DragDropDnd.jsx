import React, { useState } from 'react'
import _ from 'lodash'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const DragDropDnd = (props) => {
    const [state, setState] = useState({
        toDo: {
            id: 'toDo',
            items: [
                { id: '1', taskName: 'Task 1' },
                { id: '2', taskName: 'Task 2' },
                { id: '3', taskName: 'Task 3' },
            ]
        },
        inProgress: {
            id: 'inProgress',
            items: [
                { id: '4', taskName: 'Task 4' },
                { id: '5', taskName: 'Task 5' },
                { id: '6', taskName: 'Task 6' },
            ]
        },
        done: {
            id: 'done',
            items: [
                { id: '7', taskName: 'Task 7' },
                { id: '8', taskName: 'Task 8' },
                { id: '9', taskName: 'Task 9' },
            ]
        }
    })

    const handleDragEnd = (result) => {
        const {destination, source} = result

        if(!destination) {
            return;
        }

        if(destination.index === source.index && destination.droppableId === source.droppableId) {
            return;
        }

        //tạo ra 1 tag đang drag
        let itemCopy = {...state[source.droppableId].items[source.index]}
        console.log("itemCopy: ", itemCopy);

        //Droppable bắt đầu kéo
        let index = state[source.droppableId].items.findIndex(item => item.id == itemCopy.id)
        state[source.droppableId].items.splice(index, 1)


        //Droppable thả vào
        let dropDestination = state[destination.droppableId].items
        dropDestination.splice(destination.index, 0, itemCopy)
        console.log("dropDestination: ", dropDestination);

        setState(state)

    }

    return (
        <div className='container'>
            <h3 className='text-center display-4'>Demo DragAndDrop DND</h3>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="row">
                    {_.map(state, (statusTask, index) => {
                        return <Droppable droppableId={statusTask.id} key={index}>
                            {(provived) => {
                                return <div className='col-4'
                                >
                                    <div className="bg-dark p-5"
                                        key={index}
                                        ref={provived.innerRef}
                                        {...provived.droppableProps}
                                    >
                                        <h3 className='text-center text-white'>{statusTask.id}</h3>
                                        {statusTask.items.map((item, index) => {
                                            return <Draggable key={item.id} index={index} draggableId={item.id}>
                                                {(provived) => {
                                                    return <div
                                                        className='mt-2 p-2 bg-white text-center'
                                                        ref={provived.innerRef}
                                                        {...provived.draggableProps}
                                                        {...provived.dragHandleProps}
                                                    >
                                                        {item.taskName}
                                                    </div>
                                                }}
                                            </Draggable>
                                        })}

                                        {provived.placeholder}
                                    </div>
                                </div>
                            }}

                        </Droppable>
                    })}
                </div>
            </DragDropContext>
        </div>
    )
}

export default DragDropDnd