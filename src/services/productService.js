const getProducts = async (category) => {
    try {
        let response = await fetch(`../juegos/${category}.json`);
        let data = await response.json();
        console.log(response)
        return data;
        
    } catch (error) {
        throw new Error(error.message);
        
    }
};

export default getProducts