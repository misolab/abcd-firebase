const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)


const db = admin.firestore()

exports.createUserAccount = functions.auth.user().onCreate(event => {

    const uid = event.data.uid
    const email = event.data.email
    const photoUrl = event.data.photoURL || "empty"

    return db.collection('Users').doc(`${uid}`)
    .set({
        email:email,
        photoUrl:photoUrl
    });
})
