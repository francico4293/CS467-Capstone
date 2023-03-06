const getSkills = async (userAuth, setError) => {
    const token = await userAuth.getIdToken();
    const response = await fetch(`/api/skills/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.status === 200) {
        const skills = await response.json()
        return skills
    } else {
        const error = await response.json()
        setError(error.error)
    }
}

const createSkill = async (userAuth, newSkill, setError) => {
    const token = await userAuth.getIdToken();
    const response = await fetch('/api/skills', {
        method: 'POST',
        body: JSON.stringify(newSkill),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (response.status === 201) {
        const data = await response.json()
        return data
    } else {
        const error = await response.json()
        setError(error.error);
    }
}

const deleteSkill = async (userAuth, skillId, setError) => {
    const token = await userAuth.getIdToken();
    const response = await fetch(`/api/skills/${skillId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (response.status !== 204) {
        const error = await response.json()
        setError(error.error);
    }
}

const editSkill = async (userAuth, skillId, newSkillInfo, setError) => {

    const token = await userAuth.getIdToken();
    const response = await fetch(`/api/skills/${skillId}`, {
        method: 'PUT',
        body: JSON.stringify(newSkillInfo),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    if (response.status === 200) {
        const data = await response.json()
        return data
    } else {
        const error = await response.json()
        setError(error.error);
    }
}

export { getSkills, createSkill, editSkill, deleteSkill }