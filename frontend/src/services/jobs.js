import { 
    ref, 
    uploadBytes, 
    getDownloadURL 
} from 'firebase/storage';
import { storage } from "../fire";
import { v4 as uuidv4 } from 'uuid';

const getJobs = async (userAuth, setError) => {
    const token = await userAuth.getIdToken();
    const response = await fetch(`/api/jobs/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.status === 200) {
        const jobs = await response.json()
        return jobs
    } else {
        const error = await response.json()
        setError(error.error)
    }
}

const createJob = async(userAuth, jobData, columnName, setError) => {
    if (jobData.companyLogo != null) {
        jobData.companyLogo = await uploadCompanyLogo(jobData.companyLogo);
    }

    const token = await userAuth.getIdToken();
    const response = await fetch('/api/jobs', {
        method: 'POST',
        body: JSON.stringify({jobData, columnName}),
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

const uploadCompanyLogo = async (companyLogo) => {
    const fileRef = ref(storage, 'company-logos/' + uuidv4() + '.svg');
    await uploadBytes(fileRef, companyLogo);
    return await getDownloadURL(fileRef);
}

const deleteJob = async (userAuth, jobId, setError) => {
    const token = await userAuth.getIdToken();
    const response = await fetch(`/api/jobs/${jobId}}`, {
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

export { getJobs, createJob, deleteJob };
