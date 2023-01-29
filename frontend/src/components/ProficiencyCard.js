import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

const ProficiencyCard = ({ skill, percentage }) => {
    const [proficiency, setProficiency] = useState(percentage);
    const [isEditing, setEditing] = useState(false);

    return (
        <div className="card mt-3">
            <div className="card-body shadow">
                <div className='d-flex justify-content-between'>
                    <h3 className="card-title">{skill}</h3>
                    {
                        isEditing ? (
                            <div>
                                <i className="fa-solid fa-floppy-disk me-2" onClick={() => setEditing(false)}></i>
                                <i className="fa-solid fa-ban" onClick={() => setEditing(false)}></i>
                            </div>
                        ) : (
                            <div>
                                <i className="fa-solid fa-pen-to-square me-2" onClick={() => setEditing(true)}></i>
                                <i className="fa-solid fa-trash"></i>
                            </div>
                        )
                    }
                </div>
                <div className='row d-flex align-items-center justify-content-center'>
                    <div className='col-8'>
                        <CircularProgressbar value={proficiency} text={`${proficiency}%`} />
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col'>
                        <label for="proficiencyRange" className="form-label">Adjust proficiency level</label>
                        <input type="range" className="form-range" min={0} max={100} value={proficiency} id="proficiencyRange" 
                            onChange={(e) => setProficiency(e.target.value)} disabled={!isEditing}></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProficiencyCard;
