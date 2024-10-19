import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TaskList.css'; // Import custom CSS for styling

const initialTasks = {
  today: [],
  tomorrow: [],
  thisWeek: [],
  nextWeek: [],
  unplanned: [
    { id: '1', content: 'Test Task 1' },
    { id: '2', content: 'Test Task 2' },
    { id: '3', content: 'Test Task 3' },
    { id: '4', content: 'Test Task 4' },
    { id: '5', content: 'Test Task 5' },
    { id: '6', content: 'Test Task 6' },
    { id: '7', content: 'Test Task 7' },
    { id: '8', content: 'Test Task 8' },
    { id: '9', content: 'Test Task 9' },
    { id: '10', content: 'Test Task 10' },
  ],
};

const TaskList = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // If dropped outside the list or if the position hasn't changed
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }

    // Get the source and destination lists
    const sourceList = tasks[source.droppableId];
    const destList = tasks[destination.droppableId];

    // Remove the item from the source list
    const [removed] = sourceList.splice(source.index, 1);

    // Add the item to the destination list
    destList.splice(destination.index, 0, removed);

    // Update the state
    setTasks({
      ...tasks,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-list">
        {Object.keys(tasks).map((listId) => (
          <Droppable key={listId} droppableId={listId}>
            {(provided) => (
              <div
                className="task-column"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3>{listId.charAt(0).toUpperCase() + listId.slice(1).replace(/([A-Z])/g, ' $1')}</h3>
                {tasks[listId].map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        className="task-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskList;
