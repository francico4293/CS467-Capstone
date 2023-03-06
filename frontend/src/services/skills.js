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

export { getSkills, createSkill }