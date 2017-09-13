(function () {

    const txtAge = document.getElementById('age');
    const txtName = document.getElementById('name');
    const btnAdd = document.getElementById('add');

    btnAdd.addEventListener('click', e => {
        const newUser = {
            age: txtAge.value,
            name: txtName.value
        };
        const newUserRef = firebase.database().ref('object').push();
        console.log('newUser key -' + newUserRef.key);
        newUserRef.set(newUser);
    });




    const txtKey = document.getElementById('key');
    const btnDel = document.getElementById('del');

    btnDel.addEventListener('click', e => {
        if (!confirm('삭제하시겠습니까?')) {
            return;
        }

        const deleteKey = txtKey.value;
        const deleteRef = firebase.database().ref('object/' + deleteKey);
        deleteRef.remove();
    });




    const btnSearch = document.getElementById('search');

    btnSearch.addEventListener('click', e => {
        const searchKey = txtKey.value;
        const searchRef = firebase.database().ref('object/' + searchKey);
        searchRef.once('value')
            .then(snap => {
                alert(JSON.stringify(snap.val(), null, 3));
            }).catch(e => {
                alert(e.message);
            });
    });




    
    const btnUpdate = document.getElementById('update');

    btnUpdate.addEventListener('click', e => {
        const updateKey = txtKey.value;
        const newData = {
            age: txtAge.value,
            name: txtName.value
        };
        const updateRef = firebase.database().ref('object/' + updateKey);
        updateRef.update(newData);
    });



    const objValue = document.getElementById('objValue');
    const objAdded = document.getElementById('objAdded');
    const objChanged = document.getElementById('objChanged');
    const objRemoved = document.getElementById('objRemoved');
    // const objMoved = document.getElementById('objMoved');

    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded');

        const dbObjectRef = firebase.database().ref('object');

        // TODO : rule change anonymous!!
        dbObjectRef.on('value', snap => {
            console.log(snap);
            objValue.innerText = JSON.stringify(snap.val(), null, 3);
        });

        dbObjectRef.on('child_added', snap => {
            console.log(snap);
            objAdded.innerText = JSON.stringify(snap.val(), null, 3);
        });

        dbObjectRef.on('child_changed', snap => {
            console.log(snap);
            objChanged.innerText = JSON.stringify(snap.val(), null, 3);
        });

        dbObjectRef.on('child_removed', snap => {
            console.log(snap);
            objRemoved.innerText = JSON.stringify(snap.val(), null, 3);
        });

        // dbObjectRef.on('child_moved', snap => {
        //     console.log(snap);
        //     objMoved.innerText = JSON.stringify(snap.val(), null, 3);
        // });


    });

}());