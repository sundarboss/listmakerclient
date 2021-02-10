import React from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar';
import Taskitem from '../components/Taskitem';
import Finished from '../components/Finished';
import Modal from '../components/Modal';
import Backdrop from '../components/Backdrop';
import Authcontext from '../context/context';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            taskList: [],
            history: false,
            modal: false,
            updateModal: false,
            deleteModal: false,
            title: '',
            decription: '',
            error: '',
            success: false,
            selectedId: ''
        }
    }

    static contextType = Authcontext;

    componentDidMount() {
        const token = this.context.token;
        
        axios.get(`${BASE_URL}/api/task/tasks`, {
            headers: {
                "auth-token": token
            }
        })
        .then((res) => {
            this.setState({taskList: res.data})
        })
        .catch(err => {
            console.log(err);
        })
    }

    onHistoryChange = () => {
        this.setState({history: true});
    }

    onDashboardChange = () => {
        this.setState({history: false});
    }

    openModal = () => {
        this.setState({modal: true});
    }

    openUpdateModal = (id) => {
        this.setState({updateModal: true, selectedId: id});
    }

    openDeleteModal = (id) => {
        this.setState({deleteModal: true, selectedId: id});
    }

    closeModal = () => {
        this.setState({modal: false, title: '', description: '', error: '', success: false});
    }

    closeUpdateModal = () => {
        this.setState({updateModal: false, success: false, selectedId: ''});
    }

    closeDeleteModal = () => {
        this.setState({deleteModal: false, success: false, selectedId: ''});
    }

    onTitleChange = (e) => {
        this.setState({title: e.target.value});
    }

    onDescriptionChange = (e) => {
        this.setState({description: e.target.value});
    }

    onTaskConfirm = () => {
        const token = this.context.token;

        axios.post(`${BASE_URL}/api/task/create`, {
            name: this.state.title,
            description: this.state.description
        }, {
            headers: {
                "auth-token": token
            }
        })
        .then(res => {
            this.setState(prevState => {
                const updatedList = [...prevState.taskList];
                updatedList.push(res.data);
                return {taskList: updatedList, success: true};
            });
        })
        .catch(err => {
            this.setState({error: err.response.data})
        })
    }

    onUpdateConfirm = () => {
        const token = this.context.token;
        const id = this.state.selectedId;

        axios.put(`${BASE_URL}/api/task/update`, {
            taskid: id
        }, {
            headers: {
                "auth-token": token
            }
        })
        .then(res => {
            this.setState(prevState => {
                const updatedList = [...prevState.taskList];
                updatedList.forEach(item => {
                    if (item._id === id) {
                        item.completed = true;
                        item.comp_date = res.data.comp_date;
                    }
                })
                return {taskList: updatedList, success: true, selectedId: ''}
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    onDeleteConfirm = () => {
        const token = this.context.token;
        const id = this.state.selectedId;

        axios.delete(`${BASE_URL}/api/task/delete`, {
            headers: {
                "auth-token": token
            },
            data: {
                taskid: id
            }
        })
        .then(res => {
            this.setState(prevState => {
                const updatedList = prevState.taskList.filter((item) => {
                    return item._id !== id
                });
                return {taskList: updatedList, success: true, selectedId: ''}
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        const filteredActiveTasks = this.state.taskList.filter((item) => {
            return item.completed === false
        });
        const taskItems = filteredActiveTasks.map((item) => {
            return (<Taskitem 
                     key={item._id} 
                     taskId={item._id}
                     title={item.name} 
                     desc={item.description} 
                     created={new Date(item.created).toLocaleDateString()}
                     onUpdate={this.onUpdateConfirm} 
                     onDelete={this.onDeleteConfirm}
                     updateModalOpen={this.openUpdateModal}
                     deleteModalOpen={this.openDeleteModal}
                    />)
        });

        const filteredFinishedTasks = this.state.taskList.filter((item) => {
            return item.completed === true
        });
        const finishedItems = filteredFinishedTasks.map((item) => {
            return (<Finished 
                     key={item._id} 
                     taskId={item._id}
                     title={item.name} 
                     desc={item.description} 
                     created={new Date(item.created).toLocaleDateString()} 
                     completed={new Date(item.comp_date).toLocaleDateString()} 
                    />)
        });

        return (
            <React.Fragment>
                {this.state.modal && <Backdrop />}
                {this.state.modal && 
                (<Modal onCancel={this.closeModal} onConfirm={this.onTaskConfirm} successStatus={this.state.success} title="Create a Task">
                    {this.state.error && (<div className="error">
                               {this.state.error}
                        </div>)}
                    {this.state.success ? 
                    (<h4 className="success-header">Task Created Successfully!!!</h4>)
                    :    
                    (<form className="modalform-control">
                        <div className="field">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" value={this.state.title} onChange={this.onTitleChange} className="input modal-input" />
                        </div>
                        <div className="field">
                            <label htmlFor="desc">Description</label>
                            <textarea name="desc" rows="4" value={this.state.description} onChange={this.onDescriptionChange} className="input modal-input" />
                        </div>
                    </form>)}
                </Modal>)}
                {this.state.updateModal && <Backdrop />}
                {this.state.updateModal && 
                (<Modal onCancel={this.closeUpdateModal} onConfirm={this.onUpdateConfirm} successStatus={this.state.success} title="Complete a Task">
                    {this.state.success ? 
                    (<h4 className="success-header">Task marked as completed!!!</h4>)
                    :    
                    (<h4>Are you sure you want to mark the task completed?</h4>)}
                </Modal>)}
                {this.state.deleteModal && <Backdrop />}
                {this.state.deleteModal && 
                (<Modal onCancel={this.closeDeleteModal} onConfirm={this.onDeleteConfirm} successStatus={this.state.success} title="Delete Task">
                    {this.state.success ? 
                    (<h4 className="success-header">Task Deleted Successfully!!!</h4>)
                    :    
                    (<h4>Are you sure you want to delete the selected task?</h4>)}
                </Modal>)}
                <Navbar 
                 logout={this.context.logout} 
                 historyChange={this.onHistoryChange} 
                 dashboardChange={this.onDashboardChange}
                />
                <div className="task-container">
                    <div className="task-header">
                        <h1>{`Welcome ${this.context.username}`}</h1>
                    </div>
                    {!this.state.history && 
                    (<div className="task-button">
                        <button className="create-btn" onClick={this.openModal}>Create New Task</button>
                    </div>)}
                    <ul className="task-list">
                        {this.state.history ? 
                        (finishedItems.length > 0 ? finishedItems : <h3 className="empty-msg">You Dont have any completed Task</h3>)  : 
                        (taskItems.length > 0 ? taskItems : <h3 className="empty-msg">There are no active task</h3>)}
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default Task;