
import { useState, useEffect } from 'react'
import {default as languageColors} from 'github-language-colors';
import { Card, CardContent, Typography } from '@material-ui/core';
import './ProgrammingLanguages.css';

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

        for (const repo of repos) {
            let languagesInRepo = await fetchFromUrl(repo.languages_url);

            Object.keys(languagesInRepo).forEach(languageName => {
                if (languageName in countedLanguages) {
                    countedLanguages[languageName] += languagesInRepo[languageName];
                } else {
                    countedLanguages[languageName] = languagesInRepo[languageName];
                }
            });
        }

        return Object.keys(countedLanguages).map(languageName => ({ languageName: languageName, bytesContributed: countedLanguages[languageName] }));
    };

    return (
        <>
            {
                languages.length > 0 &&
                (
                    <Card className='programmingLanguages'>
                        <CardContent>
                            <Typography variant='h6'>
                                Favorite languages
                            </Typography>
                            <ul>
                            {
                            languages.sort((a, b) => (a.bytesContributed > b.bytesContributed) ? -1 : 1).slice(0, 5).map(language => (
                                <li className='lang' key={language.languageName} style={{ '--color': languageColors[language.languageName] }}>
                                    {language.languageName}
                                </li>
                            ))
                            }
                            </ul>
                        </CardContent>
                    </Card>
                    
                )
            }
        </>
    )
}

export default ProgrammingLanguages
