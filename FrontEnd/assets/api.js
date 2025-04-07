async function fetchAPI(element, dataSend) {
    try {
        const response = await fetch(`http://localhost:5678/api/${element}`, dataSend);
        switch (response.status) {
            case 200:
                console.log("Success");
                return response;
            break;
            case 201:
                console.log("Data succefully Sent");
            break;
            case 204:
                console.log("Data succefully Deleted");
                return response;
            break;
            case 404:
                console.log("Non identifé");
                return response;
            case 401:
                console.log("Non autorisé");
                return response;
            default:
                throw new Error(`Erreur API : ${response.status}`);
            break;
        }
        //const data = await response.json();
    } catch (err) {
        console.error(`Erreur lors de la récupération de l'élément ${element} :`, err);
        return null;
    }
}

function checkToken() {
    const token = sessionStorage.getItem('token');
    if(!token) {
        console.error("Utilisateur non authentifié !");
    } else {
        return token;
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

    const response = await fetchAPI('users/login', loginData);
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
        const response = await fetchAPI(`works/${id}`, data);
        await refreshCache('works');
    }
}

export async function sendWork(imgFile, title, cat) {
    const token = checkToken();
    if(token) {
        const formData = new FormData();
        formData.append('image', imgFile, imgFile.name);
        formData.append('title', title);
        formData.append('category', cat);

        const data = {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`},
            body: formData
        }
    
        const response = await fetchAPI('works', data);
        await refreshCache('works');
    }
}

//CACHE FETCH
//REFRESH CACHE
async function refreshCache(element) {
    const response = await fetchAPI('works');
    const data = await response.json();
    sessionStorage.removeItem(element);
    sessionStorage.setItem(element, JSON.stringify(data));
}

// FETCHABLE ELEMENTS [works, categories]
export async function customFetch(element) {
    let data = sessionStorage.getItem(element);
    if(!data) {
        console.log("CALL ON API");
        const response = await fetchAPI(element);
        data = await response.json();
        sessionStorage.setItem(element, JSON.stringify(data));
    } else {
        console.log("CALL ON CACHE");
        data = JSON.parse(data);
    }
    return data;
}