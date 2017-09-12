(function () {

    const txtEmail = document.getElementById('txtEmail');
    const txtPwd = document.getElementById('txtPassword');

    const btnLogin = document.getElementById('btnLogin');
    const btnLoginByGoogle = document.getElementById('btnLoginByGoogle');
    const btnLogout = document.getElementById('btnLogout');

    btnLogin.addEventListener('click', e => {
        console.log('login by email');

        const email = txtEmail.value;
        const password = txtPwd.value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(e => {
                console.log(e);
                alert(e.message);
            })
            /*
            .then(user => {
                console.log('login Success!!');
                console.log(user);

                var displayName = user.displayName;
                var email = user.email;
                var photoURL = user.photoURL;
                var uid = user.uid;

                alert('Hi!! ' + email);
            });
            */
    });

    btnLoginByGoogle.addEventListener('click', e => {
        console.log('login by Google');

        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .catch(e => {
                console.log(e);
                alert(e.message);
            })
            .then(result => {
                console.log('login Success!!');
                var user = result.user;

                console.log(user);
                var displayName = user.displayName;
                var email = user.email;
                var photoURL = user.photoURL;
                var uid = user.uid;

                alert('Hi!! ' + email);
            });

    });

    btnLogout.addEventListener('click', e => {
        if (!confirm("Loggout??")){
            return;
        }
        firebase.auth().signOut();
        alert("bye~bye!!");
    });

    document.addEventListener('DOMContentLoaded', function () {

        firebase.auth().onAuthStateChanged(user => {
            console.log('onAuthStateChanged');
            console.log(user);
            
            if (user) {
                var displayName = user.displayName;
                var email = user.email;
                var photoURL = user.photoURL;
                var uid = user.uid;
                alert('Hi!! ' + email);

                btnLogout.classList.remove('hide');
            } else {
                // User is signed out.
                btnLogout.classList.add('hide');
            }
        });
    });

}());