import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Filter from '../components/Filter';
import JobBoardColumn from '../components/JobBoardColumn';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddJobOffCanvas from '../components/AddJobOffCanvas';
import EditJobOffCanvas from '../components/EditJobOffCanvas';
import { useSelector, useDispatch } from 'react-redux';
import { editJob, getJobs } from '../services/jobs';
import { getContacts } from '../services/contacts';
import { getUser, editUser } from '../services/users';
import { createColumn, editColumn } from '../services/columns';
import ContactsFilter from '../components/ContactsFilter';

const JobBoard = () => {
    const [showAddJobOffCanvas, setShowAddJobOffCanvas] = useState(false);
    const [showEditJobOffCanvas, setShowEditJobOffCanvas] = useState(false);
    const [selectedJobColumn, setSelectedJobColumn] = useState("");
    const [userJobData, setUserJobData] = useState({ columns: [] });
    const [jobToEdit, setJobToEdit] = useState({});
    const [companys, setCompanys] = useState([]);
    const [skills, setSkills] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [companyFilter, setCompanyFilter] = useState(null);
    const [skillFilter, setSkillFilter] = useState(null);
    const [contactFilter, setContactFilter] = useState(null);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const setError = (e) => {
        alert(e)
    }

    useEffect(() => {
        async function populateJobs() {
            const jobData = await getJobs(user.auth, setError);
            setUserJobData({ columns: jobData });
        }

        async function populateContacts() {
            const contacts = await getContacts(user.auth, setError);
            setContacts(contacts);
        }

        populateJobs();
        populateContacts();
    }, [user])

    useEffect(() => {
        const companys = new Set();
        const skills = new Set();

        userJobData.columns.forEach(column => column.jobs.forEach(job => companys.add(job.company)));
        userJobData.columns.forEach(column => column.jobs.forEach(job => job.skills.forEach(skill => skills.add(skill))));

        setCompanys(Array.from(companys));
        setSkills(Array.from(skills));
    }, [userJobData]);

    const addColumn = async () => {
        await createColumn(user.auth, { name: `Column ${userJobData.columns.length + 1}` }, setError)

        const data = await getUser(user.auth, setError);
        dispatch({ type: 'SET_USER', payload: { data, auth: user.auth } });
    }

    const onDragEndHandler = async (result) => {
        const { destination, source, type } = result;

        if (!result.destination) {
            return;
        }

        if (type === 'job-columns') {
            const newColumns = Array.from(userJobData.columns);
            const [sourceColumn] = newColumns.splice(source.index, 1);
            newColumns.splice(destination.index, 0, sourceColumn);
            setUserJobData({ columns: newColumns });

            await editUser(user.auth, {columns: newColumns.map(col => col.id)}, setError)
        } else {
            if (source.droppableId === destination.droppableId) {
                const jobs = userJobData.columns.filter(column => column.id === source.droppableId)[0].jobs;
                const [reorderedJob] = jobs.splice(source.index, 1);
                jobs.splice(destination.index, 0, reorderedJob);

                await editColumn(user.auth, source.droppableId, {jobs: jobs.map(job => job.id)}, setError)
            } else {
                const sourceJobs = userJobData.columns.filter(column => column.id === source.droppableId)[0].jobs;
                const destinationJobs = userJobData.columns.filter(column => column.id === destination.droppableId)[0].jobs;
                const [reorderedJob] = sourceJobs.splice(source.index, 1);
                destinationJobs.splice(destination.index, 0, reorderedJob);

                const editSuccess = await editJob(user.auth, reorderedJob.id, { columnId: destination.droppableId }, setError)
                if (editSuccess) {
                    await editColumn(user.auth, destination.droppableId, {jobs: destinationJobs.map(job => job.id)}, setError)
                }

            }
        }
    }

    return (
        <Container fluid>
            <Row>
                <Sidebar />
                <DragDropContext onDragEnd={onDragEndHandler}>
                    <Col xs={10} sm={9} md={10} className='ms-auto'>
                        <AddJobOffCanvas
                            userJobData={userJobData}
                            selectedJobColumn={selectedJobColumn}
                            show={showAddJobOffCanvas}
                            setShow={setShowAddJobOffCanvas}
                        />
                        <EditJobOffCanvas
                            userJobData={userJobData}
                            jobToEdit={jobToEdit}
                            show={showEditJobOffCanvas}
                            setShow={setShowEditJobOffCanvas}
                        />
                        <Row className='mt-3 mb-3'>
                            <Col className='d-flex border-bottom justify-content-end pb-3'>
                                <Filter filterName={'Filter by Company'} defaultItem={'All companies'} items={companys} setItem={setCompanyFilter} />
                                <Filter filterName={'Filter by Skill'} defaultItem={'All skills'} items={skills} setItem={setSkillFilter} />
                                <ContactsFilter contacts={contacts} setContactFilter={setContactFilter} />
                            </Col>
                        </Row>
                        <Droppable droppableId='job-columns' direction='horizontal' type='job-columns'>
                            {(provided, snapshot) => (
                                <Row className='d-flex flex-nowrap d-inline-block horizontal-scrollable pb-5'
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {
                                        userJobData.columns.map((column, idx) => {
                                            return (
                                                <Draggable key={column.id} draggableId={column.id} index={idx}>
                                                    {provided => (
                                                        <div className='col' {...provided.draggableProps} ref={provided.innerRef}>
                                                            <JobBoardColumn
                                                                column={column}
                                                                companyFilter={companyFilter}
                                                                skillFilter={skillFilter}
                                                                contactFilter={contactFilter}
                                                                isDragging={snapshot.isDraggingOver}
                                                                setJobToEdit={setJobToEdit}
                                                                setShowAddJobOffCanvas={setShowAddJobOffCanvas}
                                                                setShowEditJobOffCanvas={setShowEditJobOffCanvas}
                                                                setSelectedJobColumn={setSelectedJobColumn}
                                                                {...provided.dragHandleProps}
                                                            />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })
                                    }
                                    {provided.placeholder}
                                    <Col xs={6}>
                                        <div className='d-flex justify-content-center align-items-center add-col' onClick={addColumn}>
                                            <i className='fa-solid fa-plus fa-2x' />
                                        </div>
                                    </Col>
                                </Row>
                            )}
                        </Droppable>
                    </Col>
                </DragDropContext>
            </Row>
        </Container>
    );
}

export default JobBoard;
