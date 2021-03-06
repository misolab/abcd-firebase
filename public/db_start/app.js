// TODO : rule change anonymous!!

(function () {

    const txtAge = document.getElementById('age');
    const txtName = document.getElementById('name');
    const btnAdd = document.getElementById('add');

    btnAdd.addEventListener('click', e => {
        console.log('btnAdd - click');
        //  DB - push
    });




    const txtKey = document.getElementById('key');
    const btnDel = document.getElementById('del');

    btnDel.addEventListener('click', e => {
        console.log('btnDel - click');

        if (!confirm('삭제하시겠습니까?')) {
            return;
        }

        //  DB - delete

    });




    const btnSearch = document.getElementById('search');

    btnSearch.addEventListener('click', e => {
        console.log('btnSearch - click');

        //  DB - once
    });




    
    const btnUpdate = document.getElementById('update');

    btnUpdate.addEventListener('click', e => {
        console.log('btnUpdate - click');

        //  DB - update
    });



    const objValue = document.getElementById('objValue');
    const objAdded = document.getElementById('objAdded');
    const objChanged = document.getElementById('objChanged');
    const objRemoved = document.getElementById('objRemoved');
    // const objMoved = document.getElementById('objMoved');

    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded');

        const dbObjectRef = firebase.database().ref('object');

        //  DB - value
        dbObjectRef.on('value', snap => {
            console.log(snap);
            objValue.innerText = JSON.stringify(snap.val(), null, 3);
        });

        //  DB - child_added
        dbObjectRef.on('child_added', snap => {
            console.log(snap);
            objAdded.innerText = JSON.stringify(snap.val(), null, 3);
        });

        //  DB - child_changed
        dbObjectRef.on('child_changed', snap => {
            console.log(snap);
            objChanged.innerText = JSON.stringify(snap.val(), null, 3);
        });

        //  DB - child_removed
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