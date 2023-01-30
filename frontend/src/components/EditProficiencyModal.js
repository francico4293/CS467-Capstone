import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

const EditProficiencyModal = () => {
    const proficiency = useSelector(state => state.proficiency);
    const [tempProficiency, setTempProficiency] = useState(proficiency.percentage);
    const [skillName, setSkillName] = useState(proficiency.skill);

    useEffect(() => {
        setTempProficiency(proficiency.percentage);
        setSkillName(proficiency.skill);
    }, [proficiency])

    return (
        <div className="modal fade" id="proficiencyModal" tabIndex="-1" aria-labelledby="proficiencyModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="proficiencyModalLabel">Editing Skill</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div className='row mb-2'>
                            <div className='col-6'>
                                <label for='skill' className='form-label'>Skill name</label>
                                <input type='text' className='form-control' id='skill' value={skillName} onChange={(e) => setSkillName(e.target.value)}/>
                            </div>
                        </div>
                        <div className='row d-flex align-items-center justify-content-center'>
                            <div className='col-8'>
                                <CircularProgressbar value={tempProficiency} text={`${tempProficiency}%`} />
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col'>
                                <label for="proficiencyRange" className="form-label">Adjust proficiency level</label>
                                <input type="range" className="form-range" min={0} max={100} value={tempProficiency} id="proficiencyRange" 
                                    onChange={(e) => setTempProficiency(e.target.value)}></input>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProficiencyModal;
