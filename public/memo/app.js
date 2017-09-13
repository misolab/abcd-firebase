/*
1. auth - google
2. db
    0) init
    1) create
    2) read
    3) update
    4) delete
3. deploy
 */


let userInfo = null;
let memoRef = null;
let selectedKey = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');

    $('.textarea').blur(() => {
        saveMemoData();
    });

    // 1. auth - google
    firebase.auth().onAuthStateChanged(user => {
        console.log(user);

        if (user) {
            userInfo = user;
            alert('hi!! ' + user.displayName);

            initMemoData();
        } else {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .catch(e => {
                    alert(e.message);
                });
        }
    });
});

// 2. db - 0) init
function initMemoData() {
    memoRef = firebase.database().ref('memos/' + userInfo.uid);

    // 2. db - 2) read
    memoRef.on("child_added", (data) => {
        var key = data.key;
        var memoData = data.val();
        var txt = memoData.txt;
        var title = txt.substr(0, txt.indexOf('\n'));
        var firstTxt = txt.substr(0, 1);
        var html =
            "<li id='" + key + "' class=\"collection-item avatar\" onclick=\"loadMemoData(this.id);\">" +
            "<i class=\"material-icons circle red\">" + firstTxt + "</i>" +
            "<span class=\"title\">" + title + "</span>" +
            "<p class='txt'>" + txt + "<br>" +
            "</p>" +
            // 2. db - 4) delete
            "<a href=\"#!\" onclick=\"deleteMemoData('" + key + "');\" class=\"secondary-content\"><i class=\"material-icons\">delete</i></a>"
        "</li>";

        $(".collection").append(html);
    });

    // 2. db - 3) update
    memoRef.on("child_changed", (data) => {
        var key = data.key;
        var txt = data.val().txt;
        var title = txt.substr(0, txt.indexOf('\n'));

        $("#" + key + " > .title").text(title);
        $("#" + key + " > .txt").text(txt);
    });
}

// 2. db - 2) read
function loadMemoData(key) {
    selectedKey = key;
    var currentRef = firebase.database().ref('memos/' + userInfo.uid + "/" + key);
    currentRef.once("value").then((snapshot) => {
        $(".textarea").val(snapshot.val().txt);
    });
}

// 2. db - 1) create
function saveMemoData() {
    var txt = $(".textarea").val();
    if (txt == "") {
        return;
    }

    // 2. db - 3) update
    if (selectedKey) {
        var currentRef = firebase.database().ref('memos/' + userInfo.uid + "/" + selectedKey);
        currentRef.update({
            txt: txt,
            updateTime: new Date().getTime()
        });
    } else {
        const newMemoRef = memoRef.push({
            txt: txt,
            createTime: new Date().getTime()
        });
        selectedKey = newMemoRef.key;
    }
}

// 2. db - 4) delete
function deleteMemoData(key) {
    if (!confirm("삭제하시겠습니까?")) {
        return;
    }

    var currentRef = firebase.database().ref('memos/' + userInfo.uid + "/" + key);
    currentRef.remove();
    $("#" + key).remove();

    newMemoData();
}

// 2. db - 1) create (new)
function newMemoData() {
    $(".textarea").val("");
    selectedKey = null;
}