import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

const ProficiencyCard = ({ skill, percentage }) => {
    const [proficiency, setProficiency] = useState(percentage);
    const dispatch = useDispatch();

    return (
        <>
            <div className="card mt-3">
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <h3 className="card-title">{skill} Proficiency</h3>
                        <div>
                            <i className="fa-solid fa-pen-to-square me-2" data-bs-toggle="modal" data-bs-target='#proficiencyModal' 
                                onClick={() => dispatch({ type: 'EDIT_PROFICIENCY', payload: { skill, percentage: proficiency } })}></i>
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    </div>
                    <div className='row d-flex align-items-center justify-content-center'>
                        <div className='col-8'>
                            <CircularProgressbar value={proficiency} text={`${proficiency}%`} />
                        </div>
                    </div>
                    {/* <div className='row mt-3'>
                        <div className='col'>
                            <label for="proficiencyRange" className="form-label">Adjust proficiency level</label>
                            <input type="range" className="form-range" min={0} max={100} value={proficiency} id="proficiencyRange" 
                                onChange={(e) => setProficiency(e.target.value)} disabled={!isEditing}></input>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default ProficiencyCard;
