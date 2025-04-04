function checkToken() {
    const token = sessionStorage.getItem('token');
    if(!token) {
        console.log("pas de token");
    } else {
        return token;
    }
}

async function fetchAPI(element) {
    console.log("CALL ON API");
    try {
        const response = await fetch(`http://localhost:5678/api/${element}`);
        if (!response.ok) {
          throw new Error(`Erreur API : ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(`Erreur lors du fetch de l'élément ${element} :`, err);
        return null;
    }
}

export async function logging(email, password) {
    const loginBody = {
        "email": email,
        "password": password
    };

    const loginData = {
        method: 'POST',
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(loginBody)
    };

    const response = await fetch('http://localhost:5678/api/users/login', loginData);
    return response;
}

export async function deleteWork(id) {
    const token = checkToken();
    if(token) {
        const data = {
            method: 'DELETE',
            headers : {
                'Authorization': `Bearer ${token}`
            }
        }
        const response = await fetch(`http://localhost:5678/api/works/${id}`, data);
        await refreshCache('works');
    }
    
}

export async function sendWork(imgFile, title, cat) {
    const formData = new FormData();
    formData.append('image', imgFile, imgFile.name);
    formData.append('title', title);
    formData.append('category', cat);

    const token = checkToken();
    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        await refreshCache('works');
        console.log('Success:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

//CACHE FETCH
//REFRESH CACHE
async function refreshCache(element) {
    const response = await fetch('http://localhost:5678/api/works');
    const data = await response.json();
    sessionStorage.removeItem(element);
    sessionStorage.setItem(element, JSON.stringify(data));
}

// FETCHABLE ELEMENTS [works, categories]
export async function customFetch(element) {
    let data = sessionStorage.getItem(element);
    console.log("CALL ON CACHE");
    if(!data) {
        data = await fetchAPI(element);
        sessionStorage.setItem(element, JSON.stringify(data));
    } else {
        data = JSON.parse(data);
    }
    return data;
}

