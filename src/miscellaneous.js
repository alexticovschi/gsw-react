export const firebaseLooper = (dataDB) => {
    const data = [];
    dataDB.forEach((item) => {
        data.push({
            ...item.val(),
            id: item.key
        })
    });

    return data;
}

export const reverseArray = (arr) => {
    const reversedArr = [];

    for(let i = arr.length - 1; i >= 0; i--) {
        reversedArr.push(arr[i]);
    }

    return reversedArr;
}