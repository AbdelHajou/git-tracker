
import { useState, useEffect } from 'react'

const ProgrammingLanguages = ( { reposUrl }) => {
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        let isSubscribed = true;

        if (typeof reposUrl === 'undefined') {
            return;
        }

        const getRepos = async () => {
            const gitRepos = await fetchFromUrl(reposUrl);
            const countedLanguages = await countLanguages(gitRepos);

            if (isSubscribed) {
                setLanguages(countedLanguages);
            }
        }

        getRepos();

        return () => (isSubscribed = false);
    }, [reposUrl])

    const fetchFromUrl = async (url) => {
        const res = await fetch(url)
        const data = await res.json()
        return data
    }

    const countLanguages = async (repos) => {
        let countedLanguages = {};

        repos.forEach(async (repo) => {
            let languagesInRepo = await fetchFromUrl(repo.languages_url);

            Object.keys(languagesInRepo).forEach(languageName => {
                if (languageName in countedLanguages) {
                    countedLanguages[languageName] += languagesInRepo[languageName];
                } else {
                    countedLanguages[languageName] = languagesInRepo[languageName];
                }
            });
        });

        return Object.keys(countedLanguages).map(languageName => ({ languageName: languageName, bytesContributed: countedLanguages[languageName] }));
    };

    return (
        <div>
            
        </div>
    )
}

export default ProgrammingLanguages
