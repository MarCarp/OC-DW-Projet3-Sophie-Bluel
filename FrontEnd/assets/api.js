export async function fetchWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        if (!response.ok) {
          throw new Error(`Erreur API : ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Erreur lors du fetch des travaux :", err);
        return null;
    }
}

export async function fetchCategories() {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        if(!response.ok) {
            throw new Error(`Erreur API : ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Erreur lors de la récupération des catégories : ", err);
        return null;
    }
}