const API_PORT = 8080

/**
 * code to validated string entered is a valid email by REGEX
 * @param email
 */
export const validateEmail = (email: any) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        return age - 1;
    }
    return age;
};

export const request = (input: RequestInfo | URL, init?: RequestInit) => {
    return fetch(`http://${window.location.hostname}:${API_PORT}/api/${input}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...init?.headers,
        }, ...init
    });
}