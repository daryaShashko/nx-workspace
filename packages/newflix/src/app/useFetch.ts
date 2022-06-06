import React from 'react';

type UseFetchReturnValue = [response: any, error: { message: string }];

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
}

export const useFetch = (url: string, options?: RequestInit): UseFetchReturnValue => {
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState({ message: '' });

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url, options);
                const json = await res.json();

                setResponse(json);
            } catch (err: Error | unknown) {
                setError({ message: getErrorMessage(err) });
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [response, error];
};

export const requestJSON = async (url: string, options?: RequestInit) => {
    let responseJson;
    try {
        const res = await fetch(url, options);
        responseJson = await res.json();
    } catch (err: Error | any) {
        return new Error(err);
    }
    return responseJson;
};
