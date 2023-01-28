import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

const ProficiencyCard = ({ skill, percentage }) => {
    const [proficiency, setProficiency] = useState(percentage);

    return (
        <div className="card me-3 ms-3 mt-3" style={{'width': '20rem'}}>
            <div className="card-body shadow">
                <h5 className="card-title">{skill}</h5>
                <div className='row d-flex align-items-center justify-content-center'>
                    <div className='col-8'>
                        <CircularProgressbar value={proficiency} text={`${proficiency}%`} />
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col'>
                        <label for="proficiencyRange" className="form-label">Adjust proficiency level</label>
                        <input type="range" className="form-range" min={0} max={100} value={proficiency} id="proficiencyRange" onChange={(e) => setProficiency(e.target.value)}></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProficiencyCard;
