const BASE_URL = '/api/v1';

async function getLast() {
    const resp = await fetch(`${BASE_URL}/movements`);
    const { movements } = await resp.json();
    return movements;
}

async function getIncomes() {
    const resp = await fetch(`${BASE_URL}/movements?type=income`);
    const { movements } = await resp.json();
    return movements;
}

async function getExpenses() {
    const resp = await fetch(`${BASE_URL}/movements?type=expense`);
    const { movements } = await resp.json();
    return movements;
}

async function update(movement) {
    const resp = await fetch(`${BASE_URL}/movements/${movement.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movement),
    });

    return resp.json();
}

async function create(movement) {
    const resp = await fetch(`${BASE_URL}/movements`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movement),
        
    });
    
    alert('se creo un movimiento con exito');
    return resp.json();
    
}

async function remove(movement) {

    var msg = confirm("Seguro que quiere eliminar?");      
    if (msg == true)  {

            const resp = await fetch(`${BASE_URL}/movements/${movement.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
                    },
        body: JSON.stringify(movement),      
       
    });
    return resp.json();
    }
}


export default {
    create,
    update,
    remove,
    getLast,
    getIncomes,
    getExpenses
};
