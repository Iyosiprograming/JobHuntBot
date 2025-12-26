// get job from get remotly api

const URL = 'https://remoteok.com/api'

export const fetchJobService = async () => {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        console.log('Fetched job data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching job data:', error);
        throw error;
    }
}