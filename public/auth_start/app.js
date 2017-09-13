(function () {

    const txtEmail = document.getElementById('txtEmail');
    const txtPwd = document.getElementById('txtPassword');

    const btnLogin = document.getElementById('btnLogin');
    const btnLoginByGoogle = document.getElementById('btnLoginByGoogle');
    const btnLogout = document.getElementById('btnLogout');

    //  AUTH - email,pwd
    btnLogin.addEventListener('click', e => {
        console.log('login by email');

    });

    //  AUTH - google
    btnLoginByGoogle.addEventListener('click', e => {
        console.log('login by Google');

    });

    //  AUTH - loggout
    btnLogout.addEventListener('click', e => {
        console.log('loggout');

        if (!confirm("Loggout??")) {
            return;
        }
        
    });

    //  AUTH - authStateChanged
    document.addEventListener('DOMContentLoaded', function () {
        console.log('DOMContentLoaded');

    });

}());