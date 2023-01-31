import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

const ProficiencyCard = ({ skillName, proficiency, setSkillToEdit }) => {
    return (
        <>
            <div className="card mt-3">
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <h3 className="card-title">{skillName} Proficiency</h3>
                        <div>
                            <i className="fa-solid fa-pen-to-square me-2" data-bs-toggle="modal" data-bs-target='#proficiencyModal' 
                                onClick={() => setSkillToEdit({ skillName, proficiency })}></i>
                            <i className="fa-solid fa-trash"></i>
                        </div>
                    </div>
                    <div className='row d-flex align-items-center justify-content-center'>
                        <div className='col-8'>
                            <CircularProgressbar value={proficiency} text={`${[proficiency]}%`} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProficiencyCard;
