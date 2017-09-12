(function () {

    const txtEmail = document.getElementById('txtEmail');
    const txtPwd = document.getElementById('txtPassword');

    const btnLogin = document.getElementById('btnLogin');
    const btnLoginByGoogle = document.getElementById('btnLoginByGoogle');
    const btnLogout = document.getElementById('btnLogout');

    btnLogin.addEventListener('click', e => {
        console.log('login by email');

    });

    btnLoginByGoogle.addEventListener('click', e => {
        console.log('login by Google');

    });

    btnLogout.addEventListener('click', e => {
        console.log('loggout');

        if (!confirm("Loggout??")) {
            return;
        }
        
    });

    document.addEventListener('DOMContentLoaded', function () {
        console.log('DOMContentLoaded');

    });

}());